/* Admin layout — minimal black topbar, sidebar nav */
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const nav = [
  { href: '/admin', label: 'Overview' },
  { href: '/admin/deals', label: 'Deal Management' },
  { href: '/admin/members', label: 'Members' },
  { href: '/admin/settings', label: 'Settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
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
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 12 }}>
          <span style={{ fontSize: 11, fontWeight: 300, color: 'rgba(255,255,255,0.35)' }}>hellonolen@gmail.com</span>
        </div>
      </div>
      <div style={{ padding: '48px 56px' }}>
        {children}
      </div>
    </div>
  );
}
