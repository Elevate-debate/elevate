'use client';

import { useState, useEffect } from 'react';
import { fetchChapters } from '@/lib/supabase/client';
import RegisterChapterModal from '@/components/RegisterChapterModal';
import type { Chapter } from '@/types/database';

export default function ChapterTrackerPage() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  useEffect(() => {
    fetchChapters().then((data) => setChapters(data));
  }, []);

  const handleChapterAdded = (newChapter: Chapter) => {
    setChapters((prev) => [newChapter, ...prev]);
  };

  const totalChapters = chapters.length;
  const statesSet = new Set(chapters.map((c) => c.state).filter(Boolean));
  const totalStudents = chapters.reduce((sum, c) => sum + (c.students_count || 0), 0) || 130;
  const schoolsCount = chapters.reduce((sum, c) => sum + (c.schools_worked_with || 1), 0) || 5;

  const filteredChapters = chapters.filter((ch) => {
    const q = searchQuery.toLowerCase();
    const chName = ch.chapter_name.toLowerCase();
    const school = ch.school_name.toLowerCase();
    const city = ch.city.toLowerCase();
    const state = ch.state.toLowerCase();
    const status = ch.status.toLowerCase();
    const schoolType = (ch.school_type || 'High School').toLowerCase();
    const events = ch.events_offered.join(' ').toLowerCase();

    let matchesFilter = true;
    if (selectedFilter !== 'all') {
      if (selectedFilter === 'active') {
        matchesFilter = status.includes('active');
      } else if (selectedFilter === 'launching') {
        matchesFilter = status.includes('launch') || status.includes('form');
      } else if (selectedFilter === 'high-school') {
        matchesFilter = schoolType.includes('high');
      } else if (selectedFilter === 'middle-school') {
        matchesFilter = schoolType.includes('middle');
      } else {
        matchesFilter = state.includes(selectedFilter.toLowerCase()) || chName.includes(selectedFilter.toLowerCase());
      }
    }

    const matchesSearch =
      !q ||
      chName.includes(q) ||
      school.includes(q) ||
      city.includes(q) ||
      state.includes(q) ||
      events.includes(q);

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bg-paper min-h-screen text-ink">
      {/* Header Banner */}
      <section className="paper-grid border-b border-rule py-14 md:py-20">
        <div className="page-wrap">
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-8 pb-10 border-b border-rule">
            <div className="max-w-2xl">
              <p className="eyebrow mb-3">Verified Circuit Registry</p>
              <h1 className="font-serif text-[clamp(2.5rem,5.5vw,4.5rem)] font-medium leading-[0.92] tracking-[-0.045em] text-ink">
                Every room, roster, and regional lead.
              </h1>
              <p className="mt-5 text-base leading-relaxed text-ink-soft">
                Verified middle and high school speech &amp; debate chapters powered by Elevate the Circuit. Explore active schools, member rosters, tournament events, and coordinator direct contacts.
              </p>
            </div>

          </div>

          {/* 4 Stats Cards (White Information Squares) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
            <div className="bg-white border border-rule p-5 shadow-xs">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-ink-soft block">Total Chapters</span>
              <div className="font-serif text-3xl font-medium text-ink mt-1">{totalChapters}</div>
            </div>
            <div className="bg-white border border-rule p-5 shadow-xs">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-accent-dark block">States Represented</span>
              <div className="font-serif text-3xl font-medium text-ink mt-1">{statesSet.size}</div>
            </div>
            <div className="bg-white border border-rule p-5 shadow-xs">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-ink-soft block">Debaters Impacted</span>
              <div className="font-serif text-3xl font-medium text-ink mt-1">{totalStudents}+</div>
            </div>
            <div className="bg-white border border-rule p-5 shadow-xs">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-accent-dark block">Partner Schools</span>
              <div className="font-serif text-3xl font-medium text-ink mt-1">{schoolsCount}+</div>
            </div>
          </div>
        </div>
      </section>

      {/* Directory Dock Controls (White Square / Card) */}
      <div className="page-wrap py-10">
        <div className="border border-rule bg-white p-5 space-y-4 shadow-xs">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search school, city, state, or event format..."
                className="w-full px-3.5 py-2.5 bg-paper border border-rule text-sm text-ink placeholder:text-ink-soft/60 focus:outline-none focus:border-ink"
              />
            </div>

            {/* View Mode Toggle Buttons */}
            <div className="flex border border-rule self-stretch sm:self-auto">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-[0.08em] font-bold transition-colors ${
                  viewMode === 'cards' ? 'bg-ink text-paper' : 'bg-paper text-ink-soft hover:text-ink'
                }`}
              >
                Dossier Cards
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-[0.08em] font-bold border-l border-rule transition-colors ${
                  viewMode === 'table' ? 'bg-ink text-paper' : 'bg-paper text-ink-soft hover:text-ink'
                }`}
              >
                Registry Table
              </button>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-rule">
            {[
              { id: 'all', label: 'All Chapters' },
              { id: 'active', label: 'Active Only' },
              { id: 'high-school', label: 'High Schools' },
              { id: 'NC', label: 'North Carolina (NC)' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id)}
                className={`px-3 py-1.5 text-xs font-medium border transition-colors ${
                  selectedFilter === f.id
                    ? 'border-ink bg-ink text-paper'
                    : 'border-rule bg-paper text-ink-soft hover:border-ink/50 hover:text-ink'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Directory Results */}
        <div className="mt-8">
          <div className="flex items-center justify-between font-mono text-xs text-ink-soft mb-6 pb-2 border-b border-rule">
            <span>Showing {filteredChapters.length} of {chapters.length} chapters</span>
            <span className="uppercase tracking-[0.1em] text-[10px]">Verified Ledger</span>
          </div>

          {viewMode === 'cards' ? (
            /* Cards View: Individual White Squares/Cards */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChapters.map((ch) => {
                const isLaunching = ch.status.toLowerCase().includes('launch') || ch.status.toLowerCase().includes('form');
                return (
                  <article
                    key={ch.id}
                    className="border border-rule bg-white p-6 flex flex-col justify-between hover:border-ink transition-colors shadow-xs"
                  >
                    <div>
                      <div className="flex justify-between items-center mb-4 pb-3 border-b border-rule">
                        <span className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-ink-soft">
                          <span className={`status-dot ${isLaunching ? 'bg-accent' : 'bg-sage'}`} />
                          {ch.status}
                        </span>
                        <span className="font-mono text-xs font-bold text-accent-dark">Est. {ch.year_founded}</span>
                      </div>

                      <h3 className="font-serif text-2xl font-medium leading-tight text-ink mb-1.5">{ch.chapter_name}</h3>
                      <p className="text-xs text-ink-soft mb-4">
                        {ch.school_name} · {ch.city}, {ch.state}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {ch.events_offered.map((ev) => (
                          <span key={ev} className="font-mono text-[10px] bg-paper text-ink-soft border border-rule px-2 py-0.5">
                            {ev}
                          </span>
                        ))}
                      </div>

                      <div className="border border-rule bg-paper/60 p-3 text-xs space-y-1.5 text-ink-soft mb-5 font-mono">
                        <div className="flex justify-between">
                          <span>Debaters:</span>
                          <strong className="text-ink font-bold">{ch.students_count} active</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Leader:</span>
                          <strong className="text-ink font-bold">{ch.student_lead_name || 'Regional Coordinator'}</strong>
                        </div>
                        {ch.instagram_handle && (
                          <div className="flex justify-between items-center pt-1.5 border-t border-rule/50">
                            <span>Instagram:</span>
                            <a
                              href={ch.instagram_handle.startsWith('http') ? ch.instagram_handle : `https://www.instagram.com/${ch.instagram_handle.replace('@', '')}/`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#E1306C] font-bold hover:underline inline-flex items-center gap-1"
                            >
                              {ch.instagram_handle}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-rule flex flex-wrap justify-between items-center gap-2 text-xs">
                      <div className="flex flex-wrap items-center gap-2">
                        <a
                          href={`mailto:${ch.contact_email}`}
                          className="editorial-link text-xs text-accent-dark font-bold hover:text-ink inline-flex items-center gap-1"
                        >
                          Contact Lead →
                        </a>
                        <a
                          href={`mailto:${ch.contact_email}`}
                          className="text-xs text-ink-soft hover:text-ink underline break-all font-mono"
                        >
                          {ch.contact_email}
                        </a>
                      </div>
                      {ch.instagram_handle ? (
                        <a
                          href={ch.instagram_handle.startsWith('http') ? ch.instagram_handle : `https://www.instagram.com/${ch.instagram_handle.replace('@', '')}/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-bold text-[#E1306C] hover:underline"
                        >
                          {ch.instagram_handle}
                        </a>
                      ) : (
                        <span className="font-mono text-[10px] uppercase text-ink-soft/60">Verified Chapter</span>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            /* Table View: White Registry Container */
            <div className="border border-rule bg-white shadow-xs overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-paper font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-ink-soft border-b border-rule">
                  <tr>
                    <th className="py-3.5 px-4 font-bold">Chapter &amp; School</th>
                    <th className="py-3.5 px-4 font-bold">Location</th>
                    <th className="py-3.5 px-4 font-bold">Level</th>
                    <th className="py-3.5 px-4 font-bold">Est.</th>
                    <th className="py-3.5 px-4 font-bold">Debaters</th>
                    <th className="py-3.5 px-4 font-bold">Events</th>
                    <th className="py-3.5 px-4 font-bold">Contact</th>
                    <th className="py-3.5 px-4 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rule font-sans">
                  {filteredChapters.map((ch) => (
                    <tr key={ch.id} className="hover:bg-paper/50 transition-colors">
                      <td className="py-3.5 px-4">
                        <strong className="font-serif text-sm font-semibold text-ink block">{ch.chapter_name}</strong>
                        <span className="text-xs text-ink-soft">{ch.school_name}</span>
                      </td>
                      <td className="py-3.5 px-4 text-xs">
                        <strong>{ch.city}</strong>, {ch.state}
                      </td>
                      <td className="py-3.5 px-4 text-xs font-mono">{ch.school_type || 'High School'}</td>
                      <td className="py-3.5 px-4 text-xs font-mono font-bold">{ch.year_founded}</td>
                      <td className="py-3.5 px-4 text-xs font-mono font-bold text-accent-dark">{ch.students_count}</td>
                      <td className="py-3.5 px-4 text-xs">
                        <div className="flex gap-1 flex-wrap">
                          {ch.events_offered.slice(0, 3).map((e) => (
                            <span key={e} className="bg-paper border border-rule px-1.5 py-0.5 text-[10px] font-mono text-ink-soft">
                              {e}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-xs">
                        <div className="flex flex-col gap-1">
                          <a href={`mailto:${ch.contact_email}`} className="font-bold text-accent-dark hover:underline break-all">
                            {ch.contact_email}
                          </a>
                          {ch.instagram_handle && (
                            <a
                              href={ch.instagram_handle.startsWith('http') ? ch.instagram_handle : `https://www.instagram.com/${ch.instagram_handle.replace('@', '')}/`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[11px] text-[#E1306C] font-bold hover:underline"
                            >
                              {ch.instagram_handle}
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-xs">
                        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-ink">
                          <span className={`status-dot ${ch.status.toLowerCase().includes('active') ? 'bg-sage' : 'bg-accent'}`} />
                          {ch.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <RegisterChapterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onChapterAdded={handleChapterAdded}
      />
    </div>
  );
}
