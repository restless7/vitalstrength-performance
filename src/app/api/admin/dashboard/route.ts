import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser, verifyPermission } from '@/lib/security/rbac';
import { getDashboardMetrics } from '@/lib/services/dashboard.service';

export async function GET(req: NextRequest) {
  const user = await getAuthenticatedUser(req);

  const authResult = verifyPermission(user, 'dashboard:read');

  if (!authResult.authorized) {
    return NextResponse.json(
      { success: false, error: authResult.error },
      { status: authResult.statusCode || 403 }
    );
  }

  const metrics = await getDashboardMetrics();
  return NextResponse.json({ success: true, data: metrics });
}

