import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { emissionRecordSchema } from '@/lib/validation';
import { requireOrganizationRole } from '@/lib/tenant';
import { writeAuditEvent } from '@/lib/audit';

function requestUserId(request: NextRequest) {
  return request.headers.get('x-emissa-user-id');
}

export async function GET(request: NextRequest) {
  const organizationId = request.nextUrl.searchParams.get('organizationId');
  const userId = requestUserId(request);
  if (!organizationId || !userId) {
    return NextResponse.json({ error: 'Missing organization or user context.' }, { status: 400 });
  }

  try {
    await requireOrganizationRole(userId, organizationId, ['OWNER', 'ADMIN', 'MANAGER', 'ANALYST', 'AUDITOR', 'VIEWER']);
    const records = await db.emissionRecord.findMany({
      where: { organizationId },
      include: { facility: true, evidence: true },
      orderBy: { periodStart: 'desc' },
    });
    return NextResponse.json({ records });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Access denied.' }, { status: 403 });
  }
}

export async function POST(request: NextRequest) {
  const userId = requestUserId(request);
  if (!userId) return NextResponse.json({ error: 'Missing user context.' }, { status: 401 });

  try {
    const payload = emissionRecordSchema.parse(await request.json());
    await requireOrganizationRole(userId, payload.organizationId, ['OWNER', 'ADMIN', 'MANAGER', 'ANALYST']);
    const co2eTonnes = (payload.activityValue * payload.emissionFactor) / 1000;

    const record = await db.emissionRecord.create({
      data: {
        ...payload,
        facilityId: payload.facilityId || null,
        factorSource: payload.factorSource || null,
        co2eTonnes,
        status: 'PENDING',
      },
    });

    await writeAuditEvent({
      organizationId: payload.organizationId,
      actorUserId: userId,
      action: 'emission_record.created',
      entityType: 'EmissionRecord',
      entityId: record.id,
      metadata: { scope: record.scope, category: record.category, co2eTonnes },
    });

    return NextResponse.json({ record }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to create record.' }, { status: 400 });
  }
}
