import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser, verifyPermission } from '@/lib/security/rbac';
import { encryptAES256GCM } from '@/lib/security/crypto';
import { recordAuditLog } from '@/lib/security/audit-logger';
import { validatePrescriptionDosages } from '@/lib/clinical/dosage-validator';

// In-memory store for backend protocol prescriptions
const protocolPrescriptionStore: Array<{
  id: string;
  patientId: string;
  clembuterolDose: string;
  omega3: string;
  magnesium: string;
  protein: string;
  water: string;
  fastingWindow: string;
  encryptedClinicalNotes: any;
  issuedAt: string;
  issuedBy: string;
}> = [];

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    const body = await req.json();
    const { patientId, clembuterolDoseMcg, omega3, magnesium, protein, water, fastingWindow, clinicalNotes } = body;

    // 1. Server-side RBAC authorization guard
    const authResult = verifyPermission(user, 'prescribe:protocols', patientId || 'PAT-001');
    if (!authResult.authorized) {
      return NextResponse.json(
        { success: false, error: authResult.error },
        { status: authResult.statusCode || 403 }
      );
    }


    // 2. Administrative dosage validation
    const validation = validatePrescriptionDosages({
      clembuterolDoseMcg: Number(clembuterolDoseMcg) || 20,
      omega3Mg: 2000,
      magnesiumMg: 400,
      proteinScoops: 2,
      fastingHours: 12,
      waterOz: 90,
    });

    if (!validation.valid) {
      recordAuditLog({
        actorUserId: user!.id,
        actorRole: user!.role,
        action: 'ACCESS_DENIED_UNAUTHORIZED',
        resourceId: patientId || 'PAT-001',
        details: `Rechazado por violación de regla administrativa de registro: ${validation.errors.join(', ')}`,
      });

      return NextResponse.json(
        {
          success: false,
          error: 'Violación de Regla Administrativa de Registro',
          details: validation.errors,
        },
        { status: 422 }
      );
    }

    // 3. Real AES-256-GCM Encryption of sensitive clinical notes
    const encryptedNotes = encryptAES256GCM(clinicalNotes || 'Protocolo de recomposición 12 semanas emitido.');

    // 4. Store record
    const newPrescription = {
      id: `RX-${Date.now()}`,
      patientId: patientId || 'PAT-001',
      clembuterolDose: `${clembuterolDoseMcg || 20} mcg/día`,
      omega3: omega3 || '2000 mg/día (High-EPA)',
      magnesium: magnesium || '400 mg/noche',
      protein: protein || '2 Scoops diarios',
      water: water || '90-100 oz/día',
      fastingWindow: fastingWindow || '10-12 Horas',
      encryptedClinicalNotes: encryptedNotes,
      issuedAt: new Date().toISOString(),
      issuedBy: user!.name,
    };

    protocolPrescriptionStore.unshift(newPrescription);

    // 5. SHA-256 HMAC Signed Audit Logger
    const audit = recordAuditLog({
      actorUserId: user!.id,
      actorRole: user!.role,
      action: 'PRESCRIPTION_ISSUED',
      resourceId: patientId || 'PAT-001',
      details: `Prescripción emitida a ${patientId || 'PAT-001'}. Clembuterol: ${clembuterolDoseMcg}mcg. AES-256-GCM Hash: ${encryptedNotes.authTag}.${user!.isSimulated ? ' [SIMULATED DEV ROLE]' : ''}`,
    });

    return NextResponse.json({
      success: true,
      data: newPrescription,
      warnings: validation.warnings,
      auditLogSignature: audit.signature,
      security: {
        rbacVerified: true,
        encryptionAlgorithm: encryptedNotes.algorithm,
        authTag: encryptedNotes.authTag,
      },
    });

  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const user = await getAuthenticatedUser(req);
  const authResult = verifyPermission(user, 'prescribe:protocols');

  if (!authResult.authorized) {
    return NextResponse.json(
      { success: false, error: authResult.error },
      { status: authResult.statusCode || 403 }
    );
  }

  return NextResponse.json({
    success: true,
    data: protocolPrescriptionStore,
  });
}

