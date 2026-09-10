import { SITE_URL } from './site'
import { absolute } from './seo'
import { faqs, pricing, profile, services, socials } from '@/data/content'
import { resolveTokens } from '@/data/blog'

/**
 * JSON-LD builders.
 *
 * Every value here is either read from src/data/content.js — the same source
 * the visible page renders from — or a plain fact about the site. Nothing is
 * asserted that a visitor cannot also read on the page.
 *
 * Deliberately absent, and to stay absent: aggregateRating, reviewCount,
 * award, and any client, employer or customer relationship. None of those are
 * evidenced anywhere in this repository.
 */

/* Stable @ids let the graphs on different pages refer to one another instead of
   describing separate, duplicate entities. */
const PERSON_ID = `${SITE_URL}/#dhatri`
const BUSINESS_ID = `${SITE_URL}/#practice`

const POSTAL_ADDRESS = {
  '@type': 'PostalAddress',
  addressLocality: 'Bhavnagar',
  addressRegion: 'Gujarat',
  addressCountry: 'IN',
}

/** Profile links the site already renders in the header, hero and footer. */
const SAME_AS = socials.map((social) => social.href)

/** Skills evidenced by the services offered and the case studies published. */
const KNOWS_ABOUT = [
  'Flutter',
  'Dart',
  'React',
  'Next.js',
  'Firebase',
  'Mobile app development',
  'Web development',
  'MVP development',
  'UI/UX design',
  'On-device machine learning',
]

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: profile.name,
    url: SITE_URL,
    image: absolute(profile.portrait),
    jobTitle: 'Freelance Flutter & React Developer',
    description:
      'Freelance Flutter and React developer in Bhavnagar, Gujarat, building mobile apps, websites and MVPs for startups, growing businesses and local businesses.',
    email: `mailto:${profile.email}`,
    address: POSTAL_ADDRESS,
    homeLocation: { '@type': 'Place', address: POSTAL_ADDRESS },
    knowsAbout: KNOWS_ABOUT,
    knowsLanguage: ['en', 'gu', 'hi'],
    sameAs: SAME_AS,
  }
}

/* Cities named on the site as places I take work from, plus the remote
   coverage the hero and FAQ both state. */
const AREA_SERVED = [
  { '@type': 'City', name: 'Bhavnagar' },
  { '@type': 'City', name: 'Rajkot' },
  { '@type': 'City', name: 'Ahmedabad' },
  { '@type': 'AdministrativeArea', name: 'Gujarat, India' },
  { '@type': 'Place', name: 'Remote worldwide' },
]

/* Lowest and highest figures actually printed on the pricing card, formatted
   from the same numbers, so priceRange cannot overstate the page. */
function displayedPriceRange() {
  const lows = pricing.plans.map((plan) => plan.inr[0])
  const highs = pricing.plans.map((plan) => plan.inr[1])
  const format = new Intl.NumberFormat('en-IN')
  return `₹${format.format(Math.min(...lows))}–₹${format.format(Math.max(...highs))}`
}

/**
 * `includePricing` gates priceRange, because structured data must reflect what
 * the page actually shows. Figures are rendered in the pricing section on the
 * home page, so the home page's graph may state a range; /services no longer
 * displays any, so its graph must not either.
 *
 * Per-offer priceSpecification is gone entirely — services are not individually
 * priced anywhere visible, and schema must not itemise what the site does not.
 */
export function professionalServiceSchema({ includePricing = false } = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': BUSINESS_ID,
    name: `${profile.name} — Freelance Flutter & React Developer`,
    url: SITE_URL,
    description:
      'Freelance Flutter app development, web development, website design and MVP builds for startups, growing businesses and local businesses in Gujarat, and remote clients worldwide.',
    image: absolute('/opengraph-image'),
    email: `mailto:${profile.email}`,
    address: POSTAL_ADDRESS,
    areaServed: AREA_SERVED,
    founder: { '@id': PERSON_ID },
    provider: { '@id': PERSON_ID },
    ...(includePricing && { priceRange: displayedPriceRange() }),
    currenciesAccepted: 'INR, USD',
    sameAs: SAME_AS,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Development services',
      itemListElement: services.items.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.body,
          serviceType: service.title,
          areaServed: AREA_SERVED,
          provider: { '@id': PERSON_ID },
        },
        url: `${SITE_URL}/services`,
      })),
    },
  }
}

/**
 * Built from the same `faqs.items` the accordion renders, so every question and
 * answer in the markup is one a visitor can read on the page. There is no
 * separate SEO-only question list, and there must never be one.
 */
export function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
}

/**
 * A case study describes work, not a product for sale — so there are no offers,
 * no download counts and no ratings. `schemaType` is set per project: only a
 * build that is deployed and publicly usable is typed as an application; the
 * rest are documented work and stay CreativeWork.
 */
export function projectSchema(project) {
  const url = `${SITE_URL}/projects/${project.slug}`

  return {
    '@context': 'https://schema.org',
    '@type': project.schemaType,
    name: project.title,
    headline: project.title,
    description: project.detail.lede,
    url,
    ...(project.image && { image: absolute(project.image) }),
    ...(project.applicationCategory && {
      applicationCategory: project.applicationCategory,
      operatingSystem: 'Web browser',
    }),
    author: { '@id': PERSON_ID },
    creator: { '@id': PERSON_ID },
    inLanguage: 'en',
    isPartOf: { '@type': 'CollectionPage', name: 'Projects', url: `${SITE_URL}/projects` },
  }
}

/** Home › Projects › <project>, matching the links actually on the page. */
export function projectBreadcrumb(project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE_URL}/projects` },
      {
        '@type': 'ListItem',
        position: 3,
        name: project.title,
        item: `${SITE_URL}/projects/${project.slug}`,
      },
    ],
  }
}

export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: profile.name,
    inLanguage: 'en',
    publisher: { '@id': PERSON_ID },
  }
}

/**
 * An article, authored by the same Person the home page describes.
 *
 * `dateModified` is deliberately the publish date rather than a build
 * timestamp: regenerating the site does not mean the writing changed, and
 * claiming it did is a freshness signal that is not earned.
 */
export function articleSchema(post) {
  const url = `${SITE_URL}/blog/${post.slug}`

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': url,
    headline: post.title,
    description: post.description,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    image: absolute(`/blog/${post.slug}/opengraph-image`),
    datePublished: post.date,
    dateModified: post.date,
    author: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
    inLanguage: 'en',
    articleSection: post.tag,
    isAccessibleForFree: true,
  }
}

/** Home > Blog > <post>, matching the links actually on the page. */
export function articleBreadcrumb(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blog/${post.slug}`,
      },
    ],
  }
}

/**
 * An article's own FAQ. Tokens are resolved exactly as the rendered answers
 * resolve them, so a price in the schema matches the price on the page.
 */
export function postFaqSchema(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: resolveTokens(item.a) },
    })),
  }
}

/** The blog index as a collection of the posts it lists. */
export function blogListSchema(list) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${SITE_URL}/blog`,
    url: `${SITE_URL}/blog`,
    name: `${profile.name} — Writing`,
    inLanguage: 'en',
    publisher: { '@id': PERSON_ID },
    blogPost: list.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `${SITE_URL}/blog/${post.slug}`,
      datePublished: post.date,
      author: { '@id': PERSON_ID },
    })),
  }
}
