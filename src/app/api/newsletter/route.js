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

export async function POST(request) {
  try {
    const body = await request.json();
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
    const timezone = typeof body?.timezone === 'string' ? body.timezone : 'Unknown';

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    const submittedAt = new Date();
    const payload = {
      email,
      submittedAtIso: submittedAt.toISOString(),
      submittedAtUnixMs: submittedAt.getTime(),
      timezone,
      source: 'website_newsletter'
    };
    const sheetName = process.env.NEWSLETTER_GOOGLE_SHEET_NAME;
    if (typeof sheetName === 'string' && sheetName.trim()) {
      payload.sheetName = sheetName.trim();
    }

    const scriptUrl = process.env.NEWSLETTER_GOOGLE_SCRIPT_URL;
    if (!scriptUrl) {
      return NextResponse.json(
        { error: 'Newsletter integration is not configured on the server.' },
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

    // Some Apps Script handlers use e.parameter instead of parsing JSON.
    if (
      webhookResult.response.ok &&
      typeof webhookError === 'string' &&
      webhookError.toLowerCase().includes('no email')
    ) {
      const formBody = new URLSearchParams({
        email: payload.email,
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
      console.error(
        'Newsletter webhook error:',
        webhookResult.response.status,
        webhookResult.text
      );
      const accessError =
        webhookResult.response.status === 401 || webhookResult.response.status === 403;
      const sheetTabError =
        typeof webhookError === 'string' &&
        webhookError.toLowerCase().includes("null (reading 'appendrow')");

      return NextResponse.json(
        {
          error: accessError
            ? 'Newsletter sheet is not publicly accessible yet. Please update Google Apps Script Web App access.'
            : sheetTabError
            ? 'Google Apps Script could not find the target sheet tab. Update sheet name in Apps Script (or set NEWSLETTER_GOOGLE_SHEET_NAME).'
            : webhookError || 'Unable to store your subscription right now. Please try again.'
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Newsletter API error:', error);
    return NextResponse.json(
      { error: 'Unexpected server error while saving newsletter subscription.' },
      { status: 500 }
    );
  }
}
