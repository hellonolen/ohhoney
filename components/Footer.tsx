'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const col1 = [
  { label: 'Intelligence', href: '/intelligence' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Intensive', href: '/intensive' },
  { label: 'Membership', href: '/membership' },
  { label: 'Contact', href: '/contact' },
];

const col2 = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Deals', href: '/dashboard/deals' },
  { label: 'Knowledge Graph', href: '/dashboard/graph' },
  { label: 'Profile', href: '/dashboard/profile' },
];

const col3 = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'support@ohhoney.ai', href: 'mailto:support@ohhoney.ai' },
  { label: 'enterprise@ohhoney.ai', href: 'mailto:enterprise@ohhoney.ai' },
];

const linkStyle: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: 300,
  color: 'rgba(255,255,255,0.45)',
  textDecoration: 'none',
  display: 'block',
  paddingBottom: '10px',
  letterSpacing: '0.02em',
  transition: 'color 0.2s',
};

export default function Footer() {
  const pathname = usePathname();
  const hide = pathname.startsWith('/dashboard') || pathname.startsWith('/admin');
  if (hide) return null;
  return (
    <footer style={{
      background: 'var(--black)',
      color: 'var(--white)',
      padding: '64px 40px 40px',
      marginTop: 'auto',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 56 }}>
          {/* Brand */}
          <div>
            <Link href="/" style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '20px',
              fontWeight: 400,
              letterSpacing: '0.04em',
              color: 'var(--white)',
              textDecoration: 'none',
              display: 'block',
              marginBottom: 12,
            }}>
              OhHoney
            </Link>
            <p style={{ fontSize: '11px', fontWeight: 300, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 20 }}>
              Intelligence Feels Good
            </p>
            <p style={{ fontSize: '12px', fontWeight: 300, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, maxWidth: 280 }}>
              A private intelligence platform for women who command wealth, wellbeing, and legacy at the highest level.
            </p>
          </div>

          {/* Platform */}
          <div>
            <p className="label" style={{ fontSize: '9px', color: 'rgba(255,255,255,0.25)', marginBottom: 20 }}>Platform</p>
            {col1.map(l => (
              <Link key={l.href} href={l.href} style={linkStyle}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.8)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)'; }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Member */}
          <div>
            <p className="label" style={{ fontSize: '9px', color: 'rgba(255,255,255,0.25)', marginBottom: 20 }}>Member</p>
            {col2.map(l => (
              <Link key={l.href} href={l.href} style={linkStyle}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.8)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)'; }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Legal & Contact */}
          <div>
            <p className="label" style={{ fontSize: '9px', color: 'rgba(255,255,255,0.25)', marginBottom: 20 }}>Legal & Contact</p>
            {col3.map(l => (
              <Link key={l.href} href={l.href} style={linkStyle}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.8)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)'; }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: '11px', fontWeight: 300, color: 'rgba(255,255,255,0.25)' }}>
            © 2026 OhHoney.ai. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            <Link href="/privacy" style={{ fontSize: '11px', fontWeight: 300, color: 'rgba(255,255,255,0.25)', textDecoration: 'none' }}>Privacy</Link>
            <Link href="/terms" style={{ fontSize: '11px', fontWeight: 300, color: 'rgba(255,255,255,0.25)', textDecoration: 'none' }}>Terms</Link>
            <Link href="/contact" style={{ fontSize: '11px', fontWeight: 300, color: 'rgba(255,255,255,0.25)', textDecoration: 'none' }}>Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
