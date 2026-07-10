import { db } from './db';

export class TenantAccessError extends Error {
  constructor(message = 'You do not have access to this organization.') {
    super(message);
    this.name = 'TenantAccessError';
  }
}

export async function requireMembership(userId: string, organizationId: string) {
  const membership = await db.membership.findUnique({
    where: { userId_organizationId: { userId, organizationId } },
    include: { organization: true },
  });

  if (!membership) throw new TenantAccessError();
  return membership;
}

export async function requireOrganizationRole(
  userId: string,
  organizationId: string,
  allowedRoles: Array<'OWNER' | 'ADMIN' | 'MANAGER' | 'ANALYST' | 'AUDITOR' | 'SUPPLIER' | 'BUYER' | 'VIEWER'>,
) {
  const membership = await requireMembership(userId, organizationId);
  if (!allowedRoles.includes(membership.role)) {
    throw new TenantAccessError('Your role does not permit this action.');
  }
  return membership;
}
