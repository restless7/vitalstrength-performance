'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import {
  User,
  ArrowLeft,
  Activity,
  Pill,
  Calendar,
  DollarSign,
  Shield,
  Clock,
  CheckCircle2,
  AlertCircle,
  Lock,
  Phone,
  Mail,
  Zap,
  Award
} from 'lucide-react';
import { CLINICAL_REFERENCE_METADATA, evaluateMarker } from '@/lib/services/bloodwork.service';

export default function AthleteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [athlete, setAthlete] = useState<any>(null);
  const [labs, setLabs] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAthleteData() {
      try {
        setLoading(true);
        // Fetch athlete profile from real server API
        const res = await fetch(`/api/admin/athletes/${id}`, {
          headers: { 'x-user-role': 'HEAD_COACH' },
        });
        const json = await res.json();

        if (!res.ok || !json.success) {
          setError(json.error || 'No se pudo cargar el expediente del atleta.');
          return;
        }

        setAthlete(json.data);

        // Fetch lab records & sessions
        const [labsRes, sessionsRes] = await Promise.all([
          fetch(`/api/admin/bloodwork`, { headers: { 'x-user-role': 'HEAD_COACH' } }),
          fetch(`/api/admin/sessions`, { headers: { 'x-user-role': 'HEAD_COACH' } }),
        ]);


        if (labsRes.ok) {
          const labsJson = await labsRes.json();
          if (labsJson.success) {
            setLabs(labsJson.data.filter((l: any) => l.athleteId.toLowerCase() === id.toLowerCase()));
          }
        }

        if (sessionsRes.ok) {
          const sessionsJson = await sessionsRes.json();
          if (sessionsJson.success) {
            setSessions(sessionsJson.data.filter((s: any) => s.athleteId.toLowerCase() === id.toLowerCase()));
          }
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadAthleteData();
  }, [id]);

  if (loading) {
    return (
      <div className="p-12 text-center text-gray-400">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-vital-accent mx-auto mb-4"></div>
        <p className="text-xs uppercase font-bold tracking-widest">Cargando Expediente Clínico & Atleta {id}...</p>
      </div>
    );
  }

  if (error || !athlete) {
    return (
      <div className="p-8 max-w-xl mx-auto text-center bg-red-500/10 border border-red-500/30 rounded-2xl">
        <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-white mb-2">Expediente No Disponible</h3>
        <p className="text-xs text-red-300 mb-6">{error || 'El atleta solicitado no existe o no tiene permisos para acceder.'}</p>
        <Link href="/admin?tab=patients" className="px-5 py-2.5 bg-vital-accent text-white font-bold text-xs uppercase tracking-widest rounded-xl">
          Volver a Pacientes
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Back Button & Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <Link
          href="/admin?tab=patients"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-vital-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Volver a Directorio de Pacientes
        </Link>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 bg-vital-accent/20 border border-vital-accent/40 rounded text-vital-accent font-bold">
            Expediente: {athlete.id}
          </span>
          <span className="px-2.5 py-1 bg-green-500/20 border border-green-500/40 rounded text-green-400 font-bold">
            {athlete.status}
          </span>
        </div>
      </div>

      {/* Main Profile Header */}
      <div className="bg-gradient-to-r from-vital-dark via-gray-900 to-vital-dark border border-white/10 p-8 rounded-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-vital-accent/20 border-2 border-vital-accent flex items-center justify-center text-vital-accent font-black text-2xl font-heading">
            {athlete.name.split(' ').map((n: string) => n[0]).join('')}
          </div>
          <div>
            <h2 className="text-3xl font-black font-heading uppercase text-white tracking-tight">{athlete.name}</h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mt-2 font-medium">
              <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-vital-accent" /> {athlete.phone}</span>
              <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-vital-accent" /> {athlete.email}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-vital-accent" /> Miembro desde: {athlete.startDate}</span>
            </div>
          </div>
        </div>

        <div className="bg-black/50 border border-white/10 p-4 rounded-xl text-right">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Programa Activo (Panamá USD)</p>
          <p className="text-lg font-black font-heading text-vital-accent mt-0.5">{athlete.tierName}</p>
          <p className="text-xs text-green-400 font-mono font-bold mt-1">${athlete.mrrUSD} USD / mes</p>
        </div>
      </div>

      {/* Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Clinical & Training Modules */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Active 12-Week Protocol Stack */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-4">
              <h3 className="text-lg font-black font-heading uppercase text-white flex items-center gap-2">
                <Pill className="w-5 h-5 text-vital-accent" /> Protocolo Prescrito Activo (12 Semanas)
              </h3>
              <span className="text-xs font-mono text-vital-accent font-bold">Estado: Activo</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-black/40 border border-white/10 rounded-xl">
                <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Clembuterol Termogénico</p>
                <p className="text-sm font-bold text-white">20 mcg/día (Ayunas)</p>
                <p className="text-[10px] text-gray-400 mt-1">Semanas 1 a 12</p>
              </div>

              <div className="p-4 bg-black/40 border border-white/10 rounded-xl">
                <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Ventana de Ayuno</p>
                <p className="text-sm font-bold text-white">10 - 12 Horas</p>
                <p className="text-[10px] text-gray-400 mt-1">Optimización de sustrato lípido</p>
              </div>

              <div className="p-4 bg-black/40 border border-white/10 rounded-xl">
                <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Omega 3 & Magnesio</p>
                <p className="text-sm font-bold text-white">2000mg / 400mg Noche</p>
                <p className="text-[10px] text-gray-400 mt-1">Permeabilidad celular & descanso</p>
              </div>

              <div className="p-4 bg-black/40 border border-white/10 rounded-xl">
                <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Hidratación Target</p>
                <p className="text-sm font-bold text-vital-accent">90 - 100 oz / día</p>
                <p className="text-[10px] text-gray-400 mt-1">Consumo constante de agua</p>
              </div>
            </div>
          </div>

          {/* Bloodwork Diagnostic History with Reference Metadata */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h3 className="text-lg font-black font-heading uppercase text-white mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-vital-accent" /> Historial de Analíticas Clínicas & Marcadores
            </h3>

            {labs.length === 0 ? (
              <p className="text-xs text-gray-400 py-4 font-light">No hay exámenes de sangre registrados aún para este atleta.</p>
            ) : (
              labs.map((lab) => {
                const totalTEval = evaluateMarker(lab.markers.totalTestosteroneNgDl, 'totalTestosterone');
                const freeTEval = evaluateMarker(lab.markers.freeTestosteronePgMl, 'freeTestosterone');
                const e2Eval = evaluateMarker(lab.markers.estradiolPgMl, 'estradiol');

                return (
                  <div key={lab.id} className="p-5 bg-black/40 border border-white/10 rounded-xl space-y-4 mb-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div>
                        <p className="font-bold text-white text-sm">{lab.labName}</p>
                        <p className="text-[10px] text-gray-400">Fecha Carga: {lab.uploadDate}</p>
                      </div>
                      <span className="px-2.5 py-1 bg-green-500/20 text-green-400 rounded text-[10px] font-bold uppercase border border-green-500/40">
                        {lab.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="p-3 bg-white/5 rounded-lg">
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Testosterona Total</p>
                        <p className="text-lg font-black text-white font-mono mt-1">
                          {lab.markers.totalTestosteroneNgDl} <span className="text-xs font-normal text-gray-400">ng/dL</span>
                        </p>
                        <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded mt-1 inline-block ${
                          totalTEval === 'NORMAL' ? 'bg-green-500/20 text-green-400' : totalTEval === 'LOW' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {totalTEval} (Rango 300-1000)
                        </span>
                      </div>

                      <div className="p-3 bg-white/5 rounded-lg">
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Testosterona Libre</p>
                        <p className="text-lg font-black text-vital-accent font-mono mt-1">
                          {lab.markers.freeTestosteronePgMl} <span className="text-xs font-normal text-gray-400">pg/mL</span>
                        </p>
                        <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded mt-1 inline-block ${
                          freeTEval === 'NORMAL' ? 'bg-green-500/20 text-green-400' : freeTEval === 'LOW' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {freeTEval} (Rango 15-25)
                        </span>
                      </div>

                      <div className="p-3 bg-white/5 rounded-lg">
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Estradiol (E2)</p>
                        <p className="text-lg font-black text-white font-mono mt-1">
                          {lab.markers.estradiolPgMl} <span className="text-xs font-normal text-gray-400">pg/mL</span>
                        </p>
                        <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded mt-1 inline-block ${
                          e2Eval === 'NORMAL' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {e2Eval} (Rango 15-45)
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>

        {/* Right Col: Sessions & Encrypted Notes */}
        <div className="space-y-8">
          
          {/* Sessions & Attendance */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h3 className="text-base font-bold font-heading uppercase text-white mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-vital-accent" /> Asistencia & Sesiones 1:1
            </h3>

            <div className="space-y-3 text-xs">
              {sessions.length === 0 ? (
                <p className="text-gray-400 font-light">No hay sesiones registradas.</p>
              ) : (
                sessions.map((s) => (
                  <div key={s.id} className="p-3 bg-black/40 border border-white/10 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white">{s.title}</p>
                      <p className="text-[10px] text-gray-400">{s.date} • {s.timeSlot}</p>
                    </div>
                    <span className="px-2 py-0.5 bg-green-500/20 text-green-400 font-bold text-[9px] rounded uppercase">
                      {s.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Encrypted Clinical Notes Box */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h3 className="text-base font-bold font-heading uppercase text-white mb-3 flex items-center gap-2">
              <Lock className="w-4 h-4 text-vital-accent" /> Notas Clínicas Confidenciales
            </h3>
            <div className="p-4 bg-black/50 border border-white/10 rounded-xl text-xs font-mono text-gray-300 leading-relaxed">
              {athlete.clinicalNotesEncrypted || 'Sin notas confidenciales registradas.'}
            </div>
            <p className="text-[10px] text-gray-500 mt-2">Protegido por Cifrado AES-256-GCM en servidor.</p>
          </div>

        </div>

      </div>

    </div>
  );
}
