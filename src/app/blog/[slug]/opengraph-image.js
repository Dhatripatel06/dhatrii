import { ImageResponse } from 'next/og'

import { publishedPosts } from '@/data/blog'
import { profile } from '@/data/content'

/**
 * A per-article social card carrying the headline, so a shared post shows what
 * it is about rather than the generic site card.
 *
 * The root app/opengraph-image.js is NOT inherited by nested routes — Next's
 * image file conventions are per-segment — so an article needs its own.
 */
export const alt = 'Article by Dhatri Patel'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return publishedPosts.map(({ slug }) => ({ slug }))
}

const BG = '#111111'
const ACCENT = '#4CC9FF'
const TEXT = '#F5F5F5'
const MUTED = '#A1A1AA'

export default async function BlogOpengraphImage({ params }) {
  const { slug } = await params
  const post = publishedPosts.find((item) => item.slug === slug)

  /* Long headlines need to step down a size or they overrun the card. */
  const headline = post?.title ?? 'Writing'
  const fontSize = headline.length > 52 ? 56 : 64

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: BG,
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(820px 660px at 90% -8%, rgba(76,201,255,0.30), rgba(76,201,255,0) 70%)',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ color: ACCENT, fontSize: 34, fontWeight: 700 }}>.</span>
          <span style={{ color: ACCENT, fontSize: 28, fontWeight: 700, letterSpacing: -0.4 }}>
            {profile.name}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <span
            style={{
              color: ACCENT,
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: 3,
              textTransform: 'uppercase',
            }}
          >
            {post?.tag ?? 'Writing'}
          </span>
          <span
            style={{
              color: TEXT,
              fontSize,
              fontWeight: 700,
              lineHeight: 1.12,
              letterSpacing: -1.8,
              maxWidth: 1010,
            }}
          >
            {headline}
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255,255,255,0.12)',
            paddingTop: 30,
          }}
        >
          <span style={{ color: MUTED, fontSize: 24 }}>
            Freelance Flutter &amp; React Developer
          </span>
          <span style={{ color: MUTED, fontSize: 24 }}>{post?.readingTime ?? ''}</span>
        </div>
      </div>
    ),
    size,
  )
}
