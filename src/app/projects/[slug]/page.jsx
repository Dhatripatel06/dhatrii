import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

import { publishedProjects, projectPage, services } from '@/data/content'
import ArrowButton from '@/components/ui/ArrowButton'
import Reveal from '@/components/ui/Reveal'
import SmartImage from '@/components/ui/SmartImage'
import JsonLd from '@/components/JsonLd'
import { buildMetadata } from '@/lib/seo'
import { projectBreadcrumb, projectSchema } from '@/lib/schema'

/* Statically generated at build time — the set of case studies only changes
   when content.js does. */
export function generateStaticParams() {
  return publishedProjects.map(({ slug }) => ({ slug }))
}

/* Draft entries are not reachable: an unpublished slug is never pre-rendered
   and never resolves here, so /projects/<draft> 404s like any unknown path. */
const findProject = (slug) => publishedProjects.find((project) => project.slug === slug)

export async function generateMetadata({ params }) {
  const { slug } = await params
  const project = findProject(slug)
  if (!project) return {}

  /* "JobZee — Full-Stack Job Portal | Dhatri Patel". The descriptor is written
     out per project rather than derived from the lowercase tag line, which
     capitalised to "Ai mental health companion" and "Smart agriculture iot". */
  const title = `${project.title} — ${project.seoDescriptor} | Dhatri Patel`

  /* A project without a cover file must not declare an empty og:image — that
     is what shipped a null URL for LearnNova. Omitting the key entirely lets
     the generated card from app/opengraph-image.js be inherited instead. */
  const images = project.image ? [{ url: project.image, alt: `${project.title} cover` }] : undefined

  return buildMetadata({
    title,
    description: project.detail.lede,
    path: `/projects/${project.slug}`,
    type: 'article',
    images,
  })
}

export default async function ProjectPage({ params }) {
  const { slug } = await params
  const project = findProject(slug)
  if (!project) notFound()

  const { detail } = project
  const index = publishedProjects.findIndex((item) => item.slug === project.slug)
  const next = publishedProjects[(index + 1) % publishedProjects.length]

  /* Two sibling case studies and the service this work belongs to — the
     internal links every project page owes the rest of the site. */
  const related = project.related
    .map((slug) => publishedProjects.find((item) => item.slug === slug))
    .filter(Boolean)
  const service = services.items.find((item) => item.key === project.serviceKey)

  return (
    <>
      <JsonLd schema={[projectSchema(project), projectBreadcrumb(project)]} />

      {/* ------------------------------------------------------------ hero */}
      <section className="section pb-0 pt-36 sm:pt-44" aria-labelledby="project-heading">
        <div className="shell">
          <Reveal>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-sm text-muted transition-colors duration-300 hover:text-accent"
            >
              <ArrowLeft
                size={16}
                strokeWidth={2}
                aria-hidden="true"
                className="transition-transform duration-300 motion-safe:group-hover:-translate-x-0.5"
              />
              {projectPage.backLabel}
            </Link>
          </Reveal>

          <Reveal delay={0.05} className="mt-8 text-center">
            <p className="text-xs uppercase tracking-[0.22em] text-muted">{project.tags}</p>
            <h1
              id="project-heading"
              className="mt-5 text-[clamp(2.5rem,9vw,4rem)] font-bold leading-[1.05] tracking-[-0.03em]"
            >
              {project.title}
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-pretty text-muted">{detail.lede}</p>
          </Reveal>

          {detail.links?.length > 0 && (
            <Reveal delay={0.1} className="mt-8 flex flex-wrap justify-center gap-3">
              {detail.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-5 py-2.5 text-sm font-medium transition-colors duration-300 hover:border-accent/40 hover:text-accent"
                >
                  {link.label}
                  <ArrowUpRight
                    size={16}
                    strokeWidth={2.2}
                    aria-hidden="true"
                    className="transition-transform duration-300 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                  />
                </a>
              ))}
            </Reveal>
          )}

          <Reveal
            delay={0.15}
            className="relative mt-12 aspect-[4/3] overflow-hidden rounded-card border border-line bg-surface shadow-card sm:aspect-[16/10]"
          >
            <SmartImage
              src={project.image}
              alt={`${project.title} — ${project.seoDescriptor.toLowerCase()} case study cover`}
              label={project.title}
              tint={project.tint}
              eager
              sizes="(min-width: 736px) 640px, 100vw"
              className="h-full w-full object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------- overview */}
      <section className="section" aria-labelledby="overview-heading">
        <div className="shell">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.22em] text-muted">
              {projectPage.overviewLabel}
            </p>
            <p className="mt-6 text-sm text-accent">{detail.overview.eyebrow}</p>
            <h2
              id="overview-heading"
              className="mt-3 text-[clamp(1.875rem,6vw,2.75rem)] leading-[1.1] tracking-[-0.03em]"
            >
              {detail.overview.heading}
            </h2>
            <p className="mt-5 text-pretty text-muted">{detail.overview.body}</p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------ problem + goal -- */}
      <section className="section pt-0" aria-labelledby="problem-heading">
        <div className="shell grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Reveal className="rounded-card border border-line bg-surface p-7 sm:p-8">
            <h2 id="problem-heading" className="text-xs uppercase tracking-[0.22em] text-muted">
              {projectPage.problemLabel}
            </h2>
            <p className="mt-4 text-pretty leading-relaxed">{detail.problem}</p>
          </Reveal>
          <Reveal delay={0.06} className="rounded-card border border-accent/35 bg-accent/[0.04] p-7 sm:p-8">
            <h2 className="text-xs uppercase tracking-[0.22em] text-muted">
              {projectPage.goalLabel}
            </h2>
            <p className="mt-4 text-pretty leading-relaxed">{detail.goal}</p>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------- process */}
      <section className="section pt-0" aria-labelledby="process-heading">
        <div className="shell">
          <Reveal>
            <h2 id="process-heading" className="text-xs uppercase tracking-[0.22em] text-muted">
              {projectPage.processLabel}
            </h2>
          </Reveal>

          <ol className="mt-8 flex flex-col gap-5">
            {detail.phases.map((phase, phaseIndex) => (
              <li key={phase.label}>
                <Reveal
                  delay={phaseIndex * 0.06}
                  className="rounded-card border border-line bg-surface p-7 shadow-card transition-colors duration-500 hover:border-white/[0.14] sm:p-9"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-pixel text-2xl text-accent">
                      {String(phaseIndex + 1).padStart(2, '0')}
                    </span>
                    <span className="text-xs uppercase tracking-[0.18em] text-muted">
                      {phase.label}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold tracking-tight sm:text-2xl">
                    {phase.title}
                  </h3>
                  <p className="mt-3 text-pretty text-muted">{phase.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* --------------------------------------------------------- details */}
      <section className="section pt-0" aria-labelledby="details-heading">
        <div className="shell">
          <Reveal className="rounded-card border border-line bg-sunken p-7 sm:p-9">
            <h2 id="details-heading" className="text-xs uppercase tracking-[0.22em] text-muted">
              {projectPage.detailsLabel}
            </h2>
            <dl className="mt-6 flex flex-col divide-y divide-line">
              {detail.meta.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col gap-1 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <dt className="text-sm text-muted">{item.label}</dt>
                  <dd className="text-pretty font-medium sm:text-right">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------- features */}
      <section className="section pt-0" aria-labelledby="features-heading">
        <div className="shell">
          <Reveal>
            <h2 id="features-heading" className="text-xs uppercase tracking-[0.22em] text-muted">
              {projectPage.featuresLabel}
            </h2>
          </Reveal>
          <ul className="mt-6 flex flex-col gap-3">
            {detail.features.map((feature, featureIndex) => (
              <li key={feature}>
                <Reveal delay={featureIndex * 0.04} className="flex items-start gap-3 text-pretty">
                  <span
                    aria-hidden="true"
                    className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-accent"
                  />
                  {feature}
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------ challenges */}
      <section className="section pt-0" aria-labelledby="challenges-heading">
        <div className="shell">
          <Reveal>
            <h2 id="challenges-heading" className="text-xs uppercase tracking-[0.22em] text-muted">
              {projectPage.challengesLabel}
            </h2>
          </Reveal>
          <ul className="mt-6 flex flex-col gap-4">
            {detail.challenges.map((challenge, challengeIndex) => (
              <li key={challenge.title}>
                <Reveal
                  delay={challengeIndex * 0.06}
                  className="rounded-card border border-line bg-surface p-7 sm:p-8"
                >
                  <h3 className="font-display text-lg font-bold tracking-[-0.02em]">
                    {challenge.title}
                  </h3>
                  <p className="mt-3 text-pretty leading-relaxed text-muted">{challenge.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------------- result */}
      <section className="section pt-0" aria-labelledby="result-heading">
        <div className="shell">
          <Reveal className="rounded-card border border-line bg-surface p-9 shadow-card sm:p-12">
            <h2
              id="result-heading"
              className="text-[clamp(1.875rem,6vw,2.75rem)] leading-[1.05] tracking-[-0.03em]"
            >
              <span className="font-light">The </span>
              <span className="font-bold">Result</span>
            </h2>
            <p className="mt-5 text-pretty text-muted">{detail.result.body}</p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------- learned -- */}
      <section className="section pt-0" aria-labelledby="learned-heading">
        <div className="shell">
          <Reveal className="rounded-card border border-line bg-sunken p-7 sm:p-9">
            <h2 id="learned-heading" className="text-xs uppercase tracking-[0.22em] text-muted">
              {projectPage.learnedLabel}
            </h2>
            <p className="mt-4 text-pretty leading-relaxed">{detail.learned}</p>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------- related work -- */}
      <section className="section pt-0" aria-labelledby="related-heading">
        <div className="shell">
          <Reveal>
            <h2 id="related-heading" className="text-xs uppercase tracking-[0.22em] text-muted">
              {projectPage.relatedLabel}
            </h2>
          </Reveal>

          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {related.map((item, relatedIndex) => (
              <li key={item.slug}>
                <Reveal delay={relatedIndex * 0.06}>
                  <Link
                    href={`/projects/${item.slug}`}
                    className="group flex h-full flex-col justify-between gap-5 rounded-card border border-line bg-surface p-6 transition-colors duration-500 hover:border-accent/40 sm:p-7"
                  >
                    <span>
                      <span className="block font-display text-xl font-bold tracking-tight">
                        {item.title}
                      </span>
                      <span className="mt-2 block text-sm text-muted">{item.tags}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                      Read the case study
                      <ArrowUpRight
                        size={15}
                        strokeWidth={2.2}
                        aria-hidden="true"
                        className="transition-transform duration-300 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                      />
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>

          {/* The service this build is an example of — the link that turns a
              case study reader into an enquiry. */}
          {service && (
            <Reveal delay={0.12} className="mt-4">
              <Link
                href="/services"
                className="group flex items-center justify-between gap-6 rounded-card border border-accent/35 bg-accent/[0.04] p-6 transition-colors duration-500 hover:bg-accent/[0.08] sm:p-7"
              >
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-[0.18em] text-muted">
                    {projectPage.serviceLabel}
                  </span>
                  <span className="mt-2 block font-display text-xl font-bold tracking-tight">
                    {service.title}
                  </span>
                </span>
                <ArrowUpRight
                  size={22}
                  strokeWidth={1.8}
                  aria-hidden="true"
                  className="shrink-0 text-accent transition-transform duration-300 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                />
              </Link>
            </Reveal>
          )}
        </div>
      </section>

      {/* ----------------------------------------------------- next + cta */}
      <section className="section pt-0" aria-label="Next project">
        <div className="shell flex flex-col gap-5">
          <Reveal>
            <Link
              href={`/projects/${next.slug}`}
              className="group flex items-center justify-between gap-6 rounded-card border border-line bg-surface p-7 shadow-card transition-colors duration-500 hover:border-accent/40 sm:p-9"
            >
              <span className="min-w-0">
                <span className="block text-xs uppercase tracking-[0.22em] text-muted">
                  {projectPage.nextLabel}
                </span>
                <span className="mt-2 block truncate font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  {next.title}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-line transition-colors duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-bg"
              >
                <ArrowUpRight
                  size={22}
                  strokeWidth={1.8}
                  className="transition-transform duration-500 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                />
              </span>
            </Link>
          </Reveal>

          <Reveal
            delay={0.06}
            className="rounded-card border border-line bg-sunken p-9 text-center sm:p-12"
          >
            <h2 className="text-[clamp(1.875rem,6vw,2.75rem)] leading-[1.05] tracking-[-0.03em]">
              <span className="font-light">{projectPage.cta.titleLight} </span>
              <span className="font-bold">{projectPage.cta.titleBold}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-pretty text-muted">{projectPage.cta.lede}</p>
            <div className="mt-8 flex justify-center">
              <ArrowButton href={projectPage.cta.href} target="_blank" rel="noopener noreferrer">
                {projectPage.cta.label}
              </ArrowButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
