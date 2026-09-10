'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Menu, X, Send } from 'lucide-react'
import { nav, profile, socials, whatsappHref } from '@/data/content'
import { scrollToSection } from '@/lib/lenis'
import { EASE, SPRING, SPRING_ENTER, HIDDEN_OPACITY } from '@/lib/motion'

/* The nav is static, so split it once rather than on every render. Routes are
   sorted longest-href-first so /projects/<slug> matches Work rather than some
   shorter prefix that happens to be listed earlier. */
const ROUTE_ITEMS = nav
  .filter((item) => item.href)
  .sort((a, b) => b.href.length - a.href.length)
const SECTION_ITEMS = nav.filter((item) => !item.href)

/**
 * Reference header: a centred wordmark sitting above a centred pill nav that
 * carries the links plus an accent Contact button on its right edge. Collapses to
 * wordmark + hamburger below `md`.
 */
export default function Header() {
  const reduce = useReducedMotion()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  /* Only the scrollspy needs state. Which route is active is a pure function
     of the pathname, so it is derived during render rather than synced in an
     effect — deriving it avoids a cascading render on every navigation. */
  const [sectionActive, setSectionActive] = useState('top')
  const [open, setOpen] = useState(false)

  /* Sections only exist on the home page. Everywhere else the same links have
     to navigate home first, so they become `/#id` and skip the Lenis handoff;
     project routes still light up the Projects tab. */
  const onHome = pathname === '/'
  const sectionHref = (id) => (onHome ? `#${id}` : `/#${id}`)
  /* Route items link straight to their page; section items resolve to an
     anchor that first navigates home when we are not already there. */
  const hrefFor = (item) => item.href ?? sectionHref(item.id)

  const routeActive = ROUTE_ITEMS.find((item) => pathname.startsWith(item.href))?.id ?? ''
  const active = onHome ? sectionActive : routeActive

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    /* Sections only exist on the home page; elsewhere the derived route match
       above is already the answer. */
    if (!onHome) return
    const sections = SECTION_ITEMS.map(({ id }) => document.getElementById(id)).filter(Boolean)
    if (sections.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setSectionActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [onHome])

  useEffect(() => {
    if (!open) return
    const onKey = (event) => event.key === 'Escape' && setOpen(false)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  /* Hand anchor jumps to Lenis when it is running, so they share the same
     easing as wheel scrolling; fall back to native otherwise. */
  const go = (event, item) => {
    setOpen(false)
    if (item.href) return // a real route — let the router handle it
    if (!onHome) return // let the router navigate to /#id
    event.preventDefault()
    scrollToSection(item.id, { reduce })
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-bg"
      >
        Skip to content
      </a>

      <motion.header
        initial={reduce ? false : { y: -30, opacity: HIDDEN_OPACITY }}
        animate={{ y: 0, opacity: 1 }}
        transition={SPRING_ENTER}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled ? 'bg-bg/80 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <div className="shell flex flex-col items-center gap-3 py-4">
          {/* Wordmark — sits above the pill on desktop only. On mobile it
              moves inside the pill, matching the reference's collapse. */}
          <Link
            href={sectionHref('top')}
            onClick={(event) => go(event, { id: 'top' })}
            className="hidden font-display text-2xl font-bold tracking-tight text-accent md:block"
            aria-label={`${profile.name} — back to top`}
          >
            <span className="text-accent">.</span>
            {profile.wordmark}
          </Link>

          {/* Pill nav */}
          <nav aria-label="Primary" className="w-full max-w-nav">
            <div className="glass flex h-nav-h items-center justify-between gap-2 rounded-full pl-5 pr-2 md:justify-center md:pl-6">
              {/* Mobile-only wordmark, left-aligned inside the pill */}
              <Link
                href={sectionHref('top')}
                onClick={(event) => go(event, { id: 'top' })}
                className="font-display text-xl font-bold tracking-tight text-accent md:hidden"
                aria-label={`${profile.name} — back to top`}
              >
                <span>.</span>
                {profile.wordmark}
              </Link>

              <ul className="hidden items-center md:flex">
                {nav.map((item) => {
                  const isActive = active === item.id
                  return (
                    <li key={item.id}>
                      <Link
                        href={hrefFor(item)}
                        onClick={(event) => go(event, item)}
                        aria-current={isActive ? 'true' : undefined}
                        className={`relative block rounded-full px-4 py-2.5 text-[0.95rem] transition-colors duration-300 ${
                          isActive ? 'text-accent' : 'text-text/85 hover:text-text'
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="nav-dot"
                            className="absolute inset-x-4 -bottom-0.5 h-px bg-accent"
                            transition={reduce ? { duration: 0 } : SPRING}
                          />
                        )}
                        {item.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 hidden shrink-0 items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-[0.95rem] font-medium text-bg transition-colors duration-300 hover:bg-text md:inline-flex"
              >
                Contact
                <Send size={15} strokeWidth={2.2} aria-hidden="true" />
              </a>

              {/* Plain hamburger — no accent fill, as in the reference */}
              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-controls="menu-overlay"
                aria-label={open ? 'Close menu' : 'Open menu'}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-text transition-colors duration-300 hover:bg-white/[0.06] md:hidden"
              >
                {open ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-0 z-40 bg-bg/96 backdrop-blur-2xl md:hidden"
          >
            <div className="shell flex h-full flex-col justify-center pt-28">
              <ul className="flex flex-col">
                {[...nav, { id: 'contact', label: 'Contact', external: whatsappHref }].map(
                  (item, index) => (
                    <motion.li
                      key={item.id}
                      initial={reduce ? false : { opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.45, delay: 0.05 + index * 0.08, ease: EASE }}
                    >
                      {item.external ? (
                        <a
                          href={item.external}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setOpen(false)}
                          className="block border-b border-line py-5 font-display text-4xl font-light transition-colors duration-300 hover:text-accent"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          href={hrefFor(item)}
                          onClick={(event) => go(event, item)}
                          className="block border-b border-line py-5 font-display text-4xl font-light transition-colors duration-300 hover:text-accent"
                        >
                          {item.label}
                        </Link>
                      )}
                    </motion.li>
                  ),
                )}
              </ul>
              <ul className="mt-10 flex flex-wrap gap-2">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex rounded-full border border-line px-4 py-2 text-sm text-muted transition-colors hover:border-accent/40 hover:text-accent"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
