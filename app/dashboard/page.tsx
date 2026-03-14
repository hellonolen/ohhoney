export default function DashboardToday() {
  const briefing = [
    { n: '6', label: 'Events today' },
    { n: '14', label: 'Tasks active' },
    { n: '3', label: 'Unread priority' },
    { n: '$2.4M', label: 'Portfolio move' },
  ];

  const insights = [
    { category: 'WEALTH', text: 'Your Vanguard rebalancing window opens Thursday. Recommended allocation shift: 4% into alternatives.' },
    { category: 'TRAVEL', text: 'Peak rates for your Milan trip in June are 22% above last year. Optimal booking window closes March 20.' },
    { category: 'HEALTH', text: 'Three consecutive missed recovery sessions. Consider scheduling a restoration block this week.' },
    { category: 'BUSINESS', text: 'Board deck review scheduled Friday — three slides flagged for structural revision.' },
  ];

  const upcoming = [
    { time: '09:00', title: 'Focus Block', type: 'focus', duration: '2h' },
    { time: '11:30', title: 'Investment Committee', type: 'meeting', duration: '90m' },
    { time: '14:00', title: 'Board Prep — Solo', type: 'focus', duration: '1h' },
    { time: '16:00', title: 'Founder Call — Acme', type: 'meeting', duration: '30m' },
  ];

  return (
    <div style={{ maxWidth: 1120 }}>

      {/* Briefing strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)', marginBottom: 56 }}>
        {briefing.map(({ n, label }) => (
          <div key={label} style={{ background: 'var(--white)', padding: '28px 32px' }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '36px', fontWeight: 300, letterSpacing: '-0.01em', color: 'var(--black)', lineHeight: 1, marginBottom: 8 }}>{n}</div>
            <div className="label" style={{ color: 'var(--mid-gray)', fontSize: '9px' }}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 64 }}>

        {/* Left — Insights */}
        <div>
          <p className="label" style={{ color: 'var(--mid-gray)', marginBottom: 28 }}>Intelligence briefing</p>
          {insights.map(({ category, text }) => (
            <div key={category} style={{ paddingBottom: 28, marginBottom: 28, borderBottom: '1px solid var(--border)' }}>
              <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', marginBottom: 10 }}>{category}</p>
              <p style={{ fontSize: '14px', fontWeight: 300, lineHeight: 1.7, color: 'var(--black)' }}>{text}</p>
            </div>
          ))}
        </div>

        {/* Right — Today's schedule */}
        <div>
          <p className="label" style={{ color: 'var(--mid-gray)', marginBottom: 28 }}>Schedule</p>
          {upcoming.map(ev => (
            <div key={ev.title} style={{
              display: 'flex', gap: 20, paddingBottom: 20, marginBottom: 20,
              borderBottom: '1px solid var(--border)',
            }}>
              <div style={{ flexShrink: 0, width: 44 }}>
                <p style={{ fontSize: '12px', fontWeight: 400, color: 'var(--black)', letterSpacing: '0.04em' }}>{ev.time}</p>
                <p style={{ fontSize: '11px', fontWeight: 300, color: 'var(--mid-gray)', marginTop: 2 }}>{ev.duration}</p>
              </div>
              <div>
                <p style={{ fontSize: '13px', fontWeight: 400, color: 'var(--black)', marginBottom: 2 }}>{ev.title}</p>
                <p className="label" style={{ fontSize: '9px', color: ev.type === 'focus' ? 'var(--mid-gray)' : 'var(--dark-gray)' }}>
                  {ev.type}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
