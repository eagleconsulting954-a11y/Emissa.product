import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/lib/db';
import { checkoutSchema } from '@/lib/validation';

export async function POST(request: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const priceId = process.env.STRIPE_PRICE_ID;
  if (!secretKey || !priceId) {
    return NextResponse.json({ error: 'Stripe is not configured.' }, { status: 503 });
  }

  const stripe = new Stripe(secretKey);

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

    const baseUrl = process.env.APP_URL || 'https://emissa.tech';
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${baseUrl}/dashboard?checkout=success`,
      cancel_url: `${baseUrl}/pricing?checkout=cancelled`,
      allow_promotion_codes: false,
      subscription_data: { metadata: { organizationId: organization.id, program: 'founding-customer' } },
      metadata: { organizationId: organization.id },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unable to create checkout session.' }, { status: 400 });
  }
}
