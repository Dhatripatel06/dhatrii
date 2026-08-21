/**
 * Module-scoped handle on the running Lenis instance.
 *
 * Anchor navigation has to hand off to Lenis rather than fight it with native
 * scrollIntoView, so the header and footer need to reach the instance the
 * scroll provider created. Keeping it here instead of on `window` means the
 * dependency is an explicit import and nothing leaks onto the global object.
 */
let instance = null

export function setLenis(next) {
  instance = next
}

/** Header offset to clear when landing on a section, in px. */
const ANCHOR_OFFSET = -96

/**
 * Scroll to a section by id, or to the top for `top`. Falls back to native
 * scrolling when Lenis is not running (reduced motion, or before mount).
 */
export function scrollToSection(id, { reduce = false } = {}) {
  const target = id === 'top' ? 0 : document.getElementById(id)
  if (target === null) return

  if (instance) {
    instance.scrollTo(target, { offset: id === 'top' ? 0 : ANCHOR_OFFSET })
    return
  }

  const behavior = reduce ? 'auto' : 'smooth'
  if (target === 0) window.scrollTo({ top: 0, behavior })
  else target.scrollIntoView({ behavior, block: 'start' })
}
