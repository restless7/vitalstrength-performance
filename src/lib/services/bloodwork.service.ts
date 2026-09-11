export type LabStatus = 'PENDING_REVIEW' | 'REVIEWED_NORMAL' | 'REVIEWED_FLAGGED';
export type MarkerEvaluation = 'LOW' | 'NORMAL' | 'HIGH' | 'PENDING_REVIEW';

export interface ReferenceRange {
  markerName: string;
  unit: string;
  minNormal: number;
  maxNormal: number;
}

export const CLINICAL_REFERENCE_METADATA: Record<string, ReferenceRange> = {
  totalTestosterone: { markerName: 'Testosterona Total', unit: 'ng/dL', minNormal: 300, maxNormal: 1000 },
  freeTestosterone: { markerName: 'Testosterona Libre', unit: 'pg/mL', minNormal: 15.0, maxNormal: 25.0 },
  estradiol: { markerName: 'Estradiol (E2)', unit: 'pg/mL', minNormal: 15, maxNormal: 45 },
  shbg: { markerName: 'SHBG', unit: 'nmol/L', minNormal: 10, maxNormal: 50 },
  hba1c: { markerName: 'Hemoglobina Glicada (HbA1c)', unit: '%', minNormal: 4.0, maxNormal: 5.6 },
};

export interface LabRecord {
  id: string;
  athleteId: string;
  athleteName: string;
  labName: string;
  uploadDate: string;
  status: LabStatus;
  reviewedBy?: string;
  reviewedAt?: string;
  clinicalNotesEncrypted?: string;
  markers: {
    totalTestosteroneNgDl: number;
    freeTestosteronePgMl: number;
    estradiolPgMl: number;
    shbgNmolL: number;
    hba1cPercent: number;
  };
}

const initialLabRecordsStore: LabRecord[] = [
  {
    id: 'LAB-2026-001',
    athleteId: 'PAT-003',
    athleteName: 'Mariana Ríos',
    labName: 'Laboratorios Raly Panamá',
    uploadDate: '2026-09-11 09:15 AM',
    status: 'PENDING_REVIEW',
    markers: {
      totalTestosteroneNgDl: 28,
      freeTestosteronePgMl: 1.1,
      estradiolPgMl: 85, // HIGH
      shbgNmolL: 55,
      hba1cPercent: 5.6,
    },
  },
  {
    id: 'LAB-2026-002',
    athleteId: 'PAT-002',
    athleteName: 'Roberto Varela',
    labName: 'Minimed Panamá',
    uploadDate: '2026-09-10 02:30 PM',
    status: 'REVIEWED_NORMAL',
    reviewedBy: 'Alejandro Sanchez Galan',
    reviewedAt: '2026-09-10 04:00 PM',
    clinicalNotesEncrypted: 'Valores endocrinos en rango óptimo tras 8 semanas de protocolo.',
    markers: {
      totalTestosteroneNgDl: 840,
      freeTestosteronePgMl: 24.5,
      estradiolPgMl: 29,
      shbgNmolL: 35,
      hba1cPercent: 5.4,
    },
  },
  {
    id: 'LAB-2026-003',
    athleteId: 'PAT-001',
    athleteName: 'Carlos Mendoza',
    labName: 'Hospital Punta Pacífica',
    uploadDate: '2026-09-01 10:00 AM',
    status: 'REVIEWED_FLAGGED',
    reviewedBy: 'Alejandro Sanchez Galan',
    reviewedAt: '2026-09-01 11:30 AM',
    clinicalNotesEncrypted: 'Testosterona libre baja inicial. Iniciando protocolo de sensibilización receptores.',
    markers: {
      totalTestosteroneNgDl: 310,
      freeTestosteronePgMl: 6.8, // LOW
      estradiolPgMl: 38,
      shbgNmolL: 42,
      hba1cPercent: 5.8, // HIGH
    },
  },
];

export function evaluateMarker(value: number, rangeKey: keyof typeof CLINICAL_REFERENCE_METADATA): MarkerEvaluation {
  const range = CLINICAL_REFERENCE_METADATA[rangeKey];
  if (!range) return 'NORMAL';

  if (value < range.minNormal) return 'LOW';
  if (value > range.maxNormal) return 'HIGH';
  return 'NORMAL';
}

export async function getAllLabRecords(): Promise<LabRecord[]> {
  return [...initialLabRecordsStore];
}

export async function getLabRecordsByAthleteId(athleteId: string): Promise<LabRecord[]> {
  return initialLabRecordsStore.filter((l) => l.athleteId.toLowerCase() === athleteId.toLowerCase());
}

export async function reviewLabRecord(id: string, reviewerName: string, notes?: string): Promise<LabRecord | null> {
  const lab = initialLabRecordsStore.find((l) => l.id === id);
  if (!lab) return null;

  lab.status = 'REVIEWED_NORMAL';
  lab.reviewedBy = reviewerName;
  lab.reviewedAt = new Date().toISOString();
  if (notes) lab.clinicalNotesEncrypted = notes;

  return lab;
}
