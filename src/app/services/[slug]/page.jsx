import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from 'lucide-react'

import JsonLd from '@/components/JsonLd'
import { profile, publishedProjects, whatsappHref } from '@/data/content'
import { servicePages } from '@/data/service-pages'
import { buildMetadata } from '@/lib/seo'
import { servicePageSchema } from '@/lib/schema'
import ArrowButton from '@/components/ui/ArrowButton'
import Reveal from '@/components/ui/Reveal'

const findService = (slug) => servicePages.find((service) => service.slug === slug)

export function generateStaticParams() {
  return servicePages.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const service = findService(slug)
  if (!service) return {}
  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  })
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params
  const service = findService(slug)
  if (!service) notFound()

  const relatedProjects = service.relatedProjects
    .map((projectSlug) => publishedProjects.find((project) => project.slug === projectSlug))
    .filter(Boolean)

  return (
    <>
      <JsonLd schema={servicePageSchema(service)} />
      <section className="section pt-36 sm:pt-44" aria-labelledby="service-heading">
        <div className="shell">
          <Reveal>
            <Link href="/services" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent">
              <ArrowLeft size={16} aria-hidden="true" />
              All services
            </Link>
            <p className="mt-10 text-xs uppercase tracking-[0.22em] text-accent">Dhatrii · Digital solutions</p>
            <h1 id="service-heading" className="mt-5 max-w-4xl font-display text-[clamp(2.4rem,7vw,4.8rem)] font-bold leading-[0.98] tracking-[-0.045em]">
              {service.title}
            </h1>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-muted">{service.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ArrowButton href={whatsappHref}>Discuss this service</ArrowButton>
              <a href={`mailto:${profile.email}?subject=${encodeURIComponent(`Project enquiry: ${service.title}`)}`} className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3.5 text-sm font-medium text-text transition-colors hover:border-accent/40 hover:text-accent">
                Email Dhatri <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <Reveal className="rounded-card border border-line bg-surface p-7 sm:p-9">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">Who this is for</p>
              <h2 className="mt-4 font-display text-2xl font-bold">Is this right for your project?</h2>
              <p className="mt-4 leading-relaxed text-muted">{service.bestFor}</p>
              <div className="mt-8 border-t border-line pt-6">
                <p className="text-sm font-semibold">Delivered by Dhatri Patel</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">Dhatrii is Dhatri Patel’s digital solutions practice. Dhatri leads the project directly and can bring in specialist collaborators when a project needs additional expertise.</p>
              </div>
            </Reveal>

            <Reveal className="rounded-card border border-line bg-surface p-7 sm:p-9">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">What you can expect</p>
              <h2 className="mt-4 font-display text-2xl font-bold">Project deliverables</h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-text/85">
                    <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal className="mt-6 rounded-card border border-line bg-sunken p-7 sm:p-9">
            <p className="text-xs uppercase tracking-[0.18em] text-muted">How we work</p>
            <h2 className="mt-4 font-display text-2xl font-bold">A clear path from scope to delivery</h2>
            <ol className="mt-7 grid gap-5 md:grid-cols-2">
              {service.approach.map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span className="font-display text-lg font-bold text-accent">0{index + 1}</span>
                  <p className="text-sm leading-relaxed text-muted">{step}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          {relatedProjects.length > 0 && (
            <Reveal className="mt-6 rounded-card border border-line bg-surface p-7 sm:p-9">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">Relevant work</p>
              <h2 className="mt-4 font-display text-2xl font-bold">See related projects</h2>
              <div className="mt-6 flex flex-wrap gap-3">
                {relatedProjects.map((project) => (
                  <Link key={project.slug} href={`/projects/${project.slug}`} className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm hover:border-accent/40 hover:text-accent">
                    {project.title} <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </Reveal>
          )}

          <Reveal className="mt-6 rounded-card border border-accent/30 bg-surface p-8 text-center sm:p-12">
            <p className="text-xs uppercase tracking-[0.18em] text-accent">Work with Dhatrii</p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight">Tell me what you need to build.</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">Share the goal, the users and any deadline. I’ll help define a practical scope before you commit to a build.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ArrowButton href={whatsappHref}>Message on WhatsApp</ArrowButton>
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3.5 text-sm font-medium hover:border-accent/40 hover:text-accent">
                {profile.email}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
