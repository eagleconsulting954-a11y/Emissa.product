import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/lib/db';
import { writeAuditEvent } from '@/lib/audit';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '');

export async function POST(request: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Stripe webhook is not configured.' }, { status: 503 });
  }

  const signature = request.headers.get('stripe-signature');
  if (!signature) return NextResponse.json({ error: 'Missing Stripe signature.' }, { status: 400 });

  try {
    const body = await request.text();
    const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const organizationId = session.metadata?.organizationId;
      if (organizationId && typeof session.subscription === 'string') {
        const claimedCount = await db.organization.count({ where: { legacySeatNumber: { not: null } } });
        const seatNumber = Math.min(claimedCount + 1, 50);
        await db.organization.update({
          where: { id: organizationId },
          data: {
            stripeSubscription: session.subscription,
            onboardingStatus: 'payment_complete',
            legacySeatNumber: seatNumber,
          },
        });
        await writeAuditEvent({
          organizationId,
          action: 'billing.subscription_started',
          entityType: 'Organization',
          entityId: organizationId,
          metadata: { subscriptionId: session.subscription, legacySeatNumber: seatNumber },
        });
      }
    }

    if (event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object;
      const organizationId = subscription.metadata.organizationId;
      if (organizationId) {
        await db.organization.update({
          where: { id: organizationId },
          data: { stripeSubscription: null, onboardingStatus: 'subscription_cancelled' },
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Invalid webhook.' }, { status: 400 });
  }
}
