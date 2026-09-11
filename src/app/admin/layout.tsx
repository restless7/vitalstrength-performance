'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Pill,
  Activity,
  Calendar,
  DollarSign,
  Settings,
  Shield,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  CheckCircle2,
  AlertTriangle,
  Zap,
  ChevronDown,
  Award,
  Lock,
  Building
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export type AdminRole = 'HEAD_COACH' | 'CLINICAL_STAFF' | 'BJJ_INSTRUCTOR';

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminRole, setAdminRole] = useState<AdminRole>('HEAD_COACH');
  const pathname = usePathname();

  const navigation = [
    { name: 'Command Center', href: '/admin', icon: LayoutDashboard, roles: ['HEAD_COACH', 'CLINICAL_STAFF', 'BJJ_INSTRUCTOR'] },
    { name: 'Pacientes & CRM', href: '/admin?tab=patients', icon: Users, roles: ['HEAD_COACH', 'CLINICAL_STAFF'] },
    { name: 'Motor de Prescripciones', href: '/admin?tab=protocols', icon: Pill, roles: ['HEAD_COACH', 'CLINICAL_STAFF'] },
    { name: 'Laboratorio & Sangre', href: '/admin?tab=bloodwork', icon: Activity, roles: ['HEAD_COACH', 'CLINICAL_STAFF'] },
    { name: 'Sesiones 1:1 & BJJ', href: '/admin?tab=sessions', icon: Calendar, roles: ['HEAD_COACH', 'BJJ_INSTRUCTOR'] },
    { name: 'Precios & Tarifas USD', href: '/admin?tab=pricing', icon: DollarSign, roles: ['HEAD_COACH'] },
    { name: 'Configuración & RBAC', href: '/admin?tab=settings', icon: Settings, roles: ['HEAD_COACH'] },
  ];

  return (
    <div className="min-h-screen bg-vital-dark text-white font-sans flex flex-col lg:flex-row">
      
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-black/90 border-r border-white/10 flex flex-col justify-between transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-vital-accent flex items-center justify-center font-black font-heading text-white text-lg shadow-lg">
                VSP
              </div>
              <div>
                <h1 className="font-black font-heading tracking-widest text-base uppercase text-white">
                  VSP <span className="text-vital-accent">PRIME</span>
                </h1>
                <p className="text-[10px] text-gray-400 font-light">Admin Command Suite</p>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Role Switcher */}
          <div className="p-4 mx-4 my-4 bg-white/5 border border-white/10 rounded-xl">
            <div className="flex items-center justify-between text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-vital-accent" /> Rol Activo:
              </span>
            </div>
            <select
              value={adminRole}
              onChange={(e) => setAdminRole(e.target.value as AdminRole)}
              className="w-full bg-vital-dark border border-white/20 rounded-lg px-3 py-2 text-xs font-bold text-vital-accent focus:outline-none focus:border-vital-accent"
            >
              <option value="HEAD_COACH">Alejandro (Head Coach)</option>
              <option value="CLINICAL_STAFF">Personal Clínico / Péptidos</option>
              <option value="BJJ_INSTRUCTOR">Instructor 507 BJJ</option>
            </select>
          </div>

          {/* Navigation Links */}
          <nav className="px-4 space-y-1.5">
            {navigation.map((item) => {
              const IconComponent = item.icon;
              const isAllowed = item.roles.includes(adminRole);

              if (!isAllowed) return null;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-white hover:bg-vital-accent/20 hover:border hover:border-vital-accent/40 transition-all group"
                >
                  <IconComponent className="w-4 h-4 text-vital-accent group-hover:scale-110 transition-transform" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer User Badge */}
        <div className="p-6 border-t border-white/10 bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-vital-accent/20 border border-vital-accent flex items-center justify-center font-bold text-vital-accent text-sm">
              AS
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">Alejandro Sanchez</p>
              <p className="text-[10px] text-vital-accent font-semibold uppercase tracking-wider">
                {adminRole === 'HEAD_COACH' ? 'Head Coach / Owner' : adminRole}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header */}
        <header className="bg-black/60 border-b border-white/10 p-4 lg:px-8 flex items-center justify-between sticky top-0 z-30 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2 w-72">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar paciente, protocolo o analítica..."
                className="bg-transparent text-xs text-white placeholder-gray-500 focus:outline-none w-full"
              />
            </div>
          </div>

          {/* Quick Actions & Status */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Instalación Panamá Online (1:1 Ready)</span>
            </div>

            <button className="relative p-2 rounded-xl bg-white/5 border border-white/10 hover:border-vital-accent text-gray-300 hover:text-white transition-all">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-vital-accent rounded-full animate-ping"></span>
            </button>

            <Link
              href="/"
              className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-vital-accent px-3 py-2 border border-white/10 hover:border-vital-accent rounded-xl transition-all"
            >
              Ver Sitio Público
            </Link>
          </div>
        </header>

        {/* Page Children Container */}
        <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
          {children}
        </main>
      </div>

    </div>
  );
}
