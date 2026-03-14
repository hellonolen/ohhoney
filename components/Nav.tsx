'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const marketingNav = [
  { label: 'Intelligence', href: '/intelligence' },
  { label: 'For You',      href: '/for-you' },
  { label: 'Membership',   href: '/membership' },
  { label: 'Journal',      href: '/journal' },
];

export default function Nav() {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/dashboard');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (isDashboard) return null;

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      height: '72px',
      background: 'var(--white)',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      display: 'flex', alignItems: 'center',
      zIndex: 100,
      transition: 'border-color 0.3s ease',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '0 40px' }}>

        {/* Left nav */}
        <div style={{ display: 'flex', gap: 32, flex: 1 }}>
          {marketingNav.slice(0, 2).map(item => (
            <Link key={item.href} href={item.href} style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: 'var(--tracking-wider)',
              textTransform: 'uppercase',
              color: 'var(--fg-secondary)',
              transition: 'color var(--ease)',
            }}
              onMouseEnter={e => { (e.target as HTMLElement).style.color = 'var(--black)'; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.color = 'var(--fg-secondary)'; }}>
              {item.label}
            </Link>
          ))}
        </div>

        {/* Center wordmark — Chanel centers logo */}
        <Link href="/" style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '22px',
          fontWeight: 400,
          letterSpacing: '0.08em',
          color: 'var(--black)',
          textTransform: 'uppercase',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          whiteSpace: 'nowrap',
        }}>OhHoney</Link>

        {/* Right nav */}
        <div style={{ display: 'flex', gap: 32, alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
          {marketingNav.slice(2).map(item => (
            <Link key={item.href} href={item.href} style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: 'var(--tracking-wider)',
              textTransform: 'uppercase',
              color: 'var(--fg-secondary)',
              transition: 'color var(--ease)',
            }}
              onMouseEnter={e => { (e.target as HTMLElement).style.color = 'var(--black)'; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.color = 'var(--fg-secondary)'; }}>
              {item.label}
            </Link>
          ))}
          <Link href="/dashboard" className="btn btn-primary btn-xs">
            Enter
          </Link>
        </div>
      </div>
    </nav>
  );
}
