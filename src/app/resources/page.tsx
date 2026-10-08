'use client';

import { useState } from 'react';
import type { ResourceItem } from '@/types/database';
import { ArrowDownToLine, Search, FileText, FolderArchive, Layers, BookOpen } from 'lucide-react';

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const resources: ResourceItem[] = [
    {
      id: 'res-01',
      title: 'Official 12-Week Novice Forensics Curriculum',
      category: 'curriculum',
      format_badge: 'PDF • 48 Pages',
      description: 'Week-by-week syllabus covering case construction, cross-examination strategies, flowing shorthand, and rebuttal blueprints.',
      download_url: '#',
    },
    {
      id: 'res-02',
      title: 'School Club Starter Supply & Launch Kit',
      category: 'starter-kits',
      format_badge: 'ZIP Archive',
      description: 'Official chapter constitution template, faculty advisor guide, school announcement flyers, and initial meeting slide deck.',
      download_url: '#',
    },
    {
      id: 'res-03',
      title: 'Middle School SPAR & Impromptu Debate Games',
      category: 'middle-school',
      format_badge: 'Card Deck (PDF)',
      description: '60 fast-paced, engaging impromptu debate prompts and SPAR format guidelines designed specifically for grades 6-8.',
      download_url: '#',
    },
    {
      id: 'res-04',
      title: 'Public Forum & Lincoln-Douglas Evidence Brief',
      category: 'topics',
      format_badge: 'Evidence Pack',
      description: 'Curated peer-reviewed research citations, pro/con cards, and framing analysis on current Arctic and Wealth Tax resolutions.',
      download_url: '#',
    },
    {
      id: 'res-05',
      title: 'Judge Paradigm & Ballot Scoring Matrix',
      category: 'tournaments',
      format_badge: 'Judge Guide',
      description: 'Standardized judging rubrics for lay and experienced judges covering speaker points, RFD writing, and round decorum.',
      download_url: '#',
    },
    {
      id: 'res-06',
      title: 'Forensics Format Comparison Matrix',
      category: 'formats',
      format_badge: 'Cheat Sheet',
      description: 'Side-by-side comparison of speech times, team configurations, and judging criteria across PF, LD, Policy, and Congress.',
      download_url: '#',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Resources' },
    { id: 'starter-kits', label: 'Starter Kits' },
    { id: 'curriculum', label: 'Curriculum' },
    { id: 'middle-school', label: 'Middle School' },
    { id: 'topics', label: 'Topics & Briefs' },
    { id: 'tournaments', label: 'Tournaments' },
    { id: 'formats', label: 'Formats' },
  ];

  const filtered = resources.filter((res) => {
    const matchesCategory = selectedCategory === 'all' || res.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'starter-kits':
        return <FolderArchive className="w-3.5 h-3.5 text-accent" />;
      case 'curriculum':
        return <BookOpen className="w-3.5 h-3.5 text-accent" />;
      case 'formats':
        return <Layers className="w-3.5 h-3.5 text-accent" />;
      default:
        return <FileText className="w-3.5 h-3.5 text-accent" />;
    }
  };

  return (
    <div className="min-h-screen bg-paper text-ink pb-20">
      {/* Editorial Header */}
      <section className="paper-grid border-b border-rule py-12 md:py-16">
        <div className="page-wrap">
          <div className="max-w-3xl">
            <span className="eyebrow">Open-Source Materials</span>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal text-ink tracking-tight mt-3 mb-4">
              Debate curriculum & starter kits
            </h1>
            <p className="text-ink-soft text-base leading-relaxed">
              Authored by circuit competitors and forensics coaches. Free to download, copy, and run at school club practices without licensing costs or gatekept files.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="page-wrap mt-8">
        {/* Search & Filter Toolbar (White Card) */}
        <div className="bg-white border border-rule p-4 md:p-5 mb-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-soft/60" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search curriculum, briefs, or formats..."
                className="w-full bg-paper border border-rule pl-10 pr-4 py-2 text-xs font-mono text-ink placeholder:text-ink-soft/60 focus:border-ink focus:outline-none transition-colors"
              />
            </div>

            {/* Total Results Count */}
            <span className="text-xs font-mono text-ink-soft self-center md:self-auto">
              Showing <strong className="text-ink">{filtered.length}</strong> of {resources.length} materials
            </span>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 pt-4 mt-4 border-t border-rule">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-xs font-mono px-3 py-1.5 border transition-all ${
                    active
                      ? 'bg-ink text-paper border-ink font-semibold'
                      : 'bg-paper text-ink-soft border-rule hover:border-ink hover:text-ink'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Resources Grid: Individual White Squares */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((res) => (
              <div
                key={res.id}
                className="bg-white border border-rule p-6 flex flex-col justify-between hover:border-ink transition-colors group shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-rule">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-ink-soft uppercase tracking-wider">
                      {getCategoryIcon(res.category)}
                      {res.category.replace('-', ' ')}
                    </span>
                    <span className="font-mono text-[11px] text-accent-dark font-medium px-2 py-0.5 bg-paper border border-rule">
                      {res.format_badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-medium text-ink group-hover:text-accent-dark transition-colors mb-2.5 leading-snug">
                    {res.title}
                  </h3>
                  <p className="text-xs text-ink-soft leading-relaxed mb-6">
                    {res.description}
                  </p>
                </div>

                <a
                  href={res.download_url}
                  className="inline-flex items-center justify-between w-full px-3.5 py-2.5 bg-paper border border-rule text-xs font-mono text-ink font-medium hover:border-ink hover:bg-paper-deep transition-all group-hover:border-ink"
                >
                  <span>Download Free Materials</span>
                  <ArrowDownToLine className="w-3.5 h-3.5 text-accent-dark transition-transform group-hover:translate-y-0.5" />
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-rule p-12 text-center shadow-xs">
            <p className="font-serif text-xl text-ink mb-2">No documents match your query</p>
            <p className="text-xs font-mono text-ink-soft mb-4">
              Try adjusting your search terms or clearing the current category filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="text-xs font-mono px-3.5 py-1.5 bg-ink text-paper font-semibold hover:bg-accent-dark transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Bottom Editorial Callout (White Card) */}
        <div className="mt-14 bg-white border border-rule p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
          <div className="max-w-xl">
            <span className="eyebrow">Contribute Resources</span>
            <h4 className="font-serif text-xl font-normal text-ink mt-1 mb-2">
              Have evidence briefs or lecture slides to contribute?
            </h4>
            <p className="text-xs text-ink-soft leading-relaxed">
              We review submissions from circuit champions, alumni debaters, and university coaches to keep the national novice repository accurate and updated monthly.
            </p>
          </div>
          <a
            href="mailto:elevatethecircuitusa@gmail.com?subject=Resource%20Contribution"
            className="shrink-0 px-4 py-2.5 bg-ink text-paper text-xs font-mono font-medium hover:bg-accent-dark transition-colors border border-ink"
          >
            Submit a Brief or Deck →
          </a>
        </div>
      </div>
    </div>
  );
}
