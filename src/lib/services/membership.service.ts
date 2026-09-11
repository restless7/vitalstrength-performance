import { getAllAthletes } from './athlete.service';

export interface MembershipProgram {
  id: string;
  name: string;
  priceUSD: number;
  billingInterval: 'MONTHLY' | 'QUARTERLY';
  description: string;
  activeSubscriberCount: number;
  totalRevenueUSD: number;
}

export const OFFICIAL_MEMBERSHIP_PROGRAMS: MembershipProgram[] = [
  {
    id: 'prime_elite_vip',
    name: 'Prime Elite 1:1 VIP',
    priceUSD: 799,
    billingInterval: 'MONTHLY',
    description: '3x Sesiones Presenciales 1:1 por semana en instalación Alex + Protocolo Hormonal & Nutricional',
    activeSubscriberCount: 2,
    totalRevenueUSD: 1598,
  },
  {
    id: 'prime_hybrid',
    name: 'Prime Hybrid',
    priceUSD: 499,
    billingInterval: 'MONTHLY',
    description: '1x Evaluación presencial semanal + Protocolo Hormonal & Nutricional Remoto',
    activeSubscriberCount: 1,
    totalRevenueUSD: 499,
  },
  {
    id: 'prime_remote',
    name: 'Prime Hormonal Remote',
    priceUSD: 299,
    billingInterval: 'MONTHLY',
    description: 'Protocolo endocrino & péptidos remoto de 12 semanas para hombres avanzados disciplinados',
    activeSubscriberCount: 1,
    totalRevenueUSD: 299,
  },
  {
    id: '507_bjj_club',
    name: '507 BJJ Club',
    priceUSD: 150,
    billingInterval: 'MONTHLY',
    description: 'Membresía técnica de Jiu-Jitsu Brasileño & Sparring táctico en tapete',
    activeSubscriberCount: 1,
    totalRevenueUSD: 150,
  },
];

export async function getMembershipPrograms(): Promise<MembershipProgram[]> {
  const athletes = await getAllAthletes();

  // Dynamic MRR calculation from actual DB records
  return OFFICIAL_MEMBERSHIP_PROGRAMS.map((prog) => {
    const matchingAthletes = athletes.filter((a) => a.tierId === prog.id && a.status === 'ACTIVE');
    const count = matchingAthletes.length;
    const revenue = count * prog.priceUSD;

    return {
      ...prog,
      activeSubscriberCount: count,
      totalRevenueUSD: revenue,
    };
  });
}

export async function calculateTotalMRR(): Promise<number> {
  const programs = await getMembershipPrograms();
  return programs.reduce((acc, p) => acc + p.totalRevenueUSD, 0);
}
