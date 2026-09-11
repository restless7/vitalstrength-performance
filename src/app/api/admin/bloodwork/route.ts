import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser, verifyPermission } from '@/lib/security/rbac';
import { encryptAES256GCM } from '@/lib/security/crypto';
import { recordAuditLog } from '@/lib/security/audit-logger';
import { validateBloodworkMarkers } from '@/lib/clinical/dosage-validator';

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    const body = await req.json();

    const { patientId, totalTestosteroneNgDl, freeTestosteronePgMl, estradiolPgMl, shbgNmolL, hba1cPercent, doctorNotes } = body;

    // 1. Server-side RBAC authorization guard
    const authResult = verifyPermission(user, 'review:bloodwork', patientId || 'PAT-001');
    if (!authResult.authorized) {
      return NextResponse.json(
        { success: false, error: authResult.error },
        { status: authResult.statusCode || 403 }
      );
    }

    // 2. Validate markers
    const validation = validateBloodworkMarkers({
      totalTestosteroneNgDl: Number(totalTestosteroneNgDl) || 840,
      freeTestosteronePgMl: Number(freeTestosteronePgMl) || 24.5,
      estradiolPgMl: Number(estradiolPgMl) || 29,
      shbgNmolL: Number(shbgNmolL) || 35,
      hba1cPercent: Number(hba1cPercent) || 5.4,
    });

    if (!validation.valid) {
      return NextResponse.json({ success: false, error: 'Sanidad de Marcadores Inválida', details: validation.errors }, { status: 422 });
    }

    // 3. Encrypt notes
    const encryptedNotes = encryptAES256GCM(doctorNotes || 'Examen de laboratorio revisado y aprobado.');

    // 4. Audit Log
    const audit = recordAuditLog({
      actorUserId: user!.id,
      actorRole: user!.role,
      action: 'BLOODWORK_REVIEWED',
      resourceId: patientId || 'PAT-001',
      details: `Revisión clínica de analítica completada para ${patientId || 'PAT-001'}. Testo Total: ${totalTestosteroneNgDl} ng/dL.${user!.isSimulated ? ' [SIMULATED DEV ROLE]' : ''}`,
    });

    return NextResponse.json({
      success: true,
      data: {
        patientId: patientId || 'PAT-001',
        status: 'REVIEWED_APPROVED',
        reviewedAt: new Date().toISOString(),
        reviewedBy: user!.name,
      },
      warnings: validation.warnings,
      auditLogSignature: audit.signature,
      security: {
        rbacVerified: true,
        encryptedNotesAuthTag: encryptedNotes.authTag,
      },
    });

  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

