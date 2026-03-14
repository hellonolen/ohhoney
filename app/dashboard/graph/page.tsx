'use client';
import { useState } from 'react';
import { Search } from 'lucide-react';

const nodes = [
  { id: 'n1', label: 'Board Deck Q1', type: 'Note', x: 420, y: 240 },
  { id: 'n2', label: 'Investment Committee', type: 'Event', x: 620, y: 160 },
  { id: 'n3', label: 'Acme Corp', type: 'Contact', x: 700, y: 320 },
  { id: 'n4', label: 'Estate Review', type: 'Task', x: 260, y: 340 },
  { id: 'n5', label: 'Julia Larsson', type: 'Contact', x: 180, y: 200 },
  { id: 'n6', label: 'Milan Trip', type: 'Event', x: 560, y: 440 },
  { id: 'n7', label: 'Longevity Protocol', type: 'Note', x: 340, y: 480 },
];

const edges = [
  { s: 'n1', t: 'n2' }, { s: 'n1', t: 'n4' }, { s: 'n2', t: 'n3' },
  { s: 'n4', t: 'n5' }, { s: 'n5', t: 'n4' }, { s: 'n6', t: 'n3' }, { s: 'n7', t: 'n6' },
];

const typeStyle: Record<string, { r: number; fill: string; text: string }> = {
  Note:    { r: 22, fill: '#1D1D1D', text: '#FFFFFF' },
  Event:   { r: 18, fill: '#4A4A4A', text: '#FFFFFF' },
  Contact: { r: 18, fill: '#9B9B9B', text: '#FFFFFF' },
  Task:    { r: 14, fill: '#E8E8E8', text: '#1D1D1D' },
};

export default function GraphPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const sel = nodes.find(n => n.id === selected);
  const relEdges = edges.filter(e => e.s === selected || e.t === selected);
  const relIds = new Set(relEdges.flatMap(e => [e.s, e.t]));

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: 0, height: 'calc(100vh - 160px)' }}>
      {/* Graph canvas */}
      <div style={{ background: 'var(--off-white)', position: 'relative', overflow: 'hidden' }}>
        {/* Search */}
        <div style={{ position: 'absolute', top: 20, left: 20, display: 'flex', alignItems: 'center', gap: 10, background: 'var(--white)', padding: '8px 16px', zIndex: 10 }}>
          <Search size={12} strokeWidth={1.5} style={{ color: 'var(--mid-gray)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search nodes" style={{ background: 'none', border: 'none', outline: 'none', fontSize: '12px', fontWeight: 300, letterSpacing: '0.04em', color: 'var(--black)', width: 160 }} />
        </div>

        <svg width="100%" height="100%" onClick={e => { if (e.target === e.currentTarget) setSelected(null); }}>
          {/* Dot grid */}
          <defs>
            <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="0.5" cy="0.5" r="0.8" fill="var(--border)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />

          {/* Edges */}
          {edges.map((edge, i) => {
            const s = nodes.find(n => n.id === edge.s)!;
            const t = nodes.find(n => n.id === edge.t)!;
            const isRelated = selected ? (edge.s === selected || edge.t === selected) : true;
            return (
              <line key={i} x1={s.x} y1={s.y} x2={t.x} y2={t.y}
                stroke="var(--light-gray)" strokeWidth={1}
                opacity={isRelated ? 1 : 0.15}
                style={{ transition: 'opacity 0.2s' }}
              />
            );
          })}

          {/* Nodes */}
          {nodes.filter(n => !search || n.label.toLowerCase().includes(search.toLowerCase())).map(node => {
            const ts = typeStyle[node.type];
            const isSelected = selected === node.id;
            const dimmed = selected && !relIds.has(node.id);
            return (
              <g key={node.id} transform={`translate(${node.x}, ${node.y})`}
                style={{ cursor: 'pointer' }}
                onClick={() => setSelected(selected === node.id ? null : node.id)}>
                {isSelected && <circle r={ts.r + 8} fill="none" stroke="var(--black)" strokeWidth="1" />}
                <circle r={ts.r} fill={ts.fill} opacity={dimmed ? 0.12 : 1} style={{ transition: 'opacity 0.2s' }} />
                <text textAnchor="middle" dy="0.35em" fontSize="9" fill={ts.text} fontFamily="var(--font-sans)" fontWeight="400" letterSpacing="0.03em" style={{ pointerEvents: 'none' }} opacity={dimmed ? 0.12 : 1}>
                  {node.type.charAt(0)}
                </text>
                <text textAnchor="middle" dy={ts.r + 14} fontSize="10" fill="var(--black)" fontFamily="var(--font-sans)" fontWeight="300" opacity={dimmed ? 0.12 : 1} style={{ pointerEvents: 'none' }}>
                  {node.label.length > 14 ? node.label.slice(0, 13) + '…' : node.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div style={{ position: 'absolute', bottom: 20, left: 20, display: 'flex', gap: 20, background: 'var(--white)', padding: '10px 16px' }}>
          {Object.entries(typeStyle).map(([type, s]) => (
            <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.fill }} />
              <span className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)' }}>{type}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Detail panel */}
      <div style={{ borderLeft: '1px solid var(--border)', padding: '28px 24px', overflowY: 'auto' }}>
        {sel ? (
          <>
            <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', marginBottom: 12 }}>{sel.type}</p>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 300, fontStyle: 'italic', marginBottom: 24 }}>{sel.label}</h3>
            <hr className="rule" style={{ marginBottom: 20 }} />
            <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', marginBottom: 16 }}>Connected</p>
            {relEdges.map((edge, i) => {
              const otherId = edge.s === sel.id ? edge.t : edge.s;
              const other = nodes.find(n => n.id === otherId);
              if (!other) return null;
              return (
                <button key={i} onClick={() => setSelected(otherId)} style={{
                  display: 'flex', gap: 12, alignItems: 'center', width: '100%', textAlign: 'left',
                  padding: '10px 0', borderBottom: '1px solid var(--border)', background: 'none', border: 'none', cursor: 'pointer',
                  borderTop: i === 0 ? 'none' : 'none',
                  borderBottomWidth: 1,
                  borderBottomColor: 'var(--border)',
                  borderBottomStyle: 'solid',
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: typeStyle[other.type].fill, flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: 400, color: 'var(--black)', marginBottom: 2 }}>{other.label}</p>
                    <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)' }}>{other.type}</p>
                  </div>
                </button>
              );
            })}
          </>
        ) : (
          <div style={{ paddingTop: 40, textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', fontStyle: 'italic', fontWeight: 300, color: 'var(--black)', marginBottom: 8 }}>Select a node</p>
            <p style={{ fontSize: '12px', fontWeight: 300, color: 'var(--mid-gray)', lineHeight: 1.6 }}>Click any node in the graph to explore its connections.</p>
          </div>
        )}
      </div>
    </div>
  );
}
