'use client';
import { useEffect, useRef } from 'react';

/**
 * useReveal — attaches IntersectionObserver to an element ref.
 * Adds 'visible' class when element enters the viewport.
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          obs.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return ref;
}

/**
 * Reveal — wrapper component that applies scroll reveal to its children.
 * Usage: <Reveal delay={1}><section>...</section></Reveal>
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
  style,
}: {
  children: React.ReactNode;
  delay?: 0 | 1 | 2 | 3 | 4;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useReveal<HTMLDivElement>();
  const delayClass = delay ? `reveal-delay-${delay}` : '';
  return (
    <div ref={ref} className={`reveal ${delayClass} ${className}`.trim()} style={style}>
      {children}
    </div>
  );
}
