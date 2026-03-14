'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';

const pageLabels: Record<string, string> = {
  '/dashboard':          'Today',
  '/dashboard/inbox':   'Inbox',
  '/dashboard/notes':   'Notes',
  '/dashboard/tasks':   'Tasks',
  '/dashboard/calendar':'Calendar',
  '/dashboard/deals':   'Deals',
  '/dashboard/graph':   'Graph',
};

export default function DashboardTopbar() {
  const pathname = usePathname();
  const label = pageLabels[pathname] ?? '';
  const [date, setDate] = useState('');

  useEffect(() => {
    setDate(new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }));
  }, []);

  return (
    <header style={{
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 56px',
      borderBottom: '1px solid var(--border)',
      position: 'sticky',
      top: 0, zIndex: 50,
      background: 'var(--white)',
    }}>
      {/* Left — page title */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 20 }}>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '20px',
          fontWeight: 300,
          letterSpacing: '0.02em',
          fontStyle: 'italic',
          color: 'var(--black)',
        }}>{label}</h1>
        <span style={{
          fontSize: '11px',
          fontWeight: 300,
          color: 'var(--mid-gray)',
          letterSpacing: '0.06em',
        }}>{date}</span>
      </div>

      {/* Right — minimal actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: 'var(--off-white)',
          border: 'none', cursor: 'pointer',
          padding: '8px 20px',
          fontFamily: 'var(--font-sans)',
          fontSize: '11px',
          fontWeight: 400,
          letterSpacing: '0.08em',
          color: 'var(--mid-gray)',
          transition: 'all var(--ease)',
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--black)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--mid-gray)'; }}>
          <Search size={12} strokeWidth={1.5} />
          Search
          <span style={{ fontSize: '9px', color: 'var(--mid-gray)', letterSpacing: '0.04em' }}>⌘K</span>
        </button>

        <Link href="/membership" className="btn btn-xs">
          Pro
        </Link>
      </div>
    </header>
  );
}
