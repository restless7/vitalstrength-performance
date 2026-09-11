import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isAdminApiRoute = createRouteMatcher(['/api/admin(.*)']);
const isAdminPageRoute = createRouteMatcher(['/admin(.*)']);

export default clerkMiddleware(async (auth, req) => {
  // Skip middleware blocking if publishable key missing or dev role simulation explicitly enabled
  if (
    !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
    process.env.ALLOW_DEV_ROLE_SIMULATION === 'true'
  ) {
    return NextResponse.next();
  }

  // 1. Admin API endpoints -> return JSON 401 if unauthenticated in production
  if (isAdminApiRoute(req)) {
    const session = await auth();
    if (!session.userId && process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { success: false, error: 'Acceso Denegado: Autenticación Clerk requerida (HTTP 401).' },
        { status: 401 }
      );
    }
  }

  // 2. Admin Page routes -> redirect unauthenticated browser users to Clerk Sign-In
  if (isAdminPageRoute(req)) {
    await auth.protect();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|json|png|jpg|jpeg|webp|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
