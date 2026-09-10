import { SITE_URL } from '@/lib/site'
import { publishedProjects } from '@/data/content'
import { publishedPosts } from '@/data/blog'

/**
 * Every public, indexable route — regenerated on each build.
 *
 * Project and post entries come from `publishedProjects` and `publishedPosts`,
 * never from a second hardcoded list, so a draft cannot be listed here while
 * being 404 everywhere else. There is exactly one entry per URL and no route
 * appears twice.
 *
 * Every <loc> is byte-identical to the canonical tag the corresponding page
 * emits. Next resolves `canonical: '/'` to the bare origin with no trailing
 * slash, so the home entry carries none either — a sitemap URL that differs
 * from the page's own canonical by one character is a duplicate-URL signal.
 */
export default function sitemap() {
  const lastModified = new Date()

  const routes = [
    { path: '', changeFrequency: 'monthly', priority: 1 },
    { path: '/services', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/projects', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/blog', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/about', changeFrequency: 'yearly', priority: 0.7 },
  ]

  return [
    ...routes.map((route) => ({
      url: `${SITE_URL}${route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...publishedProjects.map((project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.6,
    })),
    /* An article's lastModified is its publish date, not the build time — a
       rebuild does not mean the writing changed. */
    ...publishedPosts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'yearly',
      priority: 0.6,
    })),
  ]
}
