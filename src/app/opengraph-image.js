import { ImageResponse } from 'next/og'

import { profile } from '@/data/content'

/**
 * The social card, generated at build time instead of shipped as a file.
 *
 * `OG_IMAGE` used to point at /images/og-cover.jpg, which was never committed,
 * so every share rendered a broken preview. Generating it here means the card
 * can never drift out of sync with the positioning copy again, and there is no
 * binary to keep in the repo.
 *
 * Next serves this for both og:image and twitter:image, and inherits it into
 * every route that does not declare its own.
 */
export const alt = `${profile.name} — freelance Flutter and React developer in Bhavnagar, India`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/* Sampled from tailwind.config.mjs — this file cannot use Tailwind classes,
   so the tokens are repeated rather than imported. */
const BG = '#111111'
const ACCENT = '#4CC9FF'
const TEXT = '#F5F5F5'
const MUTED = '#A1A1AA'

export default function OpengraphImage() {
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
        {/* Accent wash mirroring the hero's bloom. A radial gradient rather
            than a circle + blur: Satori does not rasterise filters, so a plain
            div would land as a hard-edged disc. */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(820px 660px at 90% -8%, rgba(76,201,255,0.30), rgba(76,201,255,0) 70%)',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ color: ACCENT, fontSize: 40, fontWeight: 700 }}>.</span>
          <span style={{ color: ACCENT, fontSize: 34, fontWeight: 700, letterSpacing: -0.5 }}>
            {profile.name}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          <span
            style={{
              color: ACCENT,
              fontSize: 21,
              fontWeight: 600,
              letterSpacing: 3.2,
              textTransform: 'uppercase',
            }}
          >
            Freelance Flutter &amp; React Developer
          </span>
          <span
            style={{
              color: TEXT,
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.12,
              letterSpacing: -2,
              maxWidth: 1010,
            }}
          >
            I build mobile apps and websites that are ready to ship.
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
          <span style={{ color: MUTED, fontSize: 25 }}>
            Flutter · React · Firebase · AI · UI/UX
          </span>
          <span style={{ color: MUTED, fontSize: 25 }}>Bhavnagar, India</span>
        </div>
      </div>
    ),
    size,
  )
}
