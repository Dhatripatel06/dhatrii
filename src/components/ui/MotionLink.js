'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

/**
 * next/link with a motion wrapper, created once at module scope — calling
 * motion.create() inside a render would hand React a new component type on
 * every pass and remount the link.
 */
const MotionLink = motion.create(Link)

export default MotionLink
