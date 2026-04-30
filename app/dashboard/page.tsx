// app/dashboard/page.tsx
import { requireFleet } from '@/lib/auth-helpers';
import { getFleetAccountByEmail, getFleetVehicles, getFleetVisits } from '@/lib/fleet';
import { redirect } from 'next/navigation';
import FleetDashboard from './FleetDashboard';

export default async function DashboardPage() {
  const session = await requireFleet();
  const email = session.user?.email || '';

  const account = await getFleetAccountByEmail(email);
  if (!account) redirect('/login');

  const [vehicles, visits] = await Promise.all([
    getFleetVehicles(account._id),
    getFleetVisits(account._id),
  ]);

  return (
    <FleetDashboard
      account={JSON.parse(JSON.stringify(account))}
      vehicles={JSON.parse(JSON.stringify(vehicles))}
      visits={JSON.parse(JSON.stringify(visits))}
    />
  );
}