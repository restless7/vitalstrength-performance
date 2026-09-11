import { getAllAthletes } from './athlete.service';
import { getUpcomingSessions } from './session.service';
import { getAllLabRecords } from './bloodwork.service';
import { getMembershipPrograms } from './membership.service';

export interface DashboardMetrics {
  mrrUSD: number;
  totalAthletesCount: number;
  vipAthletesCount: number;
  hybridAthletesCount: number;
  remoteAthletesCount: number;
  bjjAthletesCount: number;
  pendingLabsCount: number;
  todaysSessionsCount: number;
  occupancyRatePercent: number;
  recentActivity: Array<{
    id: string;
    timestamp: string;
    title: string;
    description: string;
    type: 'SESSION' | 'LAB' | 'MEMBERSHIP';
  }>;
}

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const athletes = await getAllAthletes();
  const sessions = await getUpcomingSessions();
  const labs = await getAllLabRecords();
  const membershipPrograms = await getMembershipPrograms();

  const totalMRR = membershipPrograms.reduce((acc, p) => acc + p.totalRevenueUSD, 0);

  const vipCount = athletes.filter((a) => a.tierId === 'prime_elite_vip' && a.status === 'ACTIVE').length;
  const hybridCount = athletes.filter((a) => a.tierId === 'prime_hybrid' && a.status === 'ACTIVE').length;
  const remoteCount = athletes.filter((a) => a.tierId === 'prime_remote' && a.status === 'ACTIVE').length;
  const bjjCount = athletes.filter((a) => a.tierId === '507_bjj_club' && a.status === 'ACTIVE').length;

  const pendingLabs = labs.filter((l) => l.status === 'PENDING_REVIEW').length;
  const todaysSessions = sessions.filter((s) => s.date === new Date().toISOString().split('T')[0]).length;

  // Assuming 10 max 1:1 slots/day
  const occupancyRate = Math.min(100, Math.round((todaysSessions / 4) * 100));

  const recentActivity = [
    {
      id: 'act-1',
      timestamp: 'Hoy, 07:00 AM',
      title: 'Sesión 1:1 Check-in Completado',
      description: 'Carlos Mendoza asistió a sesión presencial de Fuerza.',
      type: 'SESSION' as const,
    },
    {
      id: 'act-2',
      timestamp: 'Hoy, 09:15 AM',
      title: 'Examen de Sangre Recibido',
      description: 'Mariana Ríos subió nuevo laboratorio (Raly Panamá).',
      type: 'LAB' as const,
    },
    {
      id: 'act-3',
      timestamp: 'Ayer, 04:00 PM',
      title: 'Protocolo Aprobado',
      description: 'Roberto Varela recibió extensión de protocolo remoto 12 sem.',
      type: 'MEMBERSHIP' as const,
    },
  ];

  return {
    mrrUSD: totalMRR,
    totalAthletesCount: athletes.length,
    vipAthletesCount: vipCount,
    hybridAthletesCount: hybridCount,
    remoteAthletesCount: remoteCount,
    bjjAthletesCount: bjjCount,
    pendingLabsCount: pendingLabs,
    todaysSessionsCount: todaysSessions,
    occupancyRatePercent: occupancyRate,
    recentActivity,
  };
}
