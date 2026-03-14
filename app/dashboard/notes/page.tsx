'use client';
import { useState } from 'react';

const notes = [
  { id: '1', title: 'Board Deck — Q1 Narrative', updated: 'Today', preview: 'The framing for the board deck should open with the strategic shift we made in Q3, not the financials. Lead with...' },
  { id: '2', title: 'Milan — Due Diligence', updated: 'Yesterday', preview: 'Property on Via Montenapoleone — 3,200 sqft, mixed-use zoning, asking €4.2M. Comparable at €3.7M sold Dec...' },
  { id: '3', title: 'Longevity Protocol Notes', updated: 'March 12', preview: 'Dr. Shen recommends: VO2 max testing Q2, NMN dosage adjustment, sleep architecture review with Oura data...' },
  { id: '4', title: 'Fashion Week — Observations', updated: 'March 10', preview: 'Three collections worth acquiring: Alaïa resort (archive-worthy), The Row F/W (measured restraint), Bottega...' },
];

export default function NotesPage() {
  const [active, setActive] = useState('1');
  const selected = notes.find(n => n.id === active)!;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 0, minHeight: 'calc(100vh - 160px)', borderTop: '1px solid var(--border)', margin: '0 -56px' }}>
      {/* Left — note list */}
      <div style={{ borderRight: '1px solid var(--border)', overflowY: 'auto' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
          <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)' }}>All Notes · {notes.length}</p>
        </div>
        {notes.map(note => (
          <button key={note.id} onClick={() => setActive(note.id)} style={{
            display: 'block', width: '100%', textAlign: 'left',
            padding: '20px 24px',
            cursor: 'pointer',
            background: active === note.id ? 'var(--off-white)' : 'var(--white)',
            border: 'none',
            borderBottom: '1px solid var(--border)',
            transition: 'background var(--ease)',
          }}>
            <p style={{ fontSize: '12px', fontWeight: 400, color: 'var(--black)', marginBottom: 4, letterSpacing: '0.01em' }}>{note.title}</p>
            <p style={{ fontSize: '11px', fontWeight: 300, color: 'var(--mid-gray)', marginBottom: 6 }}>{note.updated}</p>
            <p style={{ fontSize: '11px', fontWeight: 300, color: 'var(--dark-gray)', lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
              {note.preview}
            </p>
          </button>
        ))}
      </div>

      {/* Right — editor */}
      <div style={{ padding: '40px 56px' }}>
        <div style={{ maxWidth: 640 }}>
          <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', marginBottom: 20 }}>
            {selected.updated} · {selected.title}
          </p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 300, fontStyle: 'italic', marginBottom: 28, letterSpacing: '0.01em' }}>
            {selected.title}
          </h2>
          <div contentEditable suppressContentEditableWarning style={{
            fontSize: '14px', fontWeight: 300, lineHeight: 1.8,
            color: 'var(--black)', outline: 'none', minHeight: 400,
            letterSpacing: '0.01em',
          }}>
            <p style={{ marginBottom: 20 }}>{selected.preview}</p>
            <p style={{ color: 'var(--mid-gray)', fontStyle: 'italic' }}>Continue writing...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
