/* Admin layout — minimal black topbar, sidebar nav */
'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const nav = [
  { href: '/admin', label: 'Overview' },
  { href: '/admin/deals', label: 'Deal Management' },
  { href: '/admin/members', label: 'Members' },
  { href: '/admin/settings', label: 'Settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: 72 }}>
      {/* Admin topbar */}
      <div style={{ background: 'var(--black)', padding: '12px 40px', display: 'flex', alignItems: 'center', gap: 40 }}>
        <span className="label" style={{ fontSize: '9px', color: 'rgba(255,255,255,0.35)' }}>OhHoney Admin</span>
        {nav.map(n => (
          <Link key={n.href} href={n.href} style={{
            fontSize: 11, fontWeight: path === n.href ? 500 : 300,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: path === n.href ? 'var(--white)' : 'rgba(255,255,255,0.4)',
            textDecoration: 'none',
          }}>
            {n.label}
          </Link>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 300, color: 'rgba(255,255,255,0.35)' }}>admin@ohhoney.ai</span>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            style={{
              fontSize: 10, fontWeight: 300, letterSpacing: '0.08em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.5)', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)',
              padding: '6px 14px', cursor: loggingOut ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-sans)',
            }}
          >
            {loggingOut ? '...' : 'Sign out'}
          </button>
        </div>
      </div>
      <div style={{ padding: '48px 56px' }}>
        {children}
      </div>
    </div>
  );
}
