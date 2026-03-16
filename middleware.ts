import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that require an active session
const PROTECTED = ['/dashboard'];

// Admin routes - require admin session
const ADMIN_ROUTES = ['/admin'];

// Admin emails - configured via environment variable
const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(',') || [];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin route protection
  const isAdminRoute = ADMIN_ROUTES.some(path => pathname.startsWith(path));
  if (isAdminRoute) {
    const adminSession = request.cookies.get('oh_admin_session')?.value;
    if (!adminSession) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Dashboard route protection
  const isProtected = PROTECTED.some(path => pathname.startsWith(path));
  if (!isProtected) return NextResponse.next();

  // Check for session cookie (set by auth flow)
  const session = request.cookies.get('oh_session')?.value;
  if (!session) {
    const url = request.nextUrl.clone();
    url.pathname = '/membership';
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};
