'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function MembershipPage() {
  const [tab, setTab] = useState<'signin'|'apply'>('apply');
  const [form, setForm] = useState({ email: '', name: '', title: '', why: '' });

  return (
    <div style={{ paddingTop: 72, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 'calc(100vh - 72px)' }}>

        {/* Left — editorial image column */}
        <div style={{
          background: 'var(--black)',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '60px',
          position: 'relative', overflow: 'hidden',
          minHeight: 600,
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80)',
            backgroundSize: 'cover', backgroundPosition: 'center',
            opacity: 0.35,
          }} />
          <div style={{ position: 'relative', zIndex: 2 }}>
            <p className="label" style={{ color: 'rgba(255,255,255,0.45)', marginBottom: 16 }}>OhHoney.ai</p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 300, fontStyle: 'italic', color: 'var(--white)', lineHeight: 1.15, marginBottom: 16 }}>
              Intelligence<br />designed for<br />women who<br />command.
            </h2>
            <p style={{ fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
              Membership is by application.<br />Every member is reviewed personally.
            </p>
          </div>
        </div>

        {/* Right — form column */}
        <div style={{ background: 'var(--white)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 64px' }}>
          <div style={{ maxWidth: 360 }}>
            {/* Tabs */}
            <div style={{ display: 'flex', gap: 32, marginBottom: 48, borderBottom: '1px solid var(--border)', paddingBottom: 0 }}>
              {(['apply', 'signin'] as const).map(t => (
                <button key={t} onClick={() => setTab(t)} style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 11, fontWeight: tab === t ? 500 : 300,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: tab === t ? 'var(--black)' : 'var(--mid-gray)',
                  paddingBottom: 12,
                  borderBottom: tab === t ? '1px solid var(--black)' : '1px solid transparent',
                  marginBottom: -1,
                }}>
                  {t === 'apply' ? 'Apply' : 'Sign in'}
                </button>
              ))}
            </div>

            {tab === 'apply' ? (
              <form onSubmit={e => e.preventDefault()}>
                <div style={{ marginBottom: 28 }}>
                  <label className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', display: 'block', marginBottom: 8 }}>Full name</label>
                  <input className="input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" />
                </div>
                <div style={{ marginBottom: 28 }}>
                  <label className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', display: 'block', marginBottom: 8 }}>Email address</label>
                  <input className="input" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@example.com" />
                </div>
                <div style={{ marginBottom: 28 }}>
                  <label className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', display: 'block', marginBottom: 8 }}>Title / Role</label>
                  <input className="input" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Founder · Executive · Principal" />
                </div>
                <div style={{ marginBottom: 40 }}>
                  <label className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', display: 'block', marginBottom: 8 }}>Why OhHoney? (optional)</label>
                  <textarea className="input" value={form.why} onChange={e => setForm(f => ({ ...f, why: e.target.value }))} placeholder="What are you looking to accomplish?" style={{ resize: 'vertical', minHeight: 80, fontFamily: 'var(--font-sans)', fontSize: 14 }} />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Submit application
                </button>
                <p style={{ fontSize: 11, fontWeight: 300, color: 'var(--mid-gray)', marginTop: 16, lineHeight: 1.6, textAlign: 'center' }}>
                  Applications are reviewed within 24 hours.<br />
                  <Link href="/pricing" style={{ color: 'var(--dark-gray)', textDecoration: 'underline' }}>View membership tiers</Link>
                </p>
              </form>
            ) : (
              <form onSubmit={e => e.preventDefault()}>
                <div style={{ marginBottom: 28 }}>
                  <label className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', display: 'block', marginBottom: 8 }}>Email address</label>
                  <input className="input" type="email" placeholder="you@example.com" />
                </div>
                <div style={{ marginBottom: 40 }}>
                  <label className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', display: 'block', marginBottom: 8 }}>Password</label>
                  <input className="input" type="password" placeholder="••••••••" />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Sign in
                </button>
                <p style={{ fontSize: 11, fontWeight: 300, color: 'var(--mid-gray)', marginTop: 20, textAlign: 'center' }}>
                  Not a member? <button onClick={() => setTab('apply')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--black)', textDecoration: 'underline', fontSize: 11, fontFamily: 'var(--font-sans)' }}>Apply for access</button>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
