import Link from 'next/link';

export default function IntensivePage() {
  const agenda = [
    { time: '09:00', title: 'Opening — The Architecture of a Designed Life', desc: 'Setting intention. What does commanding your life actually look like? We begin with constraints and possibility.' },
    { time: '10:30', title: 'Wealth & Estate — The Foundations', desc: 'How to build, protect, and transfer wealth with precision. With our lead wealth intelligence partner.' },
    { time: '12:00', title: 'Break', desc: '' },
    { time: '13:00', title: 'Health, Longevity & Aesthetic Strategy', desc: 'The protocols that high-performing women use to operate at the highest level for decades.' },
    { time: '14:30', title: 'Owning Your Business — From Operator to Principal', desc: 'The shift from doing the work to commanding the outcome. Ownership at every level.' },
    { time: '16:00', title: 'Private Q&A — Members Only', desc: 'Direct access to the OhHoney intelligence team. Bring your specific situation.' },
    { time: '17:00', title: 'Close', desc: '' },
  ];

  return (
    <div style={{ paddingTop: 72 }}>
      {/* Hero */}
      <section style={{
        minHeight: '60vh',
        background: 'var(--black)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '80px 40px',
      }}>
        <p className="label" style={{ color: 'rgba(255,255,255,0.4)', marginBottom: 24, letterSpacing: '0.2em' }}>One Day · Online</p>
        <h1 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'clamp(40px, 6vw, 72px)',
          fontWeight: 300, fontStyle: 'italic', color: 'var(--white)',
          marginBottom: 24, lineHeight: 1.08,
        }}>
          The OhHoney<br />Intensive
        </h1>
        <p style={{ fontSize: 15, fontWeight: 300, color: 'rgba(255,255,255,0.55)', maxWidth: 460, lineHeight: 1.75, marginBottom: 40 }}>
          A single day to architect your life at a higher level. Built for the woman who already has everything — and is ready to design what comes next.
        </p>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/checkout/intensive" className="btn" style={{ background: 'var(--white)', color: 'var(--black)', padding: '14px 36px' }}>
            Reserve your seat
          </Link>
          <Link href="/pricing" className="btn btn-ghost" style={{ color: 'rgba(255,255,255,0.6)', borderColor: 'rgba(255,255,255,0.2)' }}>
            View pricing
          </Link>
        </div>
      </section>

      {/* Details strip */}
      <section style={{ background: 'var(--off-white)', padding: '0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: 'var(--border)', maxWidth: 1200, margin: '0 auto' }}>
          {[
            { label: 'Format', val: 'Live online' },
            { label: 'Duration', val: 'One day · 9am–5pm ET' },
            { label: 'Capacity', val: 'Limited to 40 women' },
            { label: 'Investment', val: '$1,200 · members $900' },
          ].map(({ label, val }) => (
            <div key={label} style={{ background: 'var(--white)', padding: '28px 32px' }}>
              <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', marginBottom: 8 }}>{label}</p>
              <p style={{ fontSize: 14, fontWeight: 300, color: 'var(--black)' }}>{val}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Agenda */}
      <section style={{ padding: '80px 40px', maxWidth: 760, margin: '0 auto' }}>
        <p className="label" style={{ color: 'var(--mid-gray)', marginBottom: 40 }}>Day agenda</p>
        {agenda.map(item => (
          <div key={item.time} style={{ display: 'grid', gridTemplateColumns: '72px 1fr', gap: 32, paddingBottom: 28, marginBottom: 28, borderBottom: '1px solid var(--border)' }}>
            <p style={{ fontSize: 12, fontWeight: 300, color: 'var(--mid-gray)', paddingTop: 3 }}>{item.time}</p>
            <div>
              <p style={{ fontSize: 14, fontWeight: 400, color: 'var(--black)', marginBottom: item.desc ? 6 : 0, letterSpacing: '0.01em' }}>{item.title}</p>
              {item.desc && <p style={{ fontSize: 13, fontWeight: 300, color: 'var(--dark-gray)', lineHeight: 1.65 }}>{item.desc}</p>}
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--black)', padding: '80px 40px', textAlign: 'center' }}>
        <div style={{ maxWidth: 400, margin: '0 auto' }}>
          <p className="label" style={{ color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>Limited seats</p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 300, fontSize: 28, color: 'var(--white)', marginBottom: 32, lineHeight: 1.2 }}>
            Reserve your place
          </h2>
          <Link href="/checkout/intensive" className="btn" style={{ background: 'var(--white)', color: 'var(--black)', padding: '14px 40px' }}>
            Reserve your seat — $1,200
          </Link>
          <p style={{ fontSize: 11, fontWeight: 300, color: 'rgba(255,255,255,0.3)', marginTop: 16, letterSpacing: '0.04em' }}>
            Members receive a $300 reduction automatically at checkout.
          </p>
        </div>
      </section>
    </div>
  );
}
