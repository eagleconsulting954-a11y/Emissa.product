import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const firstName = String(body.firstName ?? '').trim();
    const email = String(body.email ?? '').trim().toLowerCase();
    const company = String(body.company ?? '').trim();

    if (!firstName || !company || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: 'Valid name, company, and email are required.' }, { status: 400 });
    }

    await db.$executeRaw`
      INSERT INTO "MarketingLead" ("id", "firstName", "email", "company", "source", "createdAt", "updatedAt")
      VALUES (${randomUUID()}, ${firstName}, ${email}, ${company}, 'lead-magnet-readiness-kit', NOW(), NOW())
      ON CONFLICT ("email") DO UPDATE SET "firstName"=${firstName}, "company"=${company}, "updatedAt"=NOW()
    `;

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unable to save lead.' }, { status: 500 });
  }
}
