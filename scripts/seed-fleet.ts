// scripts/seed-fleet.ts
// Run with: npx ts-node scripts/seed-fleet.ts
// Or paste into a one-off API route and hit it once

import clientPromise from '../lib/mongodb';

async function seed() {
  const client = await clientPromise;
  const db = client.db('test');

  // ── Clean existing test data ──────────────────────────────────────────────
  await db.collection('fleetAccounts').deleteMany({ companyName: 'Acme Plumbing Co.' });

  // ── Fleet Account ─────────────────────────────────────────────────────────
  const accountResult = await db.collection('fleetAccounts').insertOne({
    companyName:   'Acme Plumbing Co.',
    contactName:   'Marcus Johnson',
    contactEmail:  'marcus@acmeplumbing.com',
    accessCode:    'AcmePlumbing2025',
    contactPhone:  '(704) 555-0188',
    active:        true,
    notes:         '6-vehicle fleet. Contract signed Jan 2025. Monthly visits every first Monday.',
    createdAt:     '2025-01-06T09:00:00.000Z',
    createdBy:     'admin@cltmobile.com',
  });
  const accountId = accountResult.insertedId.toString();

  // ── Vehicles ──────────────────────────────────────────────────────────────
  const vehicles = await db.collection('fleetVehicles').insertMany([
    {
      fleetAccountId: accountId,
      year: '2021', make: 'Ford', model: 'Transit',
      nickname: 'Van #1',
      licensePlate: 'CLT-1021',
      color: 'White',
      vin: '1FTYE1ZM5MKA12345',
      photoUrl: 'https://res.cloudinary.com/dfssbwswv/image/upload/v1773964077/logzb1qg6hessxxbxudw.jpg',
      active: true,
      addedAt: '2025-01-06T09:00:00.000Z',
      addedBy: 'admin@cltmobile.com',
    },
    {
      fleetAccountId: accountId,
      year: '2020', make: 'Ram', model: '1500',
      nickname: 'Truck #1',
      licensePlate: 'CLT-2020',
      color: 'Black',
      vin: '1C6RR7LT0LS123456',
      photoUrl: 'https://res.cloudinary.com/dfssbwswv/image/upload/v1773964077/logzb1qg6hessxxbxudw.jpg',
      active: true,
      addedAt: '2025-01-06T09:00:00.000Z',
      addedBy: 'admin@cltmobile.com',
    },
    {
      fleetAccountId: accountId,
      year: '2022', make: 'Honda', model: 'CR-V',
      nickname: "Manager's SUV",
      licensePlate: 'CLT-3022',
      color: 'Silver',
      vin: '5J6RW2H8XNA012345',
      photoUrl: 'https://res.cloudinary.com/dfssbwswv/image/upload/v1773964077/logzb1qg6hessxxbxudw.jpg',
      active: true,
      addedAt: '2025-01-06T09:00:00.000Z',
      addedBy: 'admin@cltmobile.com',
    },
  ]);

  const [van1Id, truck1Id, suvId] = Object.values(vehicles.insertedIds).map(id => id.toString());

  // ── Visits & Reports ──────────────────────────────────────────────────────
  await db.collection('fleetVisits').insertMany([

    // ── Van #1 — 3 completed visits ────────────────────────────────────────
    {
      fleetAccountId: accountId,
      vehicleId: van1Id,
      scheduledDate: '2025-02-03',
      status: 'completed',
      completedAt: '2025-02-03T11:30:00.000Z',
      mechanicAssigned: 'Spencer Huneycutt - Charlotte',
      report: {
        workPerformed: 'Full inspection completed. Oil and filter changed (5W-30 full synthetic, 5 quarts). Air filter replaced — was heavily clogged. Topped off windshield washer fluid. Checked all tire pressures and adjusted to spec.',
        partsReplaced: 'Oil filter (Mobil 1 M1-110A), Engine air filter (FRAM CA10755), 5qt Mobil 1 5W-30 synthetic',
        coolantStatus: 'healthy',
        brakeFluidStatus: 'healthy',
        frontBrakesLife: '8',
        rearBrakesLife: '9',
        batteryVoltage: '12.7',
        tireTread: 'healthy',
        oilChanged: true,
        mileageAtService: '48200',
        additionalConcerns: '',
        recommendedNextService: 'All systems healthy. Next oil change due at approx 53,200 miles.',
        photos: [
          'https://www.cltmobile.com/Enginebayphoto.jpeg',
          'https://www.cltmobile.com/mustangbrakes.jpeg',
          'https://www.cltmobile.com/coolantchange.jpeg',
        ],
        photoCaptions: ['Engine bay overview', 'Front brake pad check — 8mm remaining', 'Coolant reservoir — full and healthy'],
        submittedBy: 'Spencer Huneycutt - Charlotte',
      },
    },
    {
      fleetAccountId: accountId,
      vehicleId: van1Id,
      scheduledDate: '2025-03-03',
      status: 'completed',
      completedAt: '2025-03-03T10:45:00.000Z',
      mechanicAssigned: 'Spencer Huneycutt - Charlotte',
      report: {
        workPerformed: 'Monthly inspection. No oil change due this visit (last changed 2/3). Topped off power steering fluid — was slightly low. Checked brake pads, battery, all fluids. Adjusted tire pressures.',
        partsReplaced: '',
        coolantStatus: 'healthy',
        brakeFluidStatus: 'healthy',
        frontBrakesLife: '7',
        rearBrakesLife: '8',
        batteryVoltage: '12.6',
        tireTread: 'healthy',
        oilChanged: false,
        mileageAtService: '50100',
        additionalConcerns: 'Front left tire showing slightly uneven wear on inner edge — recommend alignment check within next 2 visits.',
        recommendedNextService: 'Oil change due next visit. Alignment check recommended.',
        photos: [
          'https://www.cltmobile.com/Enginebayphoto.jpeg',
          'https://www.cltmobile.com/batteryreplacementimg.jpeg',
        ],
        photoCaptions: ['Engine bay — all fluid levels checked', 'Battery reading 12.6V — healthy'],
        submittedBy: 'Spencer Huneycutt - Charlotte',
      },
    },
    {
      fleetAccountId: accountId,
      vehicleId: van1Id,
      scheduledDate: '2025-04-07',
      status: 'completed',
      completedAt: '2025-04-07T09:30:00.000Z',
      mechanicAssigned: 'Spencer Huneycutt - Charlotte',
      report: {
        workPerformed: 'Oil and filter changed (5W-30 full synthetic). Four-wheel alignment performed — front left was 0.4° off spec, corrected. Brake pads inspected. All tire pressures set to spec.',
        partsReplaced: 'Oil filter (Mobil 1 M1-110A), 5qt Mobil 1 5W-30 synthetic',
        coolantStatus: 'healthy',
        brakeFluidStatus: 'dark-low',
        frontBrakesLife: '7',
        rearBrakesLife: '7',
        batteryVoltage: '12.5',
        tireTread: 'healthy',
        oilChanged: true,
        mileageAtService: '52400',
        additionalConcerns: 'Brake fluid is dark — recommend flush next visit. Battery reading slightly lower than previous months, worth monitoring.',
        recommendedNextService: 'Brake fluid flush due next visit. Battery trending down — may need replacement within 2-3 months.',
        photos: [
          'https://www.cltmobile.com/Enginebayphoto.jpeg',
          'https://www.cltmobile.com/mustangbrakes.jpeg',
          'https://www.cltmobile.com/coolantchange.jpeg',
          'https://www.cltmobile.com/smilinglandrover.jpeg',
        ],
        photoCaptions: ['Engine bay post-service', 'Front brake pads — 7mm remaining', 'Brake fluid — dark, flush recommended', 'Alignment correction — front left adjusted'],
        submittedBy: 'Spencer Huneycutt - Charlotte',
      },
    },
    {
      fleetAccountId: accountId,
      vehicleId: van1Id,
      scheduledDate: '2025-05-05',
      status: 'scheduled',
      mechanicAssigned: 'Spencer Huneycutt - Charlotte',
    },

    // ── Truck #1 — 2 completed visits ─────────────────────────────────────
    {
      fleetAccountId: accountId,
      vehicleId: truck1Id,
      scheduledDate: '2025-02-03',
      status: 'completed',
      completedAt: '2025-02-03T13:00:00.000Z',
      mechanicAssigned: 'Spencer Huneycutt - Charlotte',
      report: {
        workPerformed: 'Full inspection. Oil and filter changed (0W-20 full synthetic, 6 quarts). Cabin air filter replaced — very dirty. All fluids topped off and checked. Tire pressures adjusted.',
        partsReplaced: 'Oil filter, 6qt Mobil 1 0W-20, Cabin air filter (FRAM CF10285)',
        coolantStatus: 'healthy',
        brakeFluidStatus: 'healthy',
        frontBrakesLife: '6',
        rearBrakesLife: '7',
        batteryVoltage: '12.8',
        tireTread: 'fair',
        oilChanged: true,
        mileageAtService: '61500',
        additionalConcerns: 'Tire tread measuring fair — approximately 4/32" across all four. Not urgent but budget for replacement within 6 months.',
        recommendedNextService: 'Tires approaching end of life — plan replacement within 6 months. All other systems healthy.',
        photos: [
          'https://www.cltmobile.com/Enginebayphoto.jpeg',
          'https://www.cltmobile.com/mustangbrakes.jpeg',
        ],
        photoCaptions: ['Engine bay — post oil change', 'Front brakes — 6mm remaining, healthy'],
        submittedBy: 'Spencer Huneycutt - Charlotte',
      },
    },
    {
      fleetAccountId: accountId,
      vehicleId: truck1Id,
      scheduledDate: '2025-03-03',
      status: 'completed',
      completedAt: '2025-03-03T12:30:00.000Z',
      mechanicAssigned: 'Spencer Huneycutt - Charlotte',
      report: {
        workPerformed: 'Monthly inspection. Replaced all four tires — tread was at wear indicators. Performed oil change (0W-20, 6qt). Checked all fluids and brakes.',
        partsReplaced: 'x4 Michelin Defender2 LT 265/70R17, Oil filter, 6qt Mobil 1 0W-20',
        coolantStatus: 'healthy',
        brakeFluidStatus: 'healthy',
        frontBrakesLife: '6',
        rearBrakesLife: '6',
        batteryVoltage: '12.8',
        tireTread: 'healthy',
        oilChanged: true,
        mileageAtService: '63200',
        additionalConcerns: '',
        recommendedNextService: 'New tires installed — all systems healthy. Next oil change due approx 68,200 miles.',
        photos: [
          'https://www.cltmobile.com/Enginebayphoto.jpeg',
          'https://www.cltmobile.com/cadillacPPI.jpeg',
          'https://www.cltmobile.com/mustangbrakes.jpeg',
        ],
        photoCaptions: ['Engine bay overview', 'New Michelin Defender2 installed — all four corners', 'Brake pads post-tire install — 6mm remaining'],
        submittedBy: 'Spencer Huneycutt - Charlotte',
      },
    },
    {
      fleetAccountId: accountId,
      vehicleId: truck1Id,
      scheduledDate: '2025-05-05',
      status: 'scheduled',
      mechanicAssigned: 'Spencer Huneycutt - Charlotte',
    },

    // ── Manager's SUV — 1 completed, 1 upcoming ────────────────────────────
    {
      fleetAccountId: accountId,
      vehicleId: suvId,
      scheduledDate: '2025-03-03',
      status: 'completed',
      completedAt: '2025-03-03T14:00:00.000Z',
      mechanicAssigned: 'Spencer Huneycutt - Charlotte',
      report: {
        workPerformed: 'Full inspection. Oil and filter changed (0W-20 full synthetic, 4.4 quarts). Brake fluid flushed — was dark. All other fluids healthy. Tires rotated front to rear.',
        partsReplaced: 'Oil filter, 4.4qt Honda Genuine 0W-20, Brake fluid (DOT 3)',
        coolantStatus: 'healthy',
        brakeFluidStatus: 'healthy',
        frontBrakesLife: '9',
        rearBrakesLife: '9',
        batteryVoltage: '12.7',
        tireTread: 'healthy',
        oilChanged: true,
        mileageAtService: '28400',
        additionalConcerns: '',
        recommendedNextService: 'All systems in excellent condition. Next oil change due approx 33,400 miles.',
        photos: [
          'https://www.cltmobile.com/Enginebayphoto.jpeg',
          'https://www.cltmobile.com/coolantchange.jpeg',
          'https://www.cltmobile.com/batteryreplacementimg.jpeg',
        ],
        photoCaptions: ['Engine bay — clean and healthy', 'Coolant reservoir — full', 'Battery — 12.7V, excellent'],
        submittedBy: 'Spencer Huneycutt - Charlotte',
      },
    },
    {
      fleetAccountId: accountId,
      vehicleId: suvId,
      scheduledDate: '2025-05-05',
      status: 'scheduled',
      mechanicAssigned: 'Spencer Huneycutt - Charlotte',
    },
  ]);

  console.log('✅ Fleet seed complete');
  console.log(`   Account ID: ${accountId}`);
  console.log('   Login: marcus@acmeplumbing.com / AcmePlumbing2025');
  console.log('   3 vehicles, 8 visits (6 completed, 2 upcoming)');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});