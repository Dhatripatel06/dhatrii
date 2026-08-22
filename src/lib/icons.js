import { Github, Instagram, Linkedin } from 'lucide-react'

/**
 * Maps the `icon` key on each entry in `socials` to its lucide component.
 * Data stays serializable; the header, hero, contact card and footer all
 * resolve marks through this one table. Add a line here when `socials` grows.
 */
const SOCIAL_ICONS = { Github, Instagram, Linkedin }

export function socialIcon(name) {
  return SOCIAL_ICONS[name] ?? Github
}
