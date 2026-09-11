import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser, verifyPermission } from '@/lib/security/rbac';
import { getMembershipPrograms, calculateTotalMRR } from '@/lib/services/membership.service';

export async function GET(req: NextRequest) {
  const user = await getAuthenticatedUser(req);

  const authResult = verifyPermission(user, 'read:financials');

  if (!authResult.authorized) {
    return NextResponse.json(
      { success: false, error: authResult.error },
      { status: authResult.statusCode || 403 }
    );
  }

  const programs = await getMembershipPrograms();
  const totalMRR = await calculateTotalMRR();

  return NextResponse.json({
    success: true,
    totalMRRUSD: totalMRR,
    currency: 'USD',
    market: 'Panama',
    paymentGatewayStatus: 'NOT_CONFIGURED',
    data: programs,
  });
}

