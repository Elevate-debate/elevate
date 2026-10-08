'use client';

import { useState } from 'react';
import { createChapter } from '@/lib/supabase/client';
import type { Chapter } from '@/types/database';
import { X } from 'lucide-react';

interface RegisterChapterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChapterAdded: (newChapter: Chapter) => void;
}

export default function RegisterChapterModal({
  isOpen,
  onClose,
  onChapterAdded,
}: RegisterChapterModalProps) {
  const [formData, setFormData] = useState({
    chapter_name: '',
    school_name: '',
    city: '',
    state: 'NC',
    school_type: 'High School' as 'High School' | 'Middle School' | 'Combined',
    status: 'Active' as 'Active' | 'Launching Soon' | 'In Formation',
    students_count: 15,
    events_offered: 'Public Forum, Lincoln Douglas, Original Oratory',
    student_lead_name: '',
    contact_email: '',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const events = formData.events_offered
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const created = await createChapter({
        chapter_name: formData.chapter_name,
        school_name: formData.school_name,
        city: formData.city,
        state: formData.state.toUpperCase(),
        school_type: formData.school_type,
        status: formData.status,
        students_count: Number(formData.students_count) || 10,
        events_offered: events,
        student_lead_name: formData.student_lead_name,
        contact_email: formData.contact_email || 'elevatethecircuitusa@gmail.com',
        notes: formData.notes,
        year_founded: new Date().getFullYear(),
      });

      onChapterAdded(created);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Could not register chapter');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-ink/75 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white border border-rule shadow-editorial w-full max-w-xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-ink-soft hover:text-ink p-1 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="border-b border-rule pb-5 mb-5">
          <span className="eyebrow">National Circuit Directory</span>
          <h3 className="font-serif text-2xl font-normal text-ink mt-2 mb-1">
            Register a Speech &amp; Debate Chapter
          </h3>
          <p className="text-xs text-ink-soft leading-relaxed">
            Enrolls your school chapter into the national ledger and unlocks curriculum and starter kit materials.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-paper border border-rule text-accent-dark text-xs font-mono">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-ink-soft mb-1.5">
                Chapter Name *
              </label>
              <input
                type="text"
                required
                value={formData.chapter_name}
                onChange={(e) => setFormData({ ...formData, chapter_name: e.target.value })}
                placeholder="e.g. Westview Debate Society"
                className="w-full bg-paper border border-rule px-3.5 py-2.5 text-xs font-mono text-ink placeholder:text-ink-soft/60 focus:border-ink focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-ink-soft mb-1.5">
                School / Consortium *
              </label>
              <input
                type="text"
                required
                value={formData.school_name}
                onChange={(e) => setFormData({ ...formData, school_name: e.target.value })}
                placeholder="e.g. Westview High School"
                className="w-full bg-paper border border-rule px-3.5 py-2.5 text-xs font-mono text-ink placeholder:text-ink-soft/60 focus:border-ink focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-ink-soft mb-1.5">
                City *
              </label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="Charlotte"
                className="w-full bg-paper border border-rule px-3.5 py-2.5 text-xs font-mono text-ink placeholder:text-ink-soft/60 focus:border-ink focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-ink-soft mb-1.5">
                State (2 letters) *
              </label>
              <input
                type="text"
                required
                maxLength={2}
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value.toUpperCase() })}
                placeholder="NC"
                className="w-full bg-paper border border-rule px-3.5 py-2.5 text-xs font-mono text-ink uppercase focus:border-ink focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-ink-soft mb-1.5">
                Level
              </label>
              <select
                value={formData.school_type}
                onChange={(e: any) => setFormData({ ...formData, school_type: e.target.value })}
                className="w-full bg-paper border border-rule px-3.5 py-2.5 text-xs font-mono text-ink focus:border-ink focus:outline-none transition-colors cursor-pointer"
              >
                <option value="High School">High School</option>
                <option value="Middle School">Middle School</option>
                <option value="Combined">Combined</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-ink-soft mb-1.5">
                Estimated Students
              </label>
              <input
                type="number"
                min="1"
                value={formData.students_count}
                onChange={(e) => setFormData({ ...formData, students_count: Number(e.target.value) })}
                className="w-full bg-paper border border-rule px-3.5 py-2.5 text-xs font-mono text-ink focus:border-ink focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-ink-soft mb-1.5">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e: any) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-paper border border-rule px-3.5 py-2.5 text-xs font-mono text-ink focus:border-ink focus:outline-none transition-colors cursor-pointer"
              >
                <option value="Active">Active</option>
                <option value="Launching Soon">Launching Soon</option>
                <option value="In Formation">In Formation</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-ink-soft mb-1.5">
              Forensics Events Offered
            </label>
            <input
              type="text"
              value={formData.events_offered}
              onChange={(e) => setFormData({ ...formData, events_offered: e.target.value })}
              placeholder="Public Forum, Lincoln Douglas, Original Oratory, Congress"
              className="w-full bg-paper border border-rule px-3.5 py-2.5 text-xs font-mono text-ink placeholder:text-ink-soft/60 focus:border-ink focus:outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-ink-soft mb-1.5">
                Student Leader Name
              </label>
              <input
                type="text"
                value={formData.student_lead_name}
                onChange={(e) => setFormData({ ...formData, student_lead_name: e.target.value })}
                placeholder="e.g. Jordan Lee"
                className="w-full bg-paper border border-rule px-3.5 py-2.5 text-xs font-mono text-ink placeholder:text-ink-soft/60 focus:border-ink focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-ink-soft mb-1.5">
                Contact Email *
              </label>
              <input
                type="email"
                required
                value={formData.contact_email}
                onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                placeholder="founder@school.edu"
                className="w-full bg-paper border border-rule px-3.5 py-2.5 text-xs font-mono text-ink placeholder:text-ink-soft/60 focus:border-ink focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="flex justify-end items-center gap-3 pt-4 border-t border-rule">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-rule text-xs font-mono text-ink hover:bg-paper-deep transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-accent text-paper font-mono text-xs uppercase tracking-wider font-semibold hover:bg-accent-dark transition-colors border border-accent disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Register Chapter to Ledger →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
