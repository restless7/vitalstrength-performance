import Link from 'next/link';
import { Dumbbell, Activity, Shield, Users, HeartPulse, ChevronRight, CheckCircle2, Play, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen font-sans">
      {/* 
        ==============================
        HERO SECTION 
        ==============================
      */}
      <section className="relative w-full min-h-[90vh] bg-vital-dark text-white flex flex-col justify-center overflow-hidden">
        {/* Background Image Overlay / Dark Texture */}
        <div className="absolute inset-0 bg-black/80 z-0 flex items-center justify-center overflow-hidden">
          {/* Abstract geometric shapes or placeholder for gym background */}
          <div className="absolute w-[800px] h-[800px] border border-white/5 rounded-full -right-[20%] top-0"></div>
          <div className="absolute w-[600px] h-[600px] border border-vital-accent/20 rounded-full -left-[10%] bottom-0 blur-3xl"></div>
          {/* Subtle noise/texture */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 pt-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-8 h-1 bg-vital-accent"></div>
              <span className="text-vital-accent font-bold tracking-[0.2em] text-sm md:text-base uppercase">Vital Strength Performance</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black font-heading leading-[0.9] mb-8 tracking-tighter uppercase animate-in fade-in slide-in-from-bottom-8 duration-700">
              Smash Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Limits.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl font-light leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000">
              Elite physical conditioning, Brazilian Jiu Jitsu, and metabolic optimization in Panama. We engineer high-performance humans.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-200">
              <Link href="#contact" className="group flex items-center justify-center gap-3 bg-vital-accent text-white px-10 py-5 font-bold text-lg uppercase tracking-wider hover:bg-white hover:text-vital-dark transition-all duration-300">
                Book 1:1 Session
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
              <p className="text-gray-500 text-sm leading-relaxed">Scientifically programmed training for prime body recomposition and endurance.</p>
            </div>
            <div className="mt-6 flex items-center text-vital-accent font-bold text-sm uppercase tracking-wider cursor-pointer group-hover:text-vital-dark transition-colors">
              Read More <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-vital-dark p-8 shadow-2xl border-t-4 border-vital-accent group hover:-translate-y-2 transition-transform duration-300 flex flex-col justify-between min-h-[250px] relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none"></div>
            <div className="relative z-10">
              <Shield className="w-12 h-12 text-vital-accent mb-6" />
              <h3 className="text-2xl font-black font-heading mb-3 text-white">507 BJJ Club</h3>
              <p className="text-gray-400 text-sm leading-relaxed">World-class Brazilian Jiu Jitsu academy. Technique, discipline, and community.</p>
            </div>
            <div className="mt-6 flex items-center text-vital-accent font-bold text-sm uppercase tracking-wider cursor-pointer group-hover:text-white transition-colors relative z-10">
              Read More <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 shadow-2xl border-t-4 border-vital-accent group hover:-translate-y-2 transition-transform duration-300 flex flex-col justify-between min-h-[250px]">
            <div>
              <Activity className="w-12 h-12 text-vital-accent mb-6" />
              <h3 className="text-2xl font-black font-heading mb-3 text-vital-dark">Peptide & Health</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Advanced hormone therapy, pharmacology, and male optimization protocols.</p>
            </div>
            <div className="mt-6 flex items-center text-vital-accent font-bold text-sm uppercase tracking-wider cursor-pointer group-hover:text-vital-dark transition-colors">
              Read More <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>

        </div>
      </section>

      {/* 
        ==============================
        ABOUT ME / WHO WE ARE
        ==============================
      */}
      <section className="py-24 bg-vital-light">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              {/* Abstract image placeholder for Coach/Gym */}
              <div className="aspect-[4/5] bg-gray-200 relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-vital-dark/10 mix-blend-multiply"></div>
                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-8 left-8">
                  <p className="text-vital-accent font-black text-6xl italic leading-none">1:1</p>
                  <p className="text-white font-bold tracking-widest uppercase">Elite Coaching</p>
                </div>
              </div>
              <div className="absolute -right-8 -top-8 w-64 h-64 border-[10px] border-vital-accent/20 -z-10 hidden md:block"></div>
            </div>
            
            <div className="flex flex-col">
              <span className="text-vital-accent font-bold uppercase tracking-[0.2em] mb-4">About the Facility</span>
              <h2 className="text-4xl md:text-5xl font-black font-heading text-vital-dark mb-6 leading-tight">
                WELCOME TO <br />
                VITAL STRENGTH
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Based in Panama, we are more than a physical fitness center. We are an ecosystem designed for high-performance individuals who refuse to settle. From structural body recomposition to deep metabolic resets, we provide the architecture for your ultimate self.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-vital-accent p-1.5 rounded-full"><CheckCircle2 className="w-4 h-4 text-white" /></div>
                  <div>
                    <h4 className="font-bold text-vital-dark uppercase">Gestor de Salud</h4>
                    <p className="text-sm text-gray-500 mt-1">Holistic health management</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-vital-accent p-1.5 rounded-full"><CheckCircle2 className="w-4 h-4 text-white" /></div>
                  <div>
                    <h4 className="font-bold text-vital-dark uppercase">Farmacología</h4>
                    <p className="text-sm text-gray-500 mt-1">Advanced protocols</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-200">
                <p className="font-[Brush_Script_MT,cursive] text-4xl text-gray-400">Head Coach</p>
                <p className="font-bold uppercase tracking-widest text-vital-dark mt-2">Peptides & Performance Specialist</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ==============================
        SERVICES GRID (2x3 Layout)
        ==============================
      */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-vital-accent font-bold uppercase tracking-[0.2em] mb-4 block">Our Expertise</span>
            <h2 className="text-4xl md:text-5xl font-black font-heading text-vital-dark mb-6">PRIME SERVICES</h2>
            <div className="w-24 h-1 bg-vital-accent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Service 1 */}
            <div className="flex gap-6 group">
              <div className="shrink-0 w-20 h-20 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-vital-accent transition-colors duration-300">
                <Dumbbell className="w-8 h-8 text-vital-dark group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-heading text-vital-dark mb-3">Prime Body Recomposition</h3>
                <p className="text-gray-500 mb-4 leading-relaxed">Total physical transformation through hyper-targeted strength and conditioning protocols designed for maximum muscle retention and fat loss.</p>
                <Link href="#" className="text-vital-accent font-bold uppercase text-sm tracking-wider flex items-center group-hover:text-vital-dark transition-colors">Learn More <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </div>
            </div>

            {/* Service 2 */}
            <div className="flex gap-6 group">
              <div className="shrink-0 w-20 h-20 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-vital-accent transition-colors duration-300">
                <Activity className="w-8 h-8 text-vital-dark group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-heading text-vital-dark mb-3">Prime Metabolic Reset</h3>
                <p className="text-gray-500 mb-4 leading-relaxed">Re-engineer your energy systems. Fix insulin resistance, optimize nutrient partitioning, and restore metabolic flexibility.</p>
                <Link href="#" className="text-vital-accent font-bold uppercase text-sm tracking-wider flex items-center group-hover:text-vital-dark transition-colors">Learn More <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </div>
            </div>

            {/* Service 3 */}
            <div className="flex gap-6 group">
              <div className="shrink-0 w-20 h-20 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-vital-accent transition-colors duration-300">
                <HeartPulse className="w-8 h-8 text-vital-dark group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-heading text-vital-dark mb-3">Prime Male Optimization</h3>
                <p className="text-gray-500 mb-4 leading-relaxed">Advanced hormone therapy and testosterone optimization. Overcome fatigue and reclaim your peak male vitality safely.</p>
                <Link href="#" className="text-vital-accent font-bold uppercase text-sm tracking-wider flex items-center group-hover:text-vital-dark transition-colors">Learn More <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </div>
            </div>

            {/* Service 4 */}
            <div className="flex gap-6 group">
              <div className="shrink-0 w-20 h-20 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-vital-accent transition-colors duration-300">
                <Activity className="w-8 h-8 text-vital-dark group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-heading text-vital-dark mb-3">Prime Endurance Systems</h3>
                <p className="text-gray-500 mb-4 leading-relaxed">Elite cardiovascular conditioning for athletes. Expand your VO2 max and anaerobic threshold for unstoppable performance.</p>
                <Link href="#" className="text-vital-accent font-bold uppercase text-sm tracking-wider flex items-center group-hover:text-vital-dark transition-colors">Learn More <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </div>
            </div>

            {/* Service 5 */}
            <div className="flex gap-6 group">
              <div className="shrink-0 w-20 h-20 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-vital-accent transition-colors duration-300">
                <Shield className="w-8 h-8 text-vital-dark group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-heading text-vital-dark mb-3">507Bjj Club</h3>
                <p className="text-gray-500 mb-4 leading-relaxed">Technical Brazilian Jiu Jitsu classes focusing on leverage, self-defense, and sport application. Rolling for all levels.</p>
                <Link href="#" className="text-vital-accent font-bold uppercase text-sm tracking-wider flex items-center group-hover:text-vital-dark transition-colors">Learn More <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </div>
            </div>

            {/* Service 6 */}
            <div className="flex gap-6 group">
              <div className="shrink-0 w-20 h-20 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-vital-accent transition-colors duration-300">
                <Users className="w-8 h-8 text-vital-dark group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-heading text-vital-dark mb-3">Prime Facility Consulting</h3>
                <p className="text-gray-500 mb-4 leading-relaxed">Commercial gym design and layout programming. We help investors build highly profitable, functional fitness spaces.</p>
                <Link href="#" className="text-vital-accent font-bold uppercase text-sm tracking-wider flex items-center group-hover:text-vital-dark transition-colors">Learn More <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 
        ==============================
        PROMO BANNER (BJJ / Gym)
        ==============================
      */}
      <section className="bg-vital-accent py-24 relative overflow-hidden">
        {/* Dynamic angled background slice */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-black/10 clip-slanted"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white max-w-xl">
              <span className="font-bold uppercase tracking-widest mb-2 block">Join the Elite</span>
              <h2 className="text-5xl font-black font-heading mb-6">READY TO ROLL? <br/> 507 BJJ CLUB</h2>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                Step onto the mats. Our Brazilian Jiu Jitsu club integrates seamlessly with our strength programs to forge unbreakable athletes.
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3"><div className="bg-white p-1 rounded-full"><CheckCircle2 className="w-4 h-4 text-vital-accent" /></div> Fundamentals & Advanced</li>
                <li className="flex items-center gap-3"><div className="bg-white p-1 rounded-full"><CheckCircle2 className="w-4 h-4 text-vital-accent" /></div> Competition Preparation</li>
                <li className="flex items-center gap-3"><div className="bg-white p-1 rounded-full"><CheckCircle2 className="w-4 h-4 text-vital-accent" /></div> Mobility & Recovery Protocols</li>
              </ul>
              <Link href="#contact" className="inline-block bg-vital-dark text-white px-10 py-5 font-bold text-lg uppercase tracking-wider hover:bg-white hover:text-vital-dark transition-all duration-300 shadow-2xl">
                Get 1 Free Trial Class
              </Link>
            </div>
            
            <div className="hidden lg:block relative h-[500px]">
              {/* Image cutout placement */}
              <div className="absolute right-0 bottom-0 w-[120%] h-[120%] bg-gradient-to-t from-vital-dark/20 to-transparent">
                {/* Place a PNG of a BJJ fighter or Gym athlete here */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ==============================
        1:1 CLASSES / VIDEO CTA
        ==============================
      */}
      <section className="bg-vital-dark text-white py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Video Placeholder Side */}
          <div className="relative aspect-video lg:aspect-auto flex items-center justify-center bg-black/50 border-r border-white/10 group cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-gray-900/40 group-hover:bg-gray-900/20 transition-colors"></div>
            <div className="relative z-10 w-24 h-24 rounded-full border-4 border-vital-accent flex items-center justify-center bg-black/50 group-hover:scale-110 transition-transform duration-300">
              <Play className="w-10 h-10 text-white ml-2" />
            </div>
            <div className="absolute bottom-8 left-8">
              <p className="font-bold uppercase tracking-widest text-vital-accent">Watch Video</p>
              <h3 className="text-3xl font-black font-heading">TRAINING METHODOLOGY</h3>
            </div>
          </div>

          {/* Text/CTA Side */}
          <div className="p-16 lg:p-24 flex flex-col justify-center bg-vital-dark">
            <h2 className="text-4xl md:text-5xl font-black font-heading mb-6 leading-tight">
              CLASES 1:1 <br />
              <span className="text-vital-accent">➡️ DM FOR INFO</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-lg">
              We don't do generic. Every protocol is customized based on your unique biology, goals, and lifestyle. Direct access to your Peptides Coach & Health Manager.
            </p>
            <Link href="#contact" className="self-start border-2 border-vital-accent text-white px-10 py-5 font-bold text-lg uppercase tracking-wider hover:bg-vital-accent transition-all duration-300">
              Direct Message Us
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
