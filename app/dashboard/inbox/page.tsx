'use client';
import { useState } from 'react';
import { Reply, Forward, Archive, Clock, CalendarPlus } from 'lucide-react';

const items = [
  { id: '1', from: 'Marcus Chen', initials: 'MC', src: 'Slack', srcCh: '#deal-flow', time: '7:42 am', triage: 'URGENT', subject: 'Term sheet — Series B', body: 'We have a decision date of March 18. Founders are requesting a final call by Thursday before committing to the other term sheet.', triageNote: 'Decision required within 48 hours.' },
  { id: '2', from: 'Julia Larsson', initials: 'JL', src: 'Email', srcCh: 'julia@advisors.com', time: 'Yesterday', triage: 'SCHEDULE', subject: 'Q1 Estate Review', body: 'Ready to book our Q1 review. Available: March 17 PM or March 19 AM. Should take 45 minutes.', triageNote: 'No deadline — schedule when convenient.' },
  { id: '3', from: 'Chloé Marten', initials: 'CM', src: 'Email', srcCh: 'chloe@maisonn.com', time: 'Yesterday', triage: 'DELEGATE', subject: 'Resort collabs — summer', body: 'Wanted to loop you in on three resort collaboration opportunities for the summer season. Happy to prep a brief.', triageNote: 'Forward to operations for initial assessment.' },
];

const triageStyle: Record<string, { color: string; bg: string }> = {
  URGENT:   { color: 'var(--black)',    bg: 'transparent' },
  SCHEDULE: { color: 'var(--dark-gray)', bg: 'transparent' },
  DELEGATE: { color: 'var(--mid-gray)', bg: 'transparent' },
};

export default function InboxPage() {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Urgent', 'Schedule', 'Delegate', 'Archived'];

  return (
    <div style={{ maxWidth: 840 }}>
      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 32, marginBottom: 40, borderBottom: '1px solid var(--border)', paddingBottom: 0 }}>
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            fontWeight: filter === f ? 500 : 300,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: filter === f ? 'var(--black)' : 'var(--mid-gray)',
            paddingBottom: '12px',
            borderBottom: filter === f ? '1px solid var(--black)' : '1px solid transparent',
            marginBottom: '-1px',
            transition: 'all var(--ease)',
          }}>
            {f}
          </button>
        ))}
      </div>

      {/* Items */}
      {items.map(item => (
        <div key={item.id} style={{ paddingBottom: 36, marginBottom: 36, borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
            {/* Avatar — round, black */}
            <div style={{
              width: 36, height: 36,
              borderRadius: '50%',
              background: 'var(--black)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, marginTop: 2,
            }}>
              <span style={{ fontSize: '11px', fontWeight: 500, color: 'var(--white)', letterSpacing: '0.04em' }}>{item.initials}</span>
            </div>

            <div style={{ flex: 1 }}>
              {/* Row 1 — name, source, time */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
                <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--black)', letterSpacing: '0.02em' }}>{item.from}</span>
                <span style={{ fontSize: '11px', fontWeight: 300, color: 'var(--mid-gray)' }}>via {item.src} · {item.srcCh}</span>
                <span style={{ marginLeft: 'auto', fontSize: '11px', fontWeight: 300, color: 'var(--mid-gray)' }}>{item.time}</span>
              </div>
              {/* Subject */}
              <p style={{ fontSize: '13px', fontWeight: 400, color: 'var(--black)', marginBottom: 8, letterSpacing: '0.01em' }}>{item.subject}</p>
              {/* Body */}
              <p style={{ fontSize: '13px', fontWeight: 300, color: 'var(--dark-gray)', lineHeight: 1.65, marginBottom: 16 }}>{item.body}</p>

              {/* Triage note */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                <span className="label" style={{ fontSize: '9px', ...triageStyle[item.triage] }}>
                  {item.triage}
                </span>
                <span style={{ fontSize: '12px', fontWeight: 300, color: 'var(--mid-gray)', fontStyle: 'italic' }}>{item.triageNote}</span>
              </div>

              {/* Action row — compact text+icon buttons */}
              <div style={{ display: 'flex', gap: 4 }}>
                {[
                  { icon: <Reply size={11} strokeWidth={1.5} />, label: 'Reply' },
                  { icon: <Forward size={11} strokeWidth={1.5} />, label: 'Forward' },
                  { icon: <CalendarPlus size={11} strokeWidth={1.5} />, label: 'Convert' },
                  { icon: <Clock size={11} strokeWidth={1.5} />, label: 'Snooze' },
                  { icon: <Archive size={11} strokeWidth={1.5} />, label: 'Archive' },
                ].map(({ icon, label }) => (
                  <button key={label} style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '6px 14px',
                    background: 'var(--off-white)',
                    border: 'none', cursor: 'pointer',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '10px',
                    fontWeight: 400,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--dark-gray)',
                    transition: 'all var(--ease)',
                  }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'var(--black)'; el.style.color = 'var(--white)'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'var(--off-white)'; el.style.color = 'var(--dark-gray)'; }}>
                    {icon}{label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
