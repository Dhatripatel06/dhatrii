import { SITE_URL } from '@/lib/site'

/**
 * Single-page site: one entry, regenerated on each build.
 *
 * The trailing slash is explicit so the <loc> is byte-identical to the
 * canonical homepage Search Console is told to index.
 */
export default function sitemap() {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
