import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser, verifyPermission } from '@/lib/security/rbac';
import { getAuditLogs } from '@/lib/security/audit-logger';

export async function GET(req: NextRequest) {
  const user = await getAuthenticatedUser(req);
  const authResult = verifyPermission(user, 'audit:read');

  if (!authResult.authorized) {
    return NextResponse.json(
      { success: false, error: authResult.error },
      { status: authResult.statusCode || 403 }
    );
  }

  const logs = getAuditLogs();

  return NextResponse.json({
    success: true,
    totalLogs: logs.length,
    data: logs,
  });
}

