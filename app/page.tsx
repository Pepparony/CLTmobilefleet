// app/page.tsx
import { getFleetSession } from '@/lib/auth-helpers';
import { redirect } from 'next/navigation';
import FleetHomePage from './home/page';

export default async function RootPage() {
  const session = await getFleetSession();

  if (session?.user) {
    redirect('/dashboard');
  }

  return <FleetHomePage />;
}