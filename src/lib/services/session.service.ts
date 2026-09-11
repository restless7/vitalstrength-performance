export type SessionStatus = 'SCHEDULED' | 'CHECKED_IN' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
export type SessionType = 'PRESENCIAL_1ON1' | 'BJJ_SPARRING' | 'FORM_CHECK';

export interface SessionRecord {
  id: string;
  athleteId: string;
  athleteName: string;
  coachName: string;
  type: SessionType;
  title: string;
  date: string; // YYYY-MM-DD
  timeSlot: string;
  location: string;
  status: SessionStatus;
  notes?: string;
  qrCodeToken?: string;
}

const ALLOWED_TRANSITIONS: Record<SessionStatus, SessionStatus[]> = {
  SCHEDULED: ['CHECKED_IN', 'CANCELLED', 'NO_SHOW'],
  CHECKED_IN: ['COMPLETED', 'CANCELLED'],
  COMPLETED: [], // Terminal state
  CANCELLED: [], // Terminal state
  NO_SHOW: [], // Terminal state
};

/**
 * Validates session state transitions against the session life cycle state machine.
 */
export function isValidSessionTransition(current: SessionStatus, nextStatus: SessionStatus): boolean {
  if (current === nextStatus) return true;
  return ALLOWED_TRANSITIONS[current]?.includes(nextStatus) ?? false;
}

const initialSessionsStore: SessionRecord[] = [
  {
    id: 'SES-101',
    athleteId: 'PAT-001',
    athleteName: 'Carlos Mendoza',
    coachName: 'Alejandro Sanchez Galan',
    type: 'PRESENCIAL_1ON1',
    title: 'Fuerza & Recomposición 1:1 (Día 1)',
    date: '2026-09-11',
    timeSlot: '07:00 AM - 08:00 AM',
    location: 'Instalación VSP Prime (Panamá)',
    status: 'CHECKED_IN',
    notes: 'Enfoque en tensión mecánica cuadriceps & press banca.',
    qrCodeToken: 'QR-VSP-CM-700'
  },
  {
    id: 'SES-102',
    athleteId: 'PAT-003',
    athleteName: 'Mariana Ríos',
    coachName: 'Alejandro Sanchez Galan',
    type: 'PRESENCIAL_1ON1',
    title: 'Tensión Mecánica (Día 2)',
    date: '2026-09-11',
    timeSlot: '08:30 AM - 09:30 AM',
    location: 'Instalación VSP Prime (Panamá)',
    status: 'SCHEDULED',
    notes: 'Revisión postura peso muerto.',
    qrCodeToken: 'QR-VSP-MR-830'
  },
  {
    id: 'SES-103',
    athleteId: 'PAT-005',
    athleteName: 'Esteban Lasso',
    coachName: 'Alejandro Sanchez Galan',
    type: 'BJJ_SPARRING',
    title: '507 BJJ Club — Sparring & Técnica',
    date: '2026-09-11',
    timeSlot: '06:00 PM - 07:30 PM',
    location: 'Mat Principal 507 BJJ',
    status: 'SCHEDULED',
    notes: 'Pase de guardia & control de presión.',
  },
  {
    id: 'SES-104',
    athleteId: 'PAT-004',
    athleteName: 'Diego Castrellón',
    coachName: 'Alejandro Sanchez Galan',
    type: 'FORM_CHECK',
    title: 'Evaluación Técnica Híbrida',
    date: '2026-09-12',
    timeSlot: '10:00 AM - 11:00 AM',
    location: 'Instalación VSP Prime (Panamá)',
    status: 'SCHEDULED',
  }
];

export async function getUpcomingSessions(): Promise<SessionRecord[]> {
  return [...initialSessionsStore];
}

export async function createSession(data: Omit<SessionRecord, 'id'>): Promise<SessionRecord> {
  const newId = `SES-${Date.now().toString().slice(-4)}`;
  const newSession: SessionRecord = { id: newId, ...data };
  initialSessionsStore.push(newSession);
  return newSession;
}

export async function updateSessionStatus(id: string, newStatus: SessionStatus, notes?: string): Promise<{ session?: SessionRecord; error?: string }> {
  const session = initialSessionsStore.find((s) => s.id === id);
  if (!session) return { error: 'Sesión no encontrada (404).' };

  if (!isValidSessionTransition(session.status, newStatus)) {
    return {
      error: `Transición de estado inválida: No se puede cambiar de '${session.status}' a '${newStatus}'.`,
    };
  }

  session.status = newStatus;
  if (notes) session.notes = notes;
  return { session };
}

