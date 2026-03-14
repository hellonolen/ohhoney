'use client';
import Link from 'next/link';

const topics = [
  'Wealth Management & Investing',
  'Tax Strategy & Estate Planning',
  'Luxury Travel & Experiences',
  'Health Optimization & Longevity',
  'Beauty, Wellness & Aesthetic Medicine',
  'Real Estate & Property',
  'Entrepreneurship & Ownership',
  'Education Planning',
  'Philanthropy & Impact',
  'Personal Security & Privacy',
  'Interior Design & Home',
  'Fashion, Luxury & Personal Styling',
];

const testimonials = [
  {
    quote: 'For the first time, I have something that keeps up with how I think.',
    author: 'Founder, Series B company',
    location: 'New York',
  },
  {
    quote: 'It replaced three separate tools and a part-time assistant.',
    author: 'Portfolio Manager',
    location: 'London',
  },
  {
    quote: 'The only software that understands that my time is finite and my standards are not.',
    author: 'Creative Director',
    location: 'Paris',
  },
];

export default function LandingPage() {
  return (
    <>
      {/* ── HERO — full bleed, editorial, image-forward ── */}
      <section style={{
        height: '100vh',
        minHeight: 600,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'relative',
        background: 'var(--black)',
        paddingBottom: '80px',
        overflow: 'hidden',
      }}>
        {/* Hero image */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(29,29,29,0.2) 0%, rgba(29,29,29,0.7) 100%)',
          zIndex: 1,
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%',
        }} />

        {/* Hero text */}
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 760, padding: '0 40px' }}>
          <p className="label fade-in" style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 28, letterSpacing: '0.22em' }}>
            Intelligence Feels Good
          </p>
          <h1 className="heading-1 fade-in delay-1" style={{
            color: 'var(--white)',
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontWeight: 300,
            lineHeight: 1.08,
            marginBottom: 36,
            fontSize: 'clamp(36px, 6vw, 64px)',
          }}>
            Intelligence built for<br />
            women who lead at scale
          </h1>
          <div className="fade-in delay-2" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/membership" className="btn btn-primary">
              Request membership
            </Link>
            <Link href="/intelligence" className="btn btn-outline" style={{ color: 'var(--white)', borderColor: 'rgba(255,255,255,0.5)' }}>
              Discover
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATEMENT — Chanel-style centered editorial text ── */}
      <section className="section-lg" style={{ textAlign: 'center', background: 'var(--white)' }}>
        <div className="container container-sm">
          <hr className="rule" style={{ marginBottom: 48 }} />
          <p className="label" style={{ color: 'var(--mid-gray)', marginBottom: 24 }}>
            What OhHoney is
          </p>
          <h2 className="heading-1" style={{ fontStyle: 'italic', fontFamily: 'var(--font-serif)', fontWeight: 300, marginBottom: 32, lineHeight: 1.15 }}>
            Your chief of staff.<br />Your strategist.<br />Your curator.
          </h2>
          <p style={{ fontSize: 'var(--text-16)', fontWeight: 300, color: 'var(--fg-secondary)', maxWidth: 480, margin: '0 auto 48px', lineHeight: 1.7 }}>
            OhHoney aggregates your communications, intelligence, and calendar into one precise, private, and beautifully composed experience.
          </p>
          <hr className="rule" />
        </div>
      </section>

      {/* ── TOPICS GRID — 4 col, Chanel product grid ── */}
      <section className="section" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p className="label" style={{ color: 'var(--mid-gray)', marginBottom: 16 }}>Intelligence domains</p>
            <h2 className="heading-2" style={{ fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>
              Curated across twelve pillars
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)' }}>
            {topics.map((topic, i) => (
              <div key={i} style={{
                background: 'var(--white)',
                padding: '40px 32px',
                transition: 'background var(--ease)',
                cursor: 'pointer',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--off-white)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--white)'; }}>
                <div className="label" style={{ color: 'var(--mid-gray)', fontSize: '10px', marginBottom: 16 }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p style={{ fontSize: 'var(--text-14)', fontWeight: 300, lineHeight: 1.5, color: 'var(--black)' }}>
                  {topic}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS — understated, editorial ── */}
      <section className="section-lg" style={{ background: 'var(--white)' }}>
        <div className="container">
          <hr className="rule" style={{ marginBottom: 72 }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 80 }}>
            {testimonials.map((t, i) => (
              <div key={i}>
                <p style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'var(--text-20)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  lineHeight: 1.5,
                  color: 'var(--black)',
                  marginBottom: 32,
                }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="label" style={{ color: 'var(--mid-gray)', marginBottom: 4 }}>{t.author}</p>
                <p className="caption">{t.location}</p>
              </div>
            ))}
          </div>
          <hr className="rule" style={{ marginTop: 72 }} />
        </div>
      </section>

      {/* ── MEMBERSHIP CTA — Chanel dark section ── */}
      <section className="section-lg" style={{ background: 'var(--black)', textAlign: 'center' }}>
        <div className="container container-sm">
          <p className="label" style={{ color: 'rgba(255,255,255,0.45)', marginBottom: 28 }}>Membership</p>
          <h2 className="heading-1" style={{
            color: 'var(--white)',
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontWeight: 300,
            marginBottom: 32,
            lineHeight: 1.1,
          }}>
            By invitation and<br />application only
          </h2>
          <p style={{ fontSize: 'var(--text-14)', fontWeight: 300, color: 'rgba(255,255,255,0.55)', marginBottom: 48, lineHeight: 1.8 }}>
            OhHoney is not a SaaS subscription.<br />
            It is a private membership for principals, executives, and founders.
          </p>
          <Link href="/membership" className="btn" style={{
            background: 'var(--white)',
            color: 'var(--black)',
            padding: '15px 40px',
            fontSize: 'var(--text-11)',
            letterSpacing: 'var(--tracking-wider)',
          }}>
            Apply for membership
          </Link>
        </div>
      </section>
    </>
  );
}
