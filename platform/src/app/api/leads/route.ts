import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const firstName = String(body.firstName ?? '').trim();
    const email = String(body.email ?? '').trim().toLowerCase();
    const company = String(body.company ?? '').trim();
    const source = String(body.source ?? 'lead-magnet-readiness-kit').trim().slice(0, 180);
    const resource = String(body.resource ?? '').trim().slice(0, 180);
    const leadSource = resource ? `${source}:${resource}` : source;

    if (!firstName || !company || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: 'Valid name, company, and email are required.' }, { status: 400 });
    }

    await db.$executeRaw`
      INSERT INTO "MarketingLead" ("id", "firstName", "email", "company", "source", "createdAt", "updatedAt")
      VALUES (${randomUUID()}, ${firstName}, ${email}, ${company}, ${leadSource}, NOW(), NOW())
      ON CONFLICT ("email") DO UPDATE SET "firstName"=${firstName}, "company"=${company}, "source"=${leadSource}, "updatedAt"=NOW()
    `;

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unable to save lead.' }, { status: 500 });
  }
}
