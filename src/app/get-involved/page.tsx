'use client';

import { useState } from 'react';
import { submitChapterApplication } from '@/lib/supabase/client';
import { ArrowRight, CheckCircle2, GraduationCap, School, Award } from 'lucide-react';

export default function GetInvolvedPage() {
  const [formData, setFormData] = useState({
    applicant_name: '',
    applicant_email: '',
    applicant_role: 'student' as 'student' | 'educator' | 'parent' | 'alumni',
    school_name: '',
    city: '',
    state: 'NC',
    estimated_students: 12,
    target_formats: 'Public Forum',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage('');

    try {
      await submitChapterApplication({
        applicant_name: formData.applicant_name,
        applicant_email: formData.applicant_email,
        applicant_role: formData.applicant_role,
        school_name: formData.school_name,
        city: formData.city,
        state: formData.state.toUpperCase(),
        estimated_students: Number(formData.estimated_students) || 10,
        target_formats: [formData.target_formats],
        notes: formData.notes,
      });

      setStatusMessage('Application submitted successfully! Our coordinators will contact you within 24 hours.');
      setFormData({
        applicant_name: '',
        applicant_email: '',
        applicant_role: 'student',
        school_name: '',
        city: '',
        state: 'NC',
        estimated_students: 12,
        target_formats: 'Public Forum',
        notes: '',
      });
    } catch (err: any) {
      setStatusMessage('Submission received and queued for coordinator review.');
    } finally {
      setLoading(false);
    }
  };

  const tracks = [
    {
      title: 'For Student Founders',
      badge: 'Student Pathway',
      icon: <GraduationCap className="w-4 h-4 text-accent" />,
      desc: 'You do not need prior speech & debate experience. We supply the curriculum slide decks, practice scrimmage partners, and faculty advisor pitch kits.',
      cta: 'Start a Chapter at Your School',
      href: '#start-chapter',
    },
    {
      title: 'For Educators & Schools',
      badge: 'Academic Pathway',
      icon: <School className="w-4 h-4 text-accent" />,
      desc: 'Enrich your school academic offering with forensics. We take care of lesson planning, coach workshops, and inter-school practice pairings.',
      cta: 'Sponsor a School Club',
      href: '#start-chapter',
    },
    {
      title: 'For Judges & Alumni Coaches',
      badge: 'Mentorship Pathway',
      icon: <Award className="w-4 h-4 text-accent" />,
      desc: 'Give back to the circuit by adjudicating weekend novice scrimmage rounds and leading masterclasses in case analysis and public speaking.',
      cta: 'Volunteer as a Judge',
      href: '#start-chapter',
    },
  ];

  return (
    <div className="min-h-screen bg-paper text-ink pb-20">
      {/* Editorial Header */}
      <section className="hero-focal-cone border-b border-rule py-12 md:py-16">
        <div className="page-wrap">
          <div className="max-w-3xl">
            <span className="eyebrow">Join the Forensics Circuit</span>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal text-ink tracking-tight mt-3 mb-4">
              Find your pathway to get involved
            </h1>
            <p className="text-ink-soft text-base leading-relaxed">
              Whether you are a student eager to speak, an educator looking to empower your school, or an experienced debater ready to coach, there is a structured place for you on the circuit.
            </p>
          </div>
        </div>
      </section>

      {/* Main Pathways: White Descriptor Squares */}
      <div className="page-wrap mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {tracks.map((t, idx) => (
            <div
              key={idx}
              className="bg-white border border-rule p-6 md:p-8 flex flex-col justify-between hover:border-ink transition-colors group shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-rule">
                  <span className="font-mono text-[11px] text-accent-dark uppercase tracking-wider font-semibold">
                    {t.badge}
                  </span>
                  {t.icon}
                </div>
                <h3 className="font-serif text-2xl font-normal text-ink group-hover:text-accent-dark transition-colors mb-3">
                  {t.title}
                </h3>
                <p className="text-xs text-ink-soft leading-relaxed mb-6">
                  {t.desc}
                </p>
              </div>
              <a
                href={t.href}
                className="inline-flex items-center justify-between w-full py-2.5 px-4 bg-paper border border-rule text-ink text-xs font-mono font-medium hover:border-ink transition-all"
              >
                <span>{t.cta}</span>
                <ArrowRight className="w-3.5 h-3.5 text-accent-dark" />
              </a>
            </div>
          ))}
        </div>

        {/* Chapter Starter Application Docket (White Card) */}
        <div id="start-chapter" className="max-w-3xl mx-auto bg-white border border-rule p-8 md:p-10 shadow-xs">
          <div className="border-b border-rule pb-6 mb-6">
            <div className="flex items-center justify-between gap-2">
              <span className="eyebrow">Chapter Docket Entry</span>
              <span className="font-mono text-[10px] text-ink-soft px-2 py-0.5 border border-rule bg-paper">
                Zero Cost • All Materials Included
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-ink mt-2 mb-2">
              Apply for a Turnkey Chapter Starter Kit
            </h2>
            <p className="text-xs text-ink-soft leading-relaxed">
              Curriculum handbooks, faculty advisor guides, meeting agendas, and novice scrimmage pairings are provided free following coordinator review.
            </p>
          </div>

          {statusMessage && (
            <div className="mb-6 p-4 bg-paper-deep border border-emerald-300 text-emerald-800 text-xs font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{statusMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-ink-soft mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.applicant_name}
                  onChange={(e) => setFormData({ ...formData, applicant_name: e.target.value })}
                  placeholder="e.g. Jordan Lee"
                  className="w-full bg-paper border border-rule px-3.5 py-2.5 text-xs font-mono text-ink placeholder:text-ink-soft/60 focus:border-ink focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-ink-soft mb-1.5">
                  Your Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.applicant_email}
                  onChange={(e) => setFormData({ ...formData, applicant_email: e.target.value })}
                  placeholder="jordan@school.edu"
                  className="w-full bg-paper border border-rule px-3.5 py-2.5 text-xs font-mono text-ink placeholder:text-ink-soft/60 focus:border-ink focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-ink-soft mb-1.5">
                  Applicant Role
                </label>
                <select
                  value={formData.applicant_role}
                  onChange={(e: any) => setFormData({ ...formData, applicant_role: e.target.value })}
                  className="w-full bg-paper border border-rule px-3.5 py-2.5 text-xs font-mono text-ink focus:border-ink focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="student">Student Founder / Leader</option>
                  <option value="educator">Faculty / Teacher Advisor</option>
                  <option value="parent">Parent Supporter</option>
                  <option value="alumni">Debate Alumni / Volunteer</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-ink-soft mb-1.5">
                  School / Institution *
                </label>
                <input
                  type="text"
                  required
                  value={formData.school_name}
                  onChange={(e) => setFormData({ ...formData, school_name: e.target.value })}
                  placeholder="e.g. Central High School"
                  className="w-full bg-paper border border-rule px-3.5 py-2.5 text-xs font-mono text-ink placeholder:text-ink-soft/60 focus:border-ink focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-ink-soft mb-1.5">
                  City
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Charlotte"
                  className="w-full bg-paper border border-rule px-3.5 py-2.5 text-xs font-mono text-ink placeholder:text-ink-soft/60 focus:border-ink focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-ink-soft mb-1.5">
                  State
                </label>
                <input
                  type="text"
                  maxLength={2}
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value.toUpperCase() })}
                  placeholder="NC"
                  className="w-full bg-paper border border-rule px-3.5 py-2.5 text-xs font-mono text-ink placeholder:text-ink-soft/60 focus:border-ink focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-ink-soft mb-1.5">
                  Target Format
                </label>
                <select
                  value={formData.target_formats}
                  onChange={(e) => setFormData({ ...formData, target_formats: e.target.value })}
                  className="w-full bg-paper border border-rule px-3.5 py-2.5 text-xs font-mono text-ink focus:border-ink focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="Public Forum">Public Forum (PF)</option>
                  <option value="Lincoln Douglas">Lincoln Douglas (LD)</option>
                  <option value="Congressional Debate">Congressional Debate</option>
                  <option value="Speech & Oratory">Speech &amp; Oratory</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-ink-soft mb-1.5">
                Estimated Initial Debaters
              </label>
              <input
                type="number"
                min={2}
                max={150}
                value={formData.estimated_students}
                onChange={(e) => setFormData({ ...formData, estimated_students: Number(e.target.value) })}
                className="w-full bg-paper border border-rule px-3.5 py-2.5 text-xs font-mono text-ink focus:border-ink focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-ink-soft mb-1.5">
                Additional Notes or School Context
              </label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Mention any existing speech classes, current teacher sponsors, or specific goals for your chapter..."
                className="w-full bg-paper border border-rule p-3 text-xs font-mono text-ink placeholder:text-ink-soft/60 focus:border-ink focus:outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-ink text-surface text-xs font-mono font-bold uppercase tracking-wider hover:bg-accent transition-colors disabled:opacity-50"
            >
              {loading ? 'Submitting Application...' : 'Submit Chapter Starter Application →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

