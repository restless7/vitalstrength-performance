export interface AthleteRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  tierId: 'prime_elite_vip' | 'prime_hybrid' | 'prime_remote' | '507_bjj_club';
  tierName: string;
  status: 'ACTIVE' | 'PENDING_LABS' | 'RENEWAL_DUE' | 'INACTIVE';
  mrrUSD: number;
  startDate: string;
  totalTestosteroneNgDl?: number;
  freeTestosteronePgMl?: number;
  estradiolPgMl?: number;
  shbgNmolL?: number;
  hba1cPercent?: number;
  sessionsRemaining: number;
  lastCheckin: string;
  clinicalNotesEncrypted?: string;
}

const initialAthletesStore: AthleteRecord[] = [
  {
    id: 'PAT-001',
    name: 'Carlos Mendoza',
    email: 'carlos.mendoza@email.com',
    phone: '+507 6123-4567',
    tierId: 'prime_elite_vip',
    tierName: 'Prime Elite 1:1 VIP',
    status: 'ACTIVE',
    mrrUSD: 799,
    startDate: '2026-08-01',
    totalTestosteroneNgDl: 310,
    freeTestosteronePgMl: 6.8,
    estradiolPgMl: 38,
    shbgNmolL: 42,
    hba1cPercent: 5.8,
    sessionsRemaining: 10,
    lastCheckin: '2026-09-11 07:00 AM',
    clinicalNotesEncrypted: 'Paciente en programa 1:1 de recomposición muscular presencial.'
  },
  {
    id: 'PAT-002',
    name: 'Roberto Varela',
    email: 'roberto.varela@email.com',
    phone: '+507 6890-1234',
    tierId: 'prime_remote',
    tierName: 'Prime Hormonal Remote',
    status: 'ACTIVE',
    mrrUSD: 299,
    startDate: '2026-07-15',
    totalTestosteroneNgDl: 840,
    freeTestosteronePgMl: 24.5,
    estradiolPgMl: 29,
    shbgNmolL: 35,
    hba1cPercent: 5.4,
    sessionsRemaining: 0,
    lastCheckin: '2026-09-08 (Portal)',
    clinicalNotesEncrypted: 'Responde favorablemente al protocolo hormonal remoto.'
  },
  {
    id: 'PAT-003',
    name: 'Mariana Ríos',
    email: 'mariana.rios@email.com',
    phone: '+507 6777-8899',
    tierId: 'prime_elite_vip',
    tierName: 'Prime Elite 1:1 VIP',
    status: 'PENDING_LABS',
    mrrUSD: 799,
    startDate: '2026-08-20',
    totalTestosteroneNgDl: 28,
    freeTestosteronePgMl: 1.1,
    estradiolPgMl: 85,
    shbgNmolL: 55,
    hba1cPercent: 5.6,
    sessionsRemaining: 12,
    lastCheckin: '2026-09-10 08:30 AM',
    clinicalNotesEncrypted: 'Pendiente ajuste endocrino de estradiol.'
  },
  {
    id: 'PAT-004',
    name: 'Diego Castrellón',
    email: 'diego.c@email.com',
    phone: '+507 6333-2211',
    tierId: 'prime_hybrid',
    tierName: 'Prime Hybrid',
    status: 'RENEWAL_DUE',
    mrrUSD: 499,
    startDate: '2026-06-10',
    totalTestosteroneNgDl: 490,
    freeTestosteronePgMl: 11.2,
    estradiolPgMl: 32,
    shbgNmolL: 38,
    hba1cPercent: 5.5,
    sessionsRemaining: 2,
    lastCheckin: '2026-09-06',
    clinicalNotesEncrypted: 'Requiere renovación de ciclo trimestral.'
  },
  {
    id: 'PAT-005',
    name: 'Esteban Lasso',
    email: 'esteban.lasso@email.com',
    phone: '+507 6444-5566',
    tierId: '507_bjj_club',
    tierName: '507 BJJ Club',
    status: 'ACTIVE',
    mrrUSD: 150,
    startDate: '2026-05-01',
    totalTestosteroneNgDl: 620,
    freeTestosteronePgMl: 16.4,
    estradiolPgMl: 26,
    shbgNmolL: 32,
    hba1cPercent: 5.2,
    sessionsRemaining: 8,
    lastCheckin: '2026-09-10 06:00 PM (BJJ)',
    clinicalNotesEncrypted: 'Practicante activo de Jiu Jitsu Brasileño.'
  }
];

export async function getAllAthletes(query?: { search?: string; tier?: string }): Promise<AthleteRecord[]> {
  let results = [...initialAthletesStore];

  if (query?.tier && query.tier !== 'ALL') {
    results = results.filter((a) => a.tierName === query.tier || a.tierId === query.tier);
  }

  if (query?.search) {
    const s = query.search.toLowerCase();
    results = results.filter(
      (a) => a.name.toLowerCase().includes(s) || a.id.toLowerCase().includes(s) || a.email.toLowerCase().includes(s)
    );
  }

  return results;
}

export async function getAthleteById(id: string): Promise<AthleteRecord | null> {
  const found = initialAthletesStore.find((a) => a.id.toLowerCase() === id.toLowerCase());
  return found || null;
}

export async function updateAthlete(id: string, updates: Partial<AthleteRecord>): Promise<AthleteRecord | null> {
  const index = initialAthletesStore.findIndex((a) => a.id.toLowerCase() === id.toLowerCase());
  if (index === -1) return null;

  initialAthletesStore[index] = { ...initialAthletesStore[index], ...updates };
  return initialAthletesStore[index];
}

export async function createAthlete(data: Omit<AthleteRecord, 'id'>): Promise<AthleteRecord> {
  const newId = `PAT-${String(initialAthletesStore.length + 1).padStart(3, '0')}`;
  const newRecord: AthleteRecord = { id: newId, ...data };
  initialAthletesStore.push(newRecord);
  return newRecord;
}
