import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

import { publishedPosts, resolveTokens } from '@/data/blog'
import { publishedProjects, services } from '@/data/content'
import JsonLd from '@/components/JsonLd'
import Prose from '@/components/blog/Prose'
import { buildMetadata } from '@/lib/seo'
import { articleSchema, articleBreadcrumb, postFaqSchema } from '@/lib/schema'
import ArrowButton from '@/components/ui/ArrowButton'
import Reveal from '@/components/ui/Reveal'

/* Only published posts are pre-rendered, so a draft slug 404s like any unknown
   path — the same contract the case studies use. */
export function generateStaticParams() {
  return publishedPosts.map(({ slug }) => ({ slug }))
}

const findPost = (slug) => publishedPosts.find((post) => post.slug === slug)

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = findPost(slug)
  if (!post) return {}

  return buildMetadata({
    title: `${post.title} | Dhatri Patel`,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: 'article',
    images: [
      {
        url: `/blog/${post.slug}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: post.title,
      },
    ],
  })
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params
  const post = findPost(slug)
  if (!post) notFound()

  const related = (post.related ?? [])
    .map((relatedSlug) => publishedPosts.find((item) => item.slug === relatedSlug))
    .filter(Boolean)
  const projects = (post.relatedProjects ?? [])
    .map((projectSlug) => publishedProjects.find((item) => item.slug === projectSlug))
    .filter(Boolean)
  const service = services.items.find((item) => item.key === post.serviceKey)

  return (
    <>
      {/* FAQPage is emitted only for the questions rendered below it, so every
          question in the markup is one a reader can see on the page. */}
      <JsonLd
        schema={[
          articleSchema(post),
          articleBreadcrumb(post),
          ...(post.faq?.length ? [postFaqSchema(post)] : []),
        ]}
      />

      {/* ------------------------------------------------------------- head */}
      <section className="section pb-0 pt-36 sm:pt-44" aria-labelledby="post-heading">
        <div className="shell">
          <Reveal>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm text-muted transition-colors duration-300 hover:text-accent"
            >
              <ArrowLeft
                size={16}
                strokeWidth={2}
                aria-hidden="true"
                className="transition-transform duration-300 motion-safe:group-hover:-translate-x-0.5"
              />
              All writing
            </Link>
          </Reveal>

          <Reveal delay={0.05} className="mt-8">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted">
              <span className="rounded-full border border-line px-3 py-1 uppercase tracking-[0.14em]">
                {post.tag}
              </span>
              <time dateTime={post.date}>{post.dateLabel}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readingTime}</span>
            </div>

            <h1
              id="post-heading"
              className="mt-6 text-[clamp(2rem,6.6vw,3.25rem)] font-bold leading-[1.06] tracking-[-0.03em]"
            >
              {post.title}
            </h1>

            <p className="mt-5 text-pretty text-[1.05rem] leading-relaxed text-muted">
              {post.standfirst}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------------- body */}
      <section className="section pb-0">
        <div className="shell">
          <Reveal>
            <Prose blocks={post.body} />
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------------- faq */}
      {post.faq?.length > 0 && (
        <section className="section pb-0" aria-labelledby="post-faq-heading">
          <div className="shell">
            <Reveal>
              <h2
                id="post-faq-heading"
                className="text-[clamp(1.5rem,4.4vw,2rem)] font-bold leading-[1.15] tracking-[-0.025em]"
              >
                Common questions
              </h2>
            </Reveal>

            {/* Plain definition list rather than an accordion: the answers are
                the reason the section exists, so nothing hides them. */}
            <dl className="mt-7 flex flex-col">
              {post.faq.map((item, index) => (
                <Reveal key={item.q} delay={index * 0.04}>
                  <div className="border-t border-line py-6">
                    <dt className="font-display font-bold tracking-[-0.02em]">{item.q}</dt>
                    <dd className="mt-2.5 text-pretty leading-relaxed text-muted">
                      {resolveTokens(item.a)}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* --------------------------------------------------- keep reading -- */}
      <section className="section" aria-labelledby="keep-reading-heading">
        <div className="shell">
          <Reveal>
            <h2
              id="keep-reading-heading"
              className="text-xs uppercase tracking-[0.22em] text-muted"
            >
              Keep reading
            </h2>
          </Reveal>

          <ul className="mt-6 flex flex-col gap-4">
            {related.map((item) => (
              <li key={item.slug}>
                <Reveal>
                  <Link
                    href={`/blog/${item.slug}`}
                    className="group flex items-center justify-between gap-6 rounded-card border border-line bg-surface p-6 transition-colors duration-500 hover:border-accent/40 sm:p-7"
                  >
                    <span className="min-w-0">
                      <span className="block text-xs uppercase tracking-[0.18em] text-muted">
                        Article
                      </span>
                      <span className="mt-2 block font-display text-lg font-bold tracking-tight">
                        {item.title}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={20}
                      strokeWidth={1.8}
                      aria-hidden="true"
                      className="shrink-0 transition-transform duration-300 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                    />
                  </Link>
                </Reveal>
              </li>
            ))}

            {projects.length > 0 && (
              <li>
                <Reveal delay={0.06}>
                  <div className="rounded-card border border-line bg-sunken p-6 sm:p-7">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted">
                      Work referenced in this article
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {projects.map((project) => (
                        <li key={project.slug}>
                          <Link
                            href={`/projects/${project.slug}`}
                            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-4 py-2 text-sm transition-colors duration-300 hover:border-accent/40 hover:text-accent"
                          >
                            {project.title}
                            <ArrowUpRight size={14} strokeWidth={2.2} aria-hidden="true" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </li>
            )}

            {service && (
              <li>
                <Reveal delay={0.1}>
                  <Link
                    href="/services"
                    className="group flex items-center justify-between gap-6 rounded-card border border-accent/35 bg-accent/[0.04] p-6 transition-colors duration-500 hover:bg-accent/[0.08] sm:p-7"
                  >
                    <span className="min-w-0">
                      <span className="block text-xs uppercase tracking-[0.18em] text-muted">
                        The service this relates to
                      </span>
                      <span className="mt-2 block font-display text-lg font-bold tracking-tight">
                        {service.title}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={20}
                      strokeWidth={1.8}
                      aria-hidden="true"
                      className="shrink-0 text-accent transition-transform duration-300 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                    />
                  </Link>
                </Reveal>
              </li>
            )}
          </ul>

          {/* -------------------------------------------------------- cta -- */}
          <Reveal
            delay={0.14}
            className="mt-5 rounded-card border border-line bg-surface p-9 text-center shadow-card sm:p-12"
          >
            <h2 className="text-[clamp(1.875rem,6vw,2.75rem)] leading-[1.05] tracking-[-0.03em]">
              <span className="font-light">Have an idea </span>
              <span className="font-bold">you want to build?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-pretty text-muted">
              Tell me what you are working on and I will come back with a plan, a timeline and a
              price.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <ArrowButton href="/#contact">Start a Project</ArrowButton>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-full border border-line bg-white/[0.03] px-7 py-4 font-medium text-text transition-colors duration-300 hover:bg-white/[0.08]"
              >
                View My Work
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
