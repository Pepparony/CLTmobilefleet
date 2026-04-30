// lib/auth-helpers.ts
import { getServerSession } from 'next-auth';
import { authOptions } from './auth';
import { redirect } from 'next/navigation';

export async function requireFleet() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/login');
  return session;
}

export async function getFleetSession() {
  return await getServerSession(authOptions);
}