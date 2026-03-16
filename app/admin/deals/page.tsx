'use client';
import { useState } from 'react';
import { DEALS, CATEGORIES, type Deal } from '@/lib/deals';
import { Plus, Eye, EyeOff, Pencil, Trash2 } from 'lucide-react';

// Admin owners — only these emails should access this panel (enforced with real auth later)
const ADMIN_OWNERS = ['admin@ohhoney.ai', 'team@ohhoney.ai'];

const BLANK_DEAL: Omit<Deal, 'id' | 'createdAt'> = {
  category: CATEGORIES[0].label,
  categorySlug: CATEGORIES[0].id,
  title: '',
  description: '',
  terms: '',
  expiry: '',
  exclusive: false,
  tier: 'all',
  affiliateLink: '',
  published: false,
  createdBy: ADMIN_OWNERS[0],
};

export default function AdminDealsPage() {
  const [deals, setDeals] = useState<Deal[]>(DEALS.map(d => ({ ...d })));
  const [view, setView] = useState<'list' | 'create' | 'edit'>('list');
  const [editing, setEditing] = useState<Deal | null>(null);
  const [form, setForm] = useState<Omit<Deal, 'id' | 'createdAt'>>(BLANK_DEAL);
  const [catFilter, setCatFilter] = useState('all');

  const filtered = catFilter === 'all' ? deals : deals.filter(d => d.categorySlug === catFilter);

  function openCreate() { setForm(BLANK_DEAL); setEditing(null); setView('create'); }
  function openEdit(d: Deal) { setForm({ ...d }); setEditing(d); setView('edit'); }

  function save() {
    if (editing) {
      setDeals(ds => ds.map(d => d.id === editing.id ? { ...editing, ...form } : d));
    } else {
      const newDeal: Deal = { ...form, id: `deal_${Date.now()}`, createdAt: new Date().toISOString().split('T')[0] };
      setDeals(ds => [...ds, newDeal]);
    }
    setView('list');
  }

  function togglePublish(id: string) {
    setDeals(ds => ds.map(d => d.id === id ? { ...d, published: !d.published } : d));
  }

  function remove(id: string) {
    if (confirm('Remove this deal permanently?')) setDeals(ds => ds.filter(d => d.id !== id));
  }

  function F(field: keyof typeof form, val: string | boolean) {
    setForm(f => ({ ...f, [field]: val }));
  }

  return (
    <div style={{ maxWidth: 1000 }}>
      {/* Admin header */}
      <div style={{ background: 'var(--black)', margin: '-48px -56px 40px', padding: '20px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p className="label" style={{ fontSize: '9px', color: 'rgba(255,255,255,0.45)' }}>
          Admin · Deal Management
        </p>
        <p style={{ fontSize: 11, fontWeight: 300, color: 'rgba(255,255,255,0.4)' }}>
          Owners: admin@ohhoney.ai · team@ohhoney.ai
        </p>
      </div>

      {view === 'list' && (
        <>
          {/* Toolbar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
            <div style={{ display: 'flex', gap: 4 }}>
              <button onClick={() => setCatFilter('all')} className="btn btn-xs" style={{ background: catFilter === 'all' ? 'var(--black)' : 'transparent', color: catFilter === 'all' ? 'var(--white)' : 'var(--black)', border: '1px solid var(--black)' }}>All</button>
              {CATEGORIES.map(c => (
                <button key={c.id} onClick={() => setCatFilter(c.id)} className="btn btn-xs" style={{ background: catFilter === c.id ? 'var(--black)' : 'transparent', color: catFilter === c.id ? 'var(--white)' : 'var(--mid-gray)', border: '1px solid var(--border)', fontSize: 9 }}>
                  {c.label.split(' ')[0]}
                </button>
              ))}
            </div>
            <button onClick={openCreate} className="btn btn-primary btn-xs" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Plus size={11} strokeWidth={1.5} /> New deal
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: 'var(--border)', marginBottom: 32 }}>
            {[
              { label: 'Total', val: deals.length },
              { label: 'Published', val: deals.filter(d => d.published).length },
              { label: 'Exclusive', val: deals.filter(d => d.exclusive).length },
              { label: 'Pro Only', val: deals.filter(d => d.tier === 'pro').length },
            ].map(s => (
              <div key={s.label} style={{ background: 'var(--white)', padding: '16px 20px' }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 300, color: 'var(--black)', lineHeight: 1 }}>{s.val}</div>
                <div className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', marginTop: 6 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Deal rows */}
          {filtered.map(deal => (
            <div key={deal.id} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', paddingBottom: 20, marginBottom: 20, borderBottom: '1px solid var(--border)', opacity: deal.published ? 1 : 0.45 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 4 }}>
                  <span className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)' }}>{deal.category.split(' ')[0].toUpperCase()}</span>
                  {deal.exclusive && <span className="chip chip-filled" style={{ fontSize: '9px', padding: '2px 7px' }}>Exclusive</span>}
                  <span className="chip chip-muted" style={{ fontSize: '9px', padding: '2px 7px' }}>{deal.tier}</span>
                </div>
                <p style={{ fontSize: 13, fontWeight: 400, color: 'var(--black)', marginBottom: 4 }}>{deal.title}</p>
                <p style={{ fontSize: 11, fontWeight: 300, color: 'var(--mid-gray)', letterSpacing: '0.02em', fontFamily: 'monospace', background: 'var(--off-white)', padding: '3px 8px', display: 'inline-block', marginBottom: 4 }}>{deal.affiliateLink || '—'}</p>
                <p style={{ fontSize: 11, fontWeight: 300, color: 'var(--mid-gray)' }}>{deal.terms} · {deal.expiry}</p>
              </div>
              <div style={{ display: 'flex', gap: 4, flexShrink: 0, alignItems: 'center' }}>
                <button onClick={() => togglePublish(deal.id)} title={deal.published ? 'Unpublish' : 'Publish'} style={{ background: 'none', border: 'none', cursor: 'pointer', color: deal.published ? 'var(--black)' : 'var(--mid-gray)', padding: 6, display: 'flex' }}>
                  {deal.published ? <Eye size={13} strokeWidth={1.5} /> : <EyeOff size={13} strokeWidth={1.5} />}
                </button>
                <button onClick={() => openEdit(deal)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mid-gray)', padding: 6, display: 'flex' }}>
                  <Pencil size={13} strokeWidth={1.5} />
                </button>
                <button onClick={() => remove(deal.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mid-gray)', padding: 6, display: 'flex' }}>
                  <Trash2 size={13} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {(view === 'create' || view === 'edit') && (
        <div>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginBottom: 32, paddingBottom: 20, borderBottom: '1px solid var(--border)' }}>
            <button onClick={() => setView('list')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 300, color: 'var(--mid-gray)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>← Back</button>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 300, fontStyle: 'italic' }}>{view === 'create' ? 'New deal' : 'Edit deal'}</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
            <div>
              <label className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', display: 'block', marginBottom: 8 }}>Deal title</label>
              <input className="input" value={form.title} onChange={e => F('title', e.target.value)} placeholder="Deal title" />
            </div>
            <div>
              <label className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', display: 'block', marginBottom: 8 }}>Category</label>
              <select className="input" value={form.categorySlug}
                onChange={e => {
                  const cat = CATEGORIES.find(c => c.id === e.target.value);
                  setForm(f => ({ ...f, categorySlug: e.target.value, category: cat?.label ?? '' }));
                }} style={{ cursor: 'pointer' }}>
                {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', display: 'block', marginBottom: 8 }}>Description</label>
              <textarea className="input" value={form.description} onChange={e => F('description', e.target.value)} rows={3} style={{ resize: 'vertical', fontFamily: 'var(--font-sans)' }} />
            </div>
            <div>
              <label className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', display: 'block', marginBottom: 8 }}>Terms</label>
              <input className="input" value={form.terms} onChange={e => F('terms', e.target.value)} placeholder="e.g. Member rate · $97/month" />
            </div>
            <div>
              <label className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', display: 'block', marginBottom: 8 }}>Expiry / Availability</label>
              <input className="input" value={form.expiry} onChange={e => F('expiry', e.target.value)} placeholder="e.g. Ongoing, April 30, 2026" />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', display: 'block', marginBottom: 8 }}>Affiliate link (not shown to members)</label>
              <input className="input" type="url" value={form.affiliateLink} onChange={e => F('affiliateLink', e.target.value)} placeholder="https://partner.com/ohhoney" />
            </div>
            <div>
              <label className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', display: 'block', marginBottom: 8 }}>Tier required</label>
              <select className="input" value={form.tier} onChange={e => F('tier', e.target.value)} style={{ cursor: 'pointer' }}>
                <option value="all">All — visible to everyone</option>
                <option value="member">Member — requires membership</option>
                <option value="pro">Pro — Pro tier only</option>
              </select>
            </div>
            <div>
              <label className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', display: 'block', marginBottom: 8 }}>Created by (owner)</label>
              <select className="input" value={form.createdBy} onChange={e => F('createdBy', e.target.value)} style={{ cursor: 'pointer' }}>
                {ADMIN_OWNERS.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                <input type="checkbox" checked={form.exclusive} onChange={e => F('exclusive', e.target.checked)} />
                <span style={{ fontSize: 12, fontWeight: 300, color: 'var(--black)' }}>Mark as exclusive</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                <input type="checkbox" checked={form.published} onChange={e => F('published', e.target.checked)} />
                <span style={{ fontSize: 12, fontWeight: 300, color: 'var(--black)' }}>Publish immediately</span>
              </label>
            </div>
          </div>

          <div style={{ marginTop: 36, display: 'flex', gap: 12 }}>
            <button onClick={save} className="btn btn-primary btn-sm">
              {view === 'create' ? 'Create deal' : 'Save changes'}
            </button>
            <button onClick={() => setView('list')} className="btn btn-ghost btn-sm">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
