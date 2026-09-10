import Link from 'next/link'
import { Rocket, Store, TrendingUp, Globe } from 'lucide-react'

import { about, experience, profile, services, whatsappHref } from '@/data/content'
import JsonLd from '@/components/JsonLd'
import { buildMetadata } from '@/lib/seo'
import { personSchema } from '@/lib/schema'
import ArrowButton from '@/components/ui/ArrowButton'
import Reveal from '@/components/ui/Reveal'
import SmartImage from '@/components/ui/SmartImage'
import TwoTone from '@/components/ui/TwoTone'

export const metadata = buildMetadata({
  title: about.meta.title,
  description: about.meta.description,
  path: '/about',
  type: 'profile',
})

const AUDIENCE_ICONS = { Rocket, Store, TrendingUp }

/**
 * A client-facing introduction rather than a CV: who I build for, how a project
 * actually runs, and what you get. The career entries appear once, near the
 * end, as context — not as the spine of the page.
 *
 * Server component; nothing here needs state.
 */
export default function AboutPage() {
  return (
    <>
      {/* Same @id as the home page's Person, so the two describe one entity. */}
      <JsonLd schema={personSchema()} />

      {/* ------------------------------------------------------------ Intro */}
      <section className="section pt-36 sm:pt-44" aria-labelledby="about-heading">
        <div className="shell">
          <Reveal className="flex justify-center">
            <p className="text-xs uppercase tracking-[0.22em] text-muted">{about.eyebrow}</p>
          </Reveal>

          <TwoTone
            id="about-heading"
            as="h1"
            className="mt-5"
            light={about.titleLight}
            bold={about.titleBold}
            lede={about.lede}
          />

          {/* Portrait + opening paragraphs. The image is deliberately small:
              this page is about the work, not a profile photo. */}
          <Reveal delay={0.08} className="mt-14">
            <div className="rounded-card border border-line bg-surface p-7 shadow-card sm:p-10">
              <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-line sm:h-24 sm:w-24">
                  <SmartImage
                    src={profile.portrait}
                    alt={`Portrait of ${profile.name}`}
                    label=""
                    tint="accent"
                    sizes="96px"
                    className="h-full w-full object-cover object-[center_25%]"
                  />
                </div>
                <div>
                  <p className="font-display text-xl font-bold tracking-[-0.02em]">
                    {profile.name}
                  </p>
                  <p className="mt-1 text-sm text-muted">{profile.role}</p>
                  <p className="mt-0.5 text-sm text-muted">{profile.location}</p>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-5 border-t border-line pt-8">
                {about.intro.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="text-pretty leading-relaxed text-text/85">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------- Audience */}
      <section className="section pt-0" aria-labelledby="audience-heading">
        <div className="shell">
          <Reveal>
            <h2
              id="audience-heading"
              className="text-[clamp(1.875rem,6vw,2.75rem)] font-bold leading-[1.05] tracking-[-0.03em]"
            >
              {about.audience.title}
            </h2>
            <p className="mt-4 text-pretty text-muted">{about.audience.lede}</p>
          </Reveal>

          <ul className="mt-8 flex flex-col gap-4">
            {about.audience.groups.map((group, index) => {
              const Icon = AUDIENCE_ICONS[group.icon] ?? Rocket
              return (
                <li key={group.name}>
                  <Reveal delay={index * 0.06}>
                    <div className="flex items-start gap-5 rounded-card border border-line bg-surface p-6 sm:p-8">
                      <span
                        aria-hidden="true"
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-line bg-bg/60 text-accent"
                      >
                        <Icon size={19} strokeWidth={1.8} />
                      </span>
                      <div>
                        <h3 className="font-display text-lg font-bold tracking-[-0.02em]">
                          {group.name}
                        </h3>
                        <p className="mt-2 text-pretty text-muted">{group.body}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              )
            })}
          </ul>

          <Reveal delay={0.1} className="mt-4">
            <div className="flex items-start gap-5 rounded-card border border-accent/35 bg-accent/[0.04] p-6 sm:p-8">
              <span
                aria-hidden="true"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-accent/40 bg-bg/60 text-accent"
              >
                <Globe size={19} strokeWidth={1.8} />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold tracking-[-0.02em]">
                  {about.audience.remote.title}
                </h3>
                <p className="mt-2 text-pretty text-muted">{about.audience.remote.body}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- Working */}
      <section className="section pt-0" aria-labelledby="working-heading">
        <div className="shell">
          <Reveal>
            <h2
              id="working-heading"
              className="text-[clamp(1.875rem,6vw,2.75rem)] font-bold leading-[1.05] tracking-[-0.03em]"
            >
              {about.working.title}
            </h2>
          </Reveal>

          {/* Hairlines rather than boxes — these are five short statements, and
              five more cards in a row would read as noise. */}
          <ul className="mt-8 flex flex-col">
            {about.working.points.map((point, index) => (
              <li key={point.title}>
                <Reveal delay={index * 0.05}>
                  <div className="border-t border-line py-7">
                    <h3 className="font-display text-lg font-bold tracking-[-0.02em]">
                      {point.title}
                    </h3>
                    <p className="mt-2.5 text-pretty leading-relaxed text-muted">{point.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------------- Process */}
      <section className="section pt-0" aria-labelledby="process-heading">
        <div className="shell">
          <Reveal>
            <h2
              id="process-heading"
              className="text-[clamp(1.875rem,6vw,2.75rem)] font-bold leading-[1.05] tracking-[-0.03em]"
            >
              {about.process.title}
            </h2>
            <p className="mt-4 text-pretty text-muted">{about.process.lede}</p>
          </Reveal>

          <ol className="mt-8 flex flex-col gap-4">
            {about.process.steps.map((step, index) => (
              <li key={step.number}>
                <Reveal delay={index * 0.05}>
                  <div className="flex gap-5 rounded-card border border-line bg-surface p-6 sm:gap-6 sm:p-8">
                    <span
                      aria-hidden="true"
                      className="font-pixel text-3xl font-bold leading-none text-accent sm:text-4xl"
                    >
                      {step.number}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-bold tracking-[-0.02em]">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-pretty text-muted">{step.body}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------------------ Stack */}
      <section className="section pt-0" aria-labelledby="stack-heading">
        <div className="shell">
          <Reveal>
            <h2
              id="stack-heading"
              className="text-[clamp(1.875rem,6vw,2.75rem)] font-bold leading-[1.05] tracking-[-0.03em]"
            >
              {about.stack.title}
            </h2>
            <p className="mt-4 text-pretty text-muted">{about.stack.lede}</p>
          </Reveal>

          <ul className="mt-8 flex flex-col gap-4">
            {about.stack.groups.map((group, index) => (
              <li key={group.name}>
                <Reveal delay={index * 0.04}>
                  <div className="rounded-card border border-line bg-surface p-6 sm:p-7">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="font-display text-lg font-bold tracking-[-0.02em]">
                        {group.name}
                      </h3>
                      <p className="text-sm text-accent">{group.tools}</p>
                    </div>
                    <p className="mt-3 text-pretty text-muted">{group.why}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------- Experience */}
      <section className="section pt-0" aria-labelledby="experience-heading">
        <div className="shell">
          <Reveal>
            <h2
              id="experience-heading"
              className="text-[clamp(1.875rem,6vw,2.75rem)] font-bold leading-[1.05] tracking-[-0.03em]"
            >
              {about.experienceIntro.title}
            </h2>
            <p className="mt-4 text-pretty text-muted">{about.experienceIntro.lede}</p>
          </Reveal>

          {/* Listed plainly here. The home page carries the animated arc; a
              second copy of that interaction would add nothing. */}
          <ul className="mt-8 flex flex-col">
            {experience.entries.map((entry, index) => (
              <li key={`${entry.title}-${entry.company}`}>
                <Reveal delay={index * 0.05}>
                  <div className="flex flex-col gap-1 border-t border-line py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <div>
                      <p className="font-display font-bold tracking-[-0.02em]">{entry.title}</p>
                      <p className="mt-1 text-sm text-muted">
                        {entry.company} · {entry.location}
                      </p>
                    </div>
                    <p className="shrink-0 text-sm text-accent sm:text-right">{entry.period}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* -------------------------------------------------------------- CTA */}
      <section className="section pt-0">
        <div className="shell">
          <Reveal className="rounded-card border border-line bg-surface p-9 text-center shadow-card sm:p-12">
            <h2 className="text-[clamp(1.875rem,6vw,2.75rem)] leading-[1.05] tracking-[-0.03em]">
              <span className="font-light">{about.cta.titleLight} </span>
              <span className="font-bold">{about.cta.titleBold}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-pretty text-muted">{about.cta.lede}</p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <ArrowButton href="/#contact">Start a Project</ArrowButton>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-full border border-line bg-white/[0.03] px-7 py-4 font-medium text-text transition-colors duration-300 hover:bg-white/[0.08]"
              >
                View My Work
              </Link>
            </div>

            <p className="mt-7 text-sm text-muted">
              Prefer to just ask something first?{' '}
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline font-medium text-accent"
              >
                Message me on WhatsApp
              </a>{' '}
              or see{' '}
              <Link href={services.cta.href} className="link-underline font-medium text-accent">
                what I build
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
