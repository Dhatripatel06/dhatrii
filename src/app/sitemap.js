import { SITE_URL } from '@/lib/site'
import { projects } from '@/data/content'

/**
 * Home, the projects index and one entry per case study, regenerated on each
 * build.
 *
 * The home trailing slash is explicit so the <loc> is byte-identical to the
 * canonical homepage Search Console is told to index.
 */
export default function sitemap() {
  const lastModified = new Date()

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...projects.map((project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.7,
    })),
  ]
}
