import { SITE_URL } from '@/lib/site'

/**
 * Everything public is crawlable. There is nothing to hide: draft case studies
 * are never rendered or routed at all, so they need no Disallow rule — a rule
 * would only advertise a path that returns 404.
 *
 * Next's own /_next/static assets are deliberately left crawlable; blocking
 * them stops Google fetching the CSS and JS it needs to render the page.
 *
 * Only standard directives here — no `Host`, which is non-standard and ignored
 * by Google. The canonical host is already declared by the canonical tags and
 * the absolute URLs in the sitemap.
 */
export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
