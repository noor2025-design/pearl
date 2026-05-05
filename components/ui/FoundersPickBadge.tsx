'use client';

import { useState, useRef, useEffect } from 'react';

interface FoundersPickBadgeProps {
  note: string;
}

export default function FoundersPickBadge({ note }: FoundersPickBadgeProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div ref={ref} className="relative inline-flex" onClick={(e) => e.preventDefault()}>
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(!open); }}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cream text-periwinkle-dark font-ui text-xs font-semibold border border-periwinkle/30 hover:bg-periwinkle/10 transition-colors"
        aria-expanded={open}
      >
        <span>✦</span>
        Founder's Pick
      </button>

      {open && (
        <div className="absolute bottom-full left-0 mb-2 w-72 bg-white rounded-2xl shadow-card-hover border border-cream-dark p-4 z-50">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-periwinkle text-sm">✦</span>
            <p className="font-ui text-xs font-semibold text-periwinkle uppercase tracking-widest">Founder's Note</p>
          </div>
          <p className="font-ui text-sm text-text-primary leading-relaxed italic">
            "{note}"
          </p>
          <div className="mt-3 pt-3 border-t border-cream-dark">
            <p className="font-ui text-xs text-text-secondary">— Pearl Founder</p>
          </div>
          {/* Arrow */}
          <div className="absolute top-full left-5 w-3 h-3 bg-white border-b border-r border-cream-dark rotate-45 -translate-y-1.5" />
        </div>
      )}
    </div>
  );
}
