'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Intelligence', href: '/intelligence' },
  { label: 'Deals',        href: '/dashboard/deals' },
  { label: 'Pricing',      href: '/pricing' },
  { label: 'Intensive',    href: '/intensive' },
  { label: 'Membership',   href: '/membership' },
];

export default function Nav() {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/dashboard') || pathname.startsWith('/admin');
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  if (isDashboard) return null;

  const linkStyle: React.CSSProperties = {
    fontFamily: 'var(--font-sans)',
    fontSize: '11px',
    fontWeight: 500,
    letterSpacing: 'var(--tracking-wider)',
    textTransform: 'uppercase',
    color: 'var(--fg-secondary)',
    textDecoration: 'none',
    transition: 'color var(--ease)',
  };

  return (
    <>
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

          {/* Left nav — desktop only */}
          <div className="nav-desktop-left" style={{ display: 'flex', gap: 32, flex: 1 }}>
            {navLinks.slice(0, 2).map(item => (
              <Link key={item.href} href={item.href} style={linkStyle}
                onMouseEnter={e => { (e.target as HTMLElement).style.color = 'var(--black)'; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.color = 'var(--fg-secondary)'; }}>
                {item.label}
              </Link>
            ))}
          </div>

          {/* Center wordmark */}
          <Link href="/" style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '22px',
            fontWeight: 400,
            letterSpacing: '0.06em',
            color: 'var(--black)',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            whiteSpace: 'nowrap',
            textDecoration: 'none',
          }}>OhHoney</Link>

          {/* Right nav — desktop only */}
          <div className="nav-desktop-right" style={{ display: 'flex', gap: 32, alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
            {navLinks.slice(2).map(item => (
              <Link key={item.href} href={item.href} style={linkStyle}
                onMouseEnter={e => { (e.target as HTMLElement).style.color = 'var(--black)'; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.color = 'var(--fg-secondary)'; }}>
                {item.label}
              </Link>
            ))}
            <Link href="/dashboard" className="btn btn-primary btn-xs">Enter</Link>
          </div>

          {/* Hamburger — mobile only */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
            style={{
              display: 'none',
              background: 'none', border: 'none', cursor: 'pointer',
              padding: 8, marginLeft: 'auto', color: 'var(--black)',
              flexDirection: 'column', gap: 5, alignItems: 'flex-end',
            }}>
            <span style={{ display: 'block', width: 24, height: 1, background: 'var(--black)', transition: 'transform 0.2s', transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
            <span style={{ display: 'block', width: 16, height: 1, background: 'var(--black)', opacity: menuOpen ? 0 : 1, transition: 'opacity 0.2s' }} />
            <span style={{ display: 'block', width: 24, height: 1, background: 'var(--black)', transition: 'transform 0.2s', transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className="nav-mobile-drawer" style={{
        position: 'fixed', top: 72, left: 0, right: 0,
        background: 'var(--white)',
        borderBottom: '1px solid var(--border)',
        zIndex: 99,
        display: 'flex', flexDirection: 'column', gap: 0,
        transform: menuOpen ? 'translateY(0)' : 'translateY(-100%)',
        opacity: menuOpen ? 1 : 0,
        transition: 'transform 0.25s ease, opacity 0.2s ease',
        pointerEvents: menuOpen ? 'all' : 'none',
      }}>
        {navLinks.map(item => (
          <Link key={item.href} href={item.href} style={{
            display: 'block',
            padding: '18px 40px',
            borderBottom: '1px solid var(--border)',
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--black)',
            textDecoration: 'none',
          }}>
            {item.label}
          </Link>
        ))}
        <div style={{ padding: '20px 40px' }}>
          <Link href="/dashboard" className="btn btn-primary" style={{ display: 'block', textAlign: 'center' }}>Enter</Link>
        </div>
      </div>
    </>
  );
}
