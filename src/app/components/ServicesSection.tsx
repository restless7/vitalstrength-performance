'use client';

import { useState } from 'react';
import { Dumbbell, Activity, HeartPulse, Shield, Building, Zap, ArrowRight, X, CheckCircle2, ChevronRight, Award, Target, Cpu } from 'lucide-react';

export interface ServiceDetail {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  shortDesc: string;
  fullDesc: string;
  targetProfile: string;
  icon: any;
  pillars: { title: string; desc: string }[];
  keyOutcomes: string[];
}

export const servicesData: ServiceDetail[] = [
  {
    id: 'body-recomposition',
    badge: 'Hipertrofia & Fuerza',
    title: 'Prime Body Recomposition',
    subtitle: 'Reingeniería anatómica y metabólica hiper-focalizada',
    shortDesc: 'Transformación física integral mediante tensión mecánica neuromuscular avanzada, preservación de tejido magro y partición nutricional estratégica.',
    fullDesc: 'Protocolo de reingeniería estructural diseñado para alterar drásticamente la relación entre tejido magro y masa adiposa. No busca reducciones genéricas de peso en báscula, sino una optimización anatómica basada en tensión mecánica, carga axonal y modulación nutricional de nitrógeno.',
    targetProfile: 'Atletas, ejecutivos de alto rendimiento y competidores que buscan máxima definición muscular sin perder densidad ni fuerza.',
    icon: Dumbbell,
    pillars: [
      {
        title: 'Estimulación Mecánica de Tensión Selectiva',
        desc: 'Programación de cargas basada en curvas biomecánicas de fuerza para reclutar unidades motoras de alto umbral.'
      },
      {
        title: 'Retención Proteica Protegida',
        desc: 'Modulación de déficit calórico sin degradación muscular mediante nutrición peri-entrenamiento alta en nitrógeno biodisponible.'
      },
      {
        title: 'Hipertrofia Funcional & Densidad',
        desc: 'Enfoque en la sección transversal del músculo con densidad estructural adaptada a la disciplina o estándar estético.'
      }
    ],
    keyOutcomes: ['Reducción acelerada de grasa visceral & subcutánea', 'Preservación 100% de la masa muscular magra', 'Aumento de densidad muscular & torque de fuerza']
  },
  {
    id: 'metabolic-reset',
    badge: 'Bioenergética & Salud',
    title: 'Prime Metabolic Reset',
    subtitle: 'Restauración del sistema energético y flexibilidad metabólica',
    shortDesc: 'Re-ingeniería de las vías mitocondriales. Corrige la resistencia a la insulina, optimiza la partición de nutrientes y erradica mesetas.',
    fullDesc: 'Protocolo bioenergético de reconexión mitocondrial. Diseñado para revertir mesetas metabólicas persistentes, optimizar la sensibilidad de los receptores GLUT4 y restaurar la capacidad del organismo para alternar eficientemente entre oxidación de lípidos y glucólisis.',
    targetProfile: 'Personas con resistencia a la insulina, fatiga crónica, estancamiento físico o incapacidad para procesar macronutrientes eficientemente.',
    icon: Activity,
    pillars: [
      {
        title: 'Sensibilización al Transportador GLUT4',
        desc: 'Depleción estratégica de glucógeno muscular y contracciones específicas para reactivar la captación de glucosa.'
      },
      {
        title: 'Restauración de Flexibilidad Sustrática',
        desc: 'Entrenamiento del organismo para alternar sin esfuerzo entre quemar grasas en reposo y glucógeno en picos de intensidad.'
      },
      {
        title: 'Crononutrición & Partición Eficiente',
        desc: 'Direccionamiento de carbohidratos exclusivamente hacia el tejido activo en la ventana de mayor sensibilidad.'
      }
    ],
    keyOutcomes: ['Reversión de la resistencia a la insulina', 'Niveles estables y elevados de energía todo el día', 'Tolerancia y aprovechamiento superior de carbohidratos']
  },
  {
    id: 'male-optimization',
    badge: 'Salud Hormonal & Péptidos',
    title: 'Prime Male Optimization',
    subtitle: 'Salud hormonal avanzada, endocrinología y vitalidad masculina',
    shortDesc: 'Optimización del eje HPTA, terapia con péptidos y medicina preventiva. Supera la fatiga crónica y recupera tu máxima vitalidad.',
    fullDesc: 'Protocolo de alta dirección endocrina enfocado en hombres que rehúsan aceptar el declive androgénico y la niebla mental asociada con la edad o el estrés. Integra analíticas hormonales avanzadas, regulación del eje HPTA y biotecnología de péptidos secretagogos.',
    targetProfile: 'Hombres de +30 años, atletas máster y ejecutivos que buscan restaurar sus niveles óptimos de testosterona, energía y enfoque mental.',
    icon: HeartPulse,
    pillars: [
      {
        title: 'Optimización del Perfil Androgénico',
        desc: 'Evaluación y balance preciso de Testosterona Libre, Estradiol, SHBG, DHEA y perfil lipídico/cardiovascular.'
      },
      {
        title: 'Secretagogos de GH & Péptidos de Reparación',
        desc: 'Uso de bio-reguladores para estimular la liberación endocrina nativa de hormona de crecimiento y regeneración articular.'
      },
      {
        title: 'Mitigación del Estrés Simpático & Cortisol',
        desc: 'Protocolos de recuperación suprarrenal para erradicar la respuesta desmedida al estrés y revitalizar la libido.'
      }
    ],
    keyOutcomes: ['Mayor fuerza, masa muscular y libido', 'Claridad mental y erradicación de la niebla cognitiva', 'Recuperación neuromuscular acelerada']
  },
  {
    id: 'endurance-systems',
    badge: 'VO2 Max & Rendimiento',
    title: 'Prime Endurance Systems',
    subtitle: 'Acondicionamiento cardiovascular de élite para atletas de alto impacto',
    shortDesc: 'Ampliación del VO2 Máximo, acondicionamiento de Zona 2 y elevación del umbral anaeróbico para un rendimiento imparable.',
    fullDesc: 'Sistema de preparación cardiovascular enfocado en atletas que exigen un tanque de reserva inagotable. Combina el desarrollo de densidad mitocondrial mediante entrenamiento de Zona 2 con la capacidad de amortiguar y reciclar lactato durante esfuerzos extremos.',
    targetProfile: 'Peleadores de BJJ/MMA, atletas de resistencia, HYROX/CrossFit y deportistas que requieran sostener picos de intensidad sin colapso.',
    icon: Zap,
    pillars: [
      {
        title: 'Expansión del Consumo Máximo de Oxígeno (VO2 Max)',
        desc: 'Protocolos de intervalos de alta intensidad (HIIT) guiados por Variabilidad de Frecuencia Cardíaca (HRV).'
      },
      {
        title: 'Gestión & Clearance de Lactato',
        desc: 'Elevación del umbral anaeróbico para reconvertir el lactato en combustible bioenergético en lugar de fatiga.'
      },
      {
        title: 'Base Aeróbica de Zona 2 & Densidad Mitocondrial',
        desc: 'Construcción de un motor microvascular que permite una recuperación ultra-rápida entre rounds o series.'
      }
    ],
    keyOutcomes: ['Aumento directo del VO2 Max medible', 'Recuperación ultra-rápida del pulso entre esfuerzos', 'Eliminación del colapso respiratorio en combate']
  },
  {
    id: '507-bjj-club',
    badge: 'Artes Marciales & Combate',
    title: '507 BJJ Club',
    subtitle: 'Jiu-Jitsu Brasileño técnico, biomecánica aplicada y arte de combate',
    shortDesc: 'Clases técnicas de Jiu-Jitsu Brasileño enfocadas en palancas anatómicas, defensa personal efectiva y estrategia de competencia.',
    fullDesc: 'Academia especializada de BJJ de estándar internacional. Nuestro sistema combina la enseñanza biomecánica de palancas y control de peso corporal con un acondicionamiento físico adaptado al tapete para dominar sin desgaste innecesario.',
    targetProfile: 'Desde principiantes que buscan aprender defensa personal real hasta competidores de alto nivel enfocados en torneos.',
    icon: Shield,
    pillars: [
      {
        title: 'Biomecánica Eficiente de Palancas & Control',
        desc: 'Dominio de pases de guardia, raspados y sumisiones priorizando la palanca óptima sobre la fuerza bruta.'
      },
      {
        title: 'Sparring & Estrategia Bajo Presión',
        desc: 'Simulaciones situacionales y entrenamiento táctico de competencia para mantener la calma en situaciones extremas.'
      },
      {
        title: 'Acondicionamiento Específico de Tapete',
        desc: 'Fuerza isométrica de agarre (grip strength), flexibilidad de cadera y movilidad protectora de columna.'
      }
    ],
    keyOutcomes: ['Dominio técnico de defensa personal real', 'Acondicionamiento físico de combate', 'Mentalidad resiliente y disciplina táctica']
  },
  {
    id: 'facility-consulting',
    badge: 'Diseño & Inversión Fitness',
    title: 'Prime Facility Consulting',
    subtitle: 'Arquitectura, planificación biomecánica y rentabilidad comercial',
    shortDesc: 'Diseño estratégico de gimnasios y centros de alto rendimiento. Ayudamos a inversores a estructurar espacios altamente rentables.',
    fullDesc: 'Servicio de consultoría integral para inversionistas y desarrolladores inmobiliarios. Diseñamos espacios de acondicionamiento de alta gama orientados a maximizar la rentabilidad por metro cuadrado y garantizar un flujo biomecánico perfecto.',
    targetProfile: 'Inversionistas, dueños de cadenas de gimnasios, clubes privados y desarrolladores de proyectos boutique de salud.',
    icon: Building,
    pillars: [
      {
        title: 'Zonificación Biomecánica & Layout Estratégico',
        desc: 'Distribución ergonómica de zonas de peso libre, acondicionamiento funcional y áreas de tratamiento de salud.'
      },
      {
        title: 'Curaduría de Equipamiento de Grado Comercial',
        desc: 'Selección de maquinaria olímpica y personalizada acorde al perfil demográfico y modelo de negocio.'
      },
      {
        title: 'Modelo Operativo & Retorno de Inversión (ROI)',
        desc: 'Estructuración de programas de entrenamiento 1:1, clases grupales y pricing para acelerar el retorno de capital.'
      }
    ],
    keyOutcomes: ['Optimización del ROI por m²', 'Experiencia de cliente de lujo sin embotellamientos', 'Instalación con estándar internacional']
  }
];

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

  return (
    <section id="services" className="py-28 bg-white text-vital-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-vital-accent/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-8 h-[2px] bg-vital-accent"></span>
            <span className="text-vital-accent font-bold uppercase tracking-[0.25em] text-xs md:text-sm">
              Ingeniería del Rendimiento
            </span>
            <span className="w-8 h-[2px] bg-vital-accent"></span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black font-heading text-vital-dark tracking-tight uppercase mb-6">
            SERVICIOS <span className="text-vital-accent">PRIME</span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl font-light leading-relaxed">
            Protocolos diseñados quirúrgicamente para atletas, ejecutivos y personas que exigen el estándar supremo en salud, estética y potencia física.
          </p>
        </div>

        {/* 2x3 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className="group relative bg-vital-light/60 border border-gray-200/80 rounded-xl p-8 hover:bg-vital-dark hover:border-vital-accent transition-all duration-500 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 bg-white group-hover:bg-vital-accent text-vital-dark group-hover:text-white rounded-full transition-colors duration-300 shadow-sm border border-gray-200 group-hover:border-transparent">
                      {service.badge}
                    </span>
                    <div className="w-14 h-14 rounded-xl bg-white border border-gray-200 flex items-center justify-center group-hover:bg-vital-accent group-hover:border-vital-accent transition-all duration-300 shadow-sm">
                      <IconComponent className="w-7 h-7 text-vital-dark group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-black font-heading text-vital-dark group-hover:text-white mb-2 transition-colors duration-300 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-xs font-semibold uppercase text-vital-accent tracking-wider mb-4">
                    {service.subtitle}
                  </p>

                  <p className="text-gray-600 group-hover:text-gray-300 text-sm leading-relaxed mb-8 font-light transition-colors duration-300">
                    {service.shortDesc}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedService(service)}
                  className="w-full pt-4 border-t border-gray-200 group-hover:border-white/10 flex items-center justify-between text-vital-dark group-hover:text-vital-accent font-bold text-xs uppercase tracking-widest transition-colors duration-300 group/btn"
                >
                  <span>Conocer Protocolo</span>
                  <ChevronRight className="w-4 h-4 text-vital-accent group-hover/btn:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            );
          })}
        </div>

      </div>

      {/* Modal Detail Overlay */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md animate-in fade-in duration-300 overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-vital-dark border border-vital-accent/30 rounded-2xl shadow-2xl overflow-hidden my-auto text-white">
            
            <div className="relative p-8 md:p-10 border-b border-white/10 bg-gradient-to-r from-vital-dark via-gray-900 to-vital-dark">
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-vital-accent text-white transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="inline-flex items-center gap-2 px-3 py-1 bg-vital-accent/20 border border-vital-accent/40 rounded-full text-vital-accent text-xs font-bold uppercase tracking-widest mb-4">
                <Zap className="w-3.5 h-3.5" />
                <span>{selectedService.badge}</span>
              </div>

              <h3 className="text-3xl md:text-5xl font-black font-heading tracking-tight uppercase mb-2">
                {selectedService.title}
              </h3>
              <p className="text-vital-accent font-semibold text-sm md:text-base tracking-wide">
                {selectedService.subtitle}
              </p>
            </div>

            <div className="p-8 md:p-10 space-y-8 max-h-[65vh] overflow-y-auto custom-scrollbar">
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-vital-accent mb-3 flex items-center gap-2">
                    <Cpu className="w-4 h-4" /> Descripción del Protocolo
                  </h4>
                  <p className="text-gray-300 text-base leading-relaxed font-light">
                    {selectedService.fullDesc}
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-vital-accent mb-2 flex items-center gap-2">
                    <Target className="w-4 h-4" /> Perfil Objetivo
                  </h4>
                  <p className="text-gray-300 text-xs leading-relaxed font-light">
                    {selectedService.targetProfile}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-vital-accent mb-4 flex items-center gap-2">
                  <Award className="w-4 h-4" /> Pilares Metodológicos Fundamentales
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedService.pillars.map((pillar, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/10 p-5 rounded-xl hover:border-vital-accent/50 transition-colors">
                      <div className="w-7 h-7 rounded-full bg-vital-accent/20 text-vital-accent font-bold text-xs flex items-center justify-center mb-3">
                        0{idx + 1}
                      </div>
                      <h5 className="font-bold text-sm mb-2 text-white font-heading uppercase">{pillar.title}</h5>
                      <p className="text-xs text-gray-400 font-light leading-relaxed">{pillar.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-vital-accent/10 to-transparent border-l-4 border-vital-accent p-6 rounded-r-xl">
                <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-vital-accent" /> Entregables & Impacto Directo
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {selectedService.keyOutcomes.map((outcome, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-gray-200 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-vital-accent shrink-0"></span>
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div className="p-6 md:p-8 border-t border-white/10 bg-vital-dark flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">¿Listo para comenzar?</p>
                <p className="text-sm font-semibold text-white">Sesiones de valoración 1:1 limitadas por cupo</p>
              </div>

              <a
                href="#pricing"
                onClick={() => setSelectedService(null)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-vital-accent hover:bg-white text-white hover:text-vital-dark px-8 py-4 font-bold text-xs uppercase tracking-widest transition-all duration-300 rounded-lg shadow-xl"
              >
                <span>Ver Planes & Precios</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
