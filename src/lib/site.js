// Single source of truth for anything that needs the deployed origin:
// metadataBase, canonical, Open Graph, the sitemap and the JSON-LD block.
//
// This is the *canonical* host, so it carries the `www.` prefix: Vercel serves
// the site on www and 308s the bare apex to it. Pointing this at the apex would
// advertise a URL that only ever redirects, which is what made Search Console
// fetch the sitemap through a redirect chain.
export const SITE_URL = 'https://www.dhatrii.me'

export const GOOGLE_SITE_VERIFICATION = 'v_Wz9FnZe4mZ1Y4I6yH0K_Yt5OOSX-gA0soFBzoJAV4'

export const SITE_TITLE = 'Freelance Flutter & React Developer in Bhavnagar | Dhatri Patel'

export const SITE_DESCRIPTION =
  'Freelance Flutter and React developer in Bhavnagar, Gujarat. I build mobile apps, websites and MVPs for startups, growing businesses and local businesses across Gujarat — and remotely, worldwide.'

// The social card is generated at build time by app/opengraph-image.js rather
// than being served from /public, so there is no OG image path to export.
