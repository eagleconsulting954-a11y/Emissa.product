import type { RecordStatus, Supplier, CbamShipment, LcaProduct } from '@prisma/client';

export type SupplierWithCompliance = Supplier & {
  cbamShipments: Pick<CbamShipment, 'status' | 'embeddedCo2e' | 'cnCode'>[];
  lcaProducts: Pick<LcaProduct, 'status' | 'totalCo2eKg' | 'sku'>[];
};

const statusWeight: Record<RecordStatus, number> = {
  DRAFT: 8,
  PENDING: 12,
  IN_REVIEW: 8,
  APPROVED: 0,
  REJECTED: 24,
  COMPLETE: 0,
  BLOCKED: 30,
  ARCHIVED: 4,
};

export function supplierRiskScore(supplier: SupplierWithCompliance) {
  let score = statusWeight[supplier.status] ?? 10;
  if (!supplier.email) score += 8;
  if (!supplier.country) score += 8;

  for (const shipment of supplier.cbamShipments) {
    score += Math.min(statusWeight[shipment.status] ?? 6, 12);
    if (!shipment.embeddedCo2e) score += 4;
    if (!shipment.cnCode) score += 3;
  }

  for (const product of supplier.lcaProducts) {
    score += Math.min(statusWeight[product.status] ?? 6, 10);
    if (!product.totalCo2eKg) score += 4;
    if (!product.sku) score += 2;
  }

  return Math.min(100, score);
}

export function riskBand(score: number) {
  if (score >= 65) return 'Critical';
  if (score >= 40) return 'High';
  if (score >= 20) return 'Moderate';
  return 'Low';
}

export function recommendedRequirements(supplier: SupplierWithCompliance) {
  const requirements: string[] = [
    'Current supplier profile and ownership information',
    'Approved compliance evidence with review history',
    'Active certificate and expiration tracking',
  ];

  if (supplier.cbamShipments.length > 0) {
    requirements.push('CBAM product, installation and embedded-emissions evidence');
  }
  if (supplier.lcaProducts.length > 0) {
    requirements.push('Product carbon footprint / LCA source data and methodology');
  }
  if (!supplier.email) requirements.push('Primary supplier compliance contact');
  if (!supplier.country) requirements.push('Country / operating jurisdiction');

  return requirements;
}
