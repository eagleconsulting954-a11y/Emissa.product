import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST() {
  try {
    const demo = await db.organization.findUnique({ where: { slug: 'emissa-demo' }, select: { id: true } });
    if (!demo) return NextResponse.json({ ok: true, deleted: false });

    await db.organization.delete({ where: { id: demo.id } });
    return NextResponse.json({ ok: true, deleted: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, error: 'Unable to remove demo data.' }, { status: 500 });
  }
}
