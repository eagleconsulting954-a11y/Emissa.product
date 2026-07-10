import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireMembership } from '@/lib/tenant';

export async function GET(request: NextRequest) {
  const organizationId = request.nextUrl.searchParams.get('organizationId');
  const userId = request.headers.get('x-emissa-user-id');
  if (!organizationId || !userId) return NextResponse.json({ error: 'Missing context.' }, { status: 400 });

  try {
    await requireMembership(userId, organizationId);
    const [emissions, obligations, suppliers, cbam, epr, risks, products] = await Promise.all([
      db.emissionRecord.aggregate({ where: { organizationId }, _sum: { co2eTonnes: true }, _count: true }),
      db.obligation.findMany({ where: { organizationId }, orderBy: [{ dueDate: 'asc' }], take: 10 }),
      db.supplier.count({ where: { organizationId } }),
      db.cbamShipment.count({ where: { organizationId } }),
      db.eprRecord.aggregate({ where: { organizationId }, _sum: { estimatedFee: true }, _count: true }),
      db.climateRisk.aggregate({ where: { organizationId }, _avg: { riskScore: true }, _count: true }),
      db.lcaProduct.count({ where: { organizationId } }),
    ]);

    const openObligations = obligations.filter((item) => !['COMPLETE', 'ARCHIVED'].includes(item.status)).length;
    return NextResponse.json({
      metrics: {
        totalCo2eTonnes: emissions._sum.co2eTonnes ?? 0,
        emissionRecordCount: emissions._count,
        openObligations,
        supplierCount: suppliers,
        cbamShipmentCount: cbam,
        estimatedEprFees: epr._sum.estimatedFee ?? 0,
        climateRiskScore: risks._avg.riskScore ?? 0,
        lcaProductCount: products,
      },
      obligations,
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Access denied.' }, { status: 403 });
  }
}
