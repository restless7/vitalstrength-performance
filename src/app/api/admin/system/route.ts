import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser, verifyPermission } from '@/lib/security/rbac';
import { getTruthfulSystemStatus } from '@/lib/services/system.service';

export async function GET(req: NextRequest) {
  const user = await getAuthenticatedUser(req);
  const authResult = verifyPermission(user, 'settings:read');

  if (!authResult.authorized) {
    return NextResponse.json(
      { success: false, error: authResult.error },
      { status: authResult.statusCode || 403 }
    );
  }

  const systemStatus = await getTruthfulSystemStatus();
  return NextResponse.json({ success: true, data: systemStatus });
}

