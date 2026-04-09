import { NextResponse } from 'next/server';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function parseWebhookBody(text) {
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function getWebhookError(parsedBody) {
  if (!parsedBody || typeof parsedBody !== 'object') return null;

  if (parsedBody.success === false && typeof parsedBody.message === 'string') {
    return parsedBody.message;
  }

  if (parsedBody.result === 'error' && typeof parsedBody.message === 'string') {
    return parsedBody.message;
  }

  if (typeof parsedBody.error === 'string') {
    return parsedBody.error;
  }

  return null;
}

function normalizeString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

export async function POST(request) {
  try {
    const body = await request.json();
    const firstName = normalizeString(body?.firstName);
    const lastName = normalizeString(body?.lastName);
    const email = normalizeString(body?.email).toLowerCase();
    const phone = normalizeString(body?.phone);
    const service = normalizeString(body?.service);
    const message = normalizeString(body?.message);
    const timezone = normalizeString(body?.timezone) || 'Unknown';

    if (!firstName || !lastName || !phone || !service || !message) {
      return NextResponse.json(
        { error: 'Please fill in all required fields before submitting.' },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    const submittedAt = new Date();
    const payload = {
      firstName,
      lastName,
      email,
      phone,
      service,
      message,
      submittedAtIso: submittedAt.toISOString(),
      submittedAtUnixMs: submittedAt.getTime(),
      timezone,
      source: 'website_contact_form'
    };

    const sheetName = process.env.CONTACT_GOOGLE_SHEET_NAME || process.env.NEWSLETTER_GOOGLE_SHEET_NAME;
    if (typeof sheetName === 'string' && sheetName.trim()) {
      payload.sheetName = sheetName.trim();
    }

    const scriptUrl =
      process.env.CONTACT_GOOGLE_SCRIPT_URL || process.env.NEWSLETTER_GOOGLE_SCRIPT_URL;
    if (!scriptUrl) {
      return NextResponse.json(
        { error: 'Contact form integration is not configured on the server.' },
        { status: 500 }
      );
    }

    const sendToWebhook = async (options) => {
      const response = await fetch(scriptUrl, {
        method: 'POST',
        cache: 'no-store',
        ...options
      });
      const text = await response.text();
      const parsed = parseWebhookBody(text);
      return { response, text, parsed };
    };

    let webhookResult = await sendToWebhook({
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    let webhookError = getWebhookError(webhookResult.parsed);

    // Some Apps Script handlers rely on e.parameter instead of parsing JSON.
    if (
      webhookResult.response.ok &&
      typeof webhookError === 'string' &&
      webhookError.toLowerCase().includes('no email')
    ) {
      const formBody = new URLSearchParams({
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        phone: payload.phone,
        service: payload.service,
        message: payload.message,
        submittedAtIso: payload.submittedAtIso,
        submittedAtUnixMs: String(payload.submittedAtUnixMs),
        timezone: payload.timezone,
        source: payload.source,
        ...(payload.sheetName ? { sheetName: payload.sheetName } : {})
      }).toString();

      webhookResult = await sendToWebhook({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody
      });
      webhookError = getWebhookError(webhookResult.parsed);
    }

    if (!webhookResult.response.ok || webhookError) {
      console.error('Contact webhook error:', webhookResult.response.status, webhookResult.text);

      const accessError =
        webhookResult.response.status === 401 || webhookResult.response.status === 403;
      const sheetTabError =
        typeof webhookError === 'string' &&
        webhookError.toLowerCase().includes("null (reading 'appendrow')");

      return NextResponse.json(
        {
          error: accessError
            ? 'Contact sheet webhook is not publicly accessible yet. Please update Google Apps Script Web App access.'
            : sheetTabError
            ? 'Google Apps Script could not find the target sheet tab. Update sheet name in Apps Script (or set CONTACT_GOOGLE_SHEET_NAME).'
            : webhookError || 'Unable to submit your request right now. Please try again.'
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Unexpected server error while submitting contact form.' },
      { status: 500 }
    );
  }
}
