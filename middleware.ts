import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that require an active session
const PROTECTED = ['/dashboard'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

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
  matcher: ['/dashboard/:path*'],
};
