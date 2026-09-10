import { pricing } from './content'

// ---------------------------------------------------------------------------
// Articles are stored as structured blocks rather than MDX: the renderer in
// app/blog/[slug]/page.jsx maps each block to the site's existing type styles,
// so a post cannot introduce typography the rest of the site does not have —
// and no markdown/MDX dependency is added to build one.
//
// PRICES ARE NEVER TYPED OUT HERE. Body copy uses {{website.inr}}-style tokens
// resolved from `pricing.plans` at render time, so an article can never quote a
// figure the pricing card does not show.
// ---------------------------------------------------------------------------

/** Resolves {{<planKey>.inr|usd|time|name}} against the one pricing source. */
export function resolveTokens(text) {
  return text.replace(/\{\{(\w+)\.(inr|usd|time|name)\}\}/g, (match, key, field) => {
    const plan = pricing.plans.find((item) => item.key === key)
    if (!plan) return match
    if (field === 'inr') return plan.unit ? `${plan.priceInr} ${plan.unit}` : plan.priceInr
    if (field === 'usd') return plan.unit ? `${plan.priceUsd} ${plan.unit}` : plan.priceUsd
    if (field === 'time') return plan.delivery.replace(/^About /, '')
    return plan.name
  })
}

export const blogIndex = {
  eyebrow: 'Writing',
  titleLight: 'Notes on',
  titleBold: 'building things',
  lede: 'Occasional writing about what software actually costs, which tools make sense when, and how a build gets from an idea to something people can open.',
  meta: {
    title: 'Blog — Notes on Building Apps & Websites | Dhatri Patel',
    description:
      'Practical writing on what business websites cost, choosing between Flutter and React Native, and how app and web projects actually get built.',
  },
  empty: 'Nothing published yet.',
}

export const posts = [
  // =========================================================================
  {
    slug: 'business-website-cost-gujarat-2026',
    published: true,
    title: 'What Does a Business Website Cost in Gujarat in 2026?',
    description:
      'Why the same website brief gets wildly different quotes, what actually drives the price, and the questions to ask before you pay anyone — including my own starting range.',
    date: '2026-09-10',
    dateLabel: '10 September 2026',
    readingTime: '9 min read',
    tag: 'Pricing',
    /* One-sentence framing shown under the title and reused in the OG card. */
    standfirst:
      'A straight answer about how website pricing works — and an honest note about whose prices I can and cannot speak for.',
    body: [
      {
        type: 'p',
        text: 'If you run a business in Bhavnagar, Rajkot or Ahmedabad and you have asked three people what a website costs, you have probably had three very different answers. One person quotes a few thousand rupees. Another quotes a few lakh. Both are describing something they call "a website", and both may be quoting fairly for what they intend to deliver.',
      },
      {
        type: 'p',
        text: 'That gap is not usually dishonesty. It is that "a website" describes at least four different products, and nobody says which one they mean.',
      },
      {
        type: 'callout',
        title: 'A note on what I can actually tell you',
        text: 'I am one freelance developer. I can tell you exactly what I charge and precisely what drives that number up or down, because those are my own figures. I cannot tell you what "websites in Gujarat cost" — I have no survey data, and anyone quoting you a state-wide average without showing you their sample is guessing. Treat the framework below as a way to read any quote you receive, not as a market rate.',
      },
      { type: 'h2', text: 'Who this is for' },
      {
        type: 'p',
        text: 'This is written for an owner-operator: a shop, clinic, restaurant, workshop, coaching centre, agency or small manufacturer who needs a website that works, is being quoted wildly different numbers, and wants to understand what separates them. If you are a funded startup building a product, the calculation is different and the Web App / MVP section further down is closer to your situation.',
      },
      { type: 'h2', text: 'Why the same brief gets four different prices' },
      {
        type: 'p',
        text: 'Ask for "a website for my business" and you can be quoted any of these. They are genuinely different things, not better and worse versions of one thing.',
      },
      {
        type: 'ul',
        items: [
          '**A page builder subscription.** You or someone you know assembles it from a template on a hosted platform. Cheapest to start, fastest to launch, and you keep paying monthly for as long as it exists. You are renting.',
          '**A resold template.** Someone buys a theme, swaps your logo and text in, and hands it over. Cheap, quick, and it looks like several other businesses in your city, because the same theme is on sale to everyone.',
          '**A custom build.** The layout, structure and content are designed around what you actually sell and who buys it. Costs more and takes longer, because someone is making decisions rather than filling in blanks.',
          '**An agency engagement.** A team — strategy, design, development, project management — with the overhead that a team implies. Appropriate when the scope genuinely needs several specialists.',
        ],
      },
      {
        type: 'p',
        text: 'None of these is the wrong answer. A single-location business that mainly needs to be findable and contactable may be perfectly served by the first or second. A business whose website has to do actual work — take bookings, show a catalogue, answer the questions that currently eat your phone time — usually is not.',
      },
      { type: 'h2', text: 'What actually moves the number' },
      {
        type: 'p',
        text: 'Whoever quotes you, the price is driven by the same handful of things. If you can describe these six, you can compare two quotes properly.',
      },
      {
        type: 'ol',
        items: [
          '**How many pages, and how different they are.** Six pages that share one layout is a much smaller job than six pages that each need their own. Page count alone tells you very little.',
          '**Whether the design is made or bought.** Custom design is usually the single largest line. It is also what stops your site looking like everyone else\'s.',
          '**Who writes the content.** Text and photographs are the most common reason a "two week" website takes three months. If you have not written the words, someone has to, and that is billable work.',
          '**What it has to connect to.** A contact form is trivial. Online payments, a booking calendar, live inventory or an existing billing system each add real work and real testing.',
          '**Whether you can edit it yourself.** Being able to change your own prices, menu or hours without calling anyone costs more up front and usually pays for itself.',
          '**What happens after launch.** Someone has to apply security updates, renew things and fix what breaks. If a quote does not mention this, ask.',
        ],
      },
      { type: 'h2', text: 'My own starting ranges' },
      {
        type: 'p',
        text: 'So that this article is not just theory, here is what I charge. These are starting ranges for the kind of work described, not fixed quotes — I confirm a firm number in writing, with a timeline, once the scope is clear.',
      },
      {
        type: 'table',
        head: ['What it is', 'My starting range', 'Typical timeline'],
        rows: [
          ['Business website', '{{website.inr}} · {{website.usd}}', '{{website.time}}'],
          ['Web app or MVP', '{{mvp.inr}} · {{mvp.usd}}', '{{mvp.time}}'],
          ['Flutter mobile app', '{{app.inr}} · {{app.usd}}', '{{app.time}}'],
          ['Ongoing maintenance', '{{care.inr}} · {{care.usd}}', 'Monthly, cancel any time'],
        ],
      },
      {
        type: 'p',
        rich: [
          'The business website figure covers four to six sections designed around what you sell, built responsive, with an enquiry form, a WhatsApp button, basic on-page SEO and deployment onto hosting you own. The full breakdown of what is and is not included is on my ',
          { href: '/services', label: 'services page' },
          '.',
        ],
      },
      { type: 'h2', text: 'The costs that are not in the quote' },
      {
        type: 'p',
        text: 'Development is a one-time cost. Running a website is not. Budget for these separately, whoever builds it:',
      },
      {
        type: 'ul',
        items: [
          '**A domain name**, renewed annually. Register it yourself, in your own name, before anyone else does it for you.',
          '**Hosting.** A small business site is inexpensive to host, and several good options cost nothing at this size — but the account should be yours.',
          '**Content.** Photography and copywriting are separate skills. If you want either done properly, price them in.',
          '**Changes.** Prices move, staff change, offers end. Either you can edit it yourself, or you are paying someone each time.',
        ],
      },
      { type: 'h2', text: 'Five questions to ask before you pay anyone' },
      {
        type: 'p',
        text: 'These are the questions whose answers actually protect you. Ask them of me too.',
      },
      {
        type: 'ol',
        items: [
          '**Whose name is the domain registered in?** It must be yours. If your developer owns your domain, they own your address.',
          '**Do I get the source code, and whose account is the hosting under?** "You get a website" and "you get the thing your website is made of" are not the same promise.',
          '**Can I change text and prices myself, or do I have to ask you?** Either answer can be fine. Not knowing which it is, is not.',
          '**What happens in month two?** Ask specifically what is covered after launch, for how long, and what it costs afterwards.',
          '**Can I see something you built that is live now?** Not a screenshot. A working URL you can open on your own phone.',
        ],
      },
      {
        type: 'callout',
        title: 'The one thing worth over-indexing on',
        text: 'Ownership. A cheap website you fully own is recoverable — any developer can pick it up. An expensive website you do not own is a hostage situation, and it is the single most common way small businesses lose years of work. Everything I build is transferred into your accounts at handover.',
      },
      { type: 'h2', text: 'How to decide' },
      {
        type: 'ul',
        items: [
          '**You mainly need to exist and be contactable.** A template or builder site is a reasonable, honest choice. Spend the difference on photographs.',
          '**Your website has to do a job** — take bookings, show a real catalogue, answer the questions currently eating your phone time — then a custom build starts paying for itself.',
          '**Your website is the product.** You are not buying a website; you are building software. That is the web app / MVP row in the table above.',
        ],
      },
      {
        type: 'p',
        rich: [
          'If you are weighing the third case, ',
          { href: '/blog/flutter-vs-react-native-indian-startup-mvp', label: 'the other article here' },
          ' works through the mobile side of that decision.',
        ],
      },
    ],
    faq: [
      {
        q: 'Can you tell me the average price of a website in Gujarat?',
        a: 'No, and I would be careful with anyone who does. I have no survey data covering the state, so any average I gave you would be invented. What I can give you is my own starting range and an honest explanation of what moves it, which is what this article does.',
      },
      {
        q: 'Is a cheap template website always a bad idea?',
        a: 'Not at all. For a business that mainly needs to be findable and contactable, a template site is a sensible use of money. It becomes a bad idea when your site needs to do something specific, or when you do not own it.',
      },
      {
        q: 'How long does a business website take to build?',
        a: 'For the kind of business website I build, about two weeks once the content is ready. Content being ready is the usual bottleneck — if photographs and text are still being written, that is what sets the date, not the development.',
      },
      {
        q: 'Do I own the website when it is finished?',
        a: 'With me, yes — completely. The repository, the hosting account and the domain are set up in your name or transferred at handover, and you are free to take the project to anyone else afterwards. Ask any other developer the same question before you pay a deposit.',
      },
      {
        q: 'What if my budget is below your starting range?',
        a: 'Tell me anyway. Sometimes the honest answer is that a page builder will serve you better than I will, and I would rather say that than sell you something you do not need.',
      },
    ],
    related: ['flutter-vs-react-native-indian-startup-mvp'],
    relatedProjects: ['learnnova', 'jobzee'],
    serviceKey: 'design',
  },

  // =========================================================================
  {
    slug: 'flutter-vs-react-native-indian-startup-mvp',
    published: true,
    title: 'Flutter vs React Native for an Indian Startup MVP',
    description:
      'An honest comparison for founders choosing a cross-platform framework for a first release — what genuinely differs, what does not matter as much as you think, and how to decide.',
    date: '2026-09-10',
    dateLabel: '10 September 2026',
    readingTime: '11 min read',
    tag: 'Engineering',
    standfirst:
      'Both will build your MVP. The decision is usually about your team and your interface, not about which framework is better.',
    body: [
      {
        type: 'p',
        text: 'You are building the first version of a mobile product. You do not want to pay for two native apps, so you are choosing between Flutter and React Native, and every article you have read declares one of them the winner. That is the wrong shape of answer.',
      },
      {
        type: 'p',
        text: 'Both are mature, both are free, both are used in production by companies far larger than yours, and both will get a competent MVP into the stores. Where they differ genuinely matters — but it matters in specific situations, not universally.',
      },
      {
        type: 'callout',
        title: 'My bias, stated up front',
        text: 'I build mobile apps in Flutter. That is what most of my mobile work uses, so read this knowing which side of the fence I usually stand on. I have tried to write the case for React Native as I would want it written if I were the one choosing — and there are real situations below where I would tell you to pick it over me.',
      },
      { type: 'h2', text: 'Who this is for' },
      {
        type: 'p',
        text: 'Founders and product owners making a first framework decision for a mobile MVP, who can read a technical trade-off but do not write code daily. If you already have an engineering team with a strong opinion, listen to them — they have context this article cannot.',
      },
      { type: 'h2', text: 'What they have in common' },
      {
        type: 'p',
        text: 'Worth stating plainly, because most comparisons skip it: one codebase produces both an Android and an iOS app; both are open source and free to use; both are backed by large companies and large package ecosystems; both support dropping into platform-native code when you need something they do not cover; and both have hot reload, which is a genuine difference in iteration speed against fully native development.',
      },
      {
        type: 'p',
        text: 'For a typical MVP — accounts, a database, some lists and forms, notifications, payments — neither framework is the thing that will make or break your launch.',
      },
      { type: 'h2', text: 'Where they actually differ' },
      { type: 'h3', text: '1. How the interface gets drawn' },
      {
        type: 'p',
        text: 'This is the deepest difference and it drives most of the others. React Native maps your components onto the platform\'s own native UI components. Flutter does not — it ships its own rendering engine and paints every pixel itself.',
      },
      {
        type: 'p',
        text: 'The consequence: a Flutter app looks the same on both platforms by default, which is what you want if you have a strong custom design and need it honoured exactly. A React Native app inherits each platform\'s own look and behaviour, which is what you want if you want it to feel like the rest of the phone. The flip side of Flutter drawing its own widgets is that it does not automatically inherit a platform\'s visual changes when the OS updates — that is a deliberate trade, not a defect.',
      },
      { type: 'h3', text: '2. The language, and who you can hire' },
      {
        type: 'p',
        text: 'React Native is JavaScript or TypeScript. Flutter is Dart. Dart is not hard to learn — a competent developer picks it up quickly — but it is a language most people do not already know, whereas JavaScript is everywhere.',
      },
      {
        type: 'p',
        text: 'This is usually the most decisive practical factor, and it has nothing to do with which framework is better. If your existing team writes React for the web, React Native lets them build your mobile app with the mental model they already have. If you are hiring from scratch, you are hiring for whichever you choose, and the question becomes who you can actually find and afford.',
      },
      { type: 'h3', text: '3. Sharing code with your web product' },
      {
        type: 'p',
        text: 'If you also have a React web app, React Native shares a great deal: patterns, state management, validation, business logic, and the habits of the people writing it. Flutter can target the web, but treating Flutter Web as a drop-in replacement for a React site is usually a mistake — particularly for anything that needs to be indexed by search engines.',
      },
      {
        type: 'p',
        rich: [
          'This is why my own work splits the way it does: mobile products like ',
          { href: '/projects/mindheal', label: 'MindHeal' },
          ' and ',
          { href: '/projects/shiftly', label: 'Shiftly' },
          ' are Flutter, while a web platform like ',
          { href: '/projects/jobzee', label: 'JobZee' },
          ' is React. Choosing per-surface is often better than forcing one tool across both.',
        ],
      },
      { type: 'h3', text: '4. Performance, honestly' },
      {
        type: 'p',
        text: 'Both are fast enough for the overwhelming majority of MVPs, and anyone telling you performance alone settles this is selling something. React Native has spent years re-architecting the bridge between JavaScript and native code that used to be its main bottleneck, and modern React Native is a different proposition from the version people complained about years ago.',
      },
      {
        type: 'p',
        text: 'Where the difference becomes real is at the edges: continuous custom animation, heavily custom rendering, or long-running work on every frame. Flutter\'s compiled, self-rendered approach has an architectural advantage there. If your app is lists, forms and network calls — which most MVPs are — you will not notice.',
      },
      { type: 'h3', text: '5. When you need something the framework does not have' },
      {
        type: 'p',
        text: 'Both let you write platform-native code when required, and both have large package ecosystems that mean you usually do not have to. The practical question is not "can it?" but "has someone already?" — check that specific integrations you depend on, particularly local payment gateways and any SDK a partner requires, have a maintained package for whichever you choose. Do this before you commit, not in week five.',
      },
      { type: 'h2', text: 'When React Native is the better call' },
      {
        type: 'ul',
        items: [
          '**Your team already writes React.** This is the strongest single argument for it, and it is often decisive on its own.',
          '**You have or want a React web product** and expect to share logic and people across both.',
          '**You want the app to feel unmistakably native** on each platform rather than identical across both.',
          '**A required third-party SDK ships a React Native package** and nothing equivalent for Flutter.',
          '**You are hiring in a market where JavaScript developers are simply easier for you to find.** Check this for your own situation rather than trusting anyone\'s generalisation, mine included.',
        ],
      },
      { type: 'h2', text: 'When Flutter is the better call' },
      {
        type: 'ul',
        items: [
          '**You have a strong custom design** that must look pixel-identical on both platforms.',
          '**The interface is animation-heavy or visually unusual** rather than a standard set of platform screens.',
          '**Mobile is the product** and there is no React web app to share with.',
          '**You want one team and one codebase** with as few platform-specific branches as you can manage.',
          '**You are doing on-device work** — local inference, camera processing, offline-first storage — where a compiled runtime and tight control over the render loop help.',
        ],
      },
      {
        type: 'p',
        rich: [
          'That last point is not hypothetical. ',
          { href: '/projects/mindheal', label: 'MindHeal' },
          ' runs emotion recognition on the device itself so nothing sensitive leaves the phone, ',
          { href: '/projects/agreecare', label: 'AgreeCare' },
          ' keeps a live sensor stream readable without the interface stuttering, and ',
          { href: '/projects/shiftly', label: 'Shiftly' },
          ' opens straight into a cached schedule when the signal drops mid-shift. Those constraints are what pushed each toward Flutter.',
        ],
      },
      { type: 'h2', text: 'What matters less than founders expect' },
      {
        type: 'ul',
        items: [
          '**Which is more popular this year.** Both have long since passed the threshold where you need to worry about the ecosystem disappearing.',
          '**App size.** Both add overhead against a native app. It is rarely what decides whether people install you.',
          '**Benchmark numbers.** Almost every benchmark you will find measures something that is not your app.',
          '**Which one a large company famously uses.** Their constraints are not yours. So are their budgets.',
        ],
      },
      { type: 'h2', text: 'What actually decides most MVPs' },
      {
        type: 'p',
        text: 'In practice the choice comes down to three questions, in this order: who is going to build and then maintain this; does your design need to be identical across platforms or native to each; and do you have a web product to share code and people with. Answer those honestly and the framework usually names itself.',
      },
      {
        type: 'p',
        text: 'The failure mode I would actually worry about is not picking the "wrong" framework. It is scoping an MVP too large to finish, then blaming the tooling. A first release should do one thing convincingly for a small group of real users. Both frameworks are entirely capable of that; neither will save a scope that was never achievable.',
      },
      { type: 'h2', text: 'How long it takes' },
      {
        type: 'p',
        /* Timelines only. Figures live in the pricing section and are not
           repeated in an article that is not about pricing. */
        rich: [
          'For the cross-platform apps I build in Flutter, a first release usually takes {{app.time}} — covering both platforms from one codebase, backend integration, offline handling and store submission. A smaller web-first MVP is typically {{mvp.time}}. Both depend on how many screens and integrations are in scope. What each service includes is on my ',
          { href: '/services', label: 'services page' },
          ', and current starting ranges are in the ',
          { href: '/#pricing', label: 'pricing section' },
          '.',
        ],
      },
      {
        type: 'p',
        text: 'If your answer to the three questions above points at React Native, that is a genuinely reasonable outcome — and worth saying plainly, since Flutter is what I build in. I would rather tell you that than take on a project your team cannot maintain after I hand it over.',
      },
    ],
    faq: [
      {
        q: 'Is Flutter better than React Native?',
        a: 'Neither is better in general. Flutter draws its own interface, which suits strong custom designs and animation-heavy or on-device work. React Native uses each platform\'s native components and reuses React skills, which suits teams that already write React or have a React web product. The right answer depends on your team and your interface.',
      },
      {
        q: 'Which one is cheaper to build an MVP in?',
        a: 'The framework is rarely what drives the cost. Scope, number of screens and integrations drive it. What can genuinely affect your cost is whether you already have developers who know one of them, because that changes who you have to hire.',
      },
      {
        q: 'Can I switch frameworks later?',
        a: 'Realistically, switching means rebuilding the app, though your backend, database and design work carry over. That is a reason to think about who will maintain the code before you start, not a reason to agonise — plenty of successful products have been rewritten once they knew what they were.',
      },
      {
        q: 'Do I need separate Android and iOS developers?',
        a: 'With either framework, no — that is the point of both. You may still need occasional platform-specific work for a native integration or a store requirement, but you are not staffing two separate builds.',
      },
      {
        q: 'You build in Flutter — would you ever recommend React Native?',
        a: 'Yes. If you already have a React team, or a React web product you want to share code and people with, React Native is usually the better fit and I will say so. I would rather be honest at the start than hand over a codebase your team cannot maintain.',
      },
    ],
    related: ['business-website-cost-gujarat-2026'],
    relatedProjects: ['mindheal', 'agreecare', 'shiftly'],
    serviceKey: 'mvp',
  },
]

/**
 * The only post list any public surface may render.
 *
 * Same contract as `publishedProjects` in content.js: `published` must be an
 * explicit boolean on every entry, and a missing flag fails the build rather
 * than defaulting either way. A draft must never reach the index, a route or
 * the sitemap by being forgotten about.
 */
const undeclared = posts.filter((post) => typeof post.published !== 'boolean')
if (undeclared.length > 0) {
  throw new Error(
    `Post(s) missing an explicit "published" boolean: ${undeclared
      .map((post) => post.slug)
      .join(', ')}. Set published: true to publish, or published: false to keep it a draft.`,
  )
}

export const publishedPosts = posts.filter((post) => post.published === true)
