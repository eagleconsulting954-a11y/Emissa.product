import { NextResponse } from 'next/server';
import { connectorReadiness } from '@/lib/connectors/registry';

export const dynamic = 'force-dynamic';

export async function GET() {
  const connectors = connectorReadiness();
  return NextResponse.json({
    total: connectors.length,
    configured: connectors.filter((item) => item.configured).length,
    connectors,
  });
}
