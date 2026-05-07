// app/dashboard/RequestServiceModal.tsx
'use client';

import { useState } from 'react';
import type { FleetVehicle } from '@/lib/fleet';

interface Props {
  vehicles: FleetVehicle[];
  accountId: string;
  companyName: string;
  onClose: () => void;
}

const SERVICE_TYPES = [
  'Oil Change',
  'Brake Inspection',
  'Tire Rotation',
  'Battery Check / Replacement',
  'Check Engine Light',
  'AC / Heat Issue',
  'Fluid Flush',
  'Pre-Trip Inspection',
  'Other (describe below)',
];

export default function RequestServiceModal({ vehicles, accountId, companyName, onClose }: Props) {
  const [vehicleId,    setVehicleId]    = useState('');
  const [serviceType,  setServiceType]  = useState('');
  const [description,  setDescription]  = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [contactName,  setContactName]  = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [sending,      setSending]      = useState(false);
  const [done,         setDone]         = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const selectedVehicle = vehicles.find(v => v._id === vehicleId);

  async function handleSubmit() {
    if (!vehicleId)     { alert('Please select a vehicle'); return; }
    if (!serviceType)   { alert('Please select a service type'); return; }
    if (!preferredDate) { alert('Please select a preferred date'); return; }
    if (!contactName)   { alert('Please enter a contact name'); return; }
    if (!contactPhone)  { alert('Please enter a contact phone number'); return; }

    setSending(true);
    try {
      const vehicleName = selectedVehicle?.nickname ||
        `${selectedVehicle?.year} ${selectedVehicle?.make} ${selectedVehicle?.model}`;

      const body = {
        accountId,
        companyName,
        vehicleId,
        vehicleName,
        serviceType,
        description,
        preferredDate,
        preferredTime,
        contactName,
        contactPhone,
      };

      await fetch('/api/request-service', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      setDone(true);
    } catch {
      alert('Failed to submit request. Please call us at (704) 586-9012.');
    } finally {
      setSending(false);
    }
  }

  if (done) return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-[#171717] border border-white/10 rounded-2xl max-w-sm w-full p-8 text-center shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-white font-bold text-xl mb-2">Request Received!</h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          We'll reach out to confirm your appointment within one business day. For urgent requests call us at{' '}
          <a href="tel:+17045869012" className="text-yellow-400 font-semibold">(704) 586-9012</a>.
        </p>
        <button
          onClick={onClose}
          className="w-full bg-yellow-500 hover:bg-yellow-400 text-[#171717] font-bold py-3 rounded-xl transition text-sm"
        >
          Done
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-[#171717] border border-white/10 rounded-2xl max-w-lg w-full shadow-2xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0f0f0f] border-b border-white/8 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <p className="text-yellow-400 text-[10px] font-bold uppercase tracking-[0.15em] mb-0.5">One-Off Service Request</p>
            <h2 className="text-white font-bold text-lg">Request a Service</h2>
            <p className="text-gray-500 text-xs mt-0.5">{companyName}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/8 transition text-xl"
          >×</button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">

          {/* Vehicle selector */}
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Vehicle <span className="text-red-400">*</span>
            </label>
            <div className="grid grid-cols-1 gap-2">
              {vehicles.map(v => {
                const name = v.nickname || `${v.year} ${v.make} ${v.model}`;
                const isSelected = vehicleId === v._id;
                return (
                  <button
                    key={v._id}
                    onClick={() => setVehicleId(v._id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                      isSelected
                        ? 'border-yellow-500 bg-yellow-500/10'
                        : 'border-white/10 bg-white/4 hover:border-white/20'
                    }`}
                  >
                    {v.photoUrl ? (
                      <img src={v.photoUrl} alt={name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-white/8 flex items-center justify-center flex-shrink-0 text-xl">🚐</div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className={`font-bold text-sm ${isSelected ? 'text-yellow-400' : 'text-white'}`}>{name}</p>
                      <p className="text-gray-500 text-xs">
                        {v.year} {v.make} {v.model}
                        {v.licensePlate ? ` · ${v.licensePlate}` : ''}
                      </p>
                    </div>
                    {isSelected && <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0"><span className="text-[#171717] text-xs font-black">✓</span></div>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Service type */}
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Service Type <span className="text-red-400">*</span>
            </label>
            <select
              value={serviceType}
              onChange={e => setServiceType(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/20 transition"
            >
              <option value="">— Select service —</option>
              {SERVICE_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Description <span className="text-gray-600 font-normal">(optional)</span>
            </label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={3}
              placeholder="Describe the issue or anything we should know before the visit..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/20 transition resize-none"
            />
          </div>

          {/* Preferred date/time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Preferred Date <span className="text-red-400">*</span>
              </label>
              <input
                type="date"
                value={preferredDate}
                min={today}
                onChange={e => setPreferredDate(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/20 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Preferred Time <span className="text-gray-600 font-normal">(optional)</span>
              </label>
              <input
                type="time"
                value={preferredTime}
                onChange={e => setPreferredTime(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/20 transition"
              />
            </div>
          </div>

          {/* Contact info */}
          <div className="bg-white/4 border border-white/8 rounded-xl p-4 space-y-4">
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Point of Contact for This Visit</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Name <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  value={contactName}
                  onChange={e => setContactName(e.target.value)}
                  placeholder="Marcus Johnson"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/20 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Phone <span className="text-red-400">*</span></label>
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={e => setContactPhone(e.target.value)}
                  placeholder="(704) 555-0100"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/20 transition"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/8 flex gap-3 flex-shrink-0">
          <button
            onClick={handleSubmit}
            disabled={sending}
            className="flex-1 bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed text-[#171717] font-bold py-3 rounded-xl transition text-sm"
          >
            {sending ? 'Sending...' : 'Submit Service Request'}
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-white/5 hover:bg-white/8 border border-white/10 text-gray-400 font-bold py-3 rounded-xl transition text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}