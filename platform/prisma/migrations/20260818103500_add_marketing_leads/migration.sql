CREATE TABLE "MarketingLead" (
  "id" TEXT NOT NULL,
  "firstName" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "company" TEXT NOT NULL,
  "source" TEXT NOT NULL DEFAULT 'website',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "MarketingLead_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "MarketingLead_email_key" ON "MarketingLead"("email");
CREATE INDEX "MarketingLead_createdAt_idx" ON "MarketingLead"("createdAt");
CREATE INDEX "MarketingLead_source_idx" ON "MarketingLead"("source");
