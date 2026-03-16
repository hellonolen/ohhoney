import Link from 'next/link';
import { DEALS, CATEGORIES } from '@/lib/deals';

export default function AdminOverview() {
  const byCategory = CATEGORIES.map(c => ({
    ...c,
    count: DEALS.filter(d => d.categorySlug === c.id).length,
    published: DEALS.filter(d => d.categorySlug === c.id && d.published).length,
  }));

  return (
    <div style={{ maxWidth: 900 }}>
      <div style={{ marginBottom: 40, paddingBottom: 24, borderBottom: '1px solid var(--border)' }}>
        <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', marginBottom: 12 }}>Admin overview</p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 300, fontStyle: 'italic' }}>OhHoney Platform</h1>
      </div>

      {/* Owners */}
      <div style={{ marginBottom: 40, padding: '24px', background: 'var(--off-white)' }}>
        <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', marginBottom: 16 }}>Platform owners & administrators</p>
        {['admin@ohhoney.ai', 'team@ohhoney.ai'].map(email => (
          <div key={email} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--black)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 10, color: 'var(--white)', fontWeight: 500 }}>{email[0].toUpperCase()}</span>
            </div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 400, color: 'var(--black)' }}>{email}</p>
              <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)' }}>Owner · Administrator</p>
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: 'var(--border)', marginBottom: 40 }}>
        {[
          { label: 'Total deals', val: DEALS.length },
          { label: 'Published', val: DEALS.filter(d => d.published).length },
          { label: 'Categories', val: CATEGORIES.length },
          { label: 'Exclusive', val: DEALS.filter(d => d.exclusive).length },
        ].map(s => (
          <div key={s.label} style={{ background: 'var(--white)', padding: '20px 24px' }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 300, color: 'var(--black)', lineHeight: 1 }}>{s.val}</div>
            <div className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', marginTop: 6 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Category coverage */}
      <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', marginBottom: 20 }}>Deal coverage by pillar</p>
      {byCategory.map(c => (
        <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 20, paddingBottom: 14, marginBottom: 14, borderBottom: '1px solid var(--border)' }}>
          <p style={{ fontSize: 12, fontWeight: 300, color: 'var(--black)', flex: 1 }}>{c.label}</p>
          <span className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)' }}>{c.published}/{c.count} published</span>
          <Link href="/admin/deals" className="btn btn-ghost btn-xs">Manage</Link>
        </div>
      ))}
    </div>
  );
}
