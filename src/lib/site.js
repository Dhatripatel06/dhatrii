// Single source of truth for anything that needs the deployed origin:
// metadataBase, canonical, Open Graph, the sitemap and the JSON-LD block.
//
// This is the *canonical* host, so it carries the `www.` prefix: Vercel serves
// the site on www and 308s the bare apex to it. Pointing this at the apex would
// advertise a URL that only ever redirects, which is what made Search Console
// fetch the sitemap through a redirect chain.
export const SITE_URL = 'https://www.dhatrii.me'

export const GOOGLE_SITE_VERIFICATION = 'v_Wz9FnZe4mZ1Y4I6yH0K_Yt5OOSX-gA0soFBzoJAV4'

export const SITE_TITLE = 'Flutter & React Developer in Gujarat | Dhatri Patel'

export const SITE_DESCRIPTION =
  'Dhatri Patel builds Flutter apps, React websites and custom web platforms for startups and businesses in Gujarat and worldwide.'

// The social card is generated at build time by app/opengraph-image.js rather
// than being served from /public, so there is no OG image path to export.
