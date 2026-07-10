'use server';

import { randomUUID } from 'crypto';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';

function required(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? '').trim();
  if (!value) throw new Error(`${key} is required.`);
  return value;
}

function optional(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? '').trim();
  return value || null;
}

export async function createCrmAccount(formData: FormData) {
  const id = randomUUID();
  const organizationId = required(formData, 'organizationId');
  const name = required(formData, 'name');
  const domain = optional(formData, 'domain');
  const industry = optional(formData, 'industry');
  const source = optional(formData, 'source');
  const status = required(formData, 'status');

  await db.$executeRaw`
    INSERT INTO "CrmAccount" ("id", "organizationId", "name", "domain", "industry", "status", "source", "updatedAt")
    VALUES (${id}, ${organizationId}, ${name}, ${domain}, ${industry}, ${status}::"CrmAccountStatus", ${source}, NOW())
  `;
  revalidatePath('/admin');
}

export async function createCrmContact(formData: FormData) {
  const id = randomUUID();
  const organizationId = required(formData, 'organizationId');
  const accountId = optional(formData, 'accountId');
  const firstName = required(formData, 'firstName');
  const lastName = required(formData, 'lastName');
  const email = optional(formData, 'email');
  const phone = optional(formData, 'phone');
  const jobTitle = optional(formData, 'jobTitle');

  await db.$executeRaw`
    INSERT INTO "CrmContact" ("id", "organizationId", "accountId", "firstName", "lastName", "email", "phone", "jobTitle", "updatedAt")
    VALUES (${id}, ${organizationId}, ${accountId}, ${firstName}, ${lastName}, ${email}, ${phone}, ${jobTitle}, NOW())
  `;
  revalidatePath('/admin');
}

export async function createCrmDeal(formData: FormData) {
  const id = randomUUID();
  const organizationId = required(formData, 'organizationId');
  const accountId = required(formData, 'accountId');
  const name = required(formData, 'name');
  const stage = required(formData, 'stage');
  const amount = Number(required(formData, 'amount'));
  const probability = Number(required(formData, 'probability'));
  const closeDate = optional(formData, 'expectedCloseDate');

  if (!Number.isFinite(amount) || amount < 0) throw new Error('Deal amount must be valid.');
  if (!Number.isInteger(probability) || probability < 0 || probability > 100) throw new Error('Probability must be from 0 to 100.');

  await db.$executeRaw`
    INSERT INTO "CrmDeal" ("id", "organizationId", "accountId", "name", "stage", "amount", "probability", "expectedCloseDate", "updatedAt")
    VALUES (${id}, ${organizationId}, ${accountId}, ${name}, ${stage}::"CrmDealStage", ${amount}, ${probability}, ${closeDate ? new Date(closeDate) : null}, NOW())
  `;
  revalidatePath('/admin');
}

export async function createCrmActivity(formData: FormData) {
  const id = randomUUID();
  const organizationId = required(formData, 'organizationId');
  const accountId = optional(formData, 'accountId');
  const contactId = optional(formData, 'contactId');
  const dealId = optional(formData, 'dealId');
  const type = required(formData, 'type');
  const subject = required(formData, 'subject');
  const body = optional(formData, 'body');
  const dueAt = optional(formData, 'dueAt');

  await db.$executeRaw`
    INSERT INTO "CrmActivity" ("id", "organizationId", "accountId", "contactId", "dealId", "type", "subject", "body", "dueAt")
    VALUES (${id}, ${organizationId}, ${accountId}, ${contactId}, ${dealId}, ${type}::"CrmActivityType", ${subject}, ${body}, ${dueAt ? new Date(dueAt) : null})
  `;
  revalidatePath('/admin');
}

export async function updateDealStage(formData: FormData) {
  const dealId = required(formData, 'dealId');
  const stage = required(formData, 'stage');
  await db.$executeRaw`UPDATE "CrmDeal" SET "stage"=${stage}::"CrmDealStage", "updatedAt"=NOW() WHERE "id"=${dealId}`;
  revalidatePath('/admin');
}

export async function completeActivity(formData: FormData) {
  const activityId = required(formData, 'activityId');
  await db.$executeRaw`UPDATE "CrmActivity" SET "completedAt"=NOW() WHERE "id"=${activityId}`;
  revalidatePath('/admin');
}
