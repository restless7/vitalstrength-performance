import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser, verifyPermission } from '@/lib/security/rbac';
import { getAthleteById, updateAthlete } from '@/lib/services/athlete.service';
import { recordAuditLog } from '@/lib/security/audit-logger';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = await getAuthenticatedUser(req);

  const authResult = verifyPermission(user, 'view:patient_pii', id);
  if (!authResult.authorized) {
    return NextResponse.json(
      { success: false, error: authResult.error },
      { status: authResult.statusCode || 403 }
    );
  }

  const athlete = await getAthleteById(id);
  if (!athlete) {
    return NextResponse.json({ success: false, error: 'Atleta no encontrado.' }, { status: 404 });
  }

  recordAuditLog({
    actorUserId: user!.id,
    actorRole: user!.role,
    action: 'PATIENT_RECORD_ACCESSED',
    resourceId: id,
    details: `Expediente del atleta ${athlete.name} accedido.`,
  });

  return NextResponse.json({ success: true, data: athlete });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getAuthenticatedUser(req);

    const authResult = verifyPermission(user, 'view:patient_pii', id);

    if (!authResult.authorized) {
      return NextResponse.json(
        { success: false, error: authResult.error },
        { status: authResult.statusCode || 403 }
      );
    }

    const body = await req.json();
    const { userRole, ...updates } = body;

    const updated = await updateAthlete(id, updates);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Atleta no encontrado.' }, { status: 404 });
    }

    const audit = recordAuditLog({
      actorUserId: user!.id,
      actorRole: user!.role,
      action: 'PATIENT_RECORD_MUTATED',
      resourceId: id,
      details: `Expediente del atleta ${updated.name} actualizado.`,
    });

    return NextResponse.json({ success: true, data: updated, auditSignature: audit.signature });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

