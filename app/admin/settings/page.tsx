'use client';
import { useState } from 'react';

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [platform, setPlatform] = useState({
    name: 'OhHoney.ai',
    tagline: 'Intelligence Feels Good',
    supportEmail: 'support@ohhoney.ai',
    replyEmail: 'noreply@ohhoney.ai',
    trialDays: '3',
    maxTeamSeats: '5',
  });

  const [notifications, setNotifications] = useState({
    newMember: true,
    trialStart: true,
    paymentFailed: true,
    weeklyDigest: false,
  });

  const [admins] = useState([
    { email: 'hellonolen@gmail.com', role: 'Owner' },
    { email: 'tracyhogan76@gmail.com', role: 'Owner' },
  ]);

  function save(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div style={{ maxWidth: 720 }}>
      <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', marginBottom: 8 }}>Settings</p>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 300, fontStyle: 'italic', marginBottom: 48 }}>Platform Settings</h1>

      <form onSubmit={save}>
        {/* Platform identity */}
        <div style={{ marginBottom: 48 }}>
          <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', marginBottom: 24 }}>Platform identity</p>
          {[
            { label: 'Platform name', field: 'name' as const },
            { label: 'Tagline', field: 'tagline' as const },
            { label: 'Support email', field: 'supportEmail' as const },
            { label: 'Reply-to email', field: 'replyEmail' as const },
          ].map(({ label, field }) => (
            <div key={field} style={{ paddingBottom: 24, marginBottom: 24, borderBottom: '1px solid var(--border)' }}>
              <label className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', display: 'block', marginBottom: 8 }}>{label}</label>
              <input className="input" value={platform[field]} onChange={e => setPlatform(p => ({ ...p, [field]: e.target.value }))} />
            </div>
          ))}
        </div>

        {/* Membership config */}
        <div style={{ marginBottom: 48 }}>
          <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', marginBottom: 24 }}>Membership configuration</p>
          {[
            { label: 'Free trial length (days)', field: 'trialDays' as const },
            { label: 'Max team seats', field: 'maxTeamSeats' as const },
          ].map(({ label, field }) => (
            <div key={field} style={{ paddingBottom: 24, marginBottom: 24, borderBottom: '1px solid var(--border)' }}>
              <label className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', display: 'block', marginBottom: 8 }}>{label}</label>
              <input className="input" type="number" value={platform[field]} onChange={e => setPlatform(p => ({ ...p, [field]: e.target.value }))} style={{ width: 120 }} />
            </div>
          ))}
        </div>

        {/* Admin notifications */}
        <div style={{ marginBottom: 48 }}>
          <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', marginBottom: 24 }}>Admin notifications</p>
          {[
            { label: 'New member joined', field: 'newMember' as const },
            { label: 'Free trial started', field: 'trialStart' as const },
            { label: 'Payment failed', field: 'paymentFailed' as const },
            { label: 'Weekly member digest', field: 'weeklyDigest' as const },
          ].map(({ label, field }) => (
            <div key={field} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 20, marginBottom: 20, borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: 13, fontWeight: 300, color: 'var(--black)' }}>{label}</span>
              <button type="button" onClick={() => setNotifications(n => ({ ...n, [field]: !n[field] }))} style={{
                width: 36, height: 20, borderRadius: 10,
                background: notifications[field] ? 'var(--black)' : 'var(--border)',
                border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0,
              }}>
                <span style={{
                  position: 'absolute', top: 3, left: notifications[field] ? 19 : 3,
                  width: 14, height: 14, borderRadius: '50%', background: 'var(--white)', transition: 'left 0.2s',
                }} />
              </button>
            </div>
          ))}
        </div>

        {/* Admin owners */}
        <div style={{ marginBottom: 48 }}>
          <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', marginBottom: 24 }}>Platform owners</p>
          {admins.map(a => (
            <div key={a.email} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 20, marginBottom: 20, borderBottom: '1px solid var(--border)' }}>
              <div>
                <p style={{ fontSize: 13, fontWeight: 400, color: 'var(--black)', marginBottom: 2 }}>{a.email}</p>
                <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)' }}>{a.role} · Full access</p>
              </div>
              <span className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', border: '1px solid var(--border)', padding: '3px 8px' }}>Protected</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button type="submit" className="btn btn-primary btn-sm">Save settings</button>
          {saved && <span style={{ fontSize: 12, fontWeight: 300, color: 'var(--dark-gray)', fontStyle: 'italic' }}>Saved.</span>}
        </div>
      </form>
    </div>
  );
}
