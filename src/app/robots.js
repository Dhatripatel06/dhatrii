import { SITE_URL } from '@/lib/site'

/**
 * Public portfolio pages are available to search engines and AI assistants.
 * Search crawlers are explicitly listed for clarity; the wildcard rule also
 * permits other compliant crawlers. Training crawlers are separate agents and
 * are explicitly allowed because this portfolio is public and the owner wants
 * broad AI discovery and access.
 *
 * Next's own /_next/static assets remain crawlable so search engines can render
 * the site. No private or authenticated routes are exposed by these rules.
 */
export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'Claude-SearchBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Claude-User', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      { userAgent: 'Meta-ExternalAgent', allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
