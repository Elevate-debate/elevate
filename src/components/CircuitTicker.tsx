'use client';

import { Pause, Play } from 'lucide-react';
import { useState } from 'react';

export default function CircuitTicker() {
  const [paused, setPaused] = useState(false);
  const items = [
    'Spring 2026 docket is live',
    'New chapters welcome across the Carolinas',
    'Open evidence packs for PF and LD',
    'Free starter kits for public schools',
  ];

  return (
    <div className="border-b border-rule bg-ink text-paper">
      <div className="page-wrap flex min-h-8 items-center gap-3 overflow-hidden">
        <span className="shrink-0 border-r border-paper/25 pr-3 font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-[#e9b8aa]">
          Circuit bulletin
        </span>
        <div className="min-w-0 flex-1 overflow-hidden whitespace-nowrap">
          <div className={`inline-flex min-w-max gap-10 font-mono text-[10px] uppercase tracking-[0.08em] text-paper/75 ${paused ? '' : 'animate-[tickerScroll_42s_linear_infinite]'}`}>
            {[...items, ...items].map((item, idx) => (
              <span key={`${item}-${idx}`} className="inline-flex items-center gap-3">
                <span className="h-1 w-1 rounded-full bg-[#d98d79]" />
                {item}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={() => setPaused(!paused)}
          className="flex shrink-0 items-center gap-1 border-l border-paper/25 pl-3 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-paper/70 hover:text-paper"
          aria-label={paused ? 'Resume bulletin' : 'Pause bulletin'}
        >
          {paused ? <Play size={11} fill="currentColor" /> : <Pause size={11} />}
          <span className="hidden sm:inline">{paused ? 'Play' : 'Pause'}</span>
        </button>
      </div>
    </div>
  );
}
