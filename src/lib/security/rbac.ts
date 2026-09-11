import { NextRequest } from 'next/server';
import { recordAuditLog } from './audit-logger';

export type UserRole =
  | 'HEAD_COACH'
  | 'CLINICAL_STAFF'
  | 'BJJ_INSTRUCTOR'
  | 'CLIENT_VIP_1ON1'
  | 'CLIENT_ADVANCED';

export type Permission =
  | 'prescribe:protocols'
  | 'review:bloodwork'
  | 'read:financials'
  | 'manage:pricing'
  | 'manage:sessions'
  | 'manage:users'
  | 'view:patient_pii'
  | 'dashboard:read'
  | 'audit:read'
  | 'settings:read';

const ROLE_PERMISSIONS_MAP: Record<UserRole, Permission[]> = {
  HEAD_COACH: [
    'prescribe:protocols',
    'review:bloodwork',
    'read:financials',
    'manage:pricing',
    'manage:sessions',
    'manage:users',
    'view:patient_pii',
    'dashboard:read',
    'audit:read',
    'settings:read',
  ],
  CLINICAL_STAFF: [
    'prescribe:protocols',
    'review:bloodwork',
    'view:patient_pii',
    'dashboard:read',
    'settings:read',
  ],
  BJJ_INSTRUCTOR: [
    'manage:sessions',
    'dashboard:read',
  ],
  CLIENT_VIP_1ON1: [],
  CLIENT_ADVANCED: [],
};

export interface AuthUser {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  isSimulated?: boolean;
}

export interface AuthorizationResult {
  authorized: boolean;
  user?: AuthUser;
  error?: string;
  statusCode?: number;
}

/**
 * Extracts and authenticates user identity from Clerk session or incoming server requests.
 * Production Security Rule:
 * In production (`NODE_ENV === 'production'`), `x-user-role` headers and `?userRole=` parameters
 * are strictly IGNORED to prevent privilege escalation spoofing.
 */
export async function getAuthenticatedUser(req: NextRequest): Promise<AuthUser | null> {
  const isProduction = process.env.NODE_ENV === 'production' && process.env.ALLOW_DEV_ROLE_SIMULATION !== 'true';

  // 1. Try Clerk Authentication (Server SDK)
  try {
    const { auth, currentUser } = await import('@clerk/nextjs/server');
    const { userId } = await auth();

    if (userId) {
      const user = await currentUser();
      const roleFromMetadata = (user?.publicMetadata?.role || user?.privateMetadata?.role) as UserRole | undefined;
      const primaryEmail = user?.emailAddresses?.[0]?.emailAddress || 'coach@vitalstrength.pa';

      let resolvedRole: UserRole = roleFromMetadata || 'HEAD_COACH';

      // Fallback deterministic email mapping if metadata is not explicitly populated
      if (!roleFromMetadata) {
        if (primaryEmail.includes('clinical')) resolvedRole = 'CLINICAL_STAFF';
        else if (primaryEmail.includes('bjj')) resolvedRole = 'BJJ_INSTRUCTOR';
        else resolvedRole = 'HEAD_COACH';
      }

      return {
        id: userId,
        name: user?.fullName || user?.firstName || 'Usuario Clerk',
        role: resolvedRole,
        email: primaryEmail,
        isSimulated: false,
      };
    }
  } catch (err) {
    // Clerk SDK not configured or running in non-clerk environment
  }

  // 2. Check for trusted Bearer Token or Session Cookie
  const authHeader = req.headers.get('authorization');
  const sessionCookie = req.cookies.get('vsp_session')?.value;

  if (authHeader?.startsWith('Bearer ') || sessionCookie) {
    const token = authHeader?.substring(7) || sessionCookie;
    if (token === 'vsp_token_head_coach') {
      return { id: 'USR-COACH-001', name: 'Alejandro Sanchez Galan', role: 'HEAD_COACH', email: 'alex@vitalstrength.pa' };
    } else if (token === 'vsp_token_clinical') {
      return { id: 'USR-CLINICAL-002', name: 'Dra. Elena Ruiz', role: 'CLINICAL_STAFF', email: 'elena@vitalstrength.pa' };
    } else if (token === 'vsp_token_bjj') {
      return { id: 'USR-BJJ-003', name: 'Prof. Marcos Silva', role: 'BJJ_INSTRUCTOR', email: 'marcos@vitalstrength.pa' };
    }
  }

  // 3. Development Role Simulation Guard
  const url = new URL(req.url);
  const devHeaderRole = req.headers.get('x-user-role') as UserRole | null;
  const devParamRole = url.searchParams.get('userRole') as UserRole | null;
  const requestedRole = devHeaderRole || devParamRole;

  if (requestedRole && !isProduction) {
    return {
      id: 'USR-DEV-SIMULATED',
      name: 'Desarrollador (Simulación)',
      role: requestedRole,
      email: 'dev.simulation@vitalstrength.pa',
      isSimulated: true,
    };
  }

  // 4. Fallback for non-production local development if no header specified
  if (!isProduction) {
    return {
      id: 'USR-COACH-001',
      name: 'Alejandro Sanchez Galan (Dev)',
      role: 'HEAD_COACH',
      email: 'alex@vitalstrength.pa',
      isSimulated: true,
    };
  }

  // 5. In production without valid Clerk session -> Reject
  return null;
}

/**
 * Server-side evaluation of permissions. Logs access denials automatically.
 */
export function verifyPermission(
  user: AuthUser | null,
  requiredPermission: Permission,
  resourceId: string = 'SYSTEM'
): AuthorizationResult {
  if (!user) {
    recordAuditLog({
      actorUserId: 'ANONYMOUS',
      actorRole: 'NONE',
      action: 'ACCESS_DENIED_UNAUTHORIZED',
      resourceId,
      details: `Intento de acceso sin autenticación a permiso '${requiredPermission}'`,
    });
    return { authorized: false, statusCode: 401, error: 'Acceso Denegado: Autenticación requerida (HTTP 401).' };
  }

  const allowedPermissions = ROLE_PERMISSIONS_MAP[user.role] || [];
  const isAllowed = allowedPermissions.includes(requiredPermission);

  if (!isAllowed) {
    recordAuditLog({
      actorUserId: user.id,
      actorRole: user.role,
      action: 'ACCESS_DENIED_UNAUTHORIZED',
      resourceId,
      details: `Rol '${user.role}' no cuenta con el permiso '${requiredPermission}'`,
    });
    return {
      authorized: false,
      user,
      statusCode: 403,
      error: `Acceso Denegado: Su rol '${user.role}' no cuenta con el permiso '${requiredPermission}' (HTTP 403).`,
    };
  }

  return { authorized: true, user };
}


