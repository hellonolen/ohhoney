'use client';
import { useState } from 'react';

type Tab = 'profile' | 'membership' | 'security' | 'notifications';

export default function ProfilePage() {
  const [tab, setTab] = useState<Tab>('profile');
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: 'Alexandra Monroe',
    title: 'Founder & Principal',
    email: 'alexandra@monroe.co',
    location: 'New York, NY',
    timezone: 'Eastern Time',
    bio: 'Founder of Monroe Capital Partners. Managing a $40M portfolio across private equity, real estate, and alternative assets.',
  });

  const tabs: { id: Tab; label: string }[] = [
    { id: 'profile', label: 'Profile' },
    { id: 'membership', label: 'Membership' },
    { id: 'security', label: 'Security' },
    { id: 'notifications', label: 'Notifications' },
  ];

  return (
    <div style={{ maxWidth: 860 }}>
      {/* Tab row */}
      <div style={{ display: 'flex', gap: 32, marginBottom: 48, borderBottom: '1px solid var(--border)', paddingBottom: 0 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: 'var(--font-sans)',
            fontSize: 11, fontWeight: tab === t.id ? 500 : 300,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: tab === t.id ? 'var(--black)' : 'var(--mid-gray)',
            paddingBottom: 12,
            borderBottom: tab === t.id ? '1px solid var(--black)' : '1px solid transparent',
            marginBottom: -1,
          }}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'profile' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: 64 }}>
          {/* Left — form */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
              <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)' }}>Personal information</p>
              <button onClick={() => setEditing(!editing)} className="btn btn-ghost btn-xs">
                {editing ? 'Cancel' : 'Edit profile'}
              </button>
            </div>

            {[
              { label: 'Full name', field: 'name' as const },
              { label: 'Title / Role', field: 'title' as const },
              { label: 'Email address', field: 'email' as const },
              { label: 'Location', field: 'location' as const },
              { label: 'Timezone', field: 'timezone' as const },
            ].map(({ label, field }) => (
              <div key={field} style={{ marginBottom: 28, paddingBottom: 28, borderBottom: '1px solid var(--border)' }}>
                <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', marginBottom: 8 }}>{label}</p>
                {editing ? (
                  <input className="input" value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))} />
                ) : (
                  <p style={{ fontSize: 14, fontWeight: 300, color: 'var(--black)' }}>{form[field]}</p>
                )}
              </div>
            ))}

            <div style={{ marginBottom: 28 }}>
              <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', marginBottom: 8 }}>Bio</p>
              {editing ? (
                <textarea className="input" value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} rows={4} style={{ resize: 'vertical', fontFamily: 'var(--font-sans)' }} />
              ) : (
                <p style={{ fontSize: 14, fontWeight: 300, color: 'var(--dark-gray)', lineHeight: 1.7 }}>{form.bio}</p>
              )}
            </div>

            {editing && (
              <button onClick={() => setEditing(false)} className="btn btn-primary btn-sm">Save changes</button>
            )}
          </div>

          {/* Right — avatar + membership badge */}
          <div>
            {/* Avatar */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--black)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <span style={{ fontSize: 24, fontWeight: 300, color: 'var(--white)', fontFamily: 'var(--font-serif)' }}>AM</span>
              </div>
              <p style={{ fontSize: 12, fontWeight: 300, color: 'var(--mid-gray)' }}>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontSize: 11, color: 'var(--dark-gray)', fontFamily: 'var(--font-sans)' }}>
                  Update photo
                </button>
              </p>
            </div>

            {/* Membership status */}
            <div style={{ padding: '20px', background: 'var(--off-white)', marginBottom: 20 }}>
              <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', marginBottom: 12 }}>Membership</p>
              <p style={{ fontSize: 14, fontWeight: 400, color: 'var(--black)', marginBottom: 4 }}>Pro Member</p>
              <p style={{ fontSize: 11, fontWeight: 300, color: 'var(--mid-gray)', marginBottom: 16 }}>Renews April 14, 2026</p>
              <button className="btn btn-ghost btn-xs">Manage plan</button>
            </div>

            {/* Member since */}
            <div style={{ paddingTop: 20, borderTop: '1px solid var(--border)' }}>
              <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', marginBottom: 8 }}>Member since</p>
              <p style={{ fontSize: 13, fontWeight: 300, color: 'var(--black)' }}>March 2026</p>
            </div>
          </div>
        </div>
      )}

      {tab === 'membership' && (
        <div>
          <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', marginBottom: 28 }}>Current plan</p>
          <div style={{ padding: '28px', background: 'var(--off-white)', marginBottom: 32, borderLeft: '2px solid var(--black)' }}>
            <p style={{ fontSize: 16, fontWeight: 400, color: 'var(--black)', marginBottom: 4 }}>Pro Membership</p>
            <p style={{ fontSize: 13, fontWeight: 300, color: 'var(--dark-gray)', marginBottom: 12 }}>$247 / month · Renews April 14, 2026</p>
            <p style={{ fontSize: 12, fontWeight: 300, color: 'var(--mid-gray)', lineHeight: 1.6 }}>
              Full platform access · Curated deal flow across all 12 pillars · Concierge onboarding included
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn btn-ghost btn-sm">Upgrade plan</button>
            <button className="btn btn-ghost btn-sm" style={{ color: 'var(--mid-gray)' }}>Cancel membership</button>
          </div>
        </div>
      )}

      {tab === 'security' && (
        <div style={{ maxWidth: 460 }}>
          {[
            { label: 'Password', val: '••••••••••••', action: 'Change' },
            { label: 'Two-factor authentication', val: 'Not enabled', action: 'Enable' },
            { label: 'Active sessions', val: '1 device', action: 'View all' },
          ].map(({ label, val, action }) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 24, marginBottom: 24, borderBottom: '1px solid var(--border)' }}>
              <div>
                <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', marginBottom: 6 }}>{label}</p>
                <p style={{ fontSize: 13, fontWeight: 300, color: 'var(--black)' }}>{val}</p>
              </div>
              <button className="btn btn-ghost btn-xs">{action}</button>
            </div>
          ))}
        </div>
      )}

      {tab === 'notifications' && (
        <div style={{ maxWidth: 460 }}>
          {[
            { label: 'Intelligence briefings', desc: 'Daily morning briefing delivered to your inbox', on: true },
            { label: 'New deals', desc: 'Notify me when new deals are available in my categories', on: true },
            { label: 'OhHoney events', desc: 'Intensives, workshops, and member events', on: false },
            { label: 'Product updates', desc: 'New features and platform announcements', on: false },
          ].map(({ label, desc, on: defaultOn }) => {
            const [on, setOn] = useState(defaultOn);
            return (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: 24, marginBottom: 24, borderBottom: '1px solid var(--border)' }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 400, color: 'var(--black)', marginBottom: 4 }}>{label}</p>
                  <p style={{ fontSize: 12, fontWeight: 300, color: 'var(--mid-gray)', lineHeight: 1.5 }}>{desc}</p>
                </div>
                <button onClick={() => setOn(!on)} style={{
                  width: 36, height: 20, borderRadius: 10,
                  background: on ? 'var(--black)' : 'var(--border)',
                  border: 'none', cursor: 'pointer', flexShrink: 0, marginLeft: 20,
                  position: 'relative', transition: 'background 0.2s',
                }}>
                  <span style={{
                    position: 'absolute', top: 3, left: on ? 19 : 3,
                    width: 14, height: 14, borderRadius: '50%',
                    background: 'var(--white)', transition: 'left 0.2s',
                  }} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
