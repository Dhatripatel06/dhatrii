import { Star } from 'lucide-react'

import { approvedTestimonials, clientTestimonials } from '@/data/content'
import Reveal from '@/components/ui/Reveal'
import TwoTone from '@/components/ui/TwoTone'

/**
 * Client testimonials, sitting directly above the pricing section so someone
 * reads a real endorsement immediately before they see a number.
 *
 * The section renders nothing until a testimonial carries wording the person
 * actually gave — `approvedTestimonials` enforces that. An empty section is a
 * better outcome than a placeholder quote, and a placeholder quote on a live
 * site is indistinguishable from a fabricated one.
 *
 * No stat block, no star rating and no photograph unless the person approved
 * them. The reference layout carries a satisfaction percentage in the top
 * right; there is no such figure here, because there is nothing to measure it
 * from. A server component — nothing here needs state.
 */

/* "Vishrut Donda" -> "VD". Decorative only: the name is rendered as text
   directly beneath, so identity never depends on reading the avatar. */
const initialsOf = (name) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')

function TestimonialCard({ item }) {
  /* Project and place, e.g. "Shiftly · London, UK". `role` stays in the data
     because it records what the relationship actually was — which the projects
     index also has to reflect — but it is not repeated in the label. */
  const attribution = [item.project, item.location].filter(Boolean).join(' · ')

  return (
    <figure className="relative overflow-hidden rounded-card border border-line bg-surface p-8 shadow-card sm:p-11">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/[0.07] blur-3xl"
      />

      {/* Attribution leads the card, as in the reference: who is speaking,
          then what they said. */}
      <figcaption className="relative flex items-center gap-4">
        <span
          aria-hidden="true"
          className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-accent/40 bg-bg/60 font-display text-lg font-bold tracking-tight text-accent sm:h-16 sm:w-16 sm:text-xl"
        >
          {initialsOf(item.name)}
        </span>
        <span className="min-w-0">
          <span className="block font-display text-lg font-bold tracking-[-0.02em] sm:text-xl">
            {item.name}
          </span>
          <span className="mt-1 block text-sm text-muted">{attribution}</span>
        </span>
      </figcaption>

      <blockquote className="relative mt-9 text-center">
        <span aria-hidden="true" className="block font-display text-5xl leading-none text-muted/40">
          &rdquo;
        </span>
        <p className="mt-4 text-pretty text-[clamp(1.1rem,2.6vw,1.5rem)] font-medium leading-[1.45]">
          {item.quote}
        </p>
      </blockquote>

      {/* Only ever rendered when the person actually gave a rating. */}
      {typeof item.rating === 'number' && (
        <div className="relative mt-7 flex justify-center gap-1 text-accent">
          {Array.from({ length: item.rating }).map((_, index) => (
            <Star key={index} size={16} fill="currentColor" strokeWidth={0} aria-hidden="true" />
          ))}
          <span className="sr-only">
            {item.name} rated this {item.rating} out of 5.
          </span>
        </div>
      )}
    </figure>
  )
}

export default function ClientsSay() {
  if (approvedTestimonials.length === 0) return null

  return (
    <section aria-labelledby="clients-say-heading" className="section">
      <div className="shell">
        <TwoTone
          id="clients-say-heading"
          light={clientTestimonials.titleLight}
          bold={clientTestimonials.titleBold}
          lede={clientTestimonials.lede}
        />

        {/* One card is one card. No dots, no arrows, nothing implying a set
            of testimonials that does not exist yet. */}
        <ul className="mt-14 flex flex-col gap-5">
          {approvedTestimonials.map((item, index) => (
            <li key={item.name}>
              <Reveal delay={index * 0.06}>
                <TestimonialCard item={item} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
