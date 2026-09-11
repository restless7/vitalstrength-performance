'use client';

import { useState } from 'react';
import { Check, Zap, Shield, Crown, HelpCircle, ArrowRight, UserCheck, Calendar, Pill, Dumbbell } from 'lucide-react';

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly'>('monthly');

  return (
    <section id="pricing" className="py-28 bg-vital-dark text-white relative overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-vital-accent/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-vital-accent/10 border border-vital-accent/30 rounded-full text-vital-accent text-xs font-bold uppercase tracking-widest mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>Membresías & Protocolos Panamá (USD)</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black font-heading tracking-tight uppercase mb-6">
            PROGRAMAS & <span className="text-vital-accent">TARIFAS PRIME</span>
          </h2>
          <p className="text-gray-400 text-lg font-light leading-relaxed">
            Diseñados para adaptarse a tu nivel de experiencia: desde hombres disciplinados que requieren optimización hormonal remota, hasta novatos que exigen transformación 1:1 presencial.
          </p>

          {/* Monthly vs Quarterly Toggle */}
          <div className="mt-10 inline-flex items-center bg-white/5 border border-white/10 p-1.5 rounded-xl">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-vital-accent text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Pago Mensual
            </button>
            <button
              onClick={() => setBillingCycle('quarterly')}
              className={`px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${
                billingCycle === 'quarterly'
                  ? 'bg-vital-accent text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>Trimestral (12 Semanas)</span>
              <span className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full font-extrabold">AHORRA 15%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* TIER 1: Prime Hormonal Protocol (Avanzados) */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col justify-between hover:border-white/30 transition-all duration-300 relative group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                  <Pill className="w-4 h-4 text-vital-accent" /> Hombres Avanzados
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 bg-white/10 text-gray-300 rounded-md">
                  Protocolo Remoto
                </span>
              </div>

              <h3 className="text-2xl font-black font-heading mb-2 uppercase">Prime Hormonal</h3>
              <p className="text-xs text-gray-400 font-light mb-6">
                Para hombres con disciplina y rutina de gimnasio establecida que buscan el impulso hormonal, péptidos y vitalidad masculina.
              </p>

              {/* Price Display */}
              <div className="mb-8 p-4 bg-black/40 rounded-xl border border-white/5">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black font-heading text-white">
                    ${billingCycle === 'monthly' ? '299' : '799'}
                  </span>
                  <span className="text-gray-400 text-xs font-semibold">
                    USD / {billingCycle === 'monthly' ? 'mes' : 'trimestre'}
                  </span>
                </div>
                {billingCycle === 'quarterly' && (
                  <p className="text-[11px] text-vital-accent mt-1 font-medium">Equivale a $266/mes (Ahorras $98)</p>
                )}
              </div>

              {/* Feature List */}
              <ul className="space-y-3.5 mb-8 text-xs text-gray-300">
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-vital-accent shrink-0 mt-0.5" />
                  <span>Entrevista Médica & Análisis de Marcadores en Sangre</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-vital-accent shrink-0 mt-0.5" />
                  <span>Prescripción de Fármacos, Péptidos & Suplementación (12 Sems)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-vital-accent shrink-0 mt-0.5" />
                  <span>Guía Nutricional & Partición de Macronutrientes</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-vital-accent shrink-0 mt-0.5" />
                  <span>Acceso al Portal de Cliente & Registro de Analíticas</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-vital-accent shrink-0 mt-0.5" />
                  <span>Rutina Digital Programada (Autogestionada)</span>
                </li>
                <li className="flex items-start gap-3 opacity-40">
                  <span className="w-4 h-4 text-center font-bold text-gray-500">—</span>
                  <span>Sin Clases 1:1 Presenciales en Gimnasio</span>
                </li>
              </ul>
            </div>

            <a
              href="#contact"
              className="w-full py-4 bg-white/10 hover:bg-white text-white hover:text-vital-dark font-bold text-xs uppercase tracking-widest transition-all duration-300 rounded-xl flex items-center justify-center gap-2 group-hover:shadow-lg"
            >
              <span>Aplicar al Protocolo</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* TIER 3: Prime Elite 1:1 VIP (Novatos / Novatas) - POPULAR */}
          <div className="bg-gradient-to-b from-vital-dark via-gray-900 to-vital-dark border-2 border-vital-accent rounded-2xl p-8 flex flex-col justify-between shadow-2xl relative scale-105 z-20">
            {/* Recommended Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-vital-accent text-white text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
              <Crown className="w-3.5 h-3.5" />
              <span>Más Solicitado — Transformación VIP</span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4 mt-2">
                <span className="text-xs font-bold uppercase tracking-widest text-vital-accent flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4" /> Novatos / Novatas +30/+40
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 bg-vital-accent/20 text-vital-accent border border-vital-accent/40 rounded-md">
                  1:1 Presencial
                </span>
              </div>

              <h3 className="text-3xl font-black font-heading mb-2 uppercase text-white">Prime Elite 1:1 VIP</h3>
              <p className="text-xs text-gray-300 font-light mb-6">
                Acompañamiento presencial integral 3x por semana en el gimnasio de Alex en Panamá. Para quienes exigen transformación radical asistida.
              </p>

              {/* Price Display */}
              <div className="mb-8 p-4 bg-vital-accent/10 rounded-xl border border-vital-accent/30">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black font-heading text-white">
                    ${billingCycle === 'monthly' ? '799' : '2,199'}
                  </span>
                  <span className="text-gray-300 text-xs font-semibold">
                    USD / {billingCycle === 'monthly' ? 'mes' : 'trimestre'}
                  </span>
                </div>
                {billingCycle === 'quarterly' && (
                  <p className="text-[11px] text-vital-accent mt-1 font-semibold">Equivale a $733/mes (Ahorras $198)</p>
                )}
              </div>

              {/* Feature List */}
              <ul className="space-y-3.5 mb-8 text-xs text-white">
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-vital-accent shrink-0 mt-0.5" />
                  <span className="font-bold">3 Sesiones Semanales 1:1 Presenciales (Gym Alex Panamá)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-vital-accent shrink-0 mt-0.5" />
                  <span>Protocolo Farmacológico, Péptidos & Antioxidantes 100% Personalizado</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-vital-accent shrink-0 mt-0.5" />
                  <span>Análisis Clínico Completo & Monitoreo Bioquímico Quincenal</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-vital-accent shrink-0 mt-0.5" />
                  <span>Plan Nutricional de Recomposición & Flexibilidad Sustrática</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-vital-accent shrink-0 mt-0.5" />
                  <span>Acceso VIP al Portal de Cliente con Agendador de Citas 1:1</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-vital-accent shrink-0 mt-0.5" />
                  <span>Contacto Directo Prioritario vía WhatsApp & Portal</span>
                </li>
              </ul>
            </div>

            <a
              href="#contact"
              className="w-full py-4 bg-vital-accent hover:bg-white text-white hover:text-vital-dark font-bold text-xs uppercase tracking-widest transition-all duration-300 rounded-xl flex items-center justify-center gap-2 shadow-xl"
            >
              <span>Reservar Cupo VIP 1:1</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* TIER 2: Prime Hybrid Recomposition */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col justify-between hover:border-white/30 transition-all duration-300 relative group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                  <Dumbbell className="w-4 h-4 text-vital-accent" /> Intermedios / Híbrido
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 bg-white/10 text-gray-300 rounded-md">
                  1x/Sem 1:1
                </span>
              </div>

              <h3 className="text-2xl font-black font-heading mb-2 uppercase">Prime Hybrid</h3>
              <p className="text-xs text-gray-400 font-light mb-6">
                Para personas que entrenan de forma independiente pero necesitan 1 evaluación presencial semanal para corrección técnica y ajuste metabólico.
              </p>

              {/* Price Display */}
              <div className="mb-8 p-4 bg-black/40 rounded-xl border border-white/5">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black font-heading text-white">
                    ${billingCycle === 'monthly' ? '499' : '1,299'}
                  </span>
                  <span className="text-gray-400 text-xs font-semibold">
                    USD / {billingCycle === 'monthly' ? 'mes' : 'trimestre'}
                  </span>
                </div>
                {billingCycle === 'quarterly' && (
                  <p className="text-[11px] text-vital-accent mt-1 font-medium">Equivale a $433/mes (Ahorras $198)</p>
                )}
              </div>

              {/* Feature List */}
              <ul className="space-y-3.5 mb-8 text-xs text-gray-300">
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-vital-accent shrink-0 mt-0.5" />
                  <span>1 Sesión Semanal Presencial 1:1 (Ajuste de Técnica & Cargas)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-vital-accent shrink-0 mt-0.5" />
                  <span>Protocolo Farmacológico & Péptidos Completo</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-vital-accent shrink-0 mt-0.5" />
                  <span>Evaluación de Sangre & Salud Endocrina</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-vital-accent shrink-0 mt-0.5" />
                  <span>Plan Nutricional Avanzado & Crononutrición</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-vital-accent shrink-0 mt-0.5" />
                  <span>Portal de Cliente & Programación de Rutinas</span>
                </li>
              </ul>
            </div>

            <a
              href="#contact"
              className="w-full py-4 bg-white/10 hover:bg-white text-white hover:text-vital-dark font-bold text-xs uppercase tracking-widest transition-all duration-300 rounded-xl flex items-center justify-center gap-2 group-hover:shadow-lg"
            >
              <span>Seleccionar Híbrido</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* Footnote / Guarantee */}
        <div className="mt-16 text-center max-w-2xl mx-auto border-t border-white/10 pt-8">
          <p className="text-xs text-gray-400 leading-relaxed font-light">
            🔒 <strong className="text-white">Compromiso de Resultados:</strong> Todos los protocolos farmacológicos y péptidos se prescriben tras evaluación médica rigurosa de marcadores sanguíneos. Las sesiones 1:1 se imparten exclusivamente en la instalación privada de Alejandro Sanchez Galan en Panamá.
          </p>
        </div>

      </div>
    </section>
  );
}
