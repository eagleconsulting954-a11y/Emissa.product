import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/lib/db';
import { writeAuditEvent } from '@/lib/audit';

const TOTAL_FOUNDING_SPOTS = 50;

export async function POST(request: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secretKey || !webhookSecret) {
    return NextResponse.json({ error: 'Stripe webhook is not configured.' }, { status: 503 });
  }

  const signature = request.headers.get('stripe-signature');
  if (!signature) return NextResponse.json({ error: 'Missing Stripe signature.' }, { status: 400 });

  const stripe = new Stripe(secretKey);

  try {
    const body = await request.text();
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const organizationId = session.metadata?.organizationId;
      if (organizationId && typeof session.subscription === 'string') {
        const result = await db.$transaction(async (tx) => {
          // Serialize founding-seat claims so simultaneous Stripe webhooks cannot receive the same seat.
          await tx.$executeRaw`SELECT pg_advisory_xact_lock(502026)`;

          const organization = await tx.organization.findUnique({ where: { id: organizationId } });
          if (!organization) throw new Error('Organization not found for Stripe checkout.');

          if (organization.legacySeatNumber) {
            await tx.organization.update({
              where: { id: organizationId },
              data: { stripeSubscription: session.subscription, onboardingStatus: 'payment_complete' },
            });
            return { seatNumber: organization.legacySeatNumber, alreadyClaimed: true };
          }

          const claimedCount = await tx.organization.count({ where: { legacySeatNumber: { not: null } } });
          const seatNumber = claimedCount < TOTAL_FOUNDING_SPOTS ? claimedCount + 1 : null;

          await tx.organization.update({
            where: { id: organizationId },
            data: {
              stripeSubscription: session.subscription,
              onboardingStatus: seatNumber ? 'payment_complete' : 'payment_complete_standard',
              legacySeatNumber: seatNumber,
            },
          });

          return { seatNumber, alreadyClaimed: false };
        });

        await writeAuditEvent({
          organizationId,
          action: result.seatNumber ? 'billing.founding_subscription_started' : 'billing.standard_subscription_started',
          entityType: 'Organization',
          entityId: organizationId,
          metadata: { subscriptionId: session.subscription, legacySeatNumber: result.seatNumber },
        });
      }
    }

    if (event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object;
      const organizationId = subscription.metadata.organizationId;
      if (organizationId) {
        // A founding seat remains historically claimed after cancellation; it is not put back into the first-50 pool.
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
