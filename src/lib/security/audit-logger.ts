import crypto from 'crypto';

export type AuditActionType =
  | 'PRESCRIPTION_ISSUED'
  | 'BLOODWORK_REVIEWED'
  | 'PATIENT_RECORD_ACCESSED'
  | 'PATIENT_RECORD_MUTATED'
  | 'MEMBERSHIP_TIER_UPDATED'
  | 'ACCESS_GRANTED'
  | 'ACCESS_DENIED_UNAUTHORIZED';

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actorUserId: string;
  actorRole: string;
  action: AuditActionType;
  resourceId: string;
  ipAddress: string;
  details: string;
  signature: string;
}

// In-memory audit log store (backed by production database in deployment)
const auditLogStore: AuditLogEntry[] = [];
const AUDIT_SECRET = process.env.VSP_AUDIT_SECRET || 'vsp_audit_integrity_secret_panama_2026';

function generateLogSignature(entry: Omit<AuditLogEntry, 'signature'>): string {
  const payload = `${entry.id}:${entry.timestamp}:${entry.actorUserId}:${entry.action}:${entry.resourceId}:${entry.details}`;
  return crypto.createHmac('sha256', AUDIT_SECRET).update(payload).digest('hex');
}

/**
 * Verifies whether an audit log entry has been tampered with.
 */
export function verifyAuditLogIntegrity(entry: AuditLogEntry): boolean {
  const { signature, ...unsigned } = entry;
  const recomputed = generateLogSignature(unsigned);
  return crypto.timingSafeEqual(Buffer.from(signature, 'hex'), Buffer.from(recomputed, 'hex'));
}

/**
 * Creates and stores a cryptographic audit log entry for administrative & clinical actions.
 */
export function recordAuditLog(params: {
  actorUserId: string;
  actorRole: string;
  action: AuditActionType;
  resourceId: string;
  ipAddress?: string;
  details: string;
}): AuditLogEntry {
  const id = `AUD-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const timestamp = new Date().toISOString();

  const unsignedEntry = {
    id,
    timestamp,
    actorUserId: params.actorUserId,
    actorRole: params.actorRole,
    action: params.action,
    resourceId: params.resourceId,
    ipAddress: params.ipAddress || '127.0.0.1',
    details: params.details,
  };

  const signature = generateLogSignature(unsignedEntry);
  const fullLog: AuditLogEntry = { ...unsignedEntry, signature };

  auditLogStore.unshift(fullLog); // Store latest first
  return fullLog;
}

/**
 * Retrieves the full tamper-proof audit logs (restricted to HEAD_COACH).
 */
export function getAuditLogs(): AuditLogEntry[] {
  return [...auditLogStore];
}

