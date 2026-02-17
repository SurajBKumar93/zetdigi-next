import { getServerSession } from 'next-auth/next';

export async function getSession() {
  return await getServerSession();
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    throw new Error('Unauthorized');
  }
  return session;
}

export function isAuthenticated(session) {
  return !!session?.user;
}
