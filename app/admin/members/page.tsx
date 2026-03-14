'use client';
import { useState } from 'react';

const memberSeed = [
  { id: 'm1', name: 'Alexandra Monroe',    email: 'alexandra@monroe.co',      tier: 'Pro',    joined: 'Jan 14, 2026', status: 'Active' },
  { id: 'm2', name: 'Renée Whitfield',     email: 'renee@whitfieldcap.com',   tier: 'Member', joined: 'Jan 20, 2026', status: 'Active' },
  { id: 'm3', name: 'Constance Park',      email: 'c.park@parkventures.com',  tier: 'Pro',    joined: 'Feb 3, 2026',  status: 'Active' },
  { id: 'm4', name: 'Vivienne Okafor',     email: 'vivienne@theokaforgroup.co',tier: 'Team',   joined: 'Feb 10, 2026', status: 'Active' },
  { id: 'm5', name: 'Celeste Marchand',    email: 'celeste@marchand.capital', tier: 'Member', joined: 'Feb 18, 2026', status: 'Active' },
  { id: 'm6', name: 'Isabelle Beaumont',   email: 'ib@beaumont.associates',   tier: 'Pro',    joined: 'Feb 22, 2026', status: 'Active' },
  { id: 'm7', name: 'Nadia Stern',         email: 'nadia@sternconsulting.com',tier: 'Member', joined: 'Mar 1, 2026',  status: 'Trial'  },
  { id: 'm8', name: 'Solange Dubois',      email: 'solange@duboisfamily.com', tier: 'Pro',    joined: 'Mar 5, 2026',  status: 'Active' },
  { id: 'm9', name: 'Amara Osei',          email: 'amara@oseiholdings.com',   tier: 'Member', joined: 'Mar 8, 2026',  status: 'Active' },
  { id: 'm10',name: 'Priya Malhotra',      email: 'priya@malhotracap.com',    tier: 'Team',   joined: 'Mar 12, 2026', status: 'Active' },
  { id: 'm11',name: 'Helene Jourdain',     email: 'helene@jourdain.fr',       tier: 'Member', joined: 'Mar 13, 2026', status: 'Trial'  },
  { id: 'm12',name: 'Miriam Ashford',      email: 'miriam@ashfordlegacy.com', tier: 'Pro',    joined: 'Mar 14, 2026', status: 'Active' },
];

const TIER_COLORS: Record<string, string> = {
  Pro: 'var(--black)', Team: 'var(--dark-gray)', Member: 'var(--mid-gray)',
};

export default function AdminMembersPage() {
  const [filter, setFilter] = useState<string>('All');
  const [search, setSearch] = useState('');

  const tiers = ['All', 'Team', 'Pro', 'Member'];
  const visible = memberSeed.filter(m =>
    (filter === 'All' || m.tier === filter) &&
    (!search || m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase()))
  );

  const stats = [
    { label: 'Total members', val: memberSeed.length },
    { label: 'Pro', val: memberSeed.filter(m => m.tier === 'Pro').length },
    { label: 'Team', val: memberSeed.filter(m => m.tier === 'Team').length },
    { label: 'Active trials', val: memberSeed.filter(m => m.status === 'Trial').length },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 40 }}>
        <div>
          <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', marginBottom: 8 }}>Members</p>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 300, fontStyle: 'italic' }}>Member Management</h1>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)', marginBottom: 40 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: 'var(--white)', padding: '20px 24px' }}>
            <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', marginBottom: 8 }}>{s.label}</p>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 300, color: 'var(--black)' }}>{s.val}</p>
          </div>
        ))}
      </div>

      {/* Filters + Search */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 24, flexWrap: 'wrap' }}>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or email"
          style={{ fontSize: 12, fontWeight: 300, background: 'var(--white)', border: '1px solid var(--border)', padding: '8px 14px', color: 'var(--black)', fontFamily: 'var(--font-sans)', outline: 'none', width: 260 }}
        />
        <div style={{ display: 'flex', gap: 8 }}>
          {tiers.map(t => (
            <button key={t} onClick={() => setFilter(t)} style={{
              padding: '6px 14px', fontSize: 10, fontWeight: filter === t ? 500 : 300,
              letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer',
              background: filter === t ? 'var(--black)' : 'transparent',
              color: filter === t ? 'var(--white)' : 'var(--mid-gray)',
              border: `1px solid ${filter === t ? 'var(--black)' : 'var(--border)'}`,
              fontFamily: 'var(--font-sans)',
            }}>
              {t}
            </button>
          ))}
        </div>
        <span style={{ fontSize: 11, fontWeight: 300, color: 'var(--mid-gray)', marginLeft: 'auto' }}>{visible.length} results</span>
      </div>

      {/* Table */}
      <div style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 80px 100px 100px 80px', gap: 0, padding: '10px 20px', borderBottom: '1px solid var(--border)', background: 'var(--off-white)' }}>
          {['Name', 'Email', 'Tier', 'Joined', 'Status', ''].map(h => (
            <span key={h} className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)' }}>{h}</span>
          ))}
        </div>
        {visible.map((m, i) => (
          <div key={m.id} style={{
            display: 'grid', gridTemplateColumns: '2fr 2fr 80px 100px 100px 80px', gap: 0,
            padding: '14px 20px', borderBottom: i < visible.length - 1 ? '1px solid var(--border)' : 'none',
            alignItems: 'center',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--off-white)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 10, fontWeight: 500, color: 'var(--dark-gray)', fontFamily: 'var(--font-sans)' }}>{m.name.charAt(0)}</span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--black)' }}>{m.name}</span>
            </div>
            <span style={{ fontSize: 12, fontWeight: 300, color: 'var(--dark-gray)' }}>{m.email}</span>
            <span style={{ fontSize: 10, fontWeight: 500, color: TIER_COLORS[m.tier] || 'var(--dark-gray)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{m.tier}</span>
            <span style={{ fontSize: 11, fontWeight: 300, color: 'var(--mid-gray)' }}>{m.joined}</span>
            <span style={{
              fontSize: '9px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase',
              color: m.status === 'Active' ? 'var(--black)' : 'var(--mid-gray)',
            }}>{m.status}</span>
            <button className="btn btn-ghost btn-xs" style={{ textAlign: 'center' }}>View</button>
          </div>
        ))}
        {visible.length === 0 && (
          <div style={{ padding: '32px 20px', textAlign: 'center' }}>
            <p style={{ fontSize: 13, fontWeight: 300, color: 'var(--mid-gray)', fontStyle: 'italic' }}>No members match your filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
