'use client';

import { useState } from 'react';
import { Mail, MapPin, Users, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'High School Student',
    subject: 'Starting a New Chapter',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-paper text-ink pb-20">
      {/* Editorial Header */}
      <section className="hero-focal-cone border-b border-rule py-12 md:py-16">
        <div className="page-wrap">
          <div className="max-w-3xl">
            <span className="eyebrow">Circuit Desk &amp; Inquiries</span>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal text-ink tracking-tight mt-3 mb-4">
              Contact circuit leadership
            </h1>
            <p className="text-ink-soft text-base leading-relaxed">
              Have questions about launching a chapter, obtaining starter curriculums, or booking an upcoming novice clinic? Reach our coordinators directly.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: White Descriptor Cards on Light Purple Background */}
      <div className="page-wrap mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Info Card (White Square) */}
          <div className="lg:col-span-5">
            <div className="bg-white text-ink border border-rule p-7 md:p-8 shadow-xs">
              <span className="font-mono text-[10px] text-accent-dark uppercase tracking-widest font-bold block mb-2">
                Executive Desk
              </span>
              <h3 className="font-serif text-2xl font-normal text-ink mb-3">
                Direct Contact
              </h3>
              <p className="text-xs text-ink-soft leading-relaxed mb-6">
                Elevate the Circuit is spearheaded by experienced forensics competitors and educators committed to opening doors for every student across the circuit.
              </p>

              <div className="space-y-4 text-xs font-mono border-t border-rule pt-5">
                <div>
                  <span className="text-[10px] uppercase text-ink-soft block mb-1 flex items-center gap-1.5">
                    <Mail className="w-3 h-3 text-accent-dark" />
                    General Inquiries
                  </span>
                  <a
                    href="mailto:elevatethecircuitusa@gmail.com"
                    className="text-ink hover:text-accent-dark transition-colors font-medium underline underline-offset-4 decoration-accent/40 hover:decoration-accent-dark"
                  >
                    elevatethecircuitusa@gmail.com
                  </a>
                </div>

                <div>
                  <span className="text-[10px] uppercase text-ink-soft block mb-1 flex items-center gap-1.5">
                    <Users className="w-3 h-3 text-accent-dark" />
                    Circuit Directors
                  </span>
                  <span className="text-ink font-medium">Derin Gulkanat &amp; Ishan Saha</span>
                </div>

                <div>
                  <span className="text-[10px] uppercase text-ink-soft block mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-accent-dark" />
                    Regional Headquarters
                  </span>
                  <span className="text-ink-soft">Charlotte, NC • National Initiative</span>
                </div>

                <div>
                  <span className="text-[10px] uppercase text-ink-soft block mb-1 flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-accent-dark" />
                    Response Window
                  </span>
                  <span className="text-ink-soft">Within 24 Hours</span>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-rule flex items-center justify-between text-[11px] font-mono text-ink-soft">
                <span>Verified Non-Profit Initiative</span>
                <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
              </div>
            </div>
          </div>

          {/* Right Column: Direct Dispatch Message Form (White Card) */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-rule p-7 md:p-8 shadow-xs">
              <div className="mb-6 pb-3 border-b border-rule">
                <span className="eyebrow">Direct Dispatch</span>
                <h3 className="font-serif text-2xl font-normal text-ink mt-1">
                  Send a Message
                </h3>
              </div>

              {submitted ? (
                <div className="p-6 bg-paper border border-rule text-center space-y-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="font-serif text-xl text-ink">Message Transmitted</h4>
                  <p className="text-xs text-ink-soft max-w-md mx-auto leading-relaxed">
                    Thank you, {formData.name || 'Debater'}! Your inquiry regarding “{formData.subject}” has been forwarded to circuit directors. We will respond to {formData.email} within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', role: 'High School Student', subject: 'Starting a New Chapter', message: '' });
                    }}
                    className="mt-4 px-4 py-2 border border-rule text-xs font-mono text-ink hover:bg-paper-deep transition-colors"
                  >
                    Send Another Dispatch
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-ink-soft mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Jordan Smith"
                        className="w-full bg-paper border border-rule px-3.5 py-2.5 text-xs font-mono text-ink placeholder:text-ink-soft/60 focus:border-ink focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-ink-soft mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jordan@school.edu"
                        className="w-full bg-paper border border-rule px-3.5 py-2.5 text-xs font-mono text-ink placeholder:text-ink-soft/60 focus:border-ink focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-ink-soft mb-1.5">
                        Who Are You? *
                      </label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full bg-paper border border-rule px-3.5 py-2.5 text-xs font-mono text-ink focus:border-ink focus:outline-none transition-colors cursor-pointer"
                      >
                        <option value="High School Student">High School Student</option>
                        <option value="Middle School Student">Middle School Student</option>
                        <option value="Teacher / Faculty">Teacher / Faculty</option>
                        <option value="Parent">Parent</option>
                        <option value="Volunteer Coach / Judge">Volunteer Coach / Judge</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-ink-soft mb-1.5">
                        Topic / Reason *
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-paper border border-rule px-3.5 py-2.5 text-xs font-mono text-ink focus:border-ink focus:outline-none transition-colors cursor-pointer"
                      >
                        <option value="Starting a New Chapter">Starting a New Chapter</option>
                        <option value="Curriculum & Kit Request">Curriculum &amp; Resources Inquiry</option>
                        <option value="Volunteering as a Judge / Coach">Volunteering as a Judge / Coach</option>
                        <option value="Practice Scrimmage Request">Practice Scrimmage Request</option>
                        <option value="School / District Partnership">School / District Partnership</option>
                        <option value="General Question">General Question</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-ink-soft mb-1.5">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can we help your school or debate team? Mention your school and city..."
                      className="w-full bg-paper border border-rule p-3 text-xs font-mono text-ink placeholder:text-ink-soft/60 focus:border-ink focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <p className="text-[11px] font-mono text-ink-soft">
                      Directors respond within 24 hours.
                    </p>
                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-ink text-paper text-xs font-mono font-semibold uppercase tracking-wider hover:bg-accent-dark transition-colors border border-ink"
                    >
                      <span>Send Message</span>
                      <Send size={13} />
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="mt-6 bg-white border border-rule p-5 flex items-center justify-between shadow-xs">
              <div>
                <p className="font-serif text-base text-ink">Prefer a live conversation?</p>
                <p className="text-xs font-mono text-ink-soft">Book a 15-minute introductory call with Ishan or Derin.</p>
              </div>
              <a
                href="mailto:elevatethecircuitusa@gmail.com?subject=Briefing%20Call%20Request"
                className="px-3.5 py-2 bg-ink text-paper text-xs font-mono hover:bg-accent-dark transition-colors border border-ink"
              >
                Schedule Call &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
