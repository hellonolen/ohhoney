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
      'Deals (public tier)',
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
      'Member deal access',
      'Daily intelligence briefings',
      'Knowledge graph',
      'Email support',
    ],
  },
  {
    name: 'Pro',
    label: 'Priority access',
    price: '$497',
    priceNote: 'per month',
    description: 'For women who run at the highest level. Concierge intelligence and exclusive deal flow across all 12 pillars.',
    cta: 'Apply for Pro',
    ctaHref: '/checkout/pro',
    highlight: true,
    features: [
      'Everything in Member',
      'Curated deal flow — 36 pillars',
      'Concierge onboarding call',
      'Pro-exclusive deals & briefings',
      'Priority OhHoney Intensive access',
      'Priority support line',
    ],
  },
  {
    name: 'Team',
    label: 'Up to 5 seats',
    price: '$997',
    priceNote: 'per month',
    description: 'Deploy OhHoney intelligence across your inner circle. Shared deal flow, team calendar, and unified intelligence.',
    cta: 'Add your team',
    ctaHref: '/checkout/team',
    highlight: false,
    features: [
      'Everything in Pro',
      'Up to 5 member seats',
      'Shared intelligence workspace',
      'Team task & calendar view',
      'Unified inbox',
      'Dedicated account manager',
    ],
  },
  {
    name: 'White Glove',
    label: 'Custom · Annual',
    price: 'Custom',
    priceNote: 'White Glove service',
    description: 'For family offices, organizations, and women who require a fully bespoke intelligence layer with hands-on service.',
    cta: 'Contact us',
    ctaHref: '/contact',
    highlight: false,
    features: [
      'Unlimited seats',
      'Custom data integrations',
      'Dedicated intelligence analyst',
      'Quarterly strategy sessions',
      'White-label option',
      'SLA & uptime guarantee',
    ],
  },
];

const faqs = [
  { q: 'What does the free trial include?', a: 'You get full dashboard access for 3 days — inbox, notes, tasks, calendar, and public deal flow. No credit card required.' },
  { q: 'Can I upgrade or downgrade anytime?', a: 'Yes. You can move between Member and Pro at any time. Your billing adjusts at the next cycle.' },
  { q: 'What makes Pro different from Member?', a: 'Pro unlocks exclusive deal flow across all 12 pillars, concierge onboarding, and Pro-only intelligence briefings that go deeper than the standard member tier.' },
  { q: 'What is the White Glove service?', a: 'A fully bespoke engagement for organizations, family offices, and high-net-worth individuals who want a dedicated intelligence analyst, custom integrations, and quarterly strategy sessions. Contact us for a conversation.' },
  { q: 'Is my data private?', a: 'Completely. OhHoney never sells or shares member data. Your intelligence, notes, and activity are private by design.' },
];

export default function PricingPage() {
  return (
    <div style={{ paddingTop: 72 }}>
      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '80px 40px 64px' }}>
        <p className="label" style={{ color: 'var(--mid-gray)', marginBottom: 20 }}>Membership</p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px,5vw,56px)', fontStyle: 'italic', fontWeight: 300, marginBottom: 20, lineHeight: 1.08 }}>
          Choose your level of intelligence
        </h1>
        <p style={{ fontSize: 14, fontWeight: 300, color: 'var(--fg-secondary)', maxWidth: 480, margin: '0 auto' }}>
          Begin free. Stay for the intelligence. Every tier gives you access to the OhHoney platform. Pro and above unlock curated deal flow and exclusive briefings.
        </p>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border)', maxWidth: 1200, margin: '0 auto' }} />

      {/* Tier grid */}
      <section style={{ padding: '64px 40px 80px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 1, background: 'var(--border)' }}>
          {tiers.map(tier => (
            <div key={tier.name} style={{
              background: 'var(--white)',
              padding: '40px 24px',
              display: 'flex', flexDirection: 'column',
              borderTop: tier.highlight ? '2px solid var(--black)' : '2px solid transparent',
            }}>
              <div style={{ flex: 1 }}>
                {tier.highlight && (
                  <p className="label" style={{ fontSize: '9px', color: 'var(--black)', marginBottom: 6 }}>Most popular</p>
                )}
                <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', marginBottom: 16 }}>{tier.label}</p>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 300, fontStyle: 'italic', color: 'var(--black)', marginBottom: 20 }}>
                  {tier.name}
                </h2>
                <div style={{ marginBottom: 20 }}>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: 34, fontWeight: 300, color: 'var(--black)', lineHeight: 1 }}>{tier.price}</span>
                  <span style={{ fontSize: 11, fontWeight: 300, color: 'var(--mid-gray)', display: 'block', marginTop: 4 }}>{tier.priceNote}</span>
                </div>
                <p style={{ fontSize: 12, fontWeight: 300, color: 'var(--dark-gray)', lineHeight: 1.65, marginBottom: 24 }}>{tier.description}</p>
                <hr style={{ border: 'none', borderTop: '1px solid var(--border)', marginBottom: 20 }} />
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: 28 }}>
                  {tier.features.map(f => (
                    <li key={f} style={{ fontSize: 12, fontWeight: 300, color: 'var(--dark-gray)', padding: '5px 0', borderBottom: '1px solid var(--border)', letterSpacing: '0.01em' }}>
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

      <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />

      {/* FAQ */}
      <section style={{ padding: '64px 40px', maxWidth: 760, margin: '0 auto' }}>
        <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', marginBottom: 40 }}>Frequently asked questions</p>
        {faqs.map(({ q, a }) => (
          <div key={q} style={{ paddingBottom: 28, marginBottom: 28, borderBottom: '1px solid var(--border)' }}>
            <p style={{ fontSize: 14, fontWeight: 400, color: 'var(--black)', marginBottom: 10 }}>{q}</p>
            <p style={{ fontSize: 13, fontWeight: 300, color: 'var(--dark-gray)', lineHeight: 1.7 }}>{a}</p>
          </div>
        ))}
      </section>

      {/* Intensive upsell */}
      <section style={{ background: 'var(--off-white)', padding: '64px 40px', textAlign: 'center' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <p className="label" style={{ color: 'var(--mid-gray)', marginBottom: 16 }}>Event</p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontStyle: 'italic', fontWeight: 300, marginBottom: 16 }}>
            The OhHoney Intensive
          </h2>
          <p style={{ fontSize: 14, fontWeight: 300, color: 'var(--fg-secondary)', lineHeight: 1.7, marginBottom: 12 }}>
            One day. Online. For women ready to architect a life at a higher level.
          </p>
          <p style={{ fontSize: 13, fontWeight: 300, color: 'var(--mid-gray)', marginBottom: 32 }}>
            $1,800 · Members receive a $300 reduction automatically at checkout.
          </p>
          <Link href="/intensive" className="btn btn-primary btn-sm">Learn more</Link>
        </div>
      </section>
    </div>
  );
}
