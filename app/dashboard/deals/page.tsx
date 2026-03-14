export default function DealsPage() {
  const deals = [
    {
      category: 'TRAVEL',
      title: 'Aman Residences, Tokyo',
      desc: 'Member priority access. Preferred suites, private transport, onsite wellness programming. Rate parity guaranteed.',
      terms: 'Member rate · $3,200/night',
      expiry: 'Closes March 31',
      exclusive: true,
    },
    {
      category: 'FASHION',
      title: 'Loro Piana — Private Atelier Visit',
      desc: 'Access to the atelier floor in Milan during fashion week. Bespoke consultation with a senior stylist. One guest permitted.',
      terms: 'By application · No purchase requirement',
      expiry: 'Limited — 8 slots',
      exclusive: true,
    },
    {
      category: 'REAL ESTATE',
      title: 'Côte d\'Azur — Off-market listing',
      desc: '4-bedroom villa, Eze-sur-Mer. Asking €7.4M. Pre-market introduction through our network. Commission restructure available.',
      terms: 'Off-market · Introductory access only',
      expiry: 'Active',
      exclusive: false,
    },
    {
      category: 'HEALTH',
      title: 'Six Senses — Longevity Immersion',
      desc: 'Seven-day full-program longevity assessment with Dr. Bland. Biomarkers, sleep, stress, and nutrition. September cohort.',
      terms: 'Member priority · $28,000',
      expiry: 'Cohort fills March 28',
      exclusive: false,
    },
  ];

  return (
    <div style={{ maxWidth: 900 }}>
      <div style={{ marginBottom: 48, paddingBottom: 24, borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: '14px', fontWeight: 300, color: 'var(--fg-secondary)', lineHeight: 1.6, maxWidth: 560 }}>
          Curated opportunities exclusive to OhHoney members. Each offering is vetted, negotiated, and time-sensitive.
        </p>
      </div>

      {deals.map((deal, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, paddingBottom: 40, marginBottom: 40, borderBottom: '1px solid var(--border)', alignItems: 'start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
              <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)' }}>{deal.category}</p>
              {deal.exclusive && (
                <span className="chip chip-filled" style={{ fontSize: '9px', padding: '3px 9px' }}>Member Exclusive</span>
              )}
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 300, fontStyle: 'italic', color: 'var(--black)', marginBottom: 12 }}>{deal.title}</h3>
            <p style={{ fontSize: '13px', fontWeight: 300, lineHeight: 1.7, color: 'var(--dark-gray)', marginBottom: 16 }}>{deal.desc}</p>
            <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 300, color: 'var(--dark-gray)' }}>{deal.terms}</span>
              <span style={{ fontSize: '11px', fontWeight: 300, color: 'var(--mid-gray)', fontStyle: 'italic' }}>{deal.expiry}</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
            <button className="btn btn-primary btn-sm">Request access</button>
            <button className="btn btn-ghost btn-sm" style={{ fontSize: '10px' }}>Learn more</button>
          </div>
        </div>
      ))}
    </div>
  );
}
