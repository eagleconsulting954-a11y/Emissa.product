'use server';

import { randomUUID } from 'crypto';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';

const req=(f:FormData,k:string)=>{const v=String(f.get(k)??'').trim();if(!v)throw new Error(`${k} is required`);return v};
const opt=(f:FormData,k:string)=>{const v=String(f.get(k)??'').trim();return v||null};

export async function addCertificate(formData:FormData){
 const id=randomUUID();const org=req(formData,'organizationId');const name=req(formData,'name');const type=req(formData,'certificateType');const issuer=opt(formData,'issuer');const number=opt(formData,'certificateNumber');const expiration=opt(formData,'expirationDate');const owner=opt(formData,'ownerEmail');
 await db.$executeRaw`INSERT INTO "Certificate" ("id","organizationId","name","certificateType","issuer","certificateNumber","expirationDate","ownerEmail","updatedAt") VALUES (${id},${org},${name},${type},${issuer},${number},${expiration?new Date(expiration):null},${owner},NOW())`;
 revalidatePath('/expansion');
}

export async function addDeadline(formData:FormData){
 const id=randomUUID();const org=req(formData,'organizationId');const program=req(formData,'programName');const type=req(formData,'deadlineType');const due=new Date(req(formData,'dueDate'));const owner=opt(formData,'ownerEmail');const recurrence=opt(formData,'recurrenceRule');
 await db.$executeRaw`INSERT INTO "ComplianceDeadline" ("id","organizationId","programName","deadlineType","dueDate","recurrenceRule","ownerEmail","notificationChannels","updatedAt") VALUES (${id},${org},${program},${type},${due},${recurrence},${owner},ARRAY['email']::text[],NOW())`;
 revalidatePath('/expansion');
}

export async function addIntegration(formData:FormData){
 const id=randomUUID();const org=req(formData,'organizationId');const provider=req(formData,'provider');const category=req(formData,'category');const external=opt(formData,'externalAccountId');
 await db.$executeRaw`INSERT INTO "IntegrationConnection" ("id","organizationId","provider","category","externalAccountId","status","updatedAt") VALUES (${id},${org},${provider},${category},${external},'CONNECTING',NOW())`;
 revalidatePath('/expansion');
}

export async function addMarketplaceRequest(formData:FormData){
 const id=randomUUID();const org=req(formData,'organizationId');const service=req(formData,'serviceType');const region=opt(formData,'region');const date=opt(formData,'targetDate');const budget=Number(opt(formData,'budget')||0);const notes=opt(formData,'notes');
 await db.$executeRaw`INSERT INTO "MarketplaceRequest" ("id","organizationId","serviceType","region","targetDate","budget","notes","updatedAt") VALUES (${id},${org},${service},${region},${date?new Date(date):null},${budget},${notes},NOW())`;
 revalidatePath('/expansion');
}

export async function addDataRoom(formData:FormData){
 const id=randomUUID();const org=req(formData,'organizationId');const name=req(formData,'name');const purpose=req(formData,'purpose');const requester=opt(formData,'requesterName');const email=opt(formData,'requesterEmail');const expires=opt(formData,'expiresAt');
 await db.$executeRaw`INSERT INTO "DataRoom" ("id","organizationId","name","purpose","requesterName","requesterEmail","accessToken","expiresAt","updatedAt") VALUES (${id},${org},${name},${purpose},${requester},${email},${randomUUID()},${expires?new Date(expires):null},NOW())`;
 revalidatePath('/expansion');
}
