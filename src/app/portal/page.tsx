import ClientPortal from '../components/portal/ClientPortal';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Client Portal & RBAC | VSP Prime Panama',
  description: 'Módulo de acceso de clientes, seguimiento de protocolos de 12 semanas y analíticas clínicas.',
};

export default function PortalPage() {
  return <ClientPortal />;
}
