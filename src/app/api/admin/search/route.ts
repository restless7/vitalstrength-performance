import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser, verifyPermission } from '@/lib/security/rbac';
import { getAllAthletes } from '@/lib/services/athlete.service';
import { getUpcomingSessions } from '@/lib/services/session.service';
import { getMembershipPrograms } from '@/lib/services/membership.service';

export async function GET(req: NextRequest) {
  const user = await getAuthenticatedUser(req);
  if (!user) {

    return NextResponse.json(
      { success: false, error: 'Acceso Denegado: Autenticación requerida (HTTP 401).' },
      { status: 401 }
    );
  }

  const url = new URL(req.url);
  const q = (url.searchParams.get('q') || '').trim().toLowerCase();

  if (!q || q.length < 2) {
    return NextResponse.json({ success: true, query: q, results: { athletes: [], sessions: [], memberships: [] } });
  }

  const canViewPII = verifyPermission(user, 'view:patient_pii').authorized;
  const canViewSessions = verifyPermission(user, 'manage:sessions').authorized;
  const canViewFinancials = verifyPermission(user, 'read:financials').authorized;

  const [athletes, sessions, memberships] = await Promise.all([
    canViewPII ? getAllAthletes({ search: q }) : Promise.resolve([]),
    canViewSessions ? getUpcomingSessions() : Promise.resolve([]),
    canViewFinancials ? getMembershipPrograms() : Promise.resolve([]),
  ]);

  const matchedSessions = sessions.filter(
    (s) => s.athleteName.toLowerCase().includes(q) || s.title.toLowerCase().includes(q) || s.id.toLowerCase().includes(q)
  ).slice(0, 10);

  const matchedMemberships = memberships.filter((m) => m.name.toLowerCase().includes(q) || m.id.toLowerCase().includes(q)).slice(0, 10);

  return NextResponse.json({
    success: true,
    query: q,
    results: {
      athletes: athletes.slice(0, 10),
      sessions: matchedSessions,
      memberships: matchedMemberships,
    },
  });
}

