'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Today',    href: '/dashboard' },
  { label: 'Inbox',   href: '/dashboard/inbox', count: 3 },
  { label: 'Notes',   href: '/dashboard/notes' },
  { label: 'Tasks',   href: '/dashboard/tasks' },
  { label: 'Calendar',href: '/dashboard/calendar' },
  { label: 'Deals',   href: '/dashboard/deals' },
  { label: 'Graph',   href: '/dashboard/graph' },
  { label: 'Profile', href: '/dashboard/profile' },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      {/* Wordmark */}
      <div style={{ padding: '32px 28px 24px' }}>
        <Link href="/" style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '18px',
          fontWeight: 400,
          letterSpacing: '0.04em',
          color: 'var(--black)',
          display: 'block',
          marginBottom: 4,
        }}>OhHoney</Link>
        <p className="label" style={{ color: 'var(--mid-gray)', fontSize: '9px' }}>
          Intelligence Feels Good
        </p>
      </div>

      <hr className="rule" />

      {/* Navigation */}
      <nav style={{ padding: '24px 0', flex: 1 }}>
        <p className="label" style={{ color: 'var(--mid-gray)', padding: '0 28px', marginBottom: 16, fontSize: '9px' }}>
          Workspace
        </p>
        {navItems.map(({ label, href, count }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '11px 28px',
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              fontWeight: active ? 500 : 300,
              letterSpacing: '0.06em',
              color: active ? 'var(--black)' : 'var(--mid-gray)',
              textDecoration: 'none',
              background: active ? 'var(--off-white)' : 'transparent',
              borderRight: active ? '1px solid var(--black)' : '1px solid transparent',
              transition: 'all var(--ease)',
            }}
              onMouseEnter={e => { if (!active) { (e.currentTarget as HTMLElement).style.color = 'var(--black)'; } }}
              onMouseLeave={e => { if (!active) { (e.currentTarget as HTMLElement).style.color = 'var(--mid-gray)'; } }}>
              {label}
              {count && (
                <span className="chip chip-filled" style={{ fontSize: '9px', padding: '2px 7px' }}>{count}</span>
              )}
            </Link>
          );
        })}
      </nav>

      <hr className="rule" />

      {/* User */}
      <div style={{ padding: '20px 28px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{
          width: 32, height: 32,
          borderRadius: '50%',
          background: 'var(--black)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span style={{ fontSize: '11px', fontWeight: 500, color: 'var(--white)', fontFamily: 'var(--font-sans)', letterSpacing: '0.04em' }}>S</span>
        </div>
        <div>
          <p style={{ fontSize: '12px', fontWeight: 400, color: 'var(--black)', letterSpacing: '0.04em' }}>Sarah K.</p>
          <p className="caption" style={{ fontSize: '10px', color: 'var(--mid-gray)' }}>Premium · Active</p>
        </div>
      </div>
    </aside>
  );
}
