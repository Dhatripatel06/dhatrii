'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUp } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'
import { socials, profile, nav } from '@/data/content'
import { socialIcon } from '@/lib/icons'
import { scrollToSection } from '@/lib/lenis'
import Reveal from '@/components/ui/Reveal'
import Magnetic from '@/components/ui/Magnetic'

export default function Footer() {
  const reduce = useReducedMotion()
  const pathname = usePathname()
  const year = new Date().getFullYear()

  /* Same rule as the header: off the home page these anchors have to route
     home first, and "back to top" becomes a plain scroll to 0. */
  const onHome = pathname === '/'
  const sectionHref = (id) => (onHome ? `#${id}` : `/#${id}`)

  const toTop = () =>
    onHome ? scrollToSection('top', { reduce }) : window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })

  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-52 left-1/2 h-96 w-[46rem] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-[130px]"
      />

      <div className="shell relative py-16">
        <Reveal className="flex flex-col items-center gap-8 text-center">
          <Link
            href={sectionHref('top')}
            className="font-display text-3xl font-bold tracking-tight text-accent"
          >
            <span>.</span>
            {profile.wordmark}
          </Link>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {[...nav, { id: 'contact', label: 'Contact' }].map((item) => (
                <li key={item.id}>
                  <Link
                    href={sectionHref(item.id)}
                    className="link-underline text-muted transition-colors duration-300 hover:text-text"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex flex-wrap items-center justify-center gap-2">
            {socials.map((social) => {
              const Icon = socialIcon(social.icon)
              return (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${profile.name} on ${social.label}`}
                    className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white/[0.03] text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
                  >
                    <Icon size={18} strokeWidth={2} aria-hidden="true" />
                  </a>
                </li>
              )
            })}
          </ul>

          <Magnetic
            as="button"
            type="button"
            onClick={toTop}
            className="group inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-medium transition-colors duration-300 hover:border-accent/40 hover:text-accent"
          >
            Back to top
            <ArrowUp
              size={16}
              strokeWidth={2.2}
              aria-hidden="true"
              className="transition-transform duration-300 motion-safe:group-hover:-translate-y-0.5"
            />
          </Magnetic>
        </Reveal>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-8 text-center text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>
            © {year} {profile.name}. All rights reserved.
          </p>
          <p>Designed and built from scratch.</p>
        </div>
      </div>
    </footer>
  )
}
