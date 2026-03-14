'use client';
import Link from 'next/link';

const pillars = [
  { id: 'wealth',       label: 'Wealth & Investing',          summary: 'Portfolio intelligence, advisor access, PE deal flow, and private market opportunities curated for members.' },
  { id: 'tax',          label: 'Tax & Estate Strategy',       summary: 'Structures, trusts, and planning frameworks that protect and transfer wealth across generations.' },
  { id: 'travel',       label: 'Luxury Travel',               summary: 'Vetted properties, private itineraries, and off-market experiences. Never published. Member only.' },
  { id: 'health',       label: 'Health & Longevity',          summary: 'Science-backed optimization protocols, longevity medicine partnerships, and biometric intelligence.' },
  { id: 'beauty',       label: 'Beauty & Aesthetic Medicine', summary: 'Selective access to leading aesthetic practitioners, skincare intelligence, and wellness concierge.' },
  { id: 'realestate',   label: 'Real Estate & Property',      summary: 'Off-market introductions, advisor referrals, and portfolio strategy for the residential and commercial buyer.' },
  { id: 'business',     label: 'Business Ownership',          summary: 'Operational intelligence for founders and principals. Payroll, legal, hiring, and scale frameworks.' },
  { id: 'education',    label: 'Education Planning',          summary: 'Private school admissions, 529 strategy, university counseling and global educational opportunities.' },
  { id: 'philanthropy', label: 'Philanthropy & Impact',       summary: 'Structured giving, donor-advised funds, impact investing, and philanthropic advisor introductions.' },
  { id: 'security',     label: 'Personal Security & Privacy', summary: 'Digital hygiene, executive threat assessment, data removal, and family security planning.' },
  { id: 'interior',     label: 'Interior Design & Home',      summary: 'Designer access, trade pricing, custom sourcing, and curated introductions to the most in-demand studios.' },
  { id: 'fashion',      label: 'Fashion & Personal Style',    summary: 'Private appointments, archive access, personal stylists, and luxury rental at member rates.' },
];

const briefings = [
  {
    date: 'March 14, 2026',
    category: 'Wealth & Investing',
    headline: 'Private equity secondaries reach a 3-year peak as LP liquidity pressure mounts',
    body: 'Dry powder in secondary markets hit $108B in Q1, creating a rare window for selective buyers. Three funds currently in our deal flow have sub-$500K minimums available to Pro members through March 31.',
  },
  {
    date: 'March 13, 2026',
    category: 'Health & Longevity',
    headline: 'Lifeforce extends member rate through April — and what the new protocol data shows',
    body: 'The Q1 cohort data is in. Women on the combined NMN + zone-2 protocol for 90 days showed 18% average VO2 improvement. Our extended member rate locks in at $149/month through mid-April.',
  },
  {
    date: 'March 12, 2026',
    category: 'Real Estate & Property',
    headline: 'Off-market: Eze-sur-Mer villa — 3-day review window closes March 16',
    body: '4-bedroom, €7.4M asking, zero days on market. Our network broker has authorized an exclusive member introduction window. Pro members only. Reply within the platform to receive the full brief.',
  },
  {
    date: 'March 11, 2026',
    category: 'Fashion & Style',
    headline: 'Loro Piana atelier visits confirmed for June — 8 member slots available',
    body: 'Private half-day with a senior maison stylist. Bespoke consultation and archive viewing. Milan, fashion week fringe. Application through the Deals section — first-come.',
  },
];

export default function IntelligencePage() {
  return (
    <div style={{ paddingTop: 72 }}>
      {/* Hero */}
      <section style={{ padding: '80px 40px 64px', maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <p className="label" style={{ color: 'var(--mid-gray)', marginBottom: 20 }}>OhHoney Intelligence</p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px,5vw,60px)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.08, marginBottom: 24 }}>
          The briefings that matter.<br />The deals you never hear about.
        </h1>
        <p style={{ fontSize: 14, fontWeight: 300, color: 'var(--fg-secondary)', lineHeight: 1.75, maxWidth: 520, margin: '0 auto 40px' }}>
          OhHoney aggregates intelligence across 12 pillars of a designed life. Members receive daily briefings and access to an exclusive deal flow — vetted, negotiated, and relevant.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/membership" className="btn btn-primary btn-sm">Apply for membership</Link>
          <Link href="/pricing" className="btn btn-ghost btn-sm">View pricing</Link>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border)', maxWidth: 1200, margin: '0 auto' }} />

      {/* Intelligence Briefings */}
      <section style={{ padding: '64px 40px', maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 40 }}>
          <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)' }}>Recent intelligence briefings</p>
          <Link href="/membership" style={{ fontSize: 11, fontWeight: 300, color: 'var(--mid-gray)', textDecoration: 'underline' }}>Members see all briefings</Link>
        </div>
        {briefings.map((b, i) => (
          <article key={i} style={{ paddingBottom: 36, marginBottom: 36, borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', gap: 20, alignItems: 'baseline', marginBottom: 12 }}>
              <span className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)' }}>{b.category}</span>
              <span style={{ fontSize: 10, fontWeight: 300, color: 'var(--mid-gray)' }}>{b.date}</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 300, fontStyle: 'italic', lineHeight: 1.3, marginBottom: 12, color: 'var(--black)' }}>
              {b.headline}
            </h2>
            <p style={{ fontSize: 13, fontWeight: 300, color: 'var(--dark-gray)', lineHeight: 1.75 }}>{b.body}</p>
          </article>
        ))}
        <div style={{ textAlign: 'center', paddingTop: 8 }}>
          <Link href="/membership" className="btn btn-primary btn-sm">Unlock all briefings</Link>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />

      {/* 12 Pillars grid */}
      <section style={{ padding: '64px 40px', maxWidth: 1200, margin: '0 auto' }}>
        <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', marginBottom: 40, textAlign: 'center' }}>
          Twelve pillars of intelligence
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)' }}>
          {pillars.map(p => (
            <Link key={p.id} href="/dashboard/deals" style={{
              display: 'block',
              background: 'var(--white)', padding: '28px 24px',
              textDecoration: 'none',
            }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: 15, fontWeight: 300, fontStyle: 'italic', color: 'var(--black)', marginBottom: 10, lineHeight: 1.3 }}>{p.label}</p>
              <p style={{ fontSize: 11, fontWeight: 300, color: 'var(--mid-gray)', lineHeight: 1.6 }}>{p.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--off-white)', padding: '80px 40px', textAlign: 'center' }}>
        <div style={{ maxWidth: 480, margin: '0 auto' }}>
          <p className="label" style={{ color: 'var(--mid-gray)', marginBottom: 20 }}>Begin with 3 days free</p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 300, fontStyle: 'italic', lineHeight: 1.2, marginBottom: 24 }}>
            Intelligence designed for women who command.
          </h2>
          <Link href="/checkout/trial" className="btn btn-primary btn-sm">Start free trial</Link>
          <p style={{ fontSize: 11, fontWeight: 300, color: 'var(--mid-gray)', marginTop: 16 }}>No card required · 3 days full access</p>
        </div>
      </section>
    </div>
  );
}
