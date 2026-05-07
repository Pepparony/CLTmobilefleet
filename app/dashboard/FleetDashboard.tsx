// app/dashboard/FleetDashboard.tsx
'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import RequestServiceModal from './RequestServiceModal';
import type { FleetAccount, FleetVehicle, FleetServiceVisit } from '@/lib/fleet';

interface Props {
  account:  FleetAccount;
  vehicles: FleetVehicle[];
  visits:   FleetServiceVisit[];
}

function fmtDate(d?: string) {
  if (!d) return '—';
  const [y, m, day] = d.split('-').map(Number);
  return new Date(y, m - 1, day).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  });
}

function statusColor(status: FleetServiceVisit['status']) {
  if (status === 'completed') return 'text-green-400 bg-green-500/10 border-green-500/25';
  if (status === 'scheduled') return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/25';
  return 'text-gray-400 bg-gray-500/10 border-gray-500/25';
}

function statusLabel(status: FleetServiceVisit['status']) {
  if (status === 'completed') return '✓ Completed';
  if (status === 'scheduled') return '● Upcoming';
  return '— Skipped';
}

// ─── Vehicle Card ─────────────────────────────────────────────────────────────

function VehicleCard({
  vehicle, visits, onSelect,
}: {
  vehicle:  FleetVehicle;
  visits:   FleetServiceVisit[];
  onSelect: (v: FleetVehicle) => void;
}) {
  const vehicleVisits = visits
    .filter(v => v.vehicleId === vehicle._id)
    .sort((a, b) => b.scheduledDate.localeCompare(a.scheduledDate));

  const lastCompleted = vehicleVisits.find(v => v.status === 'completed');
  const nextScheduled = vehicleVisits.find(v => v.status === 'scheduled');
  const totalVisits   = vehicleVisits.filter(v => v.status === 'completed').length;

  return (
    <button
      onClick={() => onSelect(vehicle)}
      className="w-full bg-[#171717] border border-white/8 rounded-2xl overflow-hidden text-left hover:border-yellow-500/30 transition-all group"
    >
      <div className="relative h-40 overflow-hidden bg-white/5">
        {vehicle.photoUrl ? (
          <img
            src={vehicle.photoUrl}
            alt={vehicle.nickname || `${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl opacity-30">🚐</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/20 to-transparent" />
        <div className="absolute top-3 right-3 text-gray-500 group-hover:text-yellow-400 transition text-lg">→</div>
        <div className="absolute bottom-3 left-4 right-8">
          <p className="text-white font-bold text-base leading-tight">
            {vehicle.nickname || `${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          </p>
          {vehicle.nickname && (
            <p className="text-gray-400 text-xs mt-0.5">{vehicle.year} {vehicle.make} {vehicle.model}</p>
          )}
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="bg-white/4 rounded-xl px-2 py-2.5 text-center">
            <p className="text-white font-bold text-lg leading-none">{totalVisits}</p>
            <p className="text-gray-500 text-[9px] mt-1 uppercase tracking-wider">Services</p>
          </div>
          <div className="bg-white/4 rounded-xl px-2 py-2.5 text-center col-span-2">
            <p className="text-gray-400 text-[9px] uppercase tracking-wider mb-0.5">Last Service</p>
            <p className="text-white text-xs font-semibold">{lastCompleted ? fmtDate(lastCompleted.scheduledDate) : 'None yet'}</p>
          </div>
        </div>
        {nextScheduled ? (
          <div className="bg-yellow-500/8 border border-yellow-500/20 rounded-xl px-3.5 py-2.5">
            <p className="text-yellow-400 text-[9px] font-bold uppercase tracking-wider mb-0.5">Next Visit</p>
            <p className="text-white text-xs font-semibold">{fmtDate(nextScheduled.scheduledDate)}</p>
          </div>
        ) : (
          <div className="bg-white/3 border border-white/8 rounded-xl px-3.5 py-2.5">
            <p className="text-gray-500 text-xs">No upcoming visits scheduled</p>
          </div>
        )}
      </div>
    </button>
  );
}

// ─── Visit Row ────────────────────────────────────────────────────────────────

function VisitRow({ visit, onClick }: { visit: FleetServiceVisit; onClick: (v: FleetServiceVisit) => void }) {
  return (
    <button
      onClick={() => onClick(visit)}
      className="w-full flex items-center justify-between gap-4 px-4 py-3.5 border-b border-white/6 last:border-0 hover:bg-white/3 transition text-left"
    >
      <div className="flex items-center gap-3">
        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border flex-shrink-0 ${statusColor(visit.status)}`}>
          {statusLabel(visit.status)}
        </span>
        <div>
          <p className="text-white text-sm font-semibold">{fmtDate(visit.scheduledDate)}</p>
          {visit.report?.workPerformed && (
            <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">{visit.report.workPerformed}</p>
          )}
        </div>
      </div>
      {visit.status === 'completed' && (
        <span className="text-yellow-400 text-xs font-semibold flex-shrink-0">View Report →</span>
      )}
    </button>
  );
}

// ─── Report Modal ─────────────────────────────────────────────────────────────

function ReportModal({ visit, vehicle, onClose }: {
  visit:   FleetServiceVisit;
  vehicle: FleetVehicle;
  onClose: () => void;
}) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const r = visit.report;
  if (!r) return null;

  const photos = r.photos || [];

  const inspectionItems = [
    { label: 'Coolant',      val: r.coolantStatus },
    { label: 'Brake Fluid',  val: r.brakeFluidStatus },
    { label: 'Front Brakes', val: r.frontBrakesLife ? `${r.frontBrakesLife}mm` : undefined },
    { label: 'Rear Brakes',  val: r.rearBrakesLife  ? `${r.rearBrakesLife}mm`  : undefined },
    { label: 'Battery',      val: r.batteryVoltage  ? `${r.batteryVoltage}V`   : undefined },
    { label: 'Tire Tread',   val: r.tireTread },
    { label: 'Oil Changed',  val: r.oilChanged !== undefined ? (r.oilChanged ? 'Yes' : 'No') : undefined },
    { label: 'Mileage',      val: r.mileageAtService ? `${Number(r.mileageAtService).toLocaleString()} mi` : undefined },
  ].filter(i => i.val);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-[#171717] border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="bg-[#0f0f0f] border-b border-white/8 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <p className="text-yellow-400 text-[10px] font-bold uppercase tracking-[0.15em] mb-0.5">Service Report</p>
            <h2 className="text-white font-bold text-lg">
              {vehicle.nickname || `${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            </h2>
            <p className="text-gray-500 text-xs mt-0.5">
              {fmtDate(visit.scheduledDate)}{r.submittedBy ? ` · Tech: ${r.submittedBy.split(' ')[0]}` : ''}
              {r.mileageAtService ? ` · ${Number(r.mileageAtService).toLocaleString()} mi` : ''}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/8 transition text-xl">×</button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          <div className="bg-white/4 border border-white/8 rounded-xl px-4 py-4">
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-2">🔧 Work Performed</p>
            <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">{r.workPerformed}</p>
          </div>

          {r.partsReplaced && (
            <div className="bg-white/4 border border-white/8 rounded-xl px-4 py-4">
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-2">📦 Parts Replaced</p>
              <p className="text-gray-200 text-sm leading-relaxed">{r.partsReplaced}</p>
            </div>
          )}

          {inspectionItems.length > 0 && (
            <div className="bg-white/4 border border-white/8 rounded-xl px-4 py-4">
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-3">🔍 Inspection Results</p>
              <div className="grid grid-cols-2 gap-2">
                {inspectionItems.map(item => (
                  <div key={item.label} className="flex items-center justify-between bg-white/4 rounded-lg px-3 py-2">
                    <span className="text-gray-400 text-xs">{item.label}</span>
                    <span className="text-white text-xs font-semibold">{item.val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {r.additionalConcerns && (
            <div className="bg-orange-500/8 border border-orange-500/20 rounded-xl px-4 py-4">
              <p className="text-orange-400 text-[10px] font-bold uppercase tracking-wider mb-2">⚠️ Concerns Noted</p>
              <p className="text-gray-200 text-sm leading-relaxed">{r.additionalConcerns}</p>
            </div>
          )}

          {r.recommendedNextService && (
            <div className="bg-yellow-500/8 border border-yellow-500/20 rounded-xl px-4 py-4">
              <p className="text-yellow-400 text-[10px] font-bold uppercase tracking-wider mb-2">💡 Recommended Next Service</p>
              <p className="text-gray-200 text-sm leading-relaxed">{r.recommendedNextService}</p>
            </div>
          )}

          {photos.length > 0 && (
            <div>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-3">📸 Photos ({photos.length})</p>
              <div className="grid grid-cols-3 gap-2">
                {photos.map((url, i) => (
                  <button
                    key={i}
                    onClick={() => setLightboxIdx(i)}
                    className="relative aspect-square rounded-xl overflow-hidden border border-white/8 hover:border-yellow-400/40 transition group"
                  >
                    <img src={url} alt={r.photoCaptions?.[i] || `Photo ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    {r.photoCaptions?.[i] && (
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-1.5 opacity-0 group-hover:opacity-100 transition">
                        <p className="text-white text-[9px] font-medium truncate">{r.photoCaptions[i]}</p>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {lightboxIdx !== null && (
        <div className="fixed inset-0 z-[60] bg-black/95 flex flex-col" onClick={() => setLightboxIdx(null)}>
          <div className="flex justify-between items-center px-5 py-3 flex-shrink-0" onClick={e => e.stopPropagation()}>
            <span className="text-white/40 text-xs">{lightboxIdx + 1} / {photos.length}</span>
            <button onClick={() => setLightboxIdx(null)} className="text-white/50 hover:text-white text-2xl w-10 h-10 flex items-center justify-center">✕</button>
          </div>
          <div className="flex-1 flex items-center justify-center relative px-12" onClick={e => e.stopPropagation()}>
            {photos.length > 1 && (
              <button onClick={() => setLightboxIdx(i => (i! - 1 + photos.length) % photos.length)} className="absolute left-2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xl">‹</button>
            )}
            <img src={photos[lightboxIdx]} alt={r.photoCaptions?.[lightboxIdx] || `Photo ${lightboxIdx + 1}`} className="max-w-full max-h-[80vh] object-contain rounded-xl" />
            {photos.length > 1 && (
              <button onClick={() => setLightboxIdx(i => (i! + 1) % photos.length)} className="absolute right-2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xl">›</button>
            )}
          </div>
          {r.photoCaptions?.[lightboxIdx] && (
            <p className="text-white/60 text-sm text-center py-3 flex-shrink-0">{r.photoCaptions[lightboxIdx]}</p>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Vehicle Detail ───────────────────────────────────────────────────────────

function VehicleDetail({ vehicle, visits, onBack }: {
  vehicle: FleetVehicle;
  visits:  FleetServiceVisit[];
  onBack:  () => void;
}) {
  const [selectedVisit, setSelectedVisit] = useState<FleetServiceVisit | null>(null);

  const vehicleVisits = visits
    .filter(v => v.vehicleId === vehicle._id)
    .sort((a, b) => b.scheduledDate.localeCompare(a.scheduledDate));

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-white text-sm transition mb-6">
        ← Back to Fleet
      </button>

      <div className="bg-[#171717] border border-white/8 rounded-2xl overflow-hidden mb-6">
        {vehicle.photoUrl && (
          <div className="relative h-48 overflow-hidden">
            <img src={vehicle.photoUrl} alt={vehicle.nickname || `${vehicle.year} ${vehicle.make} ${vehicle.model}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-transparent to-transparent" />
          </div>
        )}
        <div className="p-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-white text-2xl font-bold">
              {vehicle.nickname || `${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            </h2>
            {vehicle.nickname && <p className="text-gray-500 text-sm mt-0.5">{vehicle.year} {vehicle.make} {vehicle.model}</p>}
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
              {vehicle.licensePlate && <span className="text-gray-400 text-xs">🪪 {vehicle.licensePlate}</span>}
              {vehicle.vin          && <span className="text-gray-400 text-xs font-mono">VIN: {vehicle.vin}</span>}
              {vehicle.color        && <span className="text-gray-400 text-xs">🎨 {vehicle.color}</span>}
            </div>
          </div>
          <div className="text-center flex-shrink-0">
            <p className="text-white text-3xl font-bold">{vehicleVisits.filter(v => v.status === 'completed').length}</p>
            <p className="text-gray-500 text-xs uppercase tracking-wider mt-0.5">Services</p>
          </div>
        </div>
      </div>

      <div className="bg-[#171717] border border-white/8 rounded-2xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-white/8">
          <h3 className="text-white font-bold text-sm">Service History</h3>
        </div>
        {vehicleVisits.length === 0 ? (
          <div className="px-5 py-8 text-center">
            <p className="text-gray-500 text-sm">No visits scheduled yet.</p>
          </div>
        ) : (
          vehicleVisits.map(visit => (
            <VisitRow key={visit._id} visit={visit} onClick={v => v.status === 'completed' && setSelectedVisit(v)} />
          ))
        )}
      </div>

      {selectedVisit && (
        <ReportModal visit={selectedVisit} vehicle={vehicle} onClose={() => setSelectedVisit(null)} />
      )}
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function FleetDashboard({ account, vehicles, visits }: Props) {
  const [selectedVehicle,    setSelectedVehicle]    = useState<FleetVehicle | null>(null);
  const [showServiceRequest, setShowServiceRequest] = useState(false);

  const totalCompleted = visits.filter(v => v.status === 'completed').length;
  const nextVisit = visits
    .filter(v => v.status === 'scheduled')
    .sort((a, b) => a.scheduledDate.localeCompare(b.scheduledDate))[0];

  return (
    <div className="min-h-screen bg-[#0f0f0f]">

      <header className="bg-[#0a0a0a] border-b border-white/8 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
              <span className="text-yellow-400 text-[11px] font-bold tracking-[0.18em] uppercase">CLTmobile</span>
            </div>
            <span className="text-gray-700 text-xs">|</span>
            <span className="text-gray-400 text-sm font-semibold">{account.companyName}</span>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="text-gray-500 hover:text-white text-xs transition px-3 py-1.5 rounded-lg hover:bg-white/6"
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {selectedVehicle ? (
          <VehicleDetail vehicle={selectedVehicle} visits={visits} onBack={() => setSelectedVehicle(null)} />
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-white text-3xl font-bold mb-1">
                Welcome back, {account.contactName.split(' ')[0]}.
              </h1>
              <div className="flex items-center gap-3">
                <p className="text-gray-500 text-sm">Here's the current status of your fleet.</p>
                <button
                  onClick={() => setShowServiceRequest(true)}
                  className="flex-shrink-0 bg-yellow-500 hover:bg-yellow-400 text-[#171717] font-bold text-xs px-4 py-2 rounded-xl transition"
                >
                  + Request a Service
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-[#171717] border border-white/8 rounded-2xl px-5 py-4">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Vehicles</p>
                <p className="text-white text-3xl font-bold">{vehicles.length}</p>
              </div>
              <div className="bg-[#171717] border border-white/8 rounded-2xl px-5 py-4">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Total Services</p>
                <p className="text-white text-3xl font-bold">{totalCompleted}</p>
              </div>
              <div className="bg-[#171717] border border-white/8 rounded-2xl px-5 py-4">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Next Visit</p>
                <p className="text-white text-lg font-bold leading-tight">
                  {nextVisit ? fmtDate(nextVisit.scheduledDate) : '—'}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-white font-bold text-lg mb-4">Your Fleet</h2>
              {vehicles.length === 0 ? (
                <div className="bg-[#171717] border border-white/8 rounded-2xl p-8 text-center">
                  <p className="text-gray-500 text-sm">No vehicles set up yet. Contact CLTmobile to get started.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {vehicles.map(vehicle => (
                    <VehicleCard
                      key={vehicle._id}
                      vehicle={vehicle}
                      visits={visits}
                      onSelect={setSelectedVehicle}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </main>

      {showServiceRequest && (
        <RequestServiceModal
          vehicles={vehicles}
          accountId={account._id}
          companyName={account.companyName}
          onClose={() => setShowServiceRequest(false)}
        />
      )}
    </div>
  );
}