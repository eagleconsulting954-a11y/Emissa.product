import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { organizationSchema } from '@/lib/validation';
import { writeAuditEvent } from '@/lib/audit';

export async function POST(request: NextRequest) {
  try {
    const payload = organizationSchema.parse(await request.json());
    const existing = await db.organization.findUnique({ where: { slug: payload.slug } });
    if (existing) {
      return NextResponse.json({ error: 'Organization slug is already in use.' }, { status: 409 });
    }

    const organization = await db.$transaction(async (tx) => {
      const user = await tx.user.upsert({
        where: { email: payload.ownerEmail },
        update: { name: payload.ownerName },
        create: { email: payload.ownerEmail, name: payload.ownerName },
      });

      const organization = await tx.organization.create({
        data: {
          name: payload.name,
          slug: payload.slug,
          onboardingStatus: 'company_profile',
          memberships: { create: { userId: user.id, role: 'OWNER' } },
        },
      });

      return { organization, user };
    });

    await writeAuditEvent({
      organizationId: organization.organization.id,
      actorUserId: organization.user.id,
      action: 'organization.created',
      entityType: 'Organization',
      entityId: organization.organization.id,
    });

    return NextResponse.json({ organization: organization.organization }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unable to create organization.' }, { status: 400 });
  }
}
