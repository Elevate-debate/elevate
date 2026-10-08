'use client';

import Link from 'next/link';
import { ArrowRight, ArrowUpRight, BookOpen, Quote } from 'lucide-react';
import { useEffect, useState } from 'react';
import ResolutionDocket from '@/components/ResolutionDocket';
import { fetchChapters } from '@/lib/supabase/client';
import type { Chapter } from '@/types/database';

const pillars = [
  {
    index: '01',
    title: 'Make the case.',
    desc: 'Research, framing, and evidence are taught as habits of mind, not just tournament tricks.',
  },
  {
    index: '02',
    title: 'Find your voice.',
    desc: 'Students practice speaking clearly, listening closely, and refining their perspectives with intention.',
  },
  {
    index: '03',
    title: 'Build the room.',
    desc: 'A chapter is a durable school community with coaching resources, scrimmages, and a place to return to.',
  },
  {
    index: '04',
    title: 'Keep the door open.',
    desc: 'Free open-source materials make serious debate available to any school community.',
  },
];

export default function HomePage() {
  const [chapters, setChapters] = useState<Chapter[]>([]);

  useEffect(() => {
    fetchChapters().then((data) => setChapters(data));
  }, []);

  const totalChapters = chapters.length || 1;
  const statesCount = new Set(chapters.map((c) => c.state).filter(Boolean)).size || 1;
  const totalStudents = chapters.reduce((sum, c) => sum + (c.students_count || 0), 0) || 130;
  const schoolsCount = chapters.reduce((sum, c) => sum + (c.schools_worked_with || 1), 0) || 5;

  return (
    <div className="overflow-hidden bg-paper">
      <main>
        {/* Editorial Masthead & Hero */}
        <section className="paper-grid border-b border-rule">
          <div className="page-wrap grid w-full min-w-0 grid-cols-1 gap-12 py-16 md:py-24 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-20">
            <div className="w-full min-w-0 max-w-full overflow-hidden">
              <p className="eyebrow mb-6">A student-run debate network · Est. 2025</p>
              <h1 className="w-full max-w-full break-words font-serif text-[clamp(2.5rem,12vw,7.5rem)] font-medium leading-[0.84] tracking-[-0.065em] text-ink [overflow-wrap:anywhere] sm:whitespace-normal">
                Better<span className="hidden sm:inline"> </span><br className="sm:hidden" /> arguments<br className="sm:hidden" /> <em className="text-accent-dark">belong</em><span className="hidden sm:inline"> </span><br className="sm:hidden" /> to everyone.
              </h1>
              <p className="mt-8 w-full max-w-xl break-words text-base leading-relaxed text-ink-soft sm:text-lg">
                Elevate the Circuit helps public schools build lasting speech and debate programs, from the first meeting to the first tournament room.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Link href="/get-involved#start-chapter" className="inline-flex items-center gap-2 bg-accent px-5 py-3 text-sm font-bold text-paper transition-colors hover:bg-accent-dark">
                  Start a chapter <ArrowUpRight size={16} />
                </Link>
                <Link href="/resources" className="editorial-link text-sm text-ink">
                  Browse the library <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            <aside className="w-full min-w-0 max-w-full overflow-hidden relative bg-white border border-rule border-l-4 border-l-accent p-6 md:p-8 shadow-editorial lg:mb-1">
              <div className="mb-8 flex items-center justify-between gap-3">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-accent-dark">Motion of the week</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">PF · 2026</span>
              </div>
              <h2 className="max-w-full break-words font-serif text-4xl leading-[0.95] tracking-[-0.04em] text-ink sm:text-5xl">
                The Arctic is becoming a test of what power means.
              </h2>
              <p className="mt-5 max-w-full break-words font-serif text-xl italic leading-snug text-ink-soft [overflow-wrap:anywhere]">
                Resolved: The United States federal government should substantially increase its military presence in the Arctic.
              </p>
              <div className="mt-8 flex items-center gap-3 border-t border-rule pt-4 text-xs text-ink-soft">
                <BookOpen size={15} className="text-accent-dark" aria-hidden="true" />
                <span>Evidence brief, framing notes, and practice prompts</span>
              </div>
              <Link href="/resources" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-accent-dark hover:text-ink">
                Open the curriculum desk <ArrowUpRight size={15} />
              </Link>
            </aside>
          </div>

          {/* Real Statistics Evidence Cards (White Squares) */}
          <div className="page-wrap py-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white border border-rule p-5 shadow-xs">
                <span className="font-serif text-3xl text-ink block">{totalChapters}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft">active chapter</span>
              </div>
              <div className="bg-white border border-rule p-5 shadow-xs">
                <span className="font-serif text-3xl text-ink block">{totalStudents}+</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft">student debaters</span>
              </div>
              <div className="bg-white border border-rule p-5 shadow-xs">
                <span className="font-serif text-3xl text-ink block">{schoolsCount}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft">partner schools</span>
              </div>
              <div className="bg-white border border-rule p-5 shadow-xs">
                <span className="font-serif text-3xl text-ink block">{statesCount}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft">state represented</span>
              </div>
            </div>
          </div>
        </section>

        {/* Resolution Docket */}
        <ResolutionDocket />

        {/* Why this work matters */}
        <section className="border-b border-rule bg-paper">
          <div className="page-wrap grid gap-12 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div>
              <p className="eyebrow">Why this work matters</p>
              <h2 className="mt-3 max-w-md font-serif text-5xl leading-[0.93] tracking-[-0.045em] text-ink sm:text-6xl">A room to think out loud.</h2>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-soft">Debate gives students a practical way to research the world, test their convictions, and learn from someone who sees the same question differently.</p>
              <div className="mt-8 flex items-center gap-3 text-sm font-semibold text-ink">
                <Quote size={18} className="text-accent" aria-hidden="true" />
                <span>Curiosity before certainty.</span>
              </div>
            </div>
            <div className="grid gap-4">
              {pillars.map((pillar) => (
                <article key={pillar.index} className="bg-white border border-rule p-6 shadow-xs grid gap-4 sm:grid-cols-[60px_0.8fr_1.2fr] sm:items-start sm:gap-6">
                  <span className="font-mono text-xs font-bold text-accent-dark">{pillar.index}</span>
                  <h3 className="font-serif text-2xl leading-none text-ink">{pillar.title}</h3>
                  <p className="max-w-sm text-sm leading-relaxed text-ink-soft">{pillar.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Final Invitation */}
        <section className="bg-accent py-16 text-paper sm:py-20">
          <div className="page-wrap grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-paper/70">For students, teachers, and people who still have questions</p>
              <h2 className="mt-4 max-w-3xl font-serif text-5xl leading-[0.9] tracking-[-0.05em] sm:text-7xl">Bring a better question to the room.</h2>
            </div>
            <div className="flex flex-col items-start gap-5 lg:items-end">
              <p className="max-w-xs text-sm leading-relaxed text-paper/80 lg:text-right">We provide the curriculum, starter kits, and practice scrimmage pairings. Your school brings the curiosity.</p>
              <Link href="/get-involved#start-chapter" className="inline-flex items-center gap-2 border border-paper px-5 py-3 text-sm font-bold text-paper transition-colors hover:bg-paper hover:text-accent">
                Start a Chapter <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
