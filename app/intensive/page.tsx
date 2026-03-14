import Link from 'next/link';

const agenda = [
  { time: '09:00', title: 'Opening — The Architecture of a Designed Life', desc: 'Setting intention. What does commanding your life actually look like? We begin with constraints, possibility — and the women who have already done it.' },
  { time: '10:30', title: 'Wealth & Estate — The Foundations', desc: 'Build, protect, and transfer wealth with precision. With our lead wealth intelligence partner and a senior estate planning advisor.' },
  { time: '12:00', title: 'Working lunch — Introduction session', desc: '' },
  { time: '13:00', title: 'Health, Longevity & Aesthetic Strategy', desc: 'The protocols that high-performing women use to operate at the highest level for decades. Dr. Shen joins for the longevity segment.' },
  { time: '14:30', title: 'Owning Your Business — From Operator to Principal', desc: 'The shift from doing the work to commanding the outcome. Ownership at every level — legally, operationally, and strategically.' },
  { time: '16:00', title: 'Private Q&A — Members Only', desc: 'Direct access to the OhHoney intelligence team and guest advisors. Bring your specific situation.' },
  { time: '17:00', title: 'Close & Next Steps', desc: '' },
];

const instructors = [
  { name: 'Jessica Monroe', role: 'Wealth & Estate Strategy', bio: 'Former Goldman managing director and independent wealth advisor. Specializes in complex estate structures and alternative asset portfolios.' },
  { name: 'Dr. Anika Shen', role: 'Health & Longevity', bio: 'Longevity physician and advisor to executives across five continents. Her protocol work has been cited in Nature Medicine.' },
  { name: 'OhHoney Intelligence Team', role: 'Business Ownership', bio: 'Our in-house intelligence advisors cover operational, legal, and strategic frameworks for founders and principals at every stage.' },
];

export default function IntensivePage() {
  return (
    <div style={{ paddingTop: 72 }}>
      {/* Hero — off-white, no black fill per design rule */}
      <section style={{
        minHeight: '55vh',
        background: 'var(--off-white)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '80px 40px',
        borderBottom: '1px solid var(--border)',
      }}>
        <p className="label" style={{ color: 'var(--mid-gray)', marginBottom: 24, letterSpacing: '0.2em' }}>One Day · Online</p>
        <h1 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'clamp(40px, 6vw, 72px)',
          fontWeight: 300, fontStyle: 'italic', color: 'var(--black)',
          marginBottom: 24, lineHeight: 1.08,
        }}>
          The OhHoney<br />Intensive
        </h1>
        <p style={{ fontSize: 15, fontWeight: 300, color: 'var(--dark-gray)', maxWidth: 460, lineHeight: 1.75, marginBottom: 40 }}>
          A single day to architect your life at a higher level. Built for the woman who already has everything — and is ready to design what comes next.
        </p>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/checkout/intensive" className="btn btn-primary" style={{ padding: '13px 36px' }}>
            Reserve your seat — $1,800
          </Link>
          <Link href="/pricing" className="btn btn-ghost">
            View all pricing
          </Link>
        </div>
        <p style={{ fontSize: 11, fontWeight: 300, color: 'var(--mid-gray)', marginTop: 16 }}>
          Members receive a $300 reduction automatically at checkout.
        </p>
      </section>

      {/* Details strip */}
      <section>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: 'var(--border)' }}>
          {[
            { label: 'Format', val: 'Live online · Private cohort' },
            { label: 'Duration', val: 'One day · 9am–5pm ET' },
            { label: 'Capacity', val: 'Limited to 40 women' },
            { label: 'Investment', val: '$1,800 · Members $1,500' },
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
        <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', marginBottom: 40 }}>Day agenda</p>
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

      <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />

      {/* Instructors */}
      <section style={{ padding: '64px 40px', maxWidth: 1000, margin: '0 auto' }}>
        <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', marginBottom: 40 }}>Who you'll hear from</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'var(--border)' }}>
          {instructors.map(inst => (
            <div key={inst.name} style={{ background: 'var(--white)', padding: '32px 28px' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--off-white)', border: '1px solid var(--border)', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 300, color: 'var(--black)' }}>{inst.name.charAt(0)}</span>
              </div>
              <p style={{ fontSize: 14, fontWeight: 400, color: 'var(--black)', marginBottom: 4 }}>{inst.name}</p>
              <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', marginBottom: 16 }}>{inst.role}</p>
              <p style={{ fontSize: 12, fontWeight: 300, color: 'var(--dark-gray)', lineHeight: 1.65 }}>{inst.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA — off-white */}
      <section style={{ background: 'var(--off-white)', padding: '80px 40px', textAlign: 'center', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 400, margin: '0 auto' }}>
          <p className="label" style={{ color: 'var(--mid-gray)', marginBottom: 20 }}>Limited to 40 women</p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 300, fontSize: 28, color: 'var(--black)', marginBottom: 32, lineHeight: 1.2 }}>
            Reserve your place
          </h2>
          <Link href="/checkout/intensive" className="btn btn-primary" style={{ padding: '14px 40px' }}>
            Reserve — $1,800
          </Link>
          <p style={{ fontSize: 11, fontWeight: 300, color: 'var(--mid-gray)', marginTop: 16 }}>
            Members receive a $300 reduction at checkout.
          </p>
        </div>
      </section>
    </div>
  );
}
