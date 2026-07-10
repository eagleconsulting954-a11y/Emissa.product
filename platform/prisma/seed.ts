import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function main() {
  const owner = await db.user.upsert({
    where: { email: 'admin@emissa.tech' },
    update: { name: 'Emissa Admin' },
    create: { email: 'admin@emissa.tech', name: 'Emissa Admin' },
  });

  const organization = await db.organization.upsert({
    where: { slug: 'emissa-demo' },
    update: {},
    create: {
      name: 'Emissa Demo Company',
      slug: 'emissa-demo',
      onboardingStatus: 'live',
      legacySeatNumber: 2,
      memberships: { create: { userId: owner.id, role: 'OWNER' } },
    },
  });

  const facility = await db.facility.upsert({
    where: { id: 'demo-miami-facility' },
    update: {},
    create: {
      id: 'demo-miami-facility', organizationId: organization.id, name: 'Miami Distribution Center',
      country: 'United States', region: 'Florida', latitude: 25.7617, longitude: -80.1918,
    },
  });

  await db.emissionRecord.deleteMany({ where: { organizationId: organization.id } });
  await db.emissionRecord.createMany({ data: [
    { organizationId: organization.id, facilityId: facility.id, scope: 1, category: 'Mobile combustion', source: 'Fleet fuel cards', activityValue: 420000, activityUnit: 'liters', emissionFactor: 2.68, co2eTonnes: 1125.6, periodStart: new Date('2026-01-01'), periodEnd: new Date('2026-03-31'), status: 'APPROVED' },
    { organizationId: organization.id, facilityId: facility.id, scope: 2, category: 'Purchased electricity', source: 'Utility invoices', activityValue: 5100000, activityUnit: 'kWh', emissionFactor: 0.42, co2eTonnes: 2142, periodStart: new Date('2026-01-01'), periodEnd: new Date('2026-03-31'), status: 'APPROVED' },
    { organizationId: organization.id, scope: 3, category: 'Purchased goods and services', source: 'ERP spend ledger', activityValue: 8550000, activityUnit: 'USD', emissionFactor: 0.00081, co2eTonnes: 6925.5, periodStart: new Date('2026-01-01'), periodEnd: new Date('2026-03-31'), status: 'IN_REVIEW' },
  ] });

  await db.obligation.deleteMany({ where: { organizationId: organization.id } });
  await db.obligation.createMany({ data: [
    { organizationId: organization.id, module: 'CORE', title: 'California SB 253 inventory review', authority: 'California Air Resources Board', dueDate: new Date('2026-07-28'), ownerEmail: 'sustainability@emissa.tech', status: 'IN_REVIEW' },
    { organizationId: organization.id, module: 'CBAM', title: 'CBAM shipment EU-8852', authority: 'European Commission', dueDate: new Date('2026-07-18'), ownerEmail: 'trade@emissa.tech', status: 'BLOCKED' },
    { organizationId: organization.id, module: 'EPR', title: 'California packaging material review', authority: 'CalRecycle', dueDate: new Date('2026-08-05'), ownerEmail: 'operations@emissa.tech', status: 'COMPLETE' },
  ] });

  console.log(`Seeded organization ${organization.slug} (${organization.id})`);
}

main().finally(() => db.$disconnect());
