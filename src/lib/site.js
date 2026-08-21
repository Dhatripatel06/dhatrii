// Single source of truth for anything that needs the deployed origin:
// metadataBase, canonical, Open Graph, the sitemap and the JSON-LD block.
//
// This is the *canonical* host, so it carries the `www.` prefix: Vercel serves
// the site on www and 308s the bare apex to it. Pointing this at the apex would
// advertise a URL that only ever redirects, which is what made Search Console
// fetch the sitemap through a redirect chain.
export const SITE_URL = 'https://www.dhatrii.me'

export const GOOGLE_SITE_VERIFICATION = 'v_Wz9FnZe4mZ1Y4I6yH0K_Yt5OOSX-gA0soFBzoJAV4'

export const SITE_TITLE = 'Dhatri Patel | Freelance Flutter & Web Developer'

export const SITE_DESCRIPTION =
  'Freelance Flutter and React developer building mobile apps, websites, web apps and AI-powered products with Firebase. Independent, senior-level product work for startups and growing businesses.'

export const OG_IMAGE = '/images/og-cover.jpg'
