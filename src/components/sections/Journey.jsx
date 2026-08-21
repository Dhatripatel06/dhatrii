import { Globe } from 'lucide-react'
import { journey } from '@/data/content'
import Reveal from '@/components/ui/Reveal'
import { Stagger, StaggerItem } from '@/components/ui/Stagger'

/**
 * "My journey in Numbers" — an intro card followed by stat tiles whose
 * numerals use the Handjet pixel face, alternating accent and dark like the
 * reference.
 */
export default function Journey() {
  return (
    <section aria-labelledby="journey-heading" className="section">
      <div className="shell">
        {/* Intro card */}
        <Reveal>
          <div className="relative overflow-hidden rounded-card border border-line bg-surface p-8 sm:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/[0.07] blur-3xl"
            />
            <div className="relative flex items-start justify-between gap-6">
              <p className="inline-flex items-center gap-2 text-sm text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                {journey.eyebrow}
              </p>
              <Globe size={22} strokeWidth={1.6} className="shrink-0 text-muted" aria-hidden="true" />
            </div>

            <h2
              id="journey-heading"
              className="relative mt-8 text-[clamp(2.25rem,8vw,3.5rem)] leading-[1.05] tracking-[-0.03em]"
            >
              <span className="font-light">{journey.titleLight} </span>
              <span className="font-bold">{journey.titleBold}</span>
            </h2>

            {/* Note + overlapping avatar stack */}
            <div className="relative mt-8 flex items-center justify-between gap-6">
              <p className="text-sm text-muted">{journey.note}</p>
              <ul className="flex shrink-0 -space-x-3">
                {journey.avatars.map((initials) => (
                  <li
                    key={initials}
                    className="grid h-10 w-10 place-items-center rounded-full border-2 border-surface bg-raised font-display text-[0.7rem] font-bold text-muted"
                  >
                    {initials}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* Two tiles side by side at ~1.8:1, stacking on narrow screens */}
        <Stagger className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-[1.8fr_1fr]">
          {journey.stats.map((stat) => (
            <StaggerItem key={stat.eyebrow}>
              <div
                className={`relative flex h-full flex-col overflow-hidden rounded-card border p-7 sm:p-8 ${
                  stat.featured ? 'border-accent bg-accent text-bg' : 'border-line bg-surface text-text'
                }`}
              >
                <p
                  className={`inline-flex items-center gap-2 text-sm ${
                    stat.featured ? 'text-bg/70' : 'text-muted'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`h-1.5 w-1.5 rounded-full ${stat.featured ? 'bg-bg' : 'bg-accent'}`}
                  />
                  {stat.eyebrow}
                </p>

                <h3 className="mt-4 text-[clamp(1.15rem,2.4vw,1.5rem)] font-bold leading-snug">
                  {stat.title}
                </h3>

                <div className="mt-auto flex items-end justify-between gap-4 pt-10">
                  {/* Dot-grid flourish, bottom-left */}
                  <span
                    aria-hidden="true"
                    className={`h-12 w-24 shrink-0 ${stat.featured ? 'opacity-25' : 'opacity-20'}`}
                    style={{
                      backgroundImage: `radial-gradient(currentColor 1.5px, transparent 1.5px)`,
                      backgroundSize: '10px 10px',
                    }}
                  />
                  <span className="font-pixel text-[clamp(3.5rem,13vw,6rem)] font-bold leading-[0.8] tracking-tight">
                    {stat.value}
                  </span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
