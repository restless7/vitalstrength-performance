'use client';

import { useState } from 'react';
import { Shield, User, Activity, Calendar, Pill, CheckCircle2, AlertCircle, FileText, ChevronRight, Zap, Clock, Droplets, Dumbbell, Award, Plus, Lock, RefreshCw, BarChart2 } from 'lucide-react';

export type UserRole = 'HEAD_COACH' | 'CLIENT_VIP_1ON1' | 'CLIENT_ADVANCED';

export interface PatientRecord {
  id: string;
  name: string;
  role: UserRole;
  goal: string;
  tier: string;
  totalTestosterone: number; // ng/dL
  freeTestosterone: number; // pg/mL
  estradiol: number; // pg/mL
  shbg: number; // nmol/L
  hba1c: number; // %
  sessionsRemaining: number;
  protocolStatus: 'ACTIVE' | 'PENDING_LABS' | 'COMPLETED';
}

export const initialPatients: PatientRecord[] = [
  {
    id: 'p-1',
    name: 'Carlos Mendoza',
    role: 'CLIENT_VIP_1ON1',
    goal: 'Recomposición Corporal Novato (3x/sem 1:1)',
    tier: 'Prime Elite VIP 1:1 ($799/mes)',
    totalTestosterone: 310,
    freeTestosterone: 6.8,
    estradiol: 38,
    shbg: 42,
    hba1c: 5.8,
    sessionsRemaining: 10,
    protocolStatus: 'ACTIVE'
  },
  {
    id: 'p-2',
    name: 'Roberto Varela',
    role: 'CLIENT_ADVANCED',
    goal: 'Optimización Masculina Remota (Avanzado)',
    tier: 'Prime Hormonal Protocol ($299/mes)',
    totalTestosterone: 420,
    freeTestosterone: 9.1,
    estradiol: 29,
    shbg: 35,
    hba1c: 5.4,
    sessionsRemaining: 0,
    protocolStatus: 'ACTIVE'
  },
  {
    id: 'p-3',
    name: 'Mariana Ríos',
    role: 'CLIENT_VIP_1ON1',
    goal: 'Reinicio Metabólico & Fuerza (Novata 1:1)',
    tier: 'Prime Elite VIP 1:1 ($799/mes)',
    totalTestosterone: 28,
    freeTestosterone: 1.1,
    estradiol: 85,
    shbg: 55,
    hba1c: 5.6,
    sessionsRemaining: 11,
    protocolStatus: 'ACTIVE'
  }
];

export default function ClientPortal() {
  const [currentRole, setCurrentRole] = useState<UserRole>('CLIENT_VIP_1ON1');
  const [activeTab, setActiveTab] = useState<'protocol' | 'bloodwork' | 'sessions' | 'coach_panel'>('protocol');

  // Dynamic user data based on role
  const isCoach = currentRole === 'HEAD_COACH';
  const isVip = currentRole === 'CLIENT_VIP_1ON1';
  const isAdvanced = currentRole === 'CLIENT_ADVANCED';

  return (
    <div className="min-h-screen bg-vital-dark text-white font-sans">
      
      {/* Top Bar Navigation & RBAC Role Switcher */}
      <header className="border-b border-white/10 bg-black/60 sticky top-0 z-40 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo Brand Header */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-vital-accent flex items-center justify-center font-black font-heading text-white">
              VSP
            </div>
            <div>
              <h1 className="font-black font-heading tracking-wider uppercase text-base flex items-center gap-2">
                <span>VSP PRIME</span>
                <span className="text-[10px] px-2 py-0.5 bg-vital-accent/20 border border-vital-accent/40 rounded text-vital-accent font-bold">
                  CLIENT PORTAL (RBAC)
                </span>
              </h1>
              <p className="text-[11px] text-gray-400 font-light">Alejandro Sanchez Galan — Head Coach System</p>
            </div>
          </div>

          {/* Role Switcher Demo Controller */}
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-1.5 rounded-xl">
            <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400 px-2 flex items-center gap-1">
              <Lock className="w-3 h-3 text-vital-accent" /> Simular Rol:
            </span>

            <button
              onClick={() => {
                setCurrentRole('CLIENT_VIP_1ON1');
                setActiveTab('protocol');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                isVip ? 'bg-vital-accent text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              Novato VIP (1:1)
            </button>

            <button
              onClick={() => {
                setCurrentRole('CLIENT_ADVANCED');
                setActiveTab('protocol');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                isAdvanced ? 'bg-vital-accent text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              Avanzado Remoto
            </button>

            <button
              onClick={() => {
                setCurrentRole('HEAD_COACH');
                setActiveTab('coach_panel');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                isCoach ? 'bg-white text-vital-dark font-black shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              Head Coach (Alex)
            </button>
          </div>

        </div>
      </header>

      {/* Main Portal Body */}
      <main className="container mx-auto px-6 py-10">
        
        {/* User Context Banner */}
        <div className="mb-10 bg-gradient-to-r from-vital-dark via-gray-900 to-vital-dark border border-white/10 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-vital-accent/20 border-2 border-vital-accent flex items-center justify-center text-vital-accent font-black text-xl">
              {isCoach ? 'AS' : isVip ? 'CM' : 'RV'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black font-heading uppercase">
                  {isCoach ? 'Alejandro Sanchez Galan' : isVip ? 'Carlos Mendoza' : 'Roberto Varela'}
                </h2>
                <span className="px-2.5 py-0.5 bg-vital-accent text-white text-[10px] font-extrabold uppercase rounded-full">
                  {isCoach ? 'HEAD COACH ADMIN' : isVip ? 'MIRAFLORES VIP 1:1' : 'REMOTE ADVANCED'}
                </span>
              </div>
              <p className="text-xs text-gray-400 font-light mt-1">
                {isCoach
                  ? 'Supervisando 14 atletas activos en Panamá — Módulos Endocrinos & 1:1'
                  : isVip
                  ? 'Programa: Prime Elite 1:1 VIP — 3x Sesiones Presenciales/Semana (Gym Alex)'
                  : 'Programa: Prime Hormonal Protocol — Optimización Masculina Remota'}
              </p>
            </div>
          </div>

          {/* Key Stats Widgets */}
          <div className="flex items-center gap-4">
            {!isCoach && (
              <>
                <div className="bg-black/40 border border-white/10 px-4 py-3 rounded-xl text-center">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Estado Protocolo</p>
                  <p className="text-sm font-black text-vital-accent flex items-center gap-1 justify-center mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Semana 4 de 12
                  </p>
                </div>

                {isVip && (
                  <div className="bg-black/40 border border-white/10 px-4 py-3 rounded-xl text-center">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Clases 1:1 Disponibles</p>
                    <p className="text-sm font-black text-white mt-0.5">10 Sesiones</p>
                  </div>
                )}
              </>
            )}

            {isCoach && (
              <div className="bg-black/40 border border-white/10 px-4 py-3 rounded-xl text-center">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Atletas Activos</p>
                <p className="text-sm font-black text-vital-accent mt-0.5">14 Pacientes</p>
              </div>
            )}
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="flex items-center gap-3 border-b border-white/10 mb-8 overflow-x-auto pb-2">
          {isCoach && (
            <button
              onClick={() => setActiveTab('coach_panel')}
              className={`px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all ${
                activeTab === 'coach_panel'
                  ? 'bg-vital-accent text-white shadow-lg'
                  : 'text-gray-400 hover:text-white bg-white/5'
              }`}
            >
              <Shield className="w-4 h-4" /> Panel Head Coach
            </button>
          )}

          <button
            onClick={() => setActiveTab('protocol')}
            className={`px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all ${
              activeTab === 'protocol'
                ? 'bg-vital-accent text-white shadow-lg'
                : 'text-gray-400 hover:text-white bg-white/5'
            }`}
          >
            <Pill className="w-4 h-4" /> Protocolo 12 Semanas
          </button>

          <button
            onClick={() => setActiveTab('bloodwork')}
            className={`px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all ${
              activeTab === 'bloodwork'
                ? 'bg-vital-accent text-white shadow-lg'
                : 'text-gray-400 hover:text-white bg-white/5'
            }`}
          >
            <Activity className="w-4 h-4" /> Analíticas de Sangre
          </button>

          {(isVip || isCoach) && (
            <button
              onClick={() => setActiveTab('sessions')}
              className={`px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all ${
                activeTab === 'sessions'
                  ? 'bg-vital-accent text-white shadow-lg'
                  : 'text-gray-400 hover:text-white bg-white/5'
              }`}
            >
              <Calendar className="w-4 h-4" /> Clases 1:1 Presenciales
            </button>
          )}
        </div>

        {/* TAB 1: PROTOCOL DECK (12-WEEK SUPPLEMENT & HORMONE SHEET) */}
        {activeTab === 'protocol' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Header Protocol Title Card */}
            <div className="bg-gradient-to-r from-gray-900 via-vital-dark to-gray-900 border border-white/10 p-8 rounded-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
                <div>
                  <h3 className="text-3xl font-black font-heading uppercase text-white tracking-tight">
                    PROTOCOLO DE 12 SEMANAS
                  </h3>
                  <p className="text-xs text-vital-accent font-bold uppercase tracking-widest mt-1">
                    Guía de Suplementación, Farmacología & Optimización Metabólica
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs bg-white/10 border border-white/10 text-gray-300 px-3 py-1.5 rounded-lg font-mono">
                    ID: VSP-PROT-2026-X
                  </span>
                  <button className="px-4 py-2 bg-vital-accent text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-white hover:text-vital-dark transition-all">
                    Descargar PDF
                  </button>
                </div>
              </div>

              {/* Mechanism of Action Box */}
              <div className="bg-black/50 border border-vital-accent/30 p-6 rounded-xl mb-8">
                <h4 className="text-xs font-bold uppercase tracking-widest text-vital-accent mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Mecanismo de Acción & Fundamento Fisiológico
                </h4>
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  El protocolo activo promueve la lipólisis muscular profunda, mejora la captación de glucosa mediante sensibilización de receptores GLUT4 y optimiza la partición de nutrientes, aumentando el gasto energético en reposo mientras protege el tejido magro.
                </p>
              </div>

              {/* Key Dosage Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-1">Dosis Diaria Principal</p>
                  <p className="text-2xl font-black text-vital-accent font-heading">20 mcg</p>
                  <p className="text-[11px] text-gray-400 mt-1">En ayunas (Mañanas) — Semanas 1 a 12</p>
                </div>

                <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-1">Ventana de Ayuno</p>
                  <p className="text-2xl font-black text-white font-heading">10 - 12 Horas</p>
                  <p className="text-[11px] text-gray-400 mt-1">Optimización del sustrato energético (Grasas)</p>
                </div>

                <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-1">Hidratación Target</p>
                  <p className="text-2xl font-black text-white font-heading">90 - 100 oz</p>
                  <p className="text-[11px] text-gray-400 mt-1">Consumo constante de agua diario recomendado</p>
                </div>
              </div>

              {/* Strategy Stack Table */}
              <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
                Estrategia Diaria & Complementos Prescritos
              </h4>

              <div className="space-y-3">
                {/* Item 1 */}
                <div className="bg-black/40 border border-white/10 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-32 text-xs font-black font-heading text-vital-accent uppercase border-r border-white/10 pr-3">
                      CLEMBUTEROL
                    </span>
                    <div>
                      <p className="text-xs font-bold text-white">20 mcg / día</p>
                      <p className="text-[11px] text-gray-400 font-light">Tomar al despertar en ayunas durante las semanas 1 a 12.</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2.5 py-1 bg-vital-accent/20 text-vital-accent rounded font-bold uppercase shrink-0">
                    Activo Semanas 1-12
                  </span>
                </div>

                {/* Item 2 */}
                <div className="bg-black/40 border border-white/10 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-32 text-xs font-black font-heading text-white uppercase border-r border-white/10 pr-3">
                      OMEGA 3
                    </span>
                    <div>
                      <p className="text-xs font-bold text-white">Dosis Estándar High-EPA</p>
                      <p className="text-[11px] text-gray-400 font-light">Mejora la permeabilidad celular, reduce perímetro abdominal y regula triglicéridos.</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2.5 py-1 bg-white/10 text-gray-300 rounded font-bold uppercase shrink-0">
                    Diario
                  </span>
                </div>

                {/* Item 3 */}
                <div className="bg-black/40 border border-white/10 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-32 text-xs font-black font-heading text-white uppercase border-r border-white/10 pr-3">
                      MAGNESIO
                    </span>
                    <div>
                      <p className="text-xs font-bold text-white">200mg - 400mg / día</p>
                      <p className="text-[11px] text-gray-400 font-light">Tomar preferiblemente antes de dormir para descanso y función neuromuscular.</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2.5 py-1 bg-white/10 text-gray-300 rounded font-bold uppercase shrink-0">
                    Noche
                  </span>
                </div>

                {/* Item 4 */}
                <div className="bg-black/40 border border-white/10 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-32 text-xs font-black font-heading text-vital-accent uppercase border-r border-white/10 pr-3">
                      PROTEÍNA
                    </span>
                    <div>
                      <p className="text-xs font-bold text-white">2 Scoops diarios</p>
                      <p className="text-[11px] text-gray-400 font-light">• Días de entreno: 1 scoop desayuno + 1 post-entreno.<br/>• Días de descanso: 1 scoop desayuno + 1 cena.</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2.5 py-1 bg-vital-accent/20 text-vital-accent rounded font-bold uppercase shrink-0">
                    Diario
                  </span>
                </div>

                {/* Item 5 */}
                <div className="bg-black/40 border border-white/10 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-32 text-xs font-black font-heading text-white uppercase border-r border-white/10 pr-3">
                      AGUA
                    </span>
                    <div>
                      <p className="text-xs font-bold text-white">90 - 100 oz / día</p>
                      <p className="text-[11px] text-gray-400 font-light">Ingesta constante de líquidos durante el día.</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2.5 py-1 bg-white/10 text-gray-300 rounded font-bold uppercase shrink-0">
                    Constante
                  </span>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: BLOODWORK & ANALYTICS MODULE */}
        {activeTab === 'bloodwork' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-3xl font-black font-heading uppercase text-white tracking-tight">
                  ANALÍTICAS DE SANGRE & MARCADORES
                </h3>
                <p className="text-xs text-vital-accent font-bold uppercase tracking-widest mt-1">
                  Perfil Endocrino, Metabólico & Cardiovascular
                </p>
              </div>
              <button className="px-4 py-2.5 bg-vital-accent text-white text-xs font-bold uppercase tracking-widest rounded-lg flex items-center gap-2">
                <Plus className="w-4 h-4" /> Cargar Nuevo Examen de Sangre
              </button>
            </div>

            {/* Bloodwork Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 1: Total Testosterone */}
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Testosterona Total</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-green-500/20 text-green-400 border border-green-500/40 rounded">
                    Rango Óptimo
                  </span>
                </div>
                <p className="text-4xl font-black font-heading text-white mb-1">
                  {isAdvanced ? '840' : '310'} <span className="text-xs font-normal text-gray-400">ng/dL</span>
                </p>
                <p className="text-[11px] text-gray-400 font-light">Rango Referencia: 300 - 1000 ng/dL</p>

                {/* Progress bar visual */}
                <div className="w-full bg-white/10 h-2 rounded-full mt-4 overflow-hidden">
                  <div className="bg-vital-accent h-full rounded-full" style={{ width: isAdvanced ? '84%' : '31%' }}></div>
                </div>
              </div>

              {/* Card 2: Free Testosterone */}
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Testosterona Libre</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-vital-accent/20 text-vital-accent border border-vital-accent/40 rounded">
                    En Optimización
                  </span>
                </div>
                <p className="text-4xl font-black font-heading text-vital-accent mb-1">
                  {isAdvanced ? '24.5' : '6.8'} <span className="text-xs font-normal text-gray-400">pg/mL</span>
                </p>
                <p className="text-[11px] text-gray-400 font-light">Rango Target: 15.0 - 25.0 pg/mL</p>

                <div className="w-full bg-white/10 h-2 rounded-full mt-4 overflow-hidden">
                  <div className="bg-vital-accent h-full rounded-full" style={{ width: isAdvanced ? '95%' : '27%' }}></div>
                </div>
              </div>

              {/* Card 3: Estradiol Sensitive */}
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Estradiol (E2)</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-green-500/20 text-green-400 border border-green-500/40 rounded">
                    Controlado
                  </span>
                </div>
                <p className="text-4xl font-black font-heading text-white mb-1">
                  29 <span className="text-xs font-normal text-gray-400">pg/mL</span>
                </p>
                <p className="text-[11px] text-gray-400 font-light">Rango Saludable: 15 - 35 pg/mL</p>

                <div className="w-full bg-white/10 h-2 rounded-full mt-4 overflow-hidden">
                  <div className="bg-green-500 h-full rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 3: 1:1 GYM SESSIONS SCHEDULER (PRESENCIAL ALEX GYM) */}
        {(isVip || isCoach) && activeTab === 'sessions' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-3xl font-black font-heading uppercase text-white tracking-tight">
                  SESIONES 1:1 PRESENCIALES (GYM ALEX PANAMÁ)
                </h3>
                <p className="text-xs text-vital-accent font-bold uppercase tracking-widest mt-1">
                  Reserva de Entrenamientos 3x/Semana & Corrección de Forma Biomecánica
                </p>
              </div>
              <button className="px-5 py-3 bg-vital-accent text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-white hover:text-vital-dark transition-all">
                Reservar Nuevo Bloque 1:1
              </button>
            </div>

            {/* Upcoming Sessions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-white/5 border border-vital-accent/40 p-6 rounded-2xl relative overflow-hidden">
                <span className="text-[10px] font-bold px-2.5 py-1 bg-vital-accent text-white rounded uppercase mb-3 inline-block">
                  Próxima Sesión
                </span>
                <h4 className="text-xl font-bold font-heading uppercase mb-1">Fuerza & Recomposición 1:1</h4>
                <p className="text-xs text-gray-400 mb-4 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-vital-accent" /> Mañana, 7:00 AM (Instalación Alex)
                </p>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-300">Coach: Alex Sanchez</span>
                  <span className="text-xs text-vital-accent font-bold">QR Check-in Activo</span>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                <span className="text-[10px] font-bold px-2.5 py-1 bg-white/10 text-gray-300 rounded uppercase mb-3 inline-block">
                  Confirmada
                </span>
                <h4 className="text-xl font-bold font-heading uppercase mb-1">Tensión Mecánica Hipertrofia</h4>
                <p className="text-xs text-gray-400 mb-4 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-gray-400" /> Viernes, 7:00 AM (Instalación Alex)
                </p>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-300">Coach: Alex Sanchez</span>
                  <span className="text-xs text-gray-400">Confirmado</span>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                <span className="text-[10px] font-bold px-2.5 py-1 bg-white/10 text-gray-300 rounded uppercase mb-3 inline-block">
                  Confirmada
                </span>
                <h4 className="text-xl font-bold font-heading uppercase mb-1">Acondicionamiento & VO2 Max</h4>
                <p className="text-xs text-gray-400 mb-4 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-gray-400" /> Lunes Próximo, 7:00 AM
                </p>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-300">Coach: Alex Sanchez</span>
                  <span className="text-xs text-gray-400">Confirmado</span>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 4: HEAD COACH ADMIN PANEL (VISIBLE FOR ALEX) */}
        {isCoach && activeTab === 'coach_panel' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-3xl font-black font-heading uppercase text-white tracking-tight">
                  PANEL DE CONTROL — HEAD COACH ALEX
                </h3>
                <p className="text-xs text-vital-accent font-bold uppercase tracking-widest mt-1">
                  Gestión de Atletas, Prescripciones & Ingresos Mensuales
                </p>
              </div>
              <button className="px-5 py-3 bg-vital-accent text-white text-xs font-bold uppercase tracking-widest rounded-xl">
                + Crear Nuevo Protocolo Paciente
              </button>
            </div>

            {/* Coach Executive Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Atletas VIP 1:1 Activos</p>
                <p className="text-3xl font-black text-vital-accent font-heading mt-1">8 Novatos VIP</p>
                <p className="text-[11px] text-gray-400 mt-1">3x Sesiones Presenciales / Sem</p>
              </div>

              <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Atletas Remotos Avanzados</p>
                <p className="text-3xl font-black text-white font-heading mt-1">6 Atletas</p>
                <p className="text-[11px] text-gray-400 mt-1">Protocolos Hormonales Activos</p>
              </div>

              <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Analíticas Pendientes</p>
                <p className="text-3xl font-black text-yellow-400 font-heading mt-1">2 Pacientes</p>
                <p className="text-[11px] text-gray-400 mt-1">Revisión de Laboratorio</p>
              </div>

              <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Ingreso Mensual Recurrente</p>
                <p className="text-3xl font-black text-green-400 font-heading mt-1">$8,186 USD</p>
                <p className="text-[11px] text-gray-400 mt-1">Panamá High-Performance MRR</p>
              </div>
            </div>

            {/* Patient Management Roster Table */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-6">
                Directorio de Atletas & Protocolos Activos
              </h4>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-white/10 text-gray-400 uppercase tracking-wider text-[10px]">
                      <th className="pb-3 font-bold">Atleta / Paciente</th>
                      <th className="pb-3 font-bold">Programa & Tier</th>
                      <th className="pb-3 font-bold">Testosterona (Tot/Libre)</th>
                      <th className="pb-3 font-bold">Sesiones 1:1</th>
                      <th className="pb-3 font-bold">Estado</th>
                      <th className="pb-3 font-bold text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-gray-300">
                    {initialPatients.map((patient) => (
                      <tr key={patient.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-4 font-bold text-white">{patient.name}</td>
                        <td className="py-4">{patient.tier}</td>
                        <td className="py-4 font-mono text-vital-accent font-bold">
                          {patient.totalTestosterone} ng/dL ({patient.freeTestosterone} pg/mL)
                        </td>
                        <td className="py-4">
                          {patient.sessionsRemaining > 0 ? (
                            <span className="text-white font-bold">{patient.sessionsRemaining} Restantes</span>
                          ) : (
                            <span className="text-gray-500">— Remoto</span>
                          )}
                        </td>
                        <td className="py-4">
                          <span className="px-2.5 py-1 bg-green-500/20 text-green-400 rounded text-[10px] font-bold uppercase border border-green-500/40">
                            {patient.protocolStatus}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <button className="px-3 py-1.5 bg-vital-accent text-white text-[10px] font-bold uppercase tracking-wider rounded hover:bg-white hover:text-vital-dark transition-all">
                            Editar Prescripción
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

      </main>

    </div>
  );
}
