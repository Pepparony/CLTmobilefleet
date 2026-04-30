// lib/fleet.ts
import clientPromise from './mongodb';
import { ObjectId } from 'mongodb';

// ─── Types ─────────────────────────────────────────────────────────────────

export interface FleetAccount {
  _id: string;
  companyName: string;          // "Acme Plumbing"
  contactName: string;          // Primary contact at the company
  contactEmail: string;         // Their login email
  contactPhone: string;
  logoUrl?: string;             // Optional company logo for portal branding
  portalSlug?: string;           // e.g. "acme-plumbing" for fleet.cltmobile.com/acme-plumbing
  active: boolean;
  createdAt: string;
  createdBy: string;            // admin email who set it up
  notes?: string;               // internal admin notes
    accessCode: string;      // ← add this

}

export interface FleetVehicle {
  _id: string;
  fleetAccountId: string;       // references FleetAccount._id
  year: string;
  make: string;
  model: string;
  vin?: string;
  licensePlate?: string;
  color?: string;
  nickname?: string;            // e.g. "Truck #3" or "Manager's Sedan"
  active: boolean;
  addedAt: string;
  addedBy: string;              // admin email
}

export interface FleetServiceVisit {
  _id: string;
  fleetAccountId: string;
  vehicleId: string;            // references FleetVehicle._id
  scheduledDate: string;        // YYYY-MM-DD
  completedAt?: string;         // ISO when report was filed
  mechanicAssigned?: string;
  status: 'scheduled' | 'completed' | 'skipped';
  // Report data (filled in when mechanic completes)
  report?: {
    workPerformed: string;
    partsReplaced?: string;
    coolantStatus?: string;
    brakeFluidStatus?: string;
    frontBrakesLife?: string;
    rearBrakesLife?: string;
    batteryVoltage?: string;
    tireTread?: string;
    oilChanged?: boolean;
    mileageAtService?: string;
    additionalConcerns?: string;
    recommendedNextService?: string;
    photos: string[];             // Cloudinary URLs
    photoCaptions?: string[];
    submittedBy: string;
  };
}

// ─── Fleet Account CRUD ──────────────────────────────────────────────────────

export async function getFleetAccounts(): Promise<FleetAccount[]> {
  const client = await clientPromise;
  const db = client.db('test');
  const accounts = await db.collection('fleetAccounts')
    .find({})
    .sort({ companyName: 1 })
    .toArray();
  return accounts.map(a => ({ ...a, _id: a._id.toString() })) as FleetAccount[];
}

export async function getFleetAccountByEmail(email: string): Promise<FleetAccount | null> {
  const client = await clientPromise;
  const db = client.db('test');
  const account = await db.collection('fleetAccounts').findOne({
    contactEmail: email.toLowerCase(),
    active: true,
  });
  if (!account) return null;
  return { ...account, _id: account._id.toString() } as FleetAccount;
}

export async function getFleetAccountById(id: string): Promise<FleetAccount | null> {
  const client = await clientPromise;
  const db = client.db('test');
  const account = await db.collection('fleetAccounts').findOne({ _id: new ObjectId(id) });
  if (!account) return null;
  return { ...account, _id: account._id.toString() } as FleetAccount;
}

export async function createFleetAccount(data: Omit<FleetAccount, '_id' | 'createdAt'>): Promise<string> {
  const client = await clientPromise;
  const db = client.db('test');
  const result = await db.collection('fleetAccounts').insertOne({
    ...data,
    contactEmail: data.contactEmail.toLowerCase(),
    createdAt: new Date().toISOString(),
  });
  return result.insertedId.toString();
}

export async function updateFleetAccount(id: string, data: Partial<FleetAccount>): Promise<boolean> {
  const client = await clientPromise;
  const db = client.db('test');
  const result = await db.collection('fleetAccounts').updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...data, updatedAt: new Date().toISOString() } }
  );
  return result.modifiedCount > 0;
}

// ─── Fleet Vehicle CRUD ──────────────────────────────────────────────────────

export async function getFleetVehicles(fleetAccountId: string): Promise<FleetVehicle[]> {
  const client = await clientPromise;
  const db = client.db('test');
  const vehicles = await db.collection('fleetVehicles')
    .find({ fleetAccountId, active: true })
    .sort({ nickname: 1, make: 1 })
    .toArray();
  return vehicles.map(v => ({ ...v, _id: v._id.toString() })) as FleetVehicle[];
}

export async function getFleetVehicleById(id: string): Promise<FleetVehicle | null> {
  const client = await clientPromise;
  const db = client.db('test');
  const vehicle = await db.collection('fleetVehicles').findOne({ _id: new ObjectId(id) });
  if (!vehicle) return null;
  return { ...vehicle, _id: vehicle._id.toString() } as FleetVehicle;
}

export async function createFleetVehicle(data: Omit<FleetVehicle, '_id' | 'addedAt'>): Promise<string> {
  const client = await clientPromise;
  const db = client.db('test');
  const result = await db.collection('fleetVehicles').insertOne({
    ...data,
    addedAt: new Date().toISOString(),
  });
  return result.insertedId.toString();
}

export async function updateFleetVehicle(id: string, data: Partial<FleetVehicle>): Promise<boolean> {
  const client = await clientPromise;
  const db = client.db('test');
  const result = await db.collection('fleetVehicles').updateOne(
    { _id: new ObjectId(id) },
    { $set: data }
  );
  return result.modifiedCount > 0;
}

// ─── Fleet Service Visits ────────────────────────────────────────────────────

export async function getFleetVisits(fleetAccountId: string): Promise<FleetServiceVisit[]> {
  const client = await clientPromise;
  const db = client.db('test');
  const visits = await db.collection('fleetVisits')
    .find({ fleetAccountId })
    .sort({ scheduledDate: -1 })
    .toArray();
  return visits.map(v => ({ ...v, _id: v._id.toString() })) as FleetServiceVisit[];
}

export async function getFleetVisitsForVehicle(vehicleId: string): Promise<FleetServiceVisit[]> {
  const client = await clientPromise;
  const db = client.db('test');
  const visits = await db.collection('fleetVisits')
    .find({ vehicleId })
    .sort({ scheduledDate: -1 })
    .toArray();
  return visits.map(v => ({ ...v, _id: v._id.toString() })) as FleetServiceVisit[];
}

export async function createFleetVisit(data: Omit<FleetServiceVisit, '_id'>): Promise<string> {
  const client = await clientPromise;
  const db = client.db('test');
  const result = await db.collection('fleetVisits').insertOne(data);
  return result.insertedId.toString();
}

export async function updateFleetVisit(id: string, data: Partial<FleetServiceVisit>): Promise<boolean> {
  const client = await clientPromise;
  const db = client.db('test');
  const result = await db.collection('fleetVisits').updateOne(
    { _id: new ObjectId(id) },
    { $set: data }
  );
  return result.modifiedCount > 0;
}