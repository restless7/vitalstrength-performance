import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser, verifyPermission } from '@/lib/security/rbac';
import { getUpcomingSessions, createSession, updateSessionStatus } from '@/lib/services/session.service';
import { recordAuditLog } from '@/lib/security/audit-logger';

export async function GET(req: NextRequest) {
  const user = await getAuthenticatedUser(req);
  const authResult = verifyPermission(user, 'manage:sessions');
  if (!authResult.authorized) {
    return NextResponse.json(
      { success: false, error: authResult.error },
      { status: authResult.statusCode || 403 }
    );
  }

  const sessions = await getUpcomingSessions();
  return NextResponse.json({ success: true, count: sessions.length, data: sessions });
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    const authResult = verifyPermission(user, 'manage:sessions');
    if (!authResult.authorized) {
      return NextResponse.json(
        { success: false, error: authResult.error },
        { status: authResult.statusCode || 403 }
      );
    }

    const body = await req.json();
    const { athleteId, athleteName, title, date, timeSlot, type, location } = body;

    const newSession = await createSession({
      athleteId: athleteId || 'PAT-001',
      athleteName: athleteName || 'Atleta VSP',
      coachName: user!.name,
      title: title || 'Sesión 1:1 Presencial',
      date: date || new Date().toISOString().split('T')[0],
      timeSlot: timeSlot || '07:00 AM - 08:00 AM',
      type: type || 'PRESENCIAL_1ON1',
      location: location || 'Instalación Alex (Panamá)',
      status: 'SCHEDULED',
    });

    const audit = recordAuditLog({
      actorUserId: user!.id,
      actorRole: user!.role,
      action: 'PATIENT_RECORD_MUTATED',
      resourceId: newSession.id,
      details: `Nueva sesión agendada para ${newSession.athleteName} el ${newSession.date}.${user!.isSimulated ? ' [SIMULATED DEV ROLE]' : ''}`,
    });

    return NextResponse.json({ success: true, data: newSession, auditSignature: audit.signature });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    const authResult = verifyPermission(user, 'manage:sessions');

    if (!authResult.authorized) {
      return NextResponse.json(
        { success: false, error: authResult.error },
        { status: authResult.statusCode || 403 }
      );
    }

    const body = await req.json();
    const { sessionId, status, notes } = body;

    if (!sessionId || !status) {
      return NextResponse.json({ success: false, error: 'sessionId y status requeridos (400).' }, { status: 400 });
    }

    const result = await updateSessionStatus(sessionId, status, notes);
    if (result.error) {
      const is404 = result.error.includes('404');
      return NextResponse.json(
        { success: false, error: result.error },
        { status: is404 ? 404 : 400 }
      );
    }

    return NextResponse.json({ success: true, data: result.session });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

