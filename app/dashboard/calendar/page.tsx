export default function CalendarPage() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const dates = [11, 12, 13, 14, 15];
  const todayIdx = 3;

  const events: Record<number, { time: string; title: string; type: string }[]> = {
    11: [{ time: '10:00', title: 'Investment Committee', type: 'Meeting' }],
    12: [{ time: '09:00', title: 'Focus: Board Deck', type: 'Focus' }, { time: '14:30', title: 'Wellness Appt.', type: 'Personal' }],
    13: [{ time: '11:00', title: 'Legal Review', type: 'Meeting' }],
    14: [
      { time: '09:00', title: 'Focus Block', type: 'Focus' },
      { time: '11:30', title: 'Investment Committee', type: 'Meeting' },
      { time: '16:00', title: 'Founder Call — Acme', type: 'Meeting' },
    ],
    15: [{ time: '10:00', title: 'Personal Stylist, Paris', type: 'Personal' }],
  };

  return (
    <div>
      {/* Week row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 1, background: 'var(--border)', marginBottom: 1 }}>
        {days.map((d, i) => (
          <div key={d} style={{
            padding: '20px 20px 16px',
            background: i === todayIdx ? 'var(--black)' : 'var(--white)',
            textAlign: 'center',
          }}>
            <p className="label" style={{ fontSize: '9px', color: i === todayIdx ? 'rgba(255,255,255,0.5)' : 'var(--mid-gray)', marginBottom: 8 }}>{d.toUpperCase()}</p>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', fontWeight: 300, color: i === todayIdx ? 'var(--white)' : 'var(--black)', lineHeight: 1 }}>{dates[i]}</p>
          </div>
        ))}
      </div>

      {/* Event grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 1, background: 'var(--border)', minHeight: 480 }}>
        {dates.map((d, i) => (
          <div key={d} style={{ background: i === todayIdx ? 'var(--off-white)' : 'var(--white)', padding: '20px 16px' }}>
            {(events[d] || []).map(ev => (
              <div key={ev.title} style={{ marginBottom: 12 }}>
                <p style={{ fontSize: '10px', fontWeight: 300, color: 'var(--mid-gray)', marginBottom: 2 }}>{ev.time}</p>
                <p style={{ fontSize: '12px', fontWeight: 400, color: 'var(--black)', lineHeight: 1.35, marginBottom: 3 }}>{ev.title}</p>
                <span className="label" style={{ fontSize: '9px', color: ev.type === 'Focus' ? 'var(--mid-gray)' : 'var(--dark-gray)' }}>{ev.type}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
