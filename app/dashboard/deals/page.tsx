import { getPublicDeals, CATEGORIES } from '@/lib/deals';
import Link from 'next/link';

export default function DealsPage() {
  const deals = getPublicDeals();

  return (
    <div style={{ maxWidth: 1120 }}>
      {/* Header */}
      <div style={{ marginBottom: 48, paddingBottom: 28, borderBottom: '1px solid var(--border)' }}>
        <p className="label" style={{ color: 'var(--mid-gray)', marginBottom: 12 }}>Member deals</p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 300, fontStyle: 'italic', marginBottom: 12 }}>
          Curated across twelve pillars
        </h1>
        <p style={{ fontSize: 13, fontWeight: 300, color: 'var(--dark-gray)', maxWidth: 560 }}>
          Every deal is vetted, negotiated, and relevant to the women of OhHoney. Exclusive offers are reserved for Pro members.
        </p>
      </div>

      {/* Deals by category */}
      {CATEGORIES.map(cat => {
        const catDeals = deals.filter(d => d.categorySlug === cat.id);
        if (catDeals.length === 0) return null;
        return (
          <div key={cat.id} style={{ marginBottom: 56 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 24 }}>
              <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)' }}>{cat.label}</p>
              <span style={{ fontSize: 10, fontWeight: 300, color: 'var(--mid-gray)' }}>{catDeals.length} offers</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--border)' }}>
              {catDeals.map(deal => (
                <div key={deal.id} style={{
                  background: 'var(--white)',
                  padding: '28px 24px',
                  display: 'flex', flexDirection: 'column',
                  // Exclusive = black left border accent only, no fill
                  borderLeft: deal.exclusive ? '2px solid var(--black)' : '2px solid transparent',
                }}>
                  <div style={{ flex: 1 }}>
                    {deal.exclusive && (
                      <span style={{
                        display: 'inline-flex', marginBottom: 12,
                        fontSize: '9px', fontWeight: 500,
                        letterSpacing: '0.12em', textTransform: 'uppercase',
                        color: 'var(--black)',
                        border: '1px solid var(--black)',
                        padding: '3px 9px',
                      }}>
                        Exclusive
                      </span>
                    )}
                    <p style={{
                      fontFamily: 'var(--font-serif)', fontSize: 15, fontWeight: 300,
                      fontStyle: 'italic', color: 'var(--black)',
                      marginBottom: 10, lineHeight: 1.35,
                      marginTop: deal.exclusive ? 0 : 0,
                    }}>
                      {deal.title}
                    </p>
                    <p style={{ fontSize: 12, fontWeight: 300, color: 'var(--dark-gray)', lineHeight: 1.65, marginBottom: 16 }}>
                      {deal.description}
                    </p>
                    <p style={{ fontSize: 11, fontWeight: 300, color: 'var(--mid-gray)', marginBottom: 4 }}>{deal.terms}</p>
                    <p style={{ fontSize: 10, fontStyle: 'italic', fontWeight: 300, color: 'var(--mid-gray)' }}>{deal.expiry}</p>
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <Link href="/membership" className="btn btn-xs" style={{
                      background: 'transparent',
                      color: 'var(--black)',
                      border: '1px solid var(--black)',
                      display: 'inline-flex',
                    }}>
                      {deal.tier === 'pro' ? 'Pro access' : deal.tier === 'member' ? 'View as member' : 'Access deal'}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
