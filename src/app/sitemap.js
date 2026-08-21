import { SITE_URL } from '@/lib/site'

/** Single-page site: one entry, regenerated on each build. */
export default function sitemap() {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
