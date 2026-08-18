import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

const TOTAL_FOUNDING_SPOTS = 50;

export async function GET() {
  try {
    const claimed = await db.organization.count({
      where: { legacySeatNumber: { not: null } },
    });

    return NextResponse.json(
      {
        total: TOTAL_FOUNDING_SPOTS,
        claimed: Math.min(claimed, TOTAL_FOUNDING_SPOTS),
        remaining: Math.max(TOTAL_FOUNDING_SPOTS - claimed, 0),
      },
      { headers: { 'Cache-Control': 'no-store, max-age=0' } },
    );
  } catch (error) {
    console.error('Unable to load founding spot count', error);
    return NextResponse.json({ error: 'Unable to load founding spot count.' }, { status: 503 });
  }
}
