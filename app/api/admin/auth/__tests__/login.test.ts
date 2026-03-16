import { describe, it, expect, beforeEach, vi } from 'vitest';
import { POST } from '../login/route';
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

// Mock cookies
vi.mock('next/headers', () => ({
  cookies: vi.fn(() => ({
    set: vi.fn(),
    delete: vi.fn(),
    get: vi.fn(() => ({ value: 'mock-session' })),
  })),
}));

describe('Admin Auth Login API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset environment variables for testing
    process.env.ADMIN_EMAILS = 'admin@ohhoney.ai,team@ohhoney.ai';
    process.env.ADMIN_PASSWORD = 'test-password-123';
  });

  describe('POST /api/admin/auth/login', () => {
    it('should require email and password', async () => {
      const request = new NextRequest('http://localhost:3000/api/admin/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: '', password: '' }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Email and password are required');
    });

    it('should reject invalid email addresses', async () => {
      const request = new NextRequest('http://localhost:3000/api/admin/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: 'invalid@example.com', password: 'test-password-123' }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe('Invalid credentials');
    });

    it('should reject invalid password', async () => {
      const request = new NextRequest('http://localhost:3000/api/admin/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: 'admin@ohhoney.ai', password: 'wrong-password' }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe('Invalid credentials');
    });

    it('should accept valid credentials', async () => {
      const request = new NextRequest('http://localhost:3000/api/admin/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: 'admin@ohhoney.ai', password: 'test-password-123' }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.email).toBe('admin@ohhoney.ai');
      expect(data.message).toBe('Authentication successful');
    });

    it('should set session cookie on successful login', async () => {
      const request = new NextRequest('http://localhost:3000/api/admin/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: 'admin@ohhoney.ai', password: 'test-password-123' }),
      });

      await POST(request);

      const mockCookies = await cookies();
      expect(mockCookies.set).toHaveBeenCalled();
      expect(mockCookies.set).toHaveBeenCalledWith(
        'oh_admin_session',
        expect.stringContaining('admin_'),
        expect.objectContaining({
          httpOnly: true,
          path: '/',
        })
      );
    });
  });
});
