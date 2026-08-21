// Shared motion constants.
//
// The spring values below are quoted from the reference site's own appear
// payload (__framer__appearAnimationsContent). Framer Motion takes the same
// stiffness/damping/mass parameters, so they transfer directly.

export const EASE = [0.22, 1, 0.36, 1]

/* ------------------------------------------------------------------ springs
 * ζ is the damping ratio: below 1 overshoots, at 1 settles exactly, above 1
 * arrives without overshoot.
 */

/** ζ≈1.73 — fast, no overshoot. The reference's workhorse (4 of 7 uses). */
export const SPRING_ENTER = { type: 'spring', stiffness: 300, damping: 60, mass: 1 }

/** Hover/tap feedback. Not from the payload — micro-interactions want snappier. */
export const SPRING = { type: 'spring', stiffness: 260, damping: 26, mass: 0.6 }

/** FAQ accordion height. */
export const SPRING_ACCORDION = { type: 'spring', stiffness: 200, damping: 28, mass: 0.7 }

/* ------------------------------------------------------------------ timing */

/** Reference stagger step: a flat 0.2s between siblings. */
export const STAGGER = 0.2

/**
 * Hidden elements start fractionally visible rather than at a true 0. A
 * zero-opacity element can be dropped from the compositor, so the first
 * animated frame hitches; 0.001 keeps the layer alive. Copied from the
 * reference, which does this on 43 elements.
 */
export const HIDDEN_OPACITY = 0.001

/** Magnetic buttons never travel more than this, in px. */
export const MAGNET_MAX = 6

/** Hero portrait parallax distance, in px. */
export const HERO_PARALLAX = 18

export const VIEWPORT = { once: true, margin: '-10% 0px -6% 0px' }
