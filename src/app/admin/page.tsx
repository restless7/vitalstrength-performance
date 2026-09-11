'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Pill,
  Activity,
  Calendar,
  DollarSign,
  Settings,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Clock,
  Zap,
  TrendingUp,
  FileText,
  UserPlus,
  ArrowUpRight,
  ShieldCheck,
  Check,
  Edit,
  Eye,
  Trash2,
  Award,
  Lock,
  Key,
  Database,
  FileCode
} from 'lucide-react';

export interface Patient {
  id: string;
  name: string;
  phone: string;
  tier: 'Prime Elite 1:1 VIP' | 'Prime Hybrid' | 'Prime Hormonal Remote' | '507 BJJ Club';
  status: 'ACTIVE' | 'PENDING_LABS' | 'RENEWAL_DUE';
  totalT: number;
  freeT: number;
  sessionsLeft: number;
  lastCheckin: string;
  mrrUSD: number;
}

const initialPatientData: Patient[] = [
  {
    id: 'PAT-001',
    name: 'Carlos Mendoza',
    phone: '+507 6123-4567',
    tier: 'Prime Elite 1:1 VIP',
    status: 'ACTIVE',
    totalT: 310,
    freeT: 6.8,
    sessionsLeft: 10,
    lastCheckin: 'Hoy, 7:00 AM',
    mrrUSD: 799
  },
  {
    id: 'PAT-002',
    name: 'Roberto Varela',
    phone: '+507 6890-1234',
    tier: 'Prime Hormonal Remote',
    status: 'ACTIVE',
    totalT: 840,
    freeT: 24.5,
    sessionsLeft: 0,
    lastCheckin: 'Hace 3 días (Portal)',
    mrrUSD: 299
  },
  {
    id: 'PAT-003',
    name: 'Mariana Ríos',
    phone: '+507 6777-8899',
    tier: 'Prime Elite 1:1 VIP',
    status: 'PENDING_LABS',
    totalT: 28,
    freeT: 1.1,
    sessionsLeft: 12,
    lastCheckin: 'Ayer, 8:30 AM',
    mrrUSD: 799
  },
  {
    id: 'PAT-004',
    name: 'Diego Castrellón',
    phone: '+507 6333-2211',
    tier: 'Prime Hybrid',
    status: 'RENEWAL_DUE',
    totalT: 490,
    freeT: 11.2,
    sessionsLeft: 2,
    lastCheckin: 'Hace 5 días',
    mrrUSD: 499
  },
  {
    id: 'PAT-005',
    name: 'Esteban Lasso',
    phone: '+507 6444-5566',
    tier: '507 BJJ Club',
    status: 'ACTIVE',
    totalT: 620,
    freeT: 16.4,
    sessionsLeft: 8,
    lastCheckin: 'Ayer, 6:00 PM (BJJ)',
    mrrUSD: 150
  }
];

function AdminDashboardContent() {
  const searchParams = useSearchParams();
  const tabFromUrl = searchParams.get('tab') || 'overview';
  const roleFromUrl = (searchParams.get('role') as any) || 'HEAD_COACH';

  const [activeTab, setActiveTab] = useState<string>(tabFromUrl);
  const [currentRole, setCurrentRole] = useState<string>(roleFromUrl);

  const [patients, setPatients] = useState<Patient[]>(initialPatientData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTier, setFilterTier] = useState<string>('ALL');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // Prescription Form State
  const [prescriptionForm, setPrescriptionForm] = useState({
    patientId: 'PAT-001',
    clembuterolDoseMcg: '20',
    omega3: '2000 mg/día (High-EPA)',
    magnesium: '400 mg/noche',
    protein: '2 Scoops diarios',
    water: '90-100 oz/día',
    fastingWindow: '10-12 Horas',
    clinicalNotes: 'Paciente responde adecuadamente a la estimulación mecánica.'
  });

  // Server Response & Security Feedback State
  const [apiResponse, setApiResponse] = useState<{
    status: 'idle' | 'loading' | 'success' | 'error';
    message?: string;
    details?: string[];
    auditSignature?: string;
    authTag?: string;
  }>({ status: 'idle' });

  // Audit Logs Store State
  const [auditLogs, setAuditLogs] = useState<any[]>([]);

  useEffect(() => {
    if (tabFromUrl) setActiveTab(tabFromUrl);
    if (roleFromUrl) setCurrentRole(roleFromUrl);
  }, [tabFromUrl, roleFromUrl]);

  // Fetch Audit Logs when tab is settings or overview
  const fetchAuditLogs = async () => {
    try {
      const res = await fetch(`/api/admin/audit-logs`, {
        headers: { 'x-user-role': currentRole },
      });
      const json = await res.json();
      if (json.success) {
        setAuditLogs(json.data);
      }
    } catch (e) {
      console.error('Error fetching audit logs', e);
    }
  };

  useEffect(() => {
    fetchAuditLogs();
  }, [currentRole, activeTab]);

  // Filter patients
  const filteredPatients = patients.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = filterTier === 'ALL' || p.tier === filterTier;
    return matchesSearch && matchesTier;
  });

  // Submit Prescription to Server API
  const handleSavePrescription = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiResponse({ status: 'loading' });

    try {
      const res = await fetch('/api/admin/protocols', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-role': currentRole,
        },
        body: JSON.stringify(prescriptionForm),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        setApiResponse({
          status: 'error',
          message: json.error || 'Acceso Denegado por la API del Servidor',
          details: json.details || [json.error],
        });
      } else {
        setApiResponse({
          status: 'success',
          message: `Protocolo emitido y cifrado con AES-256-GCM para el paciente ${prescriptionForm.patientId}`,
          auditSignature: json.auditLogSignature,
          authTag: json.security?.authTag,
        });
        fetchAuditLogs();
      }
    } catch (err: any) {
      setApiResponse({
        status: 'error',
        message: 'Fallo de conexión con el servidor',
        details: [err.message],
      });
    }
  };


  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Navigation Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-4 overflow-x-auto gap-4">
        <div className="flex items-center gap-2">
          {[
            { id: 'overview', label: 'Command Center', icon: LayoutDashboard },
            { id: 'patients', label: 'Pacientes & CRM', icon: Users },
            { id: 'protocols', label: 'Motor Prescripciones', icon: Pill },
            { id: 'bloodwork', label: 'Laboratorio & Sangre', icon: Activity },
            { id: 'sessions', label: 'Sesiones 1:1 & BJJ', icon: Calendar },
            { id: 'pricing', label: 'Precios & Tarifas USD', icon: DollarSign },
            { id: 'users', label: 'Usuarios & Roles Clerk', icon: UserPlus },
            { id: 'settings', label: 'Auditoría & RBAC', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-vital-accent text-white shadow-lg'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Live RBAC Role Selector Component */}
        <div className="flex items-center gap-2 bg-black/60 border border-vital-accent/40 px-3 py-1.5 rounded-xl shrink-0">
          <Lock className="w-3.5 h-3.5 text-vital-accent" />
          <span className="text-[10px] uppercase font-bold text-gray-400">Prueba RBAC Servidor:</span>
          <select
            value={currentRole}
            onChange={(e) => setCurrentRole(e.target.value)}
            className="bg-vital-dark text-vital-accent font-bold text-xs border border-white/20 rounded px-2 py-1 focus:outline-none"
          >
            <option value="HEAD_COACH">HEAD_COACH (Alex)</option>
            <option value="CLINICAL_STAFF">CLINICAL_STAFF (Péptidos)</option>
            <option value="BJJ_INSTRUCTOR">BJJ_INSTRUCTOR (No autorizado para fármacos)</option>
          </select>
        </div>
      </div>

      {/* TAB 1: EXECUTIVE OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          
          {/* GA Security Status Banner */}
          <div className="bg-gradient-to-r from-gray-900 via-vital-dark to-gray-900 border border-vital-accent/30 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-vital-accent/20 border border-vital-accent flex items-center justify-center text-vital-accent font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white text-base">Estado de Seguridad de Producción GA (General Availability)</h3>
                  <span className="px-2.5 py-0.5 bg-green-500/20 border border-green-500/40 text-green-400 text-[10px] font-extrabold rounded uppercase">
                    🟢 Servidor Verificado
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  RBAC Autorizado por API • Encriptación AES-256-GCM • Registro Cryptográfico SHA-256 • Umbrales de Seguridad Clínica Activos
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-black/50 border border-white/10 px-4 py-2 rounded-xl text-center">
                <p className="text-[10px] text-gray-400 font-bold uppercase">Cifrado de Expedientes</p>
                <p className="text-xs font-mono font-bold text-vital-accent mt-0.5">AES-256-GCM Active</p>
              </div>
              <div className="bg-black/50 border border-white/10 px-4 py-2 rounded-xl text-center">
                <p className="text-[10px] text-gray-400 font-bold uppercase">Audit Logs SHA-256</p>
                <p className="text-xs font-mono font-bold text-green-400 mt-0.5">{auditLogs.length} Entradas</p>
              </div>
            </div>
          </div>

          {/* Executive KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Ingreso Mensual (MRR)</span>
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <p className="text-4xl font-black font-heading text-white">$8,186 <span className="text-xs font-normal text-gray-400">USD</span></p>
              <p className="text-[11px] text-green-400 font-semibold mt-2 flex items-center gap-1">
                ↑ +18% vs mes anterior (Panamá High-Ticket)
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Atletas VIP 1:1 Activos</span>
                <div className="w-8 h-8 rounded-lg bg-vital-accent/20 flex items-center justify-center text-vital-accent">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <p className="text-4xl font-black font-heading text-vital-accent">8 <span className="text-xs font-normal text-gray-400">Pacientes</span></p>
              <p className="text-[11px] text-gray-400 font-light mt-2">
                3x Clases Presenciales/Sem (Capacidad 85%)
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Exámenes por Revisar</span>
                <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center text-yellow-400">
                  <Activity className="w-4 h-4" />
                </div>
              </div>
              <p className="text-4xl font-black font-heading text-yellow-400">2 <span className="text-xs font-normal text-gray-400">Labs</span></p>
              <p className="text-[11px] text-yellow-400 font-semibold mt-2">
                Requieren revisión endocrina de Alex
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Miembros 507 BJJ Club</span>
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <Award className="w-4 h-4" />
                </div>
              </div>
              <p className="text-4xl font-black font-heading text-white">32 <span className="text-xs font-normal text-gray-400">Atletas</span></p>
              <p className="text-[11px] text-gray-400 font-light mt-2">
                Clases técnicas de Jiu-Jitsu Activas
              </p>
            </div>
          </div>

          {/* Actionable Roster & Schedule */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-black font-heading uppercase text-white">
                  Atletas en Seguimiento Prioritario
                </h3>
                <button
                  onClick={() => setActiveTab('patients')}
                  className="text-xs font-bold uppercase tracking-wider text-vital-accent hover:underline"
                >
                  Ver Todos ({patients.length})
                </button>
              </div>

              <div className="space-y-3">
                {patients.map((p) => (
                  <div key={p.id} className="bg-black/40 border border-white/10 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{p.name}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 bg-white/10 rounded text-gray-300">
                          {p.id}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">{p.tier} • Último check-in: {p.lastCheckin}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right hidden sm:block">
                        <p className="text-xs font-mono font-bold text-vital-accent">Total T: {p.totalT} ng/dL</p>
                        <p className="text-[10px] text-gray-400">Free T: {p.freeT} pg/mL</p>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedPatient(p);
                          setActiveTab('patients');
                        }}
                        className="px-3 py-1.5 bg-vital-accent/20 hover:bg-vital-accent text-vital-accent hover:text-white border border-vital-accent/40 rounded-lg text-xs font-bold transition-all"
                      >
                        Ver Perfil
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coach Daily Schedule */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-black font-heading uppercase text-white mb-6">
                Agenda 1:1 de Hoy (Gym Alex)
              </h3>

              <div className="space-y-4">
                <div className="p-4 bg-vital-accent/10 border-l-4 border-vital-accent rounded-r-xl">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-sm text-white">Carlos Mendoza</span>
                    <span className="text-xs font-mono font-bold text-vital-accent">7:00 AM</span>
                  </div>
                  <p className="text-xs text-gray-300">Sesión 1:1 Fuerza & Recomposición (Día 1)</p>
                  <span className="inline-block mt-2 text-[10px] px-2 py-0.5 bg-vital-accent text-white font-bold rounded">
                    Check-in QR Completado
                  </span>
                </div>

                <div className="p-4 bg-white/5 border-l-4 border-gray-500 rounded-r-xl">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-sm text-white">Mariana Ríos</span>
                    <span className="text-xs font-mono font-bold text-gray-400">8:30 AM</span>
                  </div>
                  <p className="text-xs text-gray-400">Sesión 1:1 Tensión Mecánica (Día 2)</p>
                  <span className="inline-block mt-2 text-[10px] px-2 py-0.5 bg-white/10 text-gray-400 font-bold rounded">
                    Próxima
                  </span>
                </div>

                <div className="p-4 bg-white/5 border-l-4 border-blue-500 rounded-r-xl">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-sm text-white">507 BJJ Club Sparring</span>
                    <span className="text-xs font-mono font-bold text-blue-400">6:00 PM</span>
                  </div>
                  <p className="text-xs text-gray-400">Clase de Jiu-Jitsu Técnico & Rolling</p>
                  <span className="inline-block mt-2 text-[10px] px-2 py-0.5 bg-blue-500/20 text-blue-400 font-bold rounded">
                    18 Confirmados
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: PATIENTS & CRM */}
      {activeTab === 'patients' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-black font-heading uppercase text-white">
                Directorio de Atletas & Pacientes
              </h3>
              <p className="text-xs text-gray-400">Gestión de expedientes, estados de membresía y analíticas clínicas</p>
            </div>
            <button className="px-4 py-2.5 bg-vital-accent text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center gap-2 shadow-lg">
              <UserPlus className="w-4 h-4" /> Registrar Nuevo Atleta
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 bg-white/5 border border-white/10 p-4 rounded-xl">
            <div className="flex-1 flex items-center gap-2 bg-black/40 px-3 py-2 rounded-lg border border-white/10">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre o ID de expediente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent text-xs text-white placeholder-gray-500 focus:outline-none w-full"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={filterTier}
                onChange={(e) => setFilterTier(e.target.value)}
                className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs font-bold text-gray-300 focus:outline-none"
              >
                <option value="ALL">Todos los Planes</option>
                <option value="Prime Elite 1:1 VIP">Prime Elite 1:1 VIP</option>
                <option value="Prime Hybrid">Prime Hybrid</option>
                <option value="Prime Hormonal Remote">Prime Hormonal Remote</option>
                <option value="507 BJJ Club">507 BJJ Club</option>
              </select>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400 uppercase tracking-wider text-[10px] bg-black/40">
                    <th className="p-4 font-bold">ID / Atleta</th>
                    <th className="p-4 font-bold">Programa & Tier</th>
                    <th className="p-4 font-bold">Teléfono / Contacto</th>
                    <th className="p-4 font-bold">Testosterona (Tot/Libre)</th>
                    <th className="p-4 font-bold">Ingreso MRR</th>
                    <th className="p-4 font-bold">Estado</th>
                    <th className="p-4 font-bold text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-gray-300">
                  {filteredPatients.map((p) => (
                    <tr key={p.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4">
                        <p className="font-bold text-white text-sm">{p.name}</p>
                        <p className="text-[10px] font-mono text-gray-400">{p.id}</p>
                      </td>
                      <td className="p-4 font-semibold text-vital-accent">{p.tier}</td>
                      <td className="p-4">{p.phone}</td>
                      <td className="p-4 font-mono font-bold text-white">
                        {p.totalT} ng/dL <span className="text-gray-400">({p.freeT} pg/mL)</span>
                      </td>
                      <td className="p-4 font-black font-heading text-green-400">${p.mrrUSD} USD</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase border ${
                          p.status === 'ACTIVE'
                            ? 'bg-green-500/20 text-green-400 border-green-500/40'
                            : p.status === 'PENDING_LABS'
                            ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40'
                            : 'bg-red-500/20 text-red-400 border-red-500/40'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => setSelectedPatient(p)}
                          className="px-3 py-1.5 bg-white/10 hover:bg-vital-accent text-white rounded text-[10px] font-bold uppercase transition-all"
                        >
                          Expediente
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PRESCRIPTION ENGINE (WITH LIVE SERVER RBAC & CLINICAL DOSAGE CHECK) */}
      {activeTab === 'protocols' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-vital-dark via-gray-900 to-vital-dark border border-white/10 p-8 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-black font-heading uppercase text-white">
                  Motor de Prescripción de Protocolos (12 Semanas)
                </h3>
                <p className="text-xs text-gray-400 font-light">
                  Emita y ajuste la pila de farmacología y péptidos. (Protegido por RBAC del servidor + Validador Clínico)
                </p>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 bg-vital-accent/20 border border-vital-accent/40 rounded text-vital-accent">
                Rol Servidor: {currentRole}
              </span>
            </div>

            {/* Server Feedback Banner */}
            {apiResponse.status === 'success' && (
              <div className="mb-6 p-5 bg-green-500/20 border border-green-500/50 text-green-300 rounded-xl space-y-2 animate-in fade-in">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span>{apiResponse.message}</span>
                </div>
                {apiResponse.auditSignature && (
                  <p className="text-[11px] font-mono text-gray-300">
                    🔒 SHA-256 Audit Signature: <span className="text-vital-accent">{apiResponse.auditSignature}</span>
                  </p>
                )}
                {apiResponse.authTag && (
                  <p className="text-[11px] font-mono text-gray-300">
                    🔑 AES-256-GCM AuthTag: <span className="text-green-400">{apiResponse.authTag}</span>
                  </p>
                )}
              </div>
            )}

            {apiResponse.status === 'error' && (
              <div className="mb-6 p-5 bg-red-500/20 border border-red-500/50 text-red-300 rounded-xl space-y-2 animate-in fade-in">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <span>{apiResponse.message}</span>
                </div>
                {apiResponse.details && apiResponse.details.length > 0 && (
                  <ul className="list-disc list-inside text-xs space-y-1 font-mono text-red-200">
                    {apiResponse.details.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <form onSubmit={handleSavePrescription} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Seleccionar Atleta Target</label>
                  <select
                    value={prescriptionForm.patientId}
                    onChange={(e) => setPrescriptionForm({ ...prescriptionForm, patientId: e.target.value })}
                    className="w-full bg-black/50 border border-white/20 rounded-xl p-3 text-xs font-bold text-white focus:outline-none focus:border-vital-accent"
                  >
                    {patients.map((p) => (
                      <option key={p.id} value={p.id}>{p.name} ({p.tier})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Ventana de Ayuno Target</label>
                  <input
                    type="text"
                    value={prescriptionForm.fastingWindow}
                    onChange={(e) => setPrescriptionForm({ ...prescriptionForm, fastingWindow: e.target.value })}
                    className="w-full bg-black/50 border border-white/20 rounded-xl p-3 text-xs font-bold text-white focus:outline-none focus:border-vital-accent"
                  />
                </div>
              </div>

              {/* Dosage Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/10">
                <div>
                  <label className="block text-xs font-bold uppercase text-vital-accent mb-2">
                    Dosis Clembuterol (mcg/día) — Max 40 mcg
                  </label>
                  <input
                    type="number"
                    value={prescriptionForm.clembuterolDoseMcg}
                    onChange={(e) => setPrescriptionForm({ ...prescriptionForm, clembuterolDoseMcg: e.target.value })}
                    placeholder="20"
                    className="w-full bg-black/50 border border-white/20 rounded-xl p-3 text-xs font-bold text-white focus:outline-none focus:border-vital-accent"
                  />
                  <p className="text-[10px] text-gray-400 mt-1">Prueba introducir 50 para testear rechazo de dosis del servidor.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-vital-accent mb-2">Omega 3 High-EPA</label>
                  <input
                    type="text"
                    value={prescriptionForm.omega3}
                    onChange={(e) => setPrescriptionForm({ ...prescriptionForm, omega3: e.target.value })}
                    className="w-full bg-black/50 border border-white/20 rounded-xl p-3 text-xs font-bold text-white focus:outline-none focus:border-vital-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-vital-accent mb-2">Magnesio Nocturno</label>
                  <input
                    type="text"
                    value={prescriptionForm.magnesium}
                    onChange={(e) => setPrescriptionForm({ ...prescriptionForm, magnesium: e.target.value })}
                    className="w-full bg-black/50 border border-white/20 rounded-xl p-3 text-xs font-bold text-white focus:outline-none focus:border-vital-accent"
                  />
                </div>
              </div>

              {/* Notes to Encrypt */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-2">
                  Notas Clínicas Confidenciales (Serán Cifradas en Servidor con AES-256-GCM)
                </label>
                <textarea
                  value={prescriptionForm.clinicalNotes}
                  onChange={(e) => setPrescriptionForm({ ...prescriptionForm, clinicalNotes: e.target.value })}
                  rows={3}
                  className="w-full bg-black/50 border border-white/20 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-vital-accent font-mono"
                />
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <div className="text-[11px] text-gray-400 font-mono">
                  🔑 AES-256-GCM Engine Ready • SHA-256 Audit Active
                </div>
                <button
                  type="submit"
                  disabled={apiResponse.status === 'loading'}
                  className="px-8 py-4 bg-vital-accent text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-white hover:text-vital-dark transition-all shadow-xl disabled:opacity-50"
                >
                  {apiResponse.status === 'loading' ? 'Enviando a API...' : 'Emitir Protocolo (Verificar en Servidor)'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 4: BLOODWORK DIAGNOSTICS */}
      {activeTab === 'bloodwork' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-black font-heading uppercase text-white">
                Centro de Diagnóstico & Exámenes de Sangre
              </h3>
              <p className="text-xs text-gray-400">Revisión endocrina de marcadores de salud masculina y metabólica</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-yellow-500/30 p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-yellow-400 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" /> Laboratorio Pendiente de Revisión
                </span>
                <span className="text-[10px] text-gray-400">Subido hace 2 horas</span>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Mariana Ríos (Novata VIP 1:1)</h4>
              <p className="text-xs text-gray-300 mb-4">
                Testosterona Libre: 1.1 pg/mL • Hba1c: 5.6% • Estradiol: 85 pg/mL
              </p>
              <button className="w-full py-3 bg-vital-accent text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-white hover:text-vital-dark transition-all">
                Revisar Examen en API & Registrar Firma Cryptográfica
              </button>
            </div>

            <div className="bg-white/5 border border-green-500/30 p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-green-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Examen Aprobado
                </span>
                <span className="text-[10px] text-gray-400">Aprobado Ayer</span>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Roberto Varela (Avanzado Remoto)</h4>
              <p className="text-xs text-gray-300 mb-4">
                Testosterona Total: 840 ng/dL • Testosterona Libre: 24.5 pg/mL • Estradiol: 29 pg/mL
              </p>
              <button className="w-full py-3 bg-white/10 text-gray-300 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-white/20 transition-all">
                Ver Histórico de Laboratorios
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: 1:1 SESSIONS & BJJ */}
      {activeTab === 'sessions' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-black font-heading uppercase text-white">
                Gestión de Clases 1:1 & 507 BJJ Club
              </h3>
              <p className="text-xs text-gray-400">Control de cupos presenciales en la instalación de Alex en Panamá</p>
            </div>
            <button className="px-4 py-2.5 bg-vital-accent text-white text-xs font-bold uppercase tracking-wider rounded-xl">
              + Abrir Nuevo Horario 1:1
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <h4 className="text-base font-bold font-heading uppercase text-white mb-4">
                Bloques 1:1 de Mañana (Gym Alex)
              </h4>
              <div className="space-y-3 text-xs">
                <div className="p-4 bg-black/40 border border-white/10 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white">07:00 AM - 08:00 AM</p>
                    <p className="text-gray-400">Atleta: Carlos Mendoza (Novato 1:1)</p>
                  </div>
                  <span className="px-2.5 py-1 bg-green-500/20 text-green-400 font-bold rounded text-[10px]">Reservado</span>
                </div>

                <div className="p-4 bg-black/40 border border-white/10 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white">08:30 AM - 09:30 AM</p>
                    <p className="text-gray-400">Atleta: Mariana Ríos (Novata 1:1)</p>
                  </div>
                  <span className="px-2.5 py-1 bg-green-500/20 text-green-400 font-bold rounded text-[10px]">Reservado</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <h4 className="text-base font-bold font-heading uppercase text-white mb-4">
                Horarios 507 BJJ Club
              </h4>
              <div className="space-y-3 text-xs">
                <div className="p-4 bg-black/40 border border-white/10 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white">06:00 PM - 07:30 PM</p>
                    <p className="text-gray-400">Jiu-Jitsu Técnico & Sparring (Todos los niveles)</p>
                  </div>
                  <span className="px-2.5 py-1 bg-blue-500/20 text-blue-400 font-bold rounded text-[10px]">18 Atletas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: PRICING ENGINE */}
      {activeTab === 'pricing' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-black font-heading uppercase text-white">
                Motor de Precios & Membresías (Panamá USD)
              </h3>
              <p className="text-xs text-gray-400">Control de tarifas y pasarelas de pago</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <h4 className="font-bold text-white text-base mb-1">Prime Hormonal Remote</h4>
              <p className="text-3xl font-black text-vital-accent font-heading mb-4">$299 USD/mes</p>
              <p className="text-xs text-gray-400">6 Atletas Activos ($1,794 USD/mes)</p>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <h4 className="font-bold text-white text-base mb-1">Prime Hybrid</h4>
              <p className="text-3xl font-black text-vital-accent font-heading mb-4">$499 USD/mes</p>
              <p className="text-xs text-gray-400">1 Atleta Activo ($499 USD/mes)</p>
            </div>

            <div className="bg-white/5 border border-vital-accent/40 p-6 rounded-2xl">
              <h4 className="font-bold text-white text-base mb-1">Prime Elite 1:1 VIP</h4>
              <p className="text-3xl font-black text-vital-accent font-heading mb-4">$799 USD/mes</p>
              <p className="text-xs text-gray-400">7 Atletas Activos ($5,593 USD/mes)</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: SETTINGS & AUDIT LOGS */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-bold font-heading uppercase text-white">
                  Registro Cryptográfico de Auditoría (SHA-256 Signed Audit Trail)
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Pista inmutable de acciones administrativas, modificaciones de protocolo y rechazos de seguridad del servidor.
                </p>
              </div>
              <button
                onClick={fetchAuditLogs}
                className="px-4 py-2 bg-vital-accent text-white text-xs font-bold uppercase rounded-lg hover:bg-white hover:text-vital-dark transition-all"
              >
                Actualizar Logs
              </button>
            </div>

            {/* Audit Trail List */}
            <div className="space-y-3 font-mono text-xs">
              {auditLogs.length === 0 ? (
                <p className="text-gray-500 py-4 text-center">No hay registros de auditoría aún. Emita un protocolo para generar entradas auditables.</p>
              ) : (
                auditLogs.map((log) => (
                  <div key={log.id} className="bg-black/60 border border-white/10 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          log.action.includes('DENIED') ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-green-500/20 text-green-400 border border-green-500/40'
                        }`}>
                          {log.action}
                        </span>
                        <span className="text-white font-bold">{log.actorUserId} ({log.actorRole})</span>
                        <span className="text-gray-400">→ Resource: {log.resourceId}</span>
                      </div>
                      <p className="text-gray-300 text-xs font-sans">{log.details}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-[10px] text-gray-400">{new Date(log.timestamp).toLocaleTimeString()}</p>
                      <p className="text-[9px] text-vital-accent font-mono truncate max-w-xs">
                        Sig: {log.signature.substring(0, 16)}...
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: USERS & CLERK ROLES MANAGEMENT */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-bold font-heading uppercase text-white flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-vital-accent" />
                  <span>Gestión de Usuarios & Asignación de Roles Clerk</span>
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Administre permisos RBAC, configure metadata pública de Clerk y otorgue roles administrativos a entrenadores y personal clínico.
                </p>
              </div>
              <div className="bg-vital-accent/10 border border-vital-accent/30 px-3 py-2 rounded-xl flex items-center gap-2 text-xs text-vital-accent">
                <ShieldCheck className="w-4 h-4" />
                <span className="font-bold uppercase text-[10px]">Clerk Sync API: Activa</span>
              </div>
            </div>

            {/* Quick Metadata Copy Helper Banner */}
            <div className="bg-black/60 border border-vital-accent/30 p-4 rounded-xl mb-6">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                <Key className="w-4 h-4 text-vital-accent" />
                <span>Instrucciones para primer Administrador (Clerk Dashboard or cURL)</span>
              </h4>
              <p className="text-xs text-gray-300 mb-3">
                Para otorgar rol de <strong>HEAD_COACH</strong> a su usuario recién registrado en Clerk Dashboard:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] font-mono">
                <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                  <span className="text-vital-accent font-bold block mb-1">Opción A: Clerk Public Metadata (JSON)</span>
                  <pre className="text-gray-300 bg-black/80 p-2 rounded border border-white/5 font-mono overflow-x-auto">
{`{
  "role": "HEAD_COACH"
}`}
                  </pre>
                </div>
                <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                  <span className="text-vital-accent font-bold block mb-1">Opción B: cURL Direct API</span>
                  <pre className="text-gray-300 bg-black/80 p-2 rounded border border-white/5 font-mono overflow-x-auto text-[10px]">
{`curl -X PATCH "https://api.clerk.com/v1/users/USER_ID" \\
  -H "Authorization: Bearer SECRET_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"public_metadata":{"role":"HEAD_COACH"}}'`}
                  </pre>
                </div>
              </div>
            </div>

            {/* Staff Users List Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400 font-mono text-[10px] uppercase">
                    <th className="py-3 px-4">Usuario / Email</th>
                    <th className="py-3 px-4">Clerk User ID</th>
                    <th className="py-3 px-4">Rol Asignado</th>
                    <th className="py-3 px-4">Permisos Matriz</th>
                    <th className="py-3 px-4 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { id: 'usr_head_coach_001', name: 'Alejandro Sánchez Galán', email: 'alex@vitalstrength.pa', role: 'HEAD_COACH', permissions: ['Todas las Funciones', 'Prescripciones', 'Finanzas', 'RBAC'] },
                    { id: 'usr_clinical_002', name: 'Dra. Elena Ruiz', email: 'elena@vitalstrength.pa', role: 'CLINICAL_STAFF', permissions: ['Prescripciones', 'Laboratorios', 'PII Sangre'] },
                    { id: 'usr_bjj_003', name: 'Prof. Marcos Silva', email: 'marcos@vitalstrength.pa', role: 'BJJ_INSTRUCTOR', permissions: ['Sesiones 1:1', 'Combate Sparring'] },
                  ].map((st) => (
                    <tr key={st.id} className="hover:bg-white/5 transition-all">
                      <td className="py-3 px-4">
                        <p className="font-bold text-white">{st.name}</p>
                        <p className="text-[11px] text-gray-400 font-mono">{st.email}</p>
                      </td>
                      <td className="py-3 px-4 font-mono text-gray-400 text-[10px]">{st.id}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${
                          st.role === 'HEAD_COACH' ? 'bg-vital-accent/20 text-vital-accent border-vital-accent/40' :
                          st.role === 'CLINICAL_STAFF' ? 'bg-blue-500/20 text-blue-400 border-blue-500/40' :
                          'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                        }`}>
                          {st.role}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {st.permissions.map((pm, i) => (
                            <span key={i} className="bg-white/5 text-gray-300 text-[9px] px-1.5 py-0.5 rounded">
                              {pm}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={async () => {
                            setApiResponse({ status: 'loading' });
                            try {
                              const res = await fetch('/api/admin/users', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json', 'x-user-role': currentRole },
                                body: JSON.stringify({ userId: st.id, role: st.role }),
                              });
                              const json = await res.json();
                              if (json.success) {
                                setApiResponse({ status: 'success', message: json.message, auditSignature: json.data?.auditSignature });
                              } else {
                                setApiResponse({ status: 'error', message: json.error });
                              }
                            } catch (err: any) {
                              setApiResponse({ status: 'error', message: err.message });
                            }
                          }}
                          className="px-3 py-1 bg-vital-accent/20 hover:bg-vital-accent text-vital-accent hover:text-white border border-vital-accent/40 text-[10px] font-bold uppercase rounded-lg transition-all"
                        >
                          Sincronizar Role
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={
      <div className="p-8 text-center text-gray-400">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-vital-accent mx-auto mb-4"></div>
        <p className="text-xs uppercase font-bold tracking-widest">Cargando Admin Command Suite VSP Prime...</p>
      </div>
    }>
      <AdminDashboardContent />
    </Suspense>
  );
}
