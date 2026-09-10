import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import {
  planFor,
  publishedProjects,
  services,
  servicesPage,
  whatsappHref,
} from '@/data/content'
import JsonLd from '@/components/JsonLd'
import { buildMetadata } from '@/lib/seo'
import { professionalServiceSchema } from '@/lib/schema'
import ArrowButton from '@/components/ui/ArrowButton'
import Reveal from '@/components/ui/Reveal'
import TwoTone from '@/components/ui/TwoTone'

export const metadata = buildMetadata({
  title: servicesPage.meta.title,
  description: servicesPage.meta.description,
  path: '/services',
})

/* A service names its related work by slug. Resolving against the published
   list means an unpublished case study can never be linked from here. */
const relatedFor = (slugs = []) =>
  slugs
    .map((slug) => publishedProjects.find((project) => project.slug === slug))
    .filter(Boolean)

/**
 * The full service detail: what each one is, who it is for, what lands, what
 * it costs and how long it takes — the questions an enquiry opens with.
 *
 * A server component: nothing here needs state, so the whole page ships as
 * static HTML and the copy is in the markup for crawlers.
 */
export default function ServicesPage() {
  const { labels } = servicesPage

  return (
    <>
      {/* The offer catalogue this page renders, as structured data. Prices come
          from the same numbers as the visible cards. */}
      <JsonLd schema={professionalServiceSchema()} />

      {/* Extra top padding clears the fixed header, which the home page gets
          from its hero instead. */}
      <section className="section pt-36 sm:pt-44" aria-labelledby="services-heading">
        <div className="shell">
          <Reveal className="flex justify-center">
            <p className="text-xs uppercase tracking-[0.22em] text-muted">
              {servicesPage.eyebrow}
            </p>
          </Reveal>

          <TwoTone
            id="services-heading"
            as="h1"
            className="mt-5"
            light={servicesPage.titleLight}
            bold={servicesPage.titleBold}
            lede={servicesPage.lede}
          />

          <ul className="mt-14 flex flex-col gap-6 sm:mt-16">
            {services.items.map((service) => {
              const plan = planFor(service.planKey)
              const related = relatedFor(service.caseStudies)

              return (
                <li key={service.key}>
                  <Reveal>
                    <article
                      aria-labelledby={`service-${service.key}`}
                      className="relative overflow-hidden rounded-card border border-line bg-surface p-7 shadow-card sm:p-10"
                    >
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/[0.06] blur-3xl"
                      />

                      {/* Number + badge */}
                      <div className="relative flex items-center justify-between gap-4">
                        <span className="font-display text-sm font-bold tracking-[0.14em] text-muted">
                          {service.number}
                        </span>
                        <span className="inline-flex rounded-full border border-accent px-4 py-1.5 text-sm font-medium text-accent">
                          {service.badge}
                        </span>
                      </div>

                      <h2
                        id={`service-${service.key}`}
                        className="relative mt-6 font-display text-[clamp(1.75rem,5.6vw,2.5rem)] font-bold leading-[1.06] tracking-[-0.03em]"
                      >
                        {service.title}
                      </h2>

                      <p className="relative mt-5 text-pretty text-muted">{service.body}</p>

                      {/* Who it is for */}
                      <div className="relative mt-8">
                        <h3 className="text-xs uppercase tracking-[0.18em] text-muted">
                          {labels.forWho}
                        </h3>
                        <p className="mt-3 text-pretty text-text/85">{service.forWho}</p>
                      </div>

                      {/* Deliverables */}
                      <div className="relative mt-8">
                        <h3 className="text-xs uppercase tracking-[0.18em] text-muted">
                          {labels.deliverables}
                        </h3>
                        <ul className="mt-4 flex flex-col gap-3">
                          {service.deliverables.map((item) => (
                            <li key={item} className="flex items-start gap-3 text-text/85">
                              <span
                                aria-hidden="true"
                                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Timeline and stack only. Figures live in the pricing
                          section on the home page and are not repeated here. */}
                      <dl className="relative mt-8 grid grid-cols-1 gap-5 rounded-[22px] bg-sunken p-6 sm:grid-cols-2">
                        <div>
                          <dt className="text-xs uppercase tracking-[0.18em] text-muted">
                            {labels.timeline}
                          </dt>
                          <dd className="mt-2 font-display font-bold tracking-[-0.02em]">
                            {plan.delivery}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-xs uppercase tracking-[0.18em] text-muted">
                            {labels.stack}
                          </dt>
                          <dd className="mt-2 text-sm text-muted">{service.stack}</dd>
                        </div>
                      </dl>

                      {/* Related work */}
                      {related.length > 0 && (
                        <div className="relative mt-8">
                          <h3 className="text-xs uppercase tracking-[0.18em] text-muted">
                            {labels.caseStudies}
                          </h3>
                          <ul className="mt-4 flex flex-wrap gap-2">
                            {related.map((project) => (
                              <li key={project.slug}>
                                <Link
                                  href={`/projects/${project.slug}`}
                                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-4 py-2 text-sm text-text transition-colors duration-300 hover:border-accent/40 hover:text-accent"
                                >
                                  {project.title}
                                  <ArrowUpRight size={14} strokeWidth={2.2} aria-hidden="true" />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="relative mt-9 flex flex-wrap items-center gap-4">
                        <ArrowButton href="/#contact">Start a Project</ArrowButton>
                        <Link href="/#pricing" className="link-underline text-sm text-muted">
                          See full pricing
                        </Link>
                      </div>
                    </article>
                  </Reveal>
                </li>
              )
            })}
          </ul>

          <Reveal className="mt-10">
            <p className="mx-auto max-w-xl text-pretty text-center text-muted">
              {servicesPage.note}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Closing CTA, matching the one on the projects index */}
      <section className="section pt-0">
        <div className="shell">
          <Reveal className="rounded-card border border-line bg-surface p-9 text-center shadow-card sm:p-12">
            <h2 className="text-[clamp(1.875rem,6vw,2.75rem)] leading-[1.05] tracking-[-0.03em]">
              <span className="font-light">Have an idea </span>
              <span className="font-bold">you want to build?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-pretty text-muted">
              Tell me what you are working on and I will come back with a plan, a timeline and a price.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <ArrowButton href="/#contact">Start a Project</ArrowButton>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-line bg-white/[0.03] px-7 py-4 font-medium text-text transition-colors duration-300 hover:bg-white/[0.08]"
              >
                Message on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
