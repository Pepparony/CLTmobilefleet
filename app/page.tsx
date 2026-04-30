// app/page.tsx  (fleet.cltmobile.com)
import { getFleetSession } from '@/lib/auth-helpers';
import { redirect } from 'next/navigation';

export default async function RootPage() {
  const session = await getFleetSession();

  if (session?.user) {
    redirect('/dashboard');
  } else {
    redirect('/login');
  }
}