import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { blogIndex, publishedPosts } from '@/data/blog'
import { buildMetadata } from '@/lib/seo'
import { blogListSchema } from '@/lib/schema'
import JsonLd from '@/components/JsonLd'
import ArrowButton from '@/components/ui/ArrowButton'
import Reveal from '@/components/ui/Reveal'
import TwoTone from '@/components/ui/TwoTone'

export const metadata = buildMetadata({
  title: blogIndex.meta.title,
  description: blogIndex.meta.description,
  path: '/blog',
})

/** Newest first, so the index does not depend on authoring order. */
const byNewest = [...publishedPosts].sort((a, b) => b.date.localeCompare(a.date))

export default function BlogIndexPage() {
  return (
    <>
      <JsonLd schema={blogListSchema(byNewest)} />

      <section className="section pt-36 sm:pt-44" aria-labelledby="blog-heading">
        <div className="shell">
          <Reveal className="flex justify-center">
            <p className="text-xs uppercase tracking-[0.22em] text-muted">{blogIndex.eyebrow}</p>
          </Reveal>

          <TwoTone
            id="blog-heading"
            as="h1"
            className="mt-5"
            light={blogIndex.titleLight}
            bold={blogIndex.titleBold}
            lede={blogIndex.lede}
          />

          {byNewest.length === 0 ? (
            <Reveal className="mt-14 text-center text-muted">{blogIndex.empty}</Reveal>
          ) : (
            <ul className="mt-14 flex flex-col gap-5 sm:mt-16">
              {byNewest.map((post, index) => (
                <li key={post.slug}>
                  <Reveal delay={index * 0.06}>
                    <article>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group flex flex-col gap-5 rounded-card border border-line bg-surface p-7 shadow-card transition-colors duration-500 hover:border-accent/40 sm:p-9"
                      >
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted">
                          <span className="rounded-full border border-line px-3 py-1 uppercase tracking-[0.14em]">
                            {post.tag}
                          </span>
                          <time dateTime={post.date}>{post.dateLabel}</time>
                          <span aria-hidden="true">·</span>
                          <span>{post.readingTime}</span>
                        </div>

                        <h2 className="font-display text-[clamp(1.4rem,4.4vw,1.9rem)] font-bold leading-[1.15] tracking-[-0.025em]">
                          {post.title}
                        </h2>

                        <p className="text-pretty leading-relaxed text-muted">{post.description}</p>

                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                          Read the article
                          <ArrowUpRight
                            size={15}
                            strokeWidth={2.2}
                            aria-hidden="true"
                            className="transition-transform duration-300 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                          />
                        </span>
                      </Link>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="section pt-0">
        <div className="shell">
          <Reveal className="rounded-card border border-line bg-surface p-9 text-center shadow-card sm:p-12">
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
