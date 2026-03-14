'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'General inquiry', message: '' });
  const [sent, setSent] = useState(false);

  const subjects = [
    'General inquiry',
    'Membership question',
    'Enterprise / White Glove inquiry',
    'OhHoney Intensive',
    'Partnership or deal proposal',
    'Press & media',
  ];

  return (
    <div style={{ paddingTop: 72 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 'calc(100vh - 72px)' }}>
        {/* Left — info */}
        <div style={{ padding: '80px 60px', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', marginBottom: 24 }}>Contact</p>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 36, fontWeight: 300, fontStyle: 'italic', lineHeight: 1.1, marginBottom: 32, maxWidth: 380 }}>
            We'd love to hear from you.
          </h1>

          <div style={{ marginBottom: 48 }}>
            <p style={{ fontSize: 13, fontWeight: 300, color: 'var(--dark-gray)', lineHeight: 1.75, maxWidth: 380 }}>
              OhHoney is a small, intentional team. Every message is read personally. We respond within 24 hours — usually sooner.
            </p>
          </div>

          {[
            { label: 'General support', val: 'support@ohhoney.ai' },
            { label: 'Enterprise & partnerships', val: 'enterprise@ohhoney.ai' },
            { label: 'Press & media', val: 'press@ohhoney.ai' },
          ].map(({ label, val }) => (
            <div key={label} style={{ paddingBottom: 20, marginBottom: 20, borderBottom: '1px solid var(--border)' }}>
              <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', marginBottom: 6 }}>{label}</p>
              <a href={`mailto:${val}`} style={{ fontSize: 13, fontWeight: 300, color: 'var(--black)', textDecoration: 'none' }}>{val}</a>
            </div>
          ))}
        </div>

        {/* Right — form */}
        <div style={{ padding: '80px 60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {sent ? (
            <div style={{ maxWidth: 400 }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 300, fontStyle: 'italic', marginBottom: 16 }}>
                Message received.
              </p>
              <p style={{ fontSize: 13, fontWeight: 300, color: 'var(--dark-gray)', lineHeight: 1.7 }}>
                We'll respond within 24 hours to {form.email}. Thank you for reaching out.
              </p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true); }} style={{ maxWidth: 440 }}>
              <div style={{ marginBottom: 28 }}>
                <label className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', display: 'block', marginBottom: 8 }}>Full name</label>
                <input className="input" required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} placeholder="Your name" />
              </div>
              <div style={{ marginBottom: 28 }}>
                <label className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', display: 'block', marginBottom: 8 }}>Email address</label>
                <input className="input" type="email" required value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} placeholder="you@example.com" />
              </div>
              <div style={{ marginBottom: 28 }}>
                <label className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', display: 'block', marginBottom: 8 }}>Subject</label>
                <select className="input" value={form.subject} onChange={e => setForm(f => ({...f, subject: e.target.value}))} style={{ cursor: 'pointer' }}>
                  {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 36 }}>
                <label className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', display: 'block', marginBottom: 8 }}>Message</label>
                <textarea className="input" required value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))} rows={5} placeholder="How can we help?" style={{ resize: 'vertical', fontFamily: 'var(--font-sans)' }} />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Send message</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
