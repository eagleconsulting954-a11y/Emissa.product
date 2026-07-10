import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/lib/db';
import { checkoutSchema } from '@/lib/validation';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '');

export async function POST(request: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_PRICE_ID) {
    return NextResponse.json({ error: 'Stripe is not configured.' }, { status: 503 });
  }

  try {
    const payload = checkoutSchema.parse(await request.json());
    const organization = await db.organization.findUnique({ where: { id: payload.organizationId } });
    if (!organization) return NextResponse.json({ error: 'Organization not found.' }, { status: 404 });

    let customerId = organization.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: payload.customerEmail,
        name: organization.name,
        metadata: { organizationId: organization.id },
      });
      customerId = customer.id;
      await db.organization.update({ where: { id: organization.id }, data: { stripeCustomerId: customerId } });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: customerId,
      line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
      success_url: `${process.env.APP_URL}/dashboard?checkout=success`,
      cancel_url: `${process.env.APP_URL}/billing?checkout=cancelled`,
      allow_promotion_codes: false,
      subscription_data: {
        metadata: { organizationId: organization.id, program: 'founding-customer' },
      },
      metadata: { organizationId: organization.id },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unable to create checkout session.' }, { status: 400 });
  }
}
