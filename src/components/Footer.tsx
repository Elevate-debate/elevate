import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-rule bg-ink text-paper">
      <div className="page-wrap py-16">
        <div className="grid gap-12 pb-14 border-b border-paper/15 md:grid-cols-12">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center border border-paper/30 bg-paper/10 font-serif text-base text-paper">
                E
              </span>
              <span className="font-serif text-2xl font-semibold tracking-[-0.03em] text-paper">
                Elevate the Circuit
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-paper/70">
              A student-founded forensics initiative providing turnkey curriculum, practice scrimmage resources, and mentorship to build lasting speech & debate teams across public schools.
            </p>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#e9b8aa]">
              100% Free · Public Education Initiative
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 md:col-span-3">
            <h4 className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-paper/50">
              The Circuit
            </h4>
            <ul className="space-y-2.5 text-sm text-paper/80">
              <li>
                <Link href="/" className="transition-colors hover:text-paper">
                  The Desk & Overview
                </Link>
              </li>
              <li>
                <Link href="/chapter-tracker" className="transition-colors hover:text-paper">
                  Chapter Directory
                </Link>
              </li>
              <li>
                <Link href="/resources" className="transition-colors hover:text-paper">
                  Curriculum & Evidence Library
                </Link>
              </li>
              <li>
                <Link href="/get-involved" className="transition-colors hover:text-paper">
                  Start a Chapter
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Inquiries & Coordinators */}
          <div className="space-y-3 md:col-span-4">
            <h4 className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-paper/50">
              Direct Contact
            </h4>
            <p className="text-sm leading-relaxed text-paper/70">
              Questions about launching a team, booking a coaching clinic, or judge coverage?
            </p>
            <a
              href="mailto:elevatethecircuitusa@gmail.com"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#e9b8aa] hover:text-paper transition-colors"
            >
              elevatethecircuitusa@gmail.com <ArrowUpRight size={14} />
            </a>
            <div className="pt-2 font-mono text-[11px] text-paper/60">
              Coordinators: Derin Gulkanat & Ishan Saha
              <span className="block text-[10px] text-paper/40 mt-0.5">Charlotte, NC · National Network</span>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-paper/50 gap-4 font-mono">
          <p>© {new Date().getFullYear()} Elevate the Circuit. All rights reserved.</p>
          <p className="text-[11px] text-paper/40">Newsreader · Plus Jakarta Sans · Space Grotesk</p>
        </div>
      </div>
    </footer>
  );
}

