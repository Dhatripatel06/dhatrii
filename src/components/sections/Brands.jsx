import { brands } from '@/data/content'
import Reveal from '@/components/ui/Reveal'
import Marquee from '@/components/ui/Marquee'

/**
 * Muted marquee of certifications and training programmes, clipped at both
 * edges. The heading is load-bearing: without it a scrolling strip of Oracle
 * and Salesforce marks reads as a client list, which it is not.
 */
export default function Brands() {
  return (
    <section aria-labelledby="brands-heading" className="py-14 sm:py-16">
      <div className="shell">
        <Reveal>
          <h2 id="brands-heading" className="text-center text-[0.95rem] font-medium text-muted">
            {brands.title}
          </h2>
        </Reveal>
      </div>

      <Reveal delay={0.08} className="mt-9">
        <Marquee
          items={brands.logos}
          label={`${brands.a11yLabel}: ${brands.logos.join(', ')}.`}
          renderItem={(logo) => (
            <span className="whitespace-nowrap font-display text-lg font-bold tracking-tight text-white/30 sm:text-xl">
              {logo}
            </span>
          )}
        />
      </Reveal>
    </section>
  )
}
