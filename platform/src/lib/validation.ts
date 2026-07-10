import { z } from 'zod';

export const organizationSchema = z.object({
  name: z.string().min(2).max(120),
  slug: z.string().min(2).max(80).regex(/^[a-z0-9-]+$/),
  ownerEmail: z.string().email(),
  ownerName: z.string().min(2).max(120).optional(),
});

export const emissionRecordSchema = z.object({
  organizationId: z.string().min(1),
  facilityId: z.string().optional().nullable(),
  scope: z.coerce.number().int().min(1).max(3),
  category: z.string().min(2).max(160),
  source: z.string().min(2).max(160),
  activityValue: z.coerce.number().nonnegative(),
  activityUnit: z.string().min(1).max(40),
  emissionFactor: z.coerce.number().nonnegative(),
  factorSource: z.string().max(200).optional().nullable(),
  periodStart: z.coerce.date(),
  periodEnd: z.coerce.date(),
});

export const checkoutSchema = z.object({
  organizationId: z.string().min(1),
  customerEmail: z.string().email(),
});
