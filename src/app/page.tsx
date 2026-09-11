import Link from 'next/link';
import { Dumbbell, Activity, Shield, CheckCircle2, Play, ArrowRight, ChevronRight, Lock, UserCheck } from 'lucide-react';
import ServicesSection from './components/ServicesSection';
import PricingSection from './components/pricing/PricingSection';

export default function Home() {
  return (
    <main className="min-h-screen font-sans bg-vital-dark text-white">
      
      {/* Navigation Header with Portal Link */}
      <header className="border-b border-white/10 bg-black/80 sticky top-0 z-50 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-vital-accent flex items-center justify-center font-black text-white font-heading">
              VSP
            </div>
            <span className="font-black font-heading tracking-widest text-lg text-white uppercase">VSP PRIME</span>
          </div>

          <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-widest">
            <a href="#services" className="text-gray-300 hover:text-vital-accent transition-colors hidden md:block">Servicios</a>
            <a href="#pricing" className="text-gray-300 hover:text-vital-accent transition-colors hidden md:block">Membresías</a>
            <Link
              href="/portal"
              className="flex items-center gap-2 bg-vital-accent hover:bg-white text-white hover:text-vital-dark px-5 py-2.5 rounded-lg transition-all shadow-lg"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Portal Clientes (RBAC)</span>
            </Link>
          </div>
        </div>
      </header>

      {/* 
        ==============================
        HERO SECTION 
        ==============================
      */}
      <section className="relative w-full min-h-[90vh] bg-vital-dark text-white flex flex-col justify-center overflow-hidden">
        {/* Background Image Overlay / Dark Texture */}
        <div className="absolute inset-0 bg-black/80 z-0 flex items-center justify-center overflow-hidden">
          <div className="absolute w-[800px] h-[800px] border border-white/5 rounded-full -right-[20%] top-0"></div>
          <div className="absolute w-[600px] h-[600px] border border-vital-accent/20 rounded-full -left-[10%] bottom-0 blur-3xl"></div>
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 pt-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-8 h-1 bg-vital-accent"></div>
              <span className="text-vital-accent font-bold tracking-[0.2em] text-sm md:text-base uppercase">Vital Strength Performance — Panamá</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black font-heading leading-[0.9] mb-8 tracking-tighter uppercase animate-in fade-in slide-in-from-bottom-8 duration-700">
              Smash Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Limits.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl font-light leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000">
              Acondicionamiento físico de alto nivel, Brazilian Jiu Jitsu y optimización metabólico-hormonal en Panamá. Diseñamos la arquitectura de tu máxima versión.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-200">
              <a href="#pricing" className="group flex items-center justify-center gap-3 bg-vital-accent text-white px-10 py-5 font-bold text-lg uppercase tracking-wider hover:bg-white hover:text-vital-dark transition-all duration-300">
                Ver Programas & Tarifas
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link href="/portal" className="group flex items-center justify-center gap-3 bg-white/10 text-white px-8 py-5 font-bold text-lg uppercase tracking-wider hover:bg-white hover:text-vital-dark transition-all duration-300">
                Ingresar al Portal
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ==============================
        OVERLAPPING FEATURE CARDS
        ==============================
      */}
      <section className="relative z-20 -mt-24 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="bg-white p-8 shadow-2xl border-t-4 border-vital-accent group hover:-translate-y-2 transition-transform duration-300 flex flex-col justify-between min-h-[250px]">
            <div>
              <Dumbbell className="w-12 h-12 text-vital-accent mb-6" />
              <h3 className="text-2xl font-black font-heading mb-3 text-vital-dark">Strength & Conditioning</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Programación científica para recomposición corporal prime y resistencia neuromuscular.</p>
            </div>
            <a href="#services" className="mt-6 flex items-center text-vital-accent font-bold text-sm uppercase tracking-wider cursor-pointer group-hover:text-vital-dark transition-colors">
              Explorar Protocolo <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>

          {/* Card 2 */}
          <div className="bg-vital-dark p-8 shadow-2xl border-t-4 border-vital-accent group hover:-translate-y-2 transition-transform duration-300 flex flex-col justify-between min-h-[250px] relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none"></div>
            <div className="relative z-10">
              <Shield className="w-12 h-12 text-vital-accent mb-6" />
              <h3 className="text-2xl font-black font-heading mb-3 text-white">507 BJJ Club</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Academia de Jiu Jitsu Brasileño de clase mundial. Biomecánica, disciplina y comunidad.</p>
            </div>
            <a href="#services" className="mt-6 flex items-center text-vital-accent font-bold text-sm uppercase tracking-wider cursor-pointer group-hover:text-white transition-colors relative z-10">
              Ver Clases <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 shadow-2xl border-t-4 border-vital-accent group hover:-translate-y-2 transition-transform duration-300 flex flex-col justify-between min-h-[250px]">
            <div>
              <Activity className="w-12 h-12 text-vital-accent mb-6" />
              <h3 className="text-2xl font-black font-heading mb-3 text-vital-dark">Salud Endocrina & Péptidos</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Terapia hormonal avanzada, farmacología clínica y optimización vital masculina.</p>
            </div>
            <a href="#services" className="mt-6 flex items-center text-vital-accent font-bold text-sm uppercase tracking-wider cursor-pointer group-hover:text-vital-dark transition-colors">
              Ver Analíticas <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>

        </div>
      </section>

      {/* 
        ==============================
        ABOUT ME / WHO WE ARE
        ==============================
      */}
      <section className="py-24 bg-vital-light text-vital-dark">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/5] bg-gray-200 relative overflow-hidden shadow-2xl rounded-xl">
                <div className="absolute inset-0 bg-vital-dark/10 mix-blend-multiply"></div>
                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-8 left-8">
                  <p className="text-vital-accent font-black text-6xl italic leading-none">1:1</p>
                  <p className="text-white font-bold tracking-widest uppercase">Coaching Presencial Panamá</p>
                </div>
              </div>
              <div className="absolute -right-8 -top-8 w-64 h-64 border-[10px] border-vital-accent/20 -z-10 hidden md:block"></div>
            </div>
            
            <div className="flex flex-col">
              <span className="text-vital-accent font-bold uppercase tracking-[0.2em] mb-4">Alejandro Sanchez Galan</span>
              <h2 className="text-4xl md:text-5xl font-black font-heading text-vital-dark mb-6 leading-tight">
                BIENVENIDO A <br />
                VITAL STRENGTH
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Basados en Panamá, somos más que un centro de acondicionamiento físico. Somos un ecosistema de alta tecnología enfocado en optimización endocrina, recomposición estructural profunda y coaching personalizado presencial.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-vital-accent p-1.5 rounded-full"><CheckCircle2 className="w-4 h-4 text-white" /></div>
                  <div>
                    <h4 className="font-bold text-vital-dark uppercase">Gestor de Salud</h4>
                    <p className="text-sm text-gray-500 mt-1">Evaluación de biomarcadores</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-vital-accent p-1.5 rounded-full"><CheckCircle2 className="w-4 h-4 text-white" /></div>
                  <div>
                    <h4 className="font-bold text-vital-dark uppercase">Farmacología & Péptidos</h4>
                    <p className="text-sm text-gray-500 mt-1">Prescripción personalizada</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-200">
                <p className="font-[Brush_Script_MT,cursive] text-4xl text-gray-400">Head Coach Alex</p>
                <p className="font-bold uppercase tracking-widest text-vital-dark mt-2">Especialista en Péptidos & Performance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ==============================
        SERVICES GRID (2x3 Interactive Layout)
        ==============================
      */}
      <ServicesSection />

      {/* 
        ==============================
        PRICING & TIERS (PANAMA USD)
        ==============================
      */}
      <PricingSection />

    </main>
  );
}
