import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { ResolutionItem } from '@/types/database';

export default function ResolutionDocket() {
  const resolutions: ResolutionItem[] = [
    {
      event: 'Public Forum (PF)',
      code: 'PF-2026',
      title: 'Arctic military & geopolitical posture',
      quote: 'Resolved: The United States federal government should substantially increase its military presence in the Arctic.',
      description: '2v2 team debate on sovereignty, NATO treaties, polar shipping channels, and ecological preservation.',
    },
    {
      event: 'Lincoln-Douglas (LD)',
      code: 'LD-2026',
      title: 'Wealth taxation & distributive justice',
      quote: 'Resolved: The United States ought to adopt a wealth tax to remediate systemic economic inequality.',
      description: '1v1 philosophical clash grounding deontological rights, Rawlsian fairness, and constitutional tax authority.',
    },
    {
      event: 'Congressional & Oratory',
      code: 'CONG-01',
      title: 'Civic discourse & legislative simulation',
      quote: 'Bills on artificial intelligence governance, rural health subsidies, and student mental health resources.',
      description: 'Chamber debate with formal parliamentary procedure and original persuasive speeches.',
    },
  ];

  return (
    <section className="border-y border-rule bg-paper py-16 text-ink">
      <div className="page-wrap">
        <div className="mb-10 flex flex-col gap-4 border-b border-rule pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-accent-dark">The current docket</p>
            <h2 className="mt-2 max-w-2xl font-serif text-4xl leading-[0.98] tracking-[-0.03em] sm:text-5xl text-ink">What the circuit is thinking about.</h2>
          </div>
          <Link href="/resources#topics" className="editorial-link shrink-0 text-sm text-accent-dark hover:text-ink">
            Read the evidence packs <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {resolutions.map((res) => (
            <article key={res.code} className="bg-white border border-rule p-7 flex flex-col justify-between shadow-xs hover:border-ink transition-colors">
              <div>
                <div className="mb-5 flex items-center justify-between gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-accent-dark">
                  <span>{res.event}</span>
                  <span className="text-ink-soft/60">{res.code}</span>
                </div>
                <h3 className="mb-3 font-serif text-2xl leading-tight text-ink">{res.title}</h3>
                <p className="mb-4 font-serif text-base italic leading-snug text-ink-soft">“{res.quote}”</p>
              </div>
              <p className="pt-4 border-t border-rule text-xs leading-relaxed text-ink-soft">{res.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
