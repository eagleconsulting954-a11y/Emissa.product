CREATE TYPE "CrmAccountStatus" AS ENUM ('LEAD', 'PROSPECT', 'CUSTOMER', 'CHURNED', 'PARTNER');
CREATE TYPE "CrmDealStage" AS ENUM ('QUALIFICATION', 'DISCOVERY', 'PROPOSAL', 'NEGOTIATION', 'CLOSED_WON', 'CLOSED_LOST');
CREATE TYPE "CrmActivityType" AS ENUM ('NOTE', 'CALL', 'EMAIL', 'MEETING', 'TASK');

CREATE TABLE "CrmAccount" (
  "id" TEXT NOT NULL,
  "organizationId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "domain" TEXT,
  "industry" TEXT,
  "employeeCount" INTEGER,
  "annualRevenue" DECIMAL(18,2),
  "status" "CrmAccountStatus" NOT NULL DEFAULT 'LEAD',
  "ownerUserId" TEXT,
  "source" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "CrmAccount_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "CrmContact" (
  "id" TEXT NOT NULL,
  "organizationId" TEXT NOT NULL,
  "accountId" TEXT,
  "firstName" TEXT NOT NULL,
  "lastName" TEXT NOT NULL,
  "email" TEXT,
  "phone" TEXT,
  "jobTitle" TEXT,
  "isPrimary" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "CrmContact_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "CrmDeal" (
  "id" TEXT NOT NULL,
  "organizationId" TEXT NOT NULL,
  "accountId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "stage" "CrmDealStage" NOT NULL DEFAULT 'QUALIFICATION',
  "amount" DECIMAL(18,2) NOT NULL DEFAULT 0,
  "probability" INTEGER NOT NULL DEFAULT 10,
  "expectedCloseDate" TIMESTAMP(3),
  "ownerUserId" TEXT,
  "lostReason" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "CrmDeal_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "CrmActivity" (
  "id" TEXT NOT NULL,
  "organizationId" TEXT NOT NULL,
  "accountId" TEXT,
  "contactId" TEXT,
  "dealId" TEXT,
  "actorUserId" TEXT,
  "type" "CrmActivityType" NOT NULL,
  "subject" TEXT NOT NULL,
  "body" TEXT,
  "dueAt" TIMESTAMP(3),
  "completedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "CrmActivity_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "CrmAccount_organizationId_domain_key" ON "CrmAccount"("organizationId", "domain");
CREATE UNIQUE INDEX "CrmContact_organizationId_email_key" ON "CrmContact"("organizationId", "email");
CREATE INDEX "CrmAccount_organizationId_status_idx" ON "CrmAccount"("organizationId", "status");
CREATE INDEX "CrmContact_organizationId_accountId_idx" ON "CrmContact"("organizationId", "accountId");
CREATE INDEX "CrmDeal_organizationId_stage_idx" ON "CrmDeal"("organizationId", "stage");
CREATE INDEX "CrmDeal_expectedCloseDate_idx" ON "CrmDeal"("expectedCloseDate");
CREATE INDEX "CrmActivity_organizationId_createdAt_idx" ON "CrmActivity"("organizationId", "createdAt");
CREATE INDEX "CrmActivity_dueAt_completedAt_idx" ON "CrmActivity"("dueAt", "completedAt");

ALTER TABLE "CrmAccount" ADD CONSTRAINT "CrmAccount_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CrmAccount" ADD CONSTRAINT "CrmAccount_ownerUserId_fkey" FOREIGN KEY ("ownerUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "CrmContact" ADD CONSTRAINT "CrmContact_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CrmContact" ADD CONSTRAINT "CrmContact_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "CrmAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "CrmDeal" ADD CONSTRAINT "CrmDeal_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CrmDeal" ADD CONSTRAINT "CrmDeal_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "CrmAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CrmDeal" ADD CONSTRAINT "CrmDeal_ownerUserId_fkey" FOREIGN KEY ("ownerUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "CrmActivity" ADD CONSTRAINT "CrmActivity_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CrmActivity" ADD CONSTRAINT "CrmActivity_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "CrmAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "CrmActivity" ADD CONSTRAINT "CrmActivity_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "CrmContact"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "CrmActivity" ADD CONSTRAINT "CrmActivity_dealId_fkey" FOREIGN KEY ("dealId") REFERENCES "CrmDeal"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "CrmActivity" ADD CONSTRAINT "CrmActivity_actorUserId_fkey" FOREIGN KEY ("actorUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
