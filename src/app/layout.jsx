import { Handjet, Inter, Poppins } from 'next/font/google'

import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import SmoothScroll from '@/components/layout/SmoothScroll'
import GalaxyBackground from '@/components/ui/GalaxyBackground'
import { profile } from '@/data/content'
import {
  GOOGLE_SITE_VERIFICATION,
  OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
} from '@/lib/site'

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

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    'freelance Flutter developer',
    'React developer',
    'Firebase developer',
    'AI app developer',
    'mobile app freelancer',
    'web app developer',
  ],
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  alternates: { canonical: '/' },
  icons: { icon: '/favicon.svg' },
  verification: { google: GOOGLE_SITE_VERIFICATION },
  openGraph: {
    type: 'website',
    siteName: profile.name,
    title: SITE_TITLE,
    description:
      'I design and build mobile apps, websites and AI-powered products with Flutter, React and Firebase — as an independent developer, working directly with you.',
    url: '/',
    locale: 'en_US',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${profile.name} — freelance Flutter and web developer`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description:
      'Independent product developer building Flutter apps, React web apps and AI-powered digital products.',
    images: [OG_IMAGE],
  },
}

export const viewport = {
  themeColor: '#111111',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

const PERSON_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: 'Freelance Flutter & Web Developer',
  url: SITE_URL,
  email: profile.email,
  knowsAbout: ['Flutter', 'React', 'Firebase', 'AI product development', 'Web applications'],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_SCHEMA) }}
        />
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
