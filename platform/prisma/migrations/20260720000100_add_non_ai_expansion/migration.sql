CREATE TYPE "IntegrationStatus" AS ENUM ('DISCONNECTED','CONNECTING','CONNECTED','ERROR');
CREATE TYPE "CertificateStatus" AS ENUM ('ACTIVE','EXPIRING','EXPIRED','REVOKED');
CREATE TYPE "MarketplaceRequestStatus" AS ENUM ('OPEN','MATCHED','BOOKED','COMPLETE','CANCELLED');
CREATE TYPE "DataRoomStatus" AS ENUM ('DRAFT','READY','SHARED','ARCHIVED');

CREATE TABLE "IntegrationConnection" (
  "id" TEXT NOT NULL,
  "organizationId" TEXT NOT NULL,
  "provider" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "externalAccountId" TEXT,
  "status" "IntegrationStatus" NOT NULL DEFAULT 'DISCONNECTED',
  "lastSyncAt" TIMESTAMP(3),
  "nextSyncAt" TIMESTAMP(3),
  "errorMessage" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "IntegrationConnection_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "FacilityHierarchy" (
  "id" TEXT NOT NULL,
  "organizationId" TEXT NOT NULL,
  "parentFacilityId" TEXT,
  "childFacilityId" TEXT NOT NULL,
  "consolidationMethod" TEXT NOT NULL,
  "ownershipPercentage" DECIMAL(5,2),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "FacilityHierarchy_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "IncentiveProgram" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "jurisdiction" TEXT NOT NULL,
  "programType" TEXT NOT NULL,
  "naicsCodes" TEXT[],
  "minRevenue" DECIMAL(18,2),
  "maxRevenue" DECIMAL(18,2),
  "awardMin" DECIMAL(18,2),
  "awardMax" DECIMAL(18,2),
  "deadline" TIMESTAMP(3),
  "eligibilityRules" JSONB NOT NULL,
  "sourceUrl" TEXT,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "IncentiveProgram_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "IncentiveMatch" (
  "id" TEXT NOT NULL,
  "organizationId" TEXT NOT NULL,
  "programId" TEXT NOT NULL,
  "eligible" BOOLEAN NOT NULL,
  "matchReasons" JSONB NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'new',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "IncentiveMatch_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Certificate" (
  "id" TEXT NOT NULL,
  "organizationId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "certificateType" TEXT NOT NULL,
  "issuer" TEXT,
  "certificateNumber" TEXT,
  "issueDate" TIMESTAMP(3),
  "expirationDate" TIMESTAMP(3),
  "status" "CertificateStatus" NOT NULL DEFAULT 'ACTIVE',
  "fileUrl" TEXT,
  "ownerEmail" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "MarketplaceProvider" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "serviceTypes" TEXT[],
  "regions" TEXT[],
  "certifications" TEXT[],
  "priceBand" TEXT,
  "contactEmail" TEXT,
  "verified" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "MarketplaceProvider_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "MarketplaceRequest" (
  "id" TEXT NOT NULL,
  "organizationId" TEXT NOT NULL,
  "providerId" TEXT,
  "serviceType" TEXT NOT NULL,
  "region" TEXT,
  "targetDate" TIMESTAMP(3),
  "budget" DECIMAL(18,2),
  "status" "MarketplaceRequestStatus" NOT NULL DEFAULT 'OPEN',
  "notes" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "MarketplaceRequest_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "OffsetProject" (
  "id" TEXT NOT NULL,
  "provider" TEXT NOT NULL,
  "externalProjectId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "standard" TEXT NOT NULL,
  "country" TEXT,
  "projectType" TEXT,
  "pricePerTonne" DECIMAL(18,2) NOT NULL,
  "availableTonnes" DECIMAL(18,3),
  "active" BOOLEAN NOT NULL DEFAULT true,
  "metadata" JSONB,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "OffsetProject_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "OffsetPurchase" (
  "id" TEXT NOT NULL,
  "organizationId" TEXT NOT NULL,
  "projectId" TEXT NOT NULL,
  "tonnes" DECIMAL(18,3) NOT NULL,
  "unitPrice" DECIMAL(18,2) NOT NULL,
  "totalPrice" DECIMAL(18,2) NOT NULL,
  "externalTransactionId" TEXT,
  "certificateUrl" TEXT,
  "status" TEXT NOT NULL DEFAULT 'pending',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "OffsetPurchase_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "BenchmarkCohort" (
  "id" TEXT NOT NULL,
  "naicsCode" TEXT NOT NULL,
  "revenueBand" TEXT NOT NULL,
  "memberCount" INTEGER NOT NULL,
  "medianScope3PerRevenue" DECIMAL(18,8),
  "quartile1" DECIMAL(18,8),
  "quartile3" DECIMAL(18,8),
  "period" TEXT NOT NULL,
  "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "BenchmarkCohort_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ComplianceDeadline" (
  "id" TEXT NOT NULL,
  "organizationId" TEXT NOT NULL,
  "programName" TEXT NOT NULL,
  "deadlineType" TEXT NOT NULL,
  "dueDate" TIMESTAMP(3) NOT NULL,
  "recurrenceRule" TEXT,
  "ownerEmail" TEXT,
  "notificationChannels" TEXT[],
  "status" TEXT NOT NULL DEFAULT 'upcoming',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ComplianceDeadline_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "DataRoom" (
  "id" TEXT NOT NULL,
  "organizationId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "purpose" TEXT NOT NULL,
  "requesterName" TEXT,
  "requesterEmail" TEXT,
  "accessToken" TEXT NOT NULL,
  "expiresAt" TIMESTAMP(3),
  "status" "DataRoomStatus" NOT NULL DEFAULT 'DRAFT',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "DataRoom_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "DataRoomItem" (
  "id" TEXT NOT NULL,
  "dataRoomId" TEXT NOT NULL,
  "evidenceFileId" TEXT,
  "reportId" TEXT,
  "certificateId" TEXT,
  "displayName" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "DataRoomItem_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "IntegrationConnection_org_provider_external_key" ON "IntegrationConnection"("organizationId","provider","externalAccountId");
CREATE INDEX "Certificate_org_expiration_idx" ON "Certificate"("organizationId","expirationDate");
CREATE INDEX "ComplianceDeadline_org_due_idx" ON "ComplianceDeadline"("organizationId","dueDate");
CREATE UNIQUE INDEX "OffsetProject_provider_external_key" ON "OffsetProject"("provider","externalProjectId");
CREATE UNIQUE INDEX "BenchmarkCohort_unique_idx" ON "BenchmarkCohort"("naicsCode","revenueBand","period");
CREATE UNIQUE INDEX "DataRoom_accessToken_key" ON "DataRoom"("accessToken");

ALTER TABLE "IntegrationConnection" ADD CONSTRAINT "IntegrationConnection_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "FacilityHierarchy" ADD CONSTRAINT "FacilityHierarchy_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "FacilityHierarchy" ADD CONSTRAINT "FacilityHierarchy_parentFacilityId_fkey" FOREIGN KEY ("parentFacilityId") REFERENCES "Facility"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "FacilityHierarchy" ADD CONSTRAINT "FacilityHierarchy_childFacilityId_fkey" FOREIGN KEY ("childFacilityId") REFERENCES "Facility"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "IncentiveMatch" ADD CONSTRAINT "IncentiveMatch_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "IncentiveMatch" ADD CONSTRAINT "IncentiveMatch_programId_fkey" FOREIGN KEY ("programId") REFERENCES "IncentiveProgram"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "MarketplaceRequest" ADD CONSTRAINT "MarketplaceRequest_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "MarketplaceRequest" ADD CONSTRAINT "MarketplaceRequest_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "MarketplaceProvider"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "OffsetPurchase" ADD CONSTRAINT "OffsetPurchase_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "OffsetPurchase" ADD CONSTRAINT "OffsetPurchase_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "OffsetProject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ComplianceDeadline" ADD CONSTRAINT "ComplianceDeadline_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "DataRoom" ADD CONSTRAINT "DataRoom_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "DataRoomItem" ADD CONSTRAINT "DataRoomItem_dataRoomId_fkey" FOREIGN KEY ("dataRoomId") REFERENCES "DataRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "DataRoomItem" ADD CONSTRAINT "DataRoomItem_evidenceFileId_fkey" FOREIGN KEY ("evidenceFileId") REFERENCES "EvidenceFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "DataRoomItem" ADD CONSTRAINT "DataRoomItem_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "DataRoomItem" ADD CONSTRAINT "DataRoomItem_certificateId_fkey" FOREIGN KEY ("certificateId") REFERENCES "Certificate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
