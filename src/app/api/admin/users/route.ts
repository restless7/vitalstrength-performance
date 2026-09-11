import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser, verifyPermission, UserRole } from '@/lib/security/rbac';
import { recordAuditLog } from '@/lib/security/audit-logger';

// Initial staff data fallback if Clerk client is not configured
const initialStaffMembers = [
  {
    id: 'usr_head_coach_001',
    name: 'Alejandro Sánchez Galán',
    email: 'alex@vitalstrength.pa',
    role: 'HEAD_COACH',
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'usr_clinical_002',
    name: 'Dra. Elena Ruiz',
    email: 'elena@vitalstrength.pa',
    role: 'CLINICAL_STAFF',
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'usr_bjj_003',
    name: 'Prof. Marcos Silva',
    email: 'marcos@vitalstrength.pa',
    role: 'BJJ_INSTRUCTOR',
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
  },
];

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    const authCheck = verifyPermission(user, 'manage:users', 'USERS_API');

    if (!authCheck.authorized) {
      return NextResponse.json(
        { success: false, error: authCheck.error },
        { status: authCheck.statusCode || 403 }
      );
    }

    // Try fetching live users from Clerk SDK if available
    let clerkUsers: any[] = [];
    if (process.env.CLERK_SECRET_KEY) {
      try {
        const { clerkClient } = await import('@clerk/nextjs/server');
        const client = await clerkClient();
        const response = await client.users.getUserList({ limit: 50 });
        clerkUsers = response.data.map((u: any) => ({
          id: u.id,
          name: u.fullName || u.firstName || u.emailAddresses?.[0]?.emailAddress || u.id,
          email: u.emailAddresses?.[0]?.emailAddress || 'N/A',
          role: (u.publicMetadata?.role || u.privateMetadata?.role || 'HEAD_COACH') as UserRole,
          status: u.banned ? 'BANNED' : 'ACTIVE',
          createdAt: new Date(u.createdAt).toISOString(),
        }));
      } catch (err) {
        console.warn('Clerk user list fetch warning (using staff fallback):', err);
      }
    }

    const staffList = clerkUsers.length > 0 ? clerkUsers : initialStaffMembers;

    return NextResponse.json({
      success: true,
      data: staffList,
      total: staffList.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Error al obtener lista de usuarios', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    const authCheck = verifyPermission(user, 'manage:users', 'USERS_API');

    if (!authCheck.authorized) {
      return NextResponse.json(
        { success: false, error: authCheck.error },
        { status: authCheck.statusCode || 403 }
      );
    }

    const body = await req.json();
    const { userId, role } = body;

    if (!userId || !role) {
      return NextResponse.json(
        { success: false, error: 'Campos requeridos: userId y role' },
        { status: 400 }
      );
    }

    const validRoles: UserRole[] = ['HEAD_COACH', 'CLINICAL_STAFF', 'BJJ_INSTRUCTOR', 'CLIENT_VIP_1ON1', 'CLIENT_ADVANCED'];
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { success: false, error: `Rol inválido '${role}'. Roles válidos: ${validRoles.join(', ')}` },
        { status: 400 }
      );
    }

    let updatedInClerk = false;

    // If Clerk secret key is present, update user's public metadata
    if (process.env.CLERK_SECRET_KEY) {
      try {
        const { clerkClient } = await import('@clerk/nextjs/server');
        const client = await clerkClient();
        await client.users.updateUserMetadata(userId, {
          publicMetadata: {
            role,
          },
        });
        updatedInClerk = true;
      } catch (err: any) {
        console.warn('Clerk API metadata update warning:', err.message);
      }
    }

    const auditLog = recordAuditLog({
      actorUserId: user?.id || 'SYSTEM',
      actorRole: user?.role || 'HEAD_COACH',
      action: 'USER_ROLE_UPDATED',
      resourceId: userId,
      details: `Rol de usuario ${userId} actualizado a '${role}' (Clerk Sync: ${updatedInClerk})`,
    });

    return NextResponse.json({
      success: true,
      message: `Rol asignado exitosamente a '${role}'`,
      data: {
        userId,
        role,
        clerkSynced: updatedInClerk,
        auditSignature: auditLog.signature,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Error al actualizar rol de usuario', details: error.message },
      { status: 500 }
    );
  }
}
