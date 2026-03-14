'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import { Search, X, Plus, Info, Link as LinkIcon } from 'lucide-react';

type NodeType = 'Note' | 'Event' | 'Contact' | 'Task' | 'Deal';

interface GraphNode {
  id: string;
  label: string;
  type: NodeType;
  x: number;
  y: number;
  detail?: string;
}
interface Edge { s: string; t: string; }

const INITIAL_NODES: GraphNode[] = [
  { id: 'n1', label: 'Board Deck Q1',        type: 'Note',    x: 380, y: 210, detail: 'Narrative-first approach. Three slides flagged for revision before Friday.' },
  { id: 'n2', label: 'Investment Committee', type: 'Event',   x: 580, y: 140, detail: 'Thursday 11:30 AM. Three agenda items: Acme term sheet, Vanguard rebalance, PE allocation.' },
  { id: 'n3', label: 'Acme Corp',            type: 'Contact', x: 660, y: 290, detail: 'Decision date March 18. Founders waiting on our final call before committing.' },
  { id: 'n4', label: 'Estate Review',        type: 'Task',    x: 220, y: 310, detail: 'Q1 estate planning summary. Schedule with Julia Larsson before end of month.' },
  { id: 'n5', label: 'Julia Larsson',        type: 'Contact', x: 150, y: 180, detail: 'Estate & wealth advisor. Available March 17 PM or March 19 AM.' },
  { id: 'n6', label: 'Milan Trip',           type: 'Event',   x: 520, y: 400, detail: 'June travel. Peak rates 22% above last year. Booking window closes March 20.' },
  { id: 'n7', label: 'Longevity Protocol',   type: 'Note',    x: 310, y: 440, detail: 'Three missed recovery sessions. Dr. Shen: VO2 max test Q2.' },
  { id: 'n8', label: 'Loro Piana Atelier',   type: 'Deal',    x: 700, y: 420, detail: 'Private atelier visit, Milan. 8 slots — apply by March 25.' },
];
const INITIAL_EDGES: Edge[] = [
  { s: 'n1', t: 'n2' }, { s: 'n1', t: 'n4' }, { s: 'n2', t: 'n3' },
  { s: 'n4', t: 'n5' }, { s: 'n5', t: 'n4' }, { s: 'n6', t: 'n3' },
  { s: 'n7', t: 'n6' }, { s: 'n8', t: 'n6' },
];

const TYPE_STYLE: Record<NodeType, { r: number; stroke: string; fill: string; textColor: string }> = {
  Note:    { r: 22, stroke: '#1D1D1D', fill: '#1D1D1D', textColor: '#FFFFFF' },
  Event:   { r: 18, stroke: '#1D1D1D', fill: '#F5F5F5', textColor: '#1D1D1D' },
  Contact: { r: 18, stroke: '#9B9B9B', fill: '#F5F5F5', textColor: '#1D1D1D' },
  Task:    { r: 14, stroke: '#4A4A4A', fill: '#FFFFFF',  textColor: '#1D1D1D' },
  Deal:    { r: 16, stroke: '#1D1D1D', fill: '#E0E0E0', textColor: '#1D1D1D' },
};
const NODE_TYPES: NodeType[] = ['Note', 'Event', 'Contact', 'Task', 'Deal'];

// Clamp a node position to keep it fully inside the SVG viewport
function clamp(val: number, min: number, max: number) { return Math.max(min, Math.min(max, val)); }

export default function GraphPage() {
  const [nodes, setNodes] = useState<GraphNode[]>(INITIAL_NODES);
  const [edges, setEdges] = useState<Edge[]>(INITIAL_EDGES);
  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [hidden, setHidden] = useState<string[]>([]);
  const [dragging, setDragging] = useState<{ id: string; ox: number; oy: number } | null>(null);
  const [panel, setPanel] = useState<'detail' | 'add-node' | 'add-edge'>('detail');
  const svgRef = useRef<SVGSVGElement>(null);
  const svgSize = useRef({ w: 800, h: 560 });

  // New node form
  const [newNode, setNewNode] = useState({ label: '', type: 'Note' as NodeType, detail: '' });
  // New edge form
  const [newEdge, setNewEdge] = useState({ from: '', to: '' });

  const visibleNodes = nodes.filter(n => !hidden.includes(n.id) && (!search || n.label.toLowerCase().includes(search.toLowerCase())));
  const visibleEdges = edges.filter(e => !hidden.includes(e.s) && !hidden.includes(e.t));
  const selNode = selected ? nodes.find(n => n.id === selected) : null;
  const relEdges = selected ? visibleEdges.filter(e => e.s === selected || e.t === selected) : [];
  const relIds = new Set(relEdges.flatMap(e => [e.s, e.t]));

  // Measure SVG on mount
  useEffect(() => {
    if (svgRef.current) {
      const r = svgRef.current.getBoundingClientRect();
      svgSize.current = { w: r.width, h: r.height };
    }
  }, []);

  // Drag
  const onMouseDown = useCallback((e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!svgRef.current) return;
    const r = svgRef.current.getBoundingClientRect();
    const node = nodes.find(n => n.id === id)!;
    svgSize.current = { w: r.width, h: r.height };
    setDragging({ id, ox: e.clientX - r.left - node.x, oy: e.clientY - r.top - node.y });
    setSelected(id);
    setPanel('detail');
  }, [nodes]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging || !svgRef.current) return;
    const r = svgRef.current.getBoundingClientRect();
    const ts = TYPE_STYLE[nodes.find(n => n.id === dragging.id)!.type];
    const margin = ts.r + 16;
    setNodes(ns => ns.map(n => n.id === dragging.id
      ? {
          ...n,
          x: clamp(e.clientX - r.left - dragging.ox, margin, r.width - margin),
          y: clamp(e.clientY - r.top - dragging.oy, margin, r.height - margin),
        }
      : n
    ));
  }, [dragging, nodes]);

  const onMouseUp = useCallback(() => setDragging(null), []);
  useEffect(() => {
    window.addEventListener('mouseup', onMouseUp);
    return () => window.removeEventListener('mouseup', onMouseUp);
  }, [onMouseUp]);

  // Add node
  function addNode() {
    if (!newNode.label.trim()) return;
    const id = `u${Date.now()}`;
    // Spread new nodes in visible area
    const { w, h } = svgSize.current;
    setNodes(ns => [...ns, {
      id, label: newNode.label.trim(), type: newNode.type,
      x: clamp(120 + Math.random() * (w - 240), 40, w - 40),
      y: clamp(100 + Math.random() * (h - 200), 40, h - 40),
      detail: newNode.detail.trim() || undefined,
    }]);
    setSelected(id);
    setNewNode({ label: '', type: 'Note', detail: '' });
    setPanel('detail');
  }

  // Add edge
  function addEdge() {
    if (!newEdge.from || !newEdge.to || newEdge.from === newEdge.to) return;
    const exists = edges.some(e => (e.s === newEdge.from && e.t === newEdge.to) || (e.s === newEdge.to && e.t === newEdge.from));
    if (!exists) setEdges(es => [...es, { s: newEdge.from, t: newEdge.to }]);
    setNewEdge({ from: '', to: '' });
    setPanel('detail');
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', height: 'calc(100vh - 160px)', margin: '0 -56px' }}>
      {/* Graph canvas */}
      <div style={{ background: 'var(--off-white)', position: 'relative', overflow: 'hidden' }}>
        {/* Search bar */}
        <div style={{ position: 'absolute', top: 14, left: 14, right: 14, display: 'flex', gap: 8, zIndex: 10 }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, background: 'var(--white)', padding: '7px 14px', border: '1px solid var(--border)' }}>
            <Search size={11} strokeWidth={1.5} style={{ color: 'var(--mid-gray)', flexShrink: 0 }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search nodes" style={{ background: 'none', border: 'none', outline: 'none', fontSize: 12, fontWeight: 300, color: 'var(--black)', width: '100%' }} />
          </div>
          <button onClick={() => { setPanel('add-node'); setSelected(null); }} className="btn btn-xs" style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--white)', border: '1px solid var(--border)' }} title="Add node">
            <Plus size={11} strokeWidth={1.5} /> Node
          </button>
          <button onClick={() => { setPanel('add-edge'); setSelected(null); }} className="btn btn-xs" style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--white)', border: '1px solid var(--border)' }} title="Add relationship">
            <LinkIcon size={11} strokeWidth={1.5} /> Link
          </button>
        </div>

        <svg
          ref={svgRef}
          width="100%" height="100%"
          style={{ cursor: dragging ? 'grabbing' : 'default', display: 'block' }}
          onClick={e => { if (e.target === e.currentTarget) setSelected(null); }}
          onMouseMove={onMouseMove}
        >
          <defs>
            <pattern id="g-dots" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="0.5" cy="0.5" r="0.8" fill="var(--border)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#g-dots)" />

          {/* Edges */}
          {visibleEdges.map((edge, i) => {
            const s = nodes.find(n => n.id === edge.s);
            const t = nodes.find(n => n.id === edge.t);
            if (!s || !t) return null;
            const active = !selected || relIds.has(edge.s) || relIds.has(edge.t);
            return (
              <line key={i} x1={s.x} y1={s.y} x2={t.x} y2={t.y}
                stroke="var(--light-gray)" strokeWidth={1}
                opacity={active ? 1 : 0.08}
                style={{ transition: 'opacity 0.2s', pointerEvents: 'none' }}
              />
            );
          })}

          {/* Nodes */}
          {visibleNodes.map(node => {
            const ts = TYPE_STYLE[node.type];
            const isSelected = selected === node.id;
            const dimmed = !!selected && !relIds.has(node.id) && selected !== node.id;
            return (
              <g key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                style={{ cursor: dragging?.id === node.id ? 'grabbing' : 'grab', userSelect: 'none' }}
                onMouseDown={e => onMouseDown(e, node.id)}
              >
                {isSelected && <circle r={ts.r + 9} fill="none" stroke="var(--black)" strokeWidth="1" opacity={0.4} />}
                <circle r={ts.r} fill={ts.fill} stroke={ts.stroke} strokeWidth={isSelected ? 1.5 : 1}
                  opacity={dimmed ? 0.08 : 1} style={{ transition: 'opacity 0.2s' }}
                />
                <text textAnchor="middle" dy="0.35em" fontSize="9"
                  fill={ts.textColor} fontFamily="var(--font-sans)" fontWeight="500"
                  opacity={dimmed ? 0.08 : 1} style={{ pointerEvents: 'none' }}>
                  {node.type.charAt(0)}
                </text>
                <text textAnchor="middle" dy={ts.r + 14} fontSize="10"
                  fill="var(--black)" fontFamily="var(--font-sans)" fontWeight="300"
                  opacity={dimmed ? 0.08 : 1} style={{ pointerEvents: 'none' }}>
                  {node.label.length > 14 ? node.label.slice(0, 13) + '…' : node.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div style={{ position: 'absolute', bottom: 14, left: 14, display: 'flex', gap: 16, background: 'var(--white)', padding: '7px 14px', border: '1px solid var(--border)' }}>
          {NODE_TYPES.map(type => {
            const ts = TYPE_STYLE[type];
            return (
              <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: ts.fill, border: `1px solid ${ts.stroke}` }} />
                <span className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)' }}>{type}</span>
              </div>
            );
          })}
        </div>
        <div style={{ position: 'absolute', bottom: 14, right: 14 }}>
          <span className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', background: 'var(--white)', padding: '5px 10px', border: '1px solid var(--border)' }}>
            Drag nodes · {visibleNodes.length} visible
          </span>
        </div>
      </div>

      {/* Side panel */}
      <div style={{ borderLeft: '1px solid var(--border)', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        {/* Panel tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
          {(['detail', 'add-node', 'add-edge'] as const).map(p => (
            <button key={p} onClick={() => setPanel(p)} style={{
              flex: 1, padding: '12px 4px', border: 'none', background: 'none', cursor: 'pointer',
              fontSize: 9, fontWeight: panel === p ? 500 : 300,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: panel === p ? 'var(--black)' : 'var(--mid-gray)',
              borderBottom: panel === p ? '1px solid var(--black)' : '1px solid transparent',
              marginBottom: -1,
            }}>
              {p === 'detail' ? 'Details' : p === 'add-node' ? '+ Node' : '+ Link'}
            </button>
          ))}
        </div>

        {/* Detail panel */}
        {panel === 'detail' && (
          <div style={{ flex: 1, padding: '20px 20px', overflowY: 'auto' }}>
            {selNode ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div>
                    <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', marginBottom: 6 }}>{selNode.type}</p>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 300, fontStyle: 'italic', lineHeight: 1.2 }}>{selNode.label}</h3>
                  </div>
                  <button onClick={() => { setHidden(h => [...h, selNode.id]); setSelected(null); }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mid-gray)', padding: 4, display: 'flex', flexShrink: 0 }}>
                    <X size={12} strokeWidth={1.5} />
                  </button>
                </div>
                {selNode.detail && (
                  <div style={{ padding: '14px', background: 'var(--off-white)', marginBottom: 20 }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                      <Info size={10} strokeWidth={1.5} style={{ color: 'var(--mid-gray)', flexShrink: 0, marginTop: 2 }} />
                      <p style={{ fontSize: 12, fontWeight: 300, color: 'var(--dark-gray)', lineHeight: 1.65 }}>{selNode.detail}</p>
                    </div>
                  </div>
                )}
                {relEdges.length > 0 && (
                  <>
                    <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', marginBottom: 12 }}>Connections · {relEdges.length}</p>
                    {relEdges.map((edge, i) => {
                      const otherId = edge.s === selNode.id ? edge.t : edge.s;
                      const other = nodes.find(n => n.id === otherId);
                      if (!other) return null;
                      const ots = TYPE_STYLE[other.type];
                      return (
                        <button key={i} onClick={() => setSelected(otherId)} style={{
                          display: 'flex', gap: 10, alignItems: 'center', width: '100%', textAlign: 'left',
                          padding: '9px 0', background: 'none', border: 'none', cursor: 'pointer',
                          borderBottom: '1px solid var(--border)',
                        }}>
                          <div style={{ width: 7, height: 7, borderRadius: '50%', background: ots.fill, border: `1px solid ${ots.stroke}`, flexShrink: 0 }} />
                          <div>
                            <p style={{ fontSize: 12, fontWeight: 400, color: 'var(--black)', marginBottom: 1 }}>{other.label}</p>
                            <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)' }}>{other.type}</p>
                          </div>
                        </button>
                      );
                    })}
                  </>
                )}
              </>
            ) : (
              <div style={{ paddingTop: 32, textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: 15, fontStyle: 'italic', fontWeight: 300, color: 'var(--black)', marginBottom: 8 }}>Select a node</p>
                <p style={{ fontSize: 12, fontWeight: 300, color: 'var(--mid-gray)', lineHeight: 1.6, marginBottom: 24 }}>
                  Drag to reposition. ✕ to hide. Use tabs to add nodes and connections.
                </p>
                <div style={{ textAlign: 'left' }}>
                  <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', marginBottom: 12 }}>Graph — {visibleNodes.length} nodes · {visibleEdges.length} connections</p>
                  {NODE_TYPES.map(type => {
                    const cnt = visibleNodes.filter(n => n.type === type).length;
                    if (!cnt) return null;
                    return (
                      <div key={type} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 8, marginBottom: 8, borderBottom: '1px solid var(--border)' }}>
                        <span style={{ fontSize: 12, fontWeight: 300, color: 'var(--dark-gray)' }}>{type}</span>
                        <span style={{ fontSize: 12, fontWeight: 400, color: 'var(--black)' }}>{cnt}</span>
                      </div>
                    );
                  })}
                </div>
                {hidden.length > 0 && (
                  <button onClick={() => setHidden([])} className="btn btn-ghost btn-xs" style={{ marginTop: 16 }}>
                    Restore {hidden.length} hidden
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Add node panel */}
        {panel === 'add-node' && (
          <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
            <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', marginBottom: 20 }}>New node</p>
            <div style={{ marginBottom: 20 }}>
              <label className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', display: 'block', marginBottom: 8 }}>Label</label>
              <input className="input" value={newNode.label} onChange={e => setNewNode(n => ({ ...n, label: e.target.value }))} placeholder="e.g. Tax Strategy Call" onKeyDown={e => e.key === 'Enter' && addNode()} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', display: 'block', marginBottom: 8 }}>Type</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {NODE_TYPES.map(t => (
                  <button key={t} onClick={() => setNewNode(n => ({ ...n, type: t }))} style={{
                    padding: '5px 12px', fontSize: 10, fontWeight: newNode.type === t ? 500 : 300,
                    letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer',
                    background: newNode.type === t ? 'var(--black)' : 'transparent',
                    color: newNode.type === t ? 'var(--white)' : 'var(--mid-gray)',
                    border: `1px solid ${newNode.type === t ? 'var(--black)' : 'var(--border)'}`,
                    fontFamily: 'var(--font-sans)',
                  }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 24 }}>
              <label className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', display: 'block', marginBottom: 8 }}>Intelligence note (optional)</label>
              <textarea className="input" value={newNode.detail} onChange={e => setNewNode(n => ({ ...n, detail: e.target.value }))} placeholder="Context that will appear in the detail panel..." rows={3} style={{ resize: 'vertical', fontFamily: 'var(--font-sans)' }} />
            </div>
            <button onClick={addNode} className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center' }} disabled={!newNode.label.trim()}>
              Add to graph
            </button>
          </div>
        )}

        {/* Add edge / relationship panel */}
        {panel === 'add-edge' && (
          <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
            <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', marginBottom: 20 }}>Add relationship</p>
            <div style={{ marginBottom: 20 }}>
              <label className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', display: 'block', marginBottom: 8 }}>From node</label>
              <select className="input" value={newEdge.from} onChange={e => setNewEdge(n => ({ ...n, from: e.target.value }))} style={{ cursor: 'pointer' }}>
                <option value="">Select a node</option>
                {nodes.filter(n => !hidden.includes(n.id)).map(n => <option key={n.id} value={n.id}>{n.label}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: 24 }}>
              <label className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', display: 'block', marginBottom: 8 }}>To node</label>
              <select className="input" value={newEdge.to} onChange={e => setNewEdge(n => ({ ...n, to: e.target.value }))} style={{ cursor: 'pointer' }}>
                <option value="">Select a node</option>
                {nodes.filter(n => !hidden.includes(n.id) && n.id !== newEdge.from).map(n => <option key={n.id} value={n.id}>{n.label}</option>)}
              </select>
            </div>
            {newEdge.from && newEdge.to && newEdge.from !== newEdge.to && (
              <div style={{ padding: '12px', background: 'var(--off-white)', marginBottom: 20 }}>
                <p style={{ fontSize: 12, fontWeight: 300, color: 'var(--dark-gray)' }}>
                  {nodes.find(n => n.id === newEdge.from)?.label} → {nodes.find(n => n.id === newEdge.to)?.label}
                </p>
              </div>
            )}
            <button onClick={addEdge} className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center' }} disabled={!newEdge.from || !newEdge.to || newEdge.from === newEdge.to}>
              Create connection
            </button>
            <div style={{ marginTop: 24 }}>
              <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', marginBottom: 12 }}>Existing connections · {visibleEdges.length}</p>
              {visibleEdges.map((e, i) => {
                const s = nodes.find(n => n.id === e.s);
                const t = nodes.find(n => n.id === e.t);
                if (!s || !t) return null;
                return (
                  <div key={i} style={{ fontSize: 11, fontWeight: 300, color: 'var(--dark-gray)', paddingBottom: 8, marginBottom: 8, borderBottom: '1px solid var(--border)' }}>
                    {s.label} → {t.label}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
