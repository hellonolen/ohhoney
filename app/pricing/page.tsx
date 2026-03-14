import Link from 'next/link';

const tiers = [
  {
    name: 'Free Trial',
    label: '3 days · No card required',
    price: '—',
    priceNote: 'Free',
    description: 'Experience OhHoney at no cost. Full access to the intelligence dashboard for 3 days.',
    cta: 'Begin free trial',
    ctaHref: '/checkout/trial',
    highlight: false,
    features: [
      'Today dashboard',
      'Inbox (10 items)',
      'Notes (up to 5)',
      'Tasks & Calendar',
    ],
  },
  {
    name: 'Member',
    label: 'Monthly membership',
    price: '$97',
    priceNote: 'per month',
    description: 'Full intelligence access for individual executives, founders, and principals.',
    cta: 'Join as member',
    ctaHref: '/checkout/member',
    highlight: false,
    features: [
      'Everything in trial',
      'Unlimited inbox & notes',
      'Priority deal access',
      'Intelligence briefings',
      'Knowledge graph',
      'Email support',
    ],
  },
  {
    name: 'Pro',
    label: 'Priority access',
    price: '$247',
    priceNote: 'per month',
    description: 'For women who run at the highest level. Concierge intelligence and exclusive deal flow.',
    cta: 'Apply for Pro',
    ctaHref: '/checkout/pro',
    highlight: true,  // outlined treatment, not filled black
    features: [
      'Everything in Member',
      'Curated deal flow (36 pillars)',
      'Concierge onboarding',
      'Pro-only exclusive deals',
      'Early access to intensives',
      'Priority support line',
    ],
  },
  {
    name: 'Team',
    label: 'For small teams',
    price: '$497',
    priceNote: 'per month · up to 5 seats',
    description: 'Deploy OhHoney intelligence across your circle. Shared deal flow and team calendar.',
    cta: 'Add your team',
    ctaHref: '/checkout/team',
    highlight: false,
    features: [
      'Everything in Pro',
      'Up to 5 member seats',
      'Shared intelligence workspace',
      'Team task management',
      'Unified inbox',
      'Dedicated account manager',
    ],
  },
  {
    name: 'Enterprise',
    label: 'Custom',
    price: 'Custom',
    priceNote: 'annual · white-glove',
    description: 'For organizations, family offices, and venture studios. Custom integrations and SLA.',
    cta: 'Contact us',
    ctaHref: '/contact',
    highlight: false,
    features: [
      'Unlimited seats',
      'Custom data integrations',
      'White-label option',
      'Dedicated intelligence analyst',
      'Quarterly strategy review',
      'SLA & uptime guarantee',
    ],
  },
];

export default function PricingPage() {
  return (
    <div style={{ paddingTop: 72 }}>
      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '80px 40px 64px' }}>
        <p className="label" style={{ color: 'var(--mid-gray)', marginBottom: 20 }}>Membership</p>
        <h1 className="heading-1" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 300, marginBottom: 20 }}>
          Choose your level of intelligence
        </h1>
        <p style={{ fontSize: 14, fontWeight: 300, color: 'var(--fg-secondary)', maxWidth: 480, margin: '0 auto' }}>
          Every tier gives you access to the OhHoney platform. Pro and above unlock curated deal flow and exclusive intelligence.
        </p>
      </section>

      <hr className="rule" style={{ maxWidth: 1200, margin: '0 auto' }} />

      {/* Tier grid */}
      <section style={{ padding: '64px 40px 80px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 1, background: 'var(--border)' }}>
          {tiers.map(tier => (
            <div key={tier.name} style={{
              background: 'var(--white)',
              padding: '40px 28px',
              display: 'flex', flexDirection: 'column',
              // Pro tier: top black border accent, not filled
              borderTop: tier.highlight ? '2px solid var(--black)' : '2px solid transparent',
            }}>
              <div style={{ flex: 1 }}>
                {tier.highlight && (
                  <span className="label" style={{ fontSize: '9px', color: 'var(--black)', display: 'block', marginBottom: 8 }}>Most popular</span>
                )}
                <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', marginBottom: 16 }}>
                  {tier.label}
                </p>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 300, fontStyle: 'italic', color: 'var(--black)', marginBottom: 20 }}>
                  {tier.name}
                </h2>
                <div style={{ marginBottom: 24 }}>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: 36, fontWeight: 300, color: 'var(--black)', lineHeight: 1 }}>{tier.price}</span>
                  <span style={{ fontSize: 11, fontWeight: 300, color: 'var(--mid-gray)', marginLeft: 6, display: 'block', marginTop: 4 }}>{tier.priceNote}</span>
                </div>
                <p style={{ fontSize: 12, fontWeight: 300, color: 'var(--dark-gray)', lineHeight: 1.65, marginBottom: 28 }}>{tier.description}</p>
                <hr style={{ border: 'none', borderTop: '1px solid var(--border)', marginBottom: 24 }} />
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: 32 }}>
                  {tier.features.map(f => (
                    <li key={f} style={{
                      fontSize: 12, fontWeight: 300, color: 'var(--dark-gray)',
                      padding: '6px 0', borderBottom: '1px solid var(--border)', letterSpacing: '0.01em',
                    }}>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <Link href={tier.ctaHref} className="btn btn-sm" style={{
                display: 'block', textAlign: 'center',
                background: 'transparent',
                color: 'var(--black)',
                border: '1px solid var(--black)',
              }}>
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Intensive upsell — off-white section, no black fill */}
      <section style={{ background: 'var(--off-white)', padding: '64px 40px', textAlign: 'center' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <p className="label" style={{ color: 'var(--mid-gray)', marginBottom: 16 }}>Event</p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontStyle: 'italic', fontWeight: 300, marginBottom: 16 }}>
            The OhHoney Intensive
          </h2>
          <p style={{ fontSize: 14, fontWeight: 300, color: 'var(--fg-secondary)', lineHeight: 1.7, marginBottom: 32 }}>
            One day. Online. For women ready to architect a life at a higher level.
          </p>
          <Link href="/intensive" className="btn btn-primary btn-sm">Learn more</Link>
        </div>
      </section>
    </div>
  );
}
