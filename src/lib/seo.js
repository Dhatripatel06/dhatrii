import { SITE_URL } from './site'
import { profile } from '@/data/content'

/**
 * One metadata shape for every public route.
 *
 * Written as a helper rather than a `title.template` because Next only applies
 * a template to `title` — Open Graph and Twitter titles are left untemplated,
 * which is how pages end up sharing with the wrong headline. Building all three
 * from one argument keeps them in step by construction.
 *
 * `path` is a site-root-relative path. Next resolves it against `metadataBase`
 * (the canonical www origin), so canonical, og:url and the sitemap all agree on
 * one host without any of them hardcoding it.
 *
 * Images fall back to the generated card. Next's opengraph-image file
 * convention is per-segment and is NOT inherited by nested routes the way the
 * `metadata` object is, so /about, /services and any coverless case study ship
 * with no og:image at all unless the URL is named explicitly. Pointing at the
 * route resolves against metadataBase and always serves the current card.
 */
const GENERATED_CARD = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: `${profile.name} — freelance Flutter and React developer in Bhavnagar, India`,
}

export function buildMetadata({ title, description, path, type = 'website', images }) {
  const resolved = Array.isArray(images) && images.length > 0 ? images : [GENERATED_CARD]

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: profile.name,
      locale: 'en_IN',
      title,
      description,
      url: path,
      images: resolved,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: resolved,
    },
  }
}

/** Absolute URL for a site-root-relative path, for use inside JSON-LD. */
export const absolute = (path) => new URL(path, SITE_URL).toString()
