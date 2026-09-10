import { Handjet, Inter, Poppins } from 'next/font/google'

import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import SmoothScroll from '@/components/layout/SmoothScroll'
import GalaxyBackground from '@/components/ui/GalaxyBackground'
import { profile } from '@/data/content'
import {
  GOOGLE_SITE_VERIFICATION,
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
} from '@/lib/site'
import { buildMetadata } from '@/lib/seo'

import './globals.css'

/* Self-hosted at build time by next/font, so there is no render-blocking
   request to fonts.googleapis.com and no layout shift on swap. Poppins is
   static, so its weights are listed; Inter and Handjet ship variable axes. */
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const handjet = Handjet({
  subsets: ['latin'],
  variable: '--font-handjet',
  display: 'swap',
})

/* Root metadata. Every page below builds its own with the same helper, so the
   only things inherited from here are the ones that genuinely are site-wide:
   metadataBase, icons, authorship and search-console verification.

   No `images` key anywhere: app/opengraph-image.js supplies og:image and
   twitter:image for this route and every route that inherits from it. */
export const metadata = {
  metadataBase: new URL(SITE_URL),
  ...buildMetadata({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    path: '/',
  }),
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  publisher: profile.name,
  icons: { icon: '/favicon.svg' },
  verification: { google: GOOGLE_SITE_VERIFICATION },
}

export const viewport = {
  themeColor: '#111111',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} ${handjet.variable}`}
      suppressHydrationWarning
    >
      {/* No background on the wrapper below: an opaque ancestor would paint
          over the fixed -z-10 starfield. The page ground comes from `body`. */}
      <body>
        <SmoothScroll />
        <div className="min-h-screen">
          <GalaxyBackground />
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
