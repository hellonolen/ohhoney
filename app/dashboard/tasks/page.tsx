'use client';
import { useState } from 'react';
import { Plus, CheckCircle, Circle, MoreHorizontal } from 'lucide-react';

const TaskItem = ({ title, priority, deadline, done, onToggle }: { title: string; priority: string; deadline: string; done: boolean; onToggle: () => void }) => (
  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', paddingBottom: 20, marginBottom: 20, borderBottom: '1px solid var(--border)', opacity: done ? 0.4 : 1, transition: 'opacity var(--ease)' }}>
    <button onClick={onToggle} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0, marginTop: 2, color: 'var(--black)', display: 'flex' }}>
      {done ? <CheckCircle size={15} strokeWidth={1.5} /> : <Circle size={15} strokeWidth={1.5} />}
    </button>
    <div style={{ flex: 1 }}>
      <p style={{ fontSize: '13px', fontWeight: done ? 300 : 400, color: 'var(--black)', textDecoration: done ? 'line-through' : 'none', marginBottom: 4, letterSpacing: '0.01em' }}>{title}</p>
      <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
        <span className="label" style={{ fontSize: '9px', color: priority === 'High' ? 'var(--black)' : 'var(--mid-gray)' }}>{priority}</span>
        <span style={{ fontSize: '11px', fontWeight: 300, color: 'var(--mid-gray)' }}>{deadline}</span>
      </div>
    </div>
    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mid-gray)', display: 'flex', padding: 4 }}>
      <MoreHorizontal size={14} strokeWidth={1.5} />
    </button>
  </div>
);

const tasks = [
  { id: '1', title: 'Review Q1 estate planning summary', priority: 'High', deadline: 'Today', project: 'Estate & Tax' },
  { id: '2', title: 'Confirm Milan travel insurance coverage', priority: 'High', deadline: 'March 16', project: 'Travel' },
  { id: '3', title: 'Follow up — Acme term sheet decision', priority: 'High', deadline: 'March 18', project: 'Business' },
  { id: '4', title: 'Schedule longevity protocol consult', priority: 'Medium', deadline: 'This week', project: 'Health' },
  { id: '5', title: 'Review interior designer shortlist', priority: 'Medium', deadline: 'March 20', project: 'Home' },
  { id: '6', title: 'Donate allocation — impact portfolio review', priority: 'Low', deadline: 'April', project: 'Philanthropy' },
];

export default function TasksPage() {
  const [done, setDone] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const toggle = (id: string) => setDone(d => d.includes(id) ? d.filter(x => x !== id) : [...d, id]);
  const groups = tasks.reduce((acc, t) => { const g = t.project; if (!acc[g]) acc[g] = []; acc[g].push(t); return acc; }, {} as Record<string, typeof tasks>);

  return (
    <div style={{ maxWidth: 700 }}>
      {/* Add task */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 48, paddingBottom: 24, borderBottom: '1px solid var(--border)' }}>
        <Plus size={14} strokeWidth={1.5} style={{ color: 'var(--mid-gray)', flexShrink: 0 }} />
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add a task"
          className="input"
          style={{ border: 'none', borderBottom: 'none', fontSize: '13px', letterSpacing: '0.01em', padding: 0 }}
        />
      </div>

      {/* Groups */}
      {Object.entries(groups).map(([group, groupTasks]) => (
        <div key={group} style={{ marginBottom: 40 }}>
          <p className="label" style={{ fontSize: '9px', color: 'var(--mid-gray)', marginBottom: 20 }}>{group}</p>
          {groupTasks.map(t => (
            <TaskItem key={t.id} {...t} done={done.includes(t.id)} onToggle={() => toggle(t.id)} />
          ))}
        </div>
      ))}
    </div>
  );
}
