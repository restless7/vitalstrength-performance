import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser, verifyPermission } from '@/lib/security/rbac';
import { getAllAthletes, createAthlete } from '@/lib/services/athlete.service';
import { recordAuditLog } from '@/lib/security/audit-logger';

export async function GET(req: NextRequest) {
  const user = await getAuthenticatedUser(req);
  const authResult = verifyPermission(user, 'view:patient_pii');
  if (!authResult.authorized) {
    return NextResponse.json(
      { success: false, error: authResult.error },
      { status: authResult.statusCode || 403 }
    );
  }

  const url = new URL(req.url);
  const search = url.searchParams.get('search') || undefined;
  const tier = url.searchParams.get('tier') || undefined;

  const athletes = await getAllAthletes({ search, tier });
  return NextResponse.json({ success: true, count: athletes.length, data: athletes });
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    const authResult = verifyPermission(user, 'manage:users');
    if (!authResult.authorized) {
      return NextResponse.json(
        { success: false, error: authResult.error },
        { status: authResult.statusCode || 403 }
      );
    }


    const body = await req.json();
    const { name, email, phone, tierId, tierName, mrrUSD } = body;

    if (!name || !phone) {
      return NextResponse.json({ success: false, error: 'Nombre y teléfono requeridos.' }, { status: 400 });
    }

    const newAthlete = await createAthlete({
      name,
      email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@email.com`,
      phone,
      tierId: tierId || 'prime_elite_vip',
      tierName: tierName || 'Prime Elite 1:1 VIP',
      status: 'ACTIVE',
      mrrUSD: Number(mrrUSD) || 799,
      startDate: new Date().toISOString().split('T')[0],
      sessionsRemaining: 12,
      lastCheckin: 'Recién Registrado',
    });

    const audit = recordAuditLog({
      actorUserId: user!.id,
      actorRole: user!.role,
      action: 'PATIENT_RECORD_MUTATED',
      resourceId: newAthlete.id,
      details: `Nuevo atleta creado: ${newAthlete.name} (${newAthlete.tierName}).${user!.isSimulated ? ' [SIMULATED DEV ROLE]' : ''}`,
    });

    return NextResponse.json({
      success: true,
      data: newAthlete,
      auditSignature: audit.signature,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

