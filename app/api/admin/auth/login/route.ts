import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Admin emails - in production, this should be stored in a secure database
// For now, we use environment variable
const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(',') || ['admin@ohhoney.ai', 'team@ohhoney.ai'];
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';

// Generate a simple session token (in production, use JWT or proper session management)
function generateSessionToken(): string {
  return `admin_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check if email is in admin list
    if (!ADMIN_EMAILS.includes(email.toLowerCase())) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check password (in production, use proper password hashing)
    if (!ADMIN_PASSWORD || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate session token and set cookie
    const sessionToken = generateSessionToken();

    const cookieStore = await cookies();
    cookieStore.set('oh_admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return NextResponse.json({
      success: true,
      email,
      message: 'Authentication successful',
    });
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { error: 'An error occurred during authentication' },
      { status: 500 }
    );
  }
}
