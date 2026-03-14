export default function NotesPage() {
  const notes = [
    { id: '1', title: 'Board Deck — Q1 Narrative', updated: 'Today', preview: 'The framing for the board deck should open with the strategic shift we made in Q3, not the financials. Lead with...' },
    { id: '2', title: 'Milan — Due Diligence', updated: 'Yesterday', preview: 'Property on Via Montenapoleone — 3,200 sqft, mixed-use zoning, asking €4.2M. Comparable at €3.7M sold Dec...' },
    { id: '3', title: 'Longevity Protocol Notes', updated: 'March 12', preview: 'Dr. Shen recommends: VO2 max testing Q2, NMN dosage adjustment, sleep architecture review with Oura data...' },
    { id: '4', title: 'Fashion Week — Observations', updated: 'March 10', preview: 'Three collections worth acquiring: Alaïa resort (archive-worthy), The Row F/W (measured restraint), Bottega...' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 0, minHeight: 'calc(100vh - 160px)', borderTop: '1px solid var(--border)' }}>
      {/* Left — note list */}
      <div style={{ borderRight: '1px solid var(--border)', overflowY: 'auto' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
          <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)' }}>All Notes · {notes.length}</p>
        </div>
        {notes.map(note => (
          <div key={note.id} style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--border)',
            cursor: 'pointer',
            transition: 'background var(--ease)',
            background: note.id === '1' ? 'var(--off-white)' : 'var(--white)',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--off-white)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = note.id === '1' ? 'var(--off-white)' : 'var(--white)'; }}>
            <p style={{ fontSize: '12px', fontWeight: 400, color: 'var(--black)', marginBottom: 4, letterSpacing: '0.01em' }}>{note.title}</p>
            <p style={{ fontSize: '11px', fontWeight: 300, color: 'var(--mid-gray)', marginBottom: 6 }}>{note.updated}</p>
            <p style={{ fontSize: '11px', fontWeight: 300, color: 'var(--dark-gray)', lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
              {note.preview}
            </p>
          </div>
        ))}
      </div>

      {/* Right — editor */}
      <div style={{ padding: '40px 56px' }}>
        <div style={{ maxWidth: 640 }}>
          <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', marginBottom: 20 }}>Today · Board Deck — Q1 Narrative</p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 300, fontStyle: 'italic', marginBottom: 28, letterSpacing: '0.01em' }}>
            Board Deck — Q1 Narrative
          </h2>
          <div contentEditable suppressContentEditableWarning style={{
            fontSize: '14px', fontWeight: 300, lineHeight: 1.8,
            color: 'var(--black)', outline: 'none', minHeight: 400,
            letterSpacing: '0.01em',
          }}>
            <p style={{ marginBottom: 20 }}>The framing for the board deck should open with the strategic shift we made in Q3, not the financials. Lead with the thesis: we redirected capital from growth marketing toward product depth, and the results validate that decision.</p>
            <p style={{ marginBottom: 20 }}>Slide 3 should show ARR with the context of the retention uplift — not as standalone numbers. The board responds to narrative, not tables.</p>
            <p style={{ color: 'var(--mid-gray)' }}>Continue writing...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
