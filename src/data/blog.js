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
  lede: 'Writing about what software actually costs, which tools make sense when, and the engineering behind apps that keep working when the network does not.',
  meta: {
    title: 'Blog — Notes on Building Apps & Websites | Dhatri Patel',
    description:
      'Practical writing on what websites and apps cost, choosing between Flutter and React Native, on-device AI, offline-first apps, and who owns your code when a project ends.',
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
    related: ['mobile-app-or-website-for-your-business', 'who-owns-your-app-code-and-accounts'],
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
    related: ['on-device-ai-mobile-apps', 'mobile-app-or-website-for-your-business'],
    relatedProjects: ['mindheal', 'agreecare', 'shiftly'],
    serviceKey: 'mvp',
  },
  // =========================================================================
  {
    slug: 'mobile-app-or-website-for-your-business',
    published: true,
    title: 'Do You Need a Mobile App, or Just a Website?',
    description:
      'Most businesses that ask me for an app need a website. Here is how to tell which one your problem actually calls for, before you spend on the wrong thing.',
    date: '2026-09-11',
    dateLabel: '11 September 2026',
    readingTime: '8 min read',
    tag: 'Deciding',
    standfirst:
      'An app costs several times what a website does and is harder to get in front of people. Sometimes it is still the right answer. Often it is not.',
    body: [
      {
        type: 'p',
        text: 'A common way a software conversation starts is "I want an app". Once you ask what it actually needs to do, the answer is sometimes something a website would do better, sooner and for a good deal less money.',
      },
      {
        type: 'p',
        text: 'That is not a reason to be cynical about apps. It is a reason to be specific about what an app is actually for, because the two are not interchangeable products at different price points — they solve different problems and reach people in completely different ways.',
      },
      { type: 'h2', text: 'Who this is for' },
      {
        type: 'p',
        text: 'Business owners and early founders about to commission their first piece of software, who have been told they need an app and want to sanity-check that before spending. If you already know your users will open the thing several times a week, you can probably skip to the trade-offs.',
      },
      { type: 'h2', text: 'The one question that settles most cases' },
      {
        type: 'callout',
        title: 'How often will one person open this?',
        text: 'Daily or several times a week, for months — an app starts to justify itself. A few times a year, or once to make a decision and then not again — a website will usually serve those people better, because people are reluctant to install an app for something they do occasionally.',
      },
      {
        type: 'p',
        text: 'Installing is friction. A person has to want your thing enough to go to a store, wait for a download, and give up storage on a phone that may not have much to spare. A website asks none of that — they tap a link and they are in. For anything occasional, that gap is hard to close with polish inside the app, because the drop-off happens before anyone opens it.',
      },
      { type: 'h2', text: 'What an app genuinely gives you' },
      {
        type: 'p',
        text: 'These are the things a website cannot do well, or at all. If none of them describes your product, that is a strong signal.',
      },
      {
        type: 'ul',
        items: [
          '**A place on the home screen.** Being one tap away, every day, with your icon in someone\'s pocket. For a habit product, that is the product.',
          '**Push notifications.** Real ones that arrive reliably. This is often the actual reason a business wants an app, and it is worth naming out loud if so.',
          '**Working properly offline.** Not "it caches a bit" — genuinely usable with no signal, which matters enormously for field work, shop floors and warehouses.',
          '**Deep access to the device.** Continuous camera work, sensors, Bluetooth, background location, on-device processing. A browser gives you a limited, permission-gated version of some of this.',
          '**Work that continues in the background.** Syncing, tracking or processing while the app is not open.',
        ],
      },
      { type: 'h2', text: 'What a website does better' },
      {
        type: 'ul',
        items: [
          '**People can find you.** Search engines index websites. App store discovery works differently and ranking there is a separate problem to solve, so a listing is rarely a substitute for being findable in search.',
          '**No install, no friction.** A link in a WhatsApp message opens immediately — which, for a lot of local businesses, is most of the journey from first contact to enquiry.',
          '**One build instead of two platforms plus review queues.** No store submission, no waiting for approval to ship a fix.',
          '**Changing it is cheap and instant.** New prices, new hours, a new offer — live in minutes, with nothing to re-download.',
          '**It costs less to build and much less to keep running.**',
        ],
      },
      { type: 'h2', text: 'How this plays out in practice' },
      {
        type: 'p',
        rich: [
          'It is the same split across my own work. ',
          { href: '/projects/shiftly', label: 'Shiftly' },
          ' is an app because staff check their shifts every working day, often on a back-of-house network where the signal drops — daily use plus genuine offline need, which is exactly the case an app is for. ',
          { href: '/projects/jobzee', label: 'JobZee' },
          ' is a web platform because job hunting is bursty rather than daily, and because a job listing that cannot be found in a search engine may as well not exist.',
        ],
      },
      {
        type: 'p',
        rich: [
          { href: '/projects/agreecare', label: 'AgreeCare' },
          ' sits in the first camp for a different reason: it reads live sensor data and is used standing in a field. That is device access and connectivity, not habit — but it points the same way.',
        ],
      },
      { type: 'h2', text: 'The middle ground worth knowing about' },
      {
        type: 'p',
        text: 'A modern website can be saved to a home screen and can work offline to a degree. On Android this gets you reasonably close to an app for simple cases. On iPhone the support is narrower — web push, for one, only works once someone has added the site to their Home Screen — so it is worth checking the current limitations against what your feature actually needs before relying on it.',
      },
      {
        type: 'p',
        text: 'It is a genuine option for a first release — cheaper, faster, one codebase, and you find out whether people use the thing at all before committing to store builds. It is not a substitute for an app whose whole point is notifications or hardware access.',
      },
      { type: 'h2', text: 'A decision you can make in five minutes' },
      {
        type: 'ol',
        items: [
          '**Will one person open this weekly, for months?** No — build a website.',
          '**Do you need reliable push notifications, real offline use, or device hardware?** No — build a website.',
          '**Do customers need to find you through Google?** Yes, and it is your main channel — you need a website regardless, even if you also build an app.',
          '**Are you testing whether anyone wants this at all?** Then build the cheapest thing that proves it, which is usually a web version.',
          '**Still pointing at an app after all four?** Then it is an app, and you have a defensible reason to give anyone who asks.',
        ],
      },
      {
        type: 'p',
        rich: [
          'Worth saying plainly: I build both. I am not steering you toward the cheaper one out of modesty — a website that gets used beats an app that gets installed twice and forgotten, and I would rather build the thing that works. What each option involves is on my ',
          { href: '/services', label: 'services page' },
          '.',
        ],
      },
    ],
    faq: [
      {
        q: 'Can I start with a website and add an app later?',
        a: 'Yes, and it is often the sensible order. A web version gets you real users, real feedback and a proven backend, all of which an app can then reuse. The backend, database and design work carry across; the interface is what gets rebuilt.',
      },
      {
        q: 'Will having an app make my business look more serious?',
        a: 'To some people, briefly. But an app with almost no installs and a stale listing reads worse than a sharp website, and prospective customers are far more likely to encounter your website than your store page.',
      },
      {
        q: 'My competitor has an app. Do I need one?',
        a: 'Only if their customers actually use it. It is worth checking the reviews and the last update date before treating it as evidence of anything; an app that has not been updated in two years tells you something about how much it is being used.',
      },
      {
        q: 'What if I need notifications but not a full app?',
        a: 'For many businesses WhatsApp and email already do this well, and customers are already there. It is worth exhausting those before paying for an app whose main justification is a notification you could have sent another way.',
      },
      {
        q: 'How do I know which one you would recommend for me?',
        a: 'Describe what you want people to do and how often they would do it. That usually answers it in one message, and if a website is the better call I will say so rather than sell you the larger project.',
      },
    ],
    related: ['business-website-cost-gujarat-2026', 'flutter-vs-react-native-indian-startup-mvp'],
    relatedProjects: ['shiftly', 'jobzee'],
    serviceKey: 'design',
  },

  // =========================================================================
  {
    slug: 'on-device-ai-mobile-apps',
    published: true,
    title: 'Running AI on the Phone Instead of the Cloud',
    description:
      'What it means to run a model on the device itself, what it costs you in app size and engineering, and when sending data to a server is still the better call.',
    date: '2026-09-11',
    dateLabel: '11 September 2026',
    readingTime: '10 min read',
    tag: 'Engineering',
    standfirst:
      'On-device inference is the difference between a feature that needs a network and a promise that nothing personal ever leaves the phone. It is not free.',
    body: [
      {
        type: 'p',
        text: 'Most AI features in mobile apps work the same way: the app collects something — a photo, a recording, some text — sends it to a server, and waits. That is simple to build and it scales with whatever model you can afford to run.',
      },
      {
        type: 'p',
        text: 'It also means the thing being analysed leaves the user\'s device. For some products that is a detail. For others it is the product, and the decision has to go the other way.',
      },
      { type: 'h2', text: 'Who this is for' },
      {
        type: 'p',
        text: 'Founders and product owners weighing an AI feature for a mobile app who want to understand the trade-off before committing. There is enough engineering detail here to be useful to a developer, but nothing that requires you to be one.',
      },
      { type: 'h2', text: 'What "on-device" actually means' },
      {
        type: 'p',
        text: 'A trained model is a file. Runtimes like ONNX Runtime and TensorFlow Lite can load that file and run it directly on the phone\'s own processor, and platform kits like Google ML Kit ship ready-made models for common jobs such as face, text and barcode detection.',
      },
      {
        type: 'p',
        text: 'The model ships inside your app, or is downloaded once. After that, every prediction happens locally. There is no request, no queue, no server bill per call.',
      },
      { type: 'h2', text: 'What you get' },
      {
        type: 'ul',
        items: [
          '**Data that never leaves the device.** Not "encrypted in transit" or "deleted after processing" — never sent. That is a categorically different promise, and the only one that is easy to keep.',
          '**No network round trip.** Responses are immediate, which is what makes anything camera-driven feel live rather than laggy.',
          '**It works with no signal.** The feature does not quietly stop being available on a train or in a basement.',
          '**No per-prediction cost.** Running inference a thousand times costs you nothing extra. A hosted model does not work that way.',
          '**Nothing to keep running.** No inference server to scale, secure, patch or pay for when the app is idle.',
        ],
      },
      { type: 'h2', text: 'What it costs you' },
      {
        type: 'p',
        text: 'This is the half that tends to get skipped, and it is where the engineering actually lives.',
      },
      { type: 'h3', text: 'The app gets bigger' },
      {
        type: 'p',
        text: 'A bundled model adds to your download size, and download size affects whether people finish installing. You can ship the model separately and fetch it on first run, which keeps the store listing small but adds a first-launch state you now have to design and handle when it fails.',
      },
      { type: 'h3', text: 'You are working inside a real budget' },
      {
        type: 'p',
        text: 'A phone has far less memory and a thermal ceiling a server does not. Models usually need to be quantised — stored at lower numeric precision — to fit and run at a sensible speed. That shrinks the file and speeds up inference, and it costs some accuracy. Whether that trade is acceptable is a question about your product, not about the model.',
      },
      { type: 'h3', text: 'Inference must stay off the interface thread' },
      {
        type: 'p',
        text: 'This is an easy way for a promising on-device feature to end up feeling broken. Run a model on the same thread that draws the interface and it freezes for the duration of every prediction. The work has to happen somewhere else — Flutter and the native platforms each provide ways to move it off the UI thread — so that frames keep rendering while an image is being processed.',
      },
      { type: 'h3', text: 'Devices vary enormously' },
      {
        type: 'p',
        text: 'A model that runs comfortably on a recent flagship can be unusably slow on an older mid-range handset. Test on the kind of hardware your users actually have rather than the device on your desk — and if you do not know what that is, it is worth finding out before the model is chosen.',
      },
      { type: 'h3', text: 'Updating the model means updating the app' },
      {
        type: 'p',
        text: 'A hosted model can be swapped out on a Tuesday afternoon and every user gets the new one. A bundled model reaches people at the speed of app updates and store review. If you expect to iterate on the model weekly, that friction is a real argument against shipping it inside the app.',
      },
      { type: 'h2', text: 'How this looked on a real build' },
      {
        type: 'p',
        rich: [
          { href: '/projects/mindheal', label: 'MindHeal' },
          ' is a mental-health companion that reads emotional signals, and it is the clearest case I have built for keeping inference local. Mental-health data is the kind you design around rather than for — so the privacy line came first: inference on the device, nothing sensitive synced, and anything that did not fit inside that constraint was simply not an option.',
        ],
      },
      {
        type: 'p',
        text: 'In practice that meant quantised ONNX models, ML Kit handling the camera-side detection, and inference kept off the UI thread so the interface never blocks while a frame is processed. The genuinely hard part was not the model, though. It was the copy: a model output is a probability, not a fact about a person, and every string had to present a reading as something to reflect on rather than a verdict.',
      },
      {
        type: 'callout',
        title: 'The part worth stealing',
        text: 'Drawing the privacy boundary before any architecture decisions made every later decision easier, because it removed options rather than adding them. If you are building anything with sensitive data, decide what must never leave the device first — then design inside that.',
      },
      { type: 'h2', text: 'When the cloud is the right answer' },
      {
        type: 'ul',
        items: [
          '**The model is too large to run on a phone.** Most large language models are, and pretending otherwise wastes months.',
          '**You expect to improve the model frequently.** Server-side means everyone gets the improvement at once.',
          '**Results must be identical for every user.** Device variation means on-device output can differ across handsets.',
          '**The work is genuinely heavy** — long video, large batches, anything that would flatten a battery.',
          '**The data is not sensitive and is going to the server anyway.** Then you are paying the on-device cost for a benefit you do not need.',
        ],
      },
      { type: 'h2', text: 'How to decide' },
      {
        type: 'p',
        text: 'Start from the data, not the model. If the thing being analysed is a face, a voice, a medical note or a document, on-device is worth the engineering and worth saying so plainly to your users. If it is a product photo or a search phrase, a server is simpler and you should take the simpler path.',
      },
      {
        type: 'p',
        rich: [
          'Then check the second constraint: does the feature need to work offline, and how fast must it feel? Camera-driven features generally need to be local to feel right at all. If you want to talk through a specific feature, the ',
          { href: '/services', label: 'Flutter app development' },
          ' page covers how I scope this kind of work.',
        ],
      },
    ],
    faq: [
      {
        q: 'Does on-device AI mean my app works completely offline?',
        a: 'The inference does. The rest of your app might still need a network for accounts, syncing or content, so "the model runs offline" and "the app works offline" are two separate pieces of work.',
      },
      {
        q: 'Is on-device inference less accurate than a cloud model?',
        a: 'Usually somewhat, because the model has to be small enough to fit and quantised enough to run quickly. Whether that gap matters depends entirely on what the feature does — for many tasks it is imperceptible, and for some it is disqualifying.',
      },
      {
        q: 'Will it drain the battery?',
        a: 'Continuous inference on a camera feed uses real power, yes. Occasional inference on a single image is negligible. If the feature runs constantly, battery use becomes a design constraint you plan around rather than discover later.',
      },
      {
        q: 'Can I use an on-device model and a cloud one together?',
        a: 'Often the best answer. Run the fast local model for the immediate response, and send the harder cases to a server when a network is available and the user has agreed to it.',
      },
      {
        q: 'Do I need a data scientist to do this?',
        a: 'Not necessarily. Plenty of production features use an existing pre-trained model or a platform kit rather than a custom-trained one. Training something genuinely new is a different project with a different team.',
      },
    ],
    related: ['offline-first-mobile-apps', 'flutter-vs-react-native-indian-startup-mvp'],
    relatedProjects: ['mindheal', 'agreecare'],
    serviceKey: 'flutter',
  },

  // =========================================================================
  {
    slug: 'offline-first-mobile-apps',
    published: true,
    title: 'Building an App That Keeps Working When the Signal Drops',
    description:
      'Why "handles offline" is usually bolted on and fails, what offline-first actually changes about the architecture, and how to decide whether your app needs it.',
    date: '2026-09-11',
    dateLabel: '11 September 2026',
    readingTime: '9 min read',
    tag: 'Engineering',
    standfirst:
      'Most apps treat no-signal as an error state. For anything used on a shop floor, in a warehouse or out in a field, it is the normal state.',
    body: [
      {
        type: 'p',
        text: 'Open a typical app on a bad connection and you get a spinner, then an error, then a retry button. That is a reasonable design for an app used at a desk. It is the wrong design for one used in a basement stockroom, on a factory floor, in a lift, or standing in a field — and a lot of business software is used in exactly those places.',
      },
      {
        type: 'p',
        text: 'The distinction is not how much offline support you add. It is which side you build from.',
      },
      { type: 'h2', text: 'Who this is for' },
      {
        type: 'p',
        text: 'Anyone commissioning an app whose users are not sitting still on good Wi-Fi: field staff, delivery teams, retail and hospitality floors, warehouses, clinics, anything agricultural. It is also worth reading if your app already exists and people complain that it "does not work properly" without being able to say exactly when.',
      },
      { type: 'h2', text: 'Offline-as-a-feature versus offline-first' },
      {
        type: 'p',
        text: 'The usual approach builds the app against the network and adds offline handling afterwards. The app asks the server for data, and if the request fails it shows an error and perhaps serves something stale. Offline becomes an exception branch, and exception branches tend to be the least-tested code in a codebase.',
      },
      {
        type: 'p',
        text: 'Offline-first inverts it. The app reads from a local database on the device, always. That local copy is what the interface renders — never a network response. Syncing runs alongside, updating the local copy when a connection exists. The network becomes something that improves the data rather than something the screen waits for.',
      },
      {
        type: 'callout',
        title: 'The practical difference',
        text: 'An offline-first app opens straight into content because it never had to ask anyone for it. The spinner leaves the product entirely, and not only when the signal is bad.',
      },
      { type: 'h2', text: 'What this actually requires' },
      { type: 'h3', text: '1. A real local database' },
      {
        type: 'p',
        text: 'Not a cache you clear when convenient — a proper store that survives restarts and is treated as the source the UI reads. On Flutter that is typically Hive, Isar or SQLite. Some backends help here: Firestore ships with offline persistence and handles a good portion of this for you, which is often the fastest sensible route.',
      },
      { type: 'h3', text: '2. Writes that queue instead of failing' },
      {
        type: 'p',
        text: 'When someone marks a job done with no signal, that action must be recorded locally, reflected in the interface immediately, and sent later. The queue has to survive the app being closed and the phone being restarted, because it will be.',
      },
      { type: 'h3', text: '3. A decision about conflicts' },
      {
        type: 'p',
        text: 'Two people edit the same record offline. Both come back online. Something has to give, and the correct answer is a product decision rather than a technical one: last write wins, merge field by field, or surface it and ask a human. Choosing nothing means choosing last-write-wins by accident and quietly losing someone\'s work.',
      },
      { type: 'h3', text: '4. Honesty in the interface' },
      {
        type: 'p',
        text: 'If a change has not synced yet, say so — quietly, but say it. A pending state is easy enough to live with. Being shown a confirmation for something that silently never happened is not.',
      },
      { type: 'h2', text: 'How this looked on a real build' },
      {
        type: 'p',
        rich: [
          { href: '/projects/shiftly', label: 'Shiftly' },
          ' is shift management for teams, and it pushed hard on exactly this. The insight that shaped it was that the rota is rarely wrong — the version someone is looking at is. Re-sending a spreadsheet creates another version rather than replacing the last one.',
        ],
      },
      {
        type: 'p',
        text: 'So the goal became one propagating source of truth rather than a better way to send a rota around. Hive holds a local copy and Firestore reconciles it, which means the app opens into the schedule rather than a loading state, and stays readable when the signal drops mid-shift. Writes queue and settle when connectivity returns — which matters on a shop floor or a back-of-house network, which is precisely where the app is used.',
      },
      {
        type: 'p',
        rich: [
          { href: '/projects/agreecare', label: 'AgreeCare' },
          ' has a related constraint from the other direction: it streams live sensor readings, and the interface has to stay responsive while values arrive continuously. Keeping state out of the widget tree is what stops a steady data feed turning into a stuttering screen.',
        ],
      },
      { type: 'h2', text: 'Testing it properly' },
      {
        type: 'ul',
        items: [
          '**Airplane mode is the easy case.** Fully off is simple; it is the in-between that breaks things.',
          '**Test a bad connection, not a dead one.** Requests that hang for thirty seconds and then fail expose far more bugs than a clean disconnection.',
          '**Kill the app mid-sync.** Force-quit with items in the queue, reopen, and check nothing was lost or sent twice.',
          '**Go offline on one device, change the same record on another.** This is where your conflict decision either exists or does not.',
          '**Leave it offline for a day.** Queues that work for five minutes sometimes do not work for five hours.',
        ],
      },
      { type: 'h2', text: 'When not to bother' },
      {
        type: 'p',
        text: 'This is real engineering and it is not free. If your app is used at a desk on reliable Wi-Fi, if the data is inherently live and stale values are useless — a payment balance, a live auction — or if it is mostly a browsing experience over a big remote catalogue, then standard caching and a decent error state are the proportionate answer.',
      },
      {
        type: 'p',
        rich: [
          'The test I would apply: if a user cannot do their job for the next ten minutes because the signal dropped, offline-first is worth it. If they are merely inconvenienced, it probably is not. If you are not sure which describes your situation, that is worth a conversation before the architecture is chosen — it is much cheaper to decide this at the start than to retrofit it. The ',
          { href: '/services', label: 'Flutter app development' },
          ' page covers how I scope that.',
        ],
      },
    ],
    faq: [
      {
        q: 'Does offline-first make the app more expensive to build?',
        a: 'It adds work — the local store, the sync layer, the conflict decision and the testing. Retrofitting it onto a finished app costs considerably more than designing for it at the start, which is the main reason to decide early.',
      },
      {
        q: 'Does Firebase handle this for me?',
        a: 'Firestore includes offline persistence and queues writes, which covers a good portion of the problem and is often the fastest sensible route. It does not decide your conflict strategy or design your pending states — those are still yours.',
      },
      {
        q: 'How much data can the app store locally?',
        a: 'Far more than most business apps need. The practical limit is usually what is sensible to sync and keep current, not what the device can physically hold.',
      },
      {
        q: 'What happens if two people change the same thing offline?',
        a: 'Whatever you decided would happen. That is the point of naming a conflict strategy up front — without one you get last-write-wins by default, and someone quietly loses work without ever being told.',
      },
      {
        q: 'Can a website work offline too?',
        a: 'To a degree, with service workers and local storage, and for simple cases it is genuinely useful. It is less capable and less predictable than a native app doing the same job, particularly on iPhone.',
      },
    ],
    related: ['on-device-ai-mobile-apps', 'mobile-app-or-website-for-your-business'],
    relatedProjects: ['shiftly', 'agreecare'],
    serviceKey: 'flutter',
  },

  // =========================================================================
  {
    slug: 'who-owns-your-app-code-and-accounts',
    published: true,
    title: 'Who Owns Your App When the Project Ends?',
    description:
      'The five things that must be registered in your name, why they so often are not, and the handover checklist to run before you make a final payment.',
    date: '2026-09-11',
    dateLabel: '11 September 2026',
    readingTime: '7 min read',
    tag: 'Working together',
    standfirst:
      'The most expensive mistake in a small software project is rarely the build. It is discovering afterwards that you do not own what you paid for.',
    body: [
      {
        type: 'p',
        text: 'A business pays for a website or an app, is happy with it, and a year later wants a change. The developer has moved on, is unreachable, or wants more than the change is worth. And it turns out the domain is registered to them, the code is in their account, and the app listing sits under their developer profile.',
      },
      {
        type: 'p',
        text: 'At that point the options are bad: track down someone who does not want to be found, or pay to rebuild something that already exists. This is rarely anyone setting out to trap a client. It usually happens because everything gets set up in whichever account was convenient on day one, and it does not get revisited.',
      },
      { type: 'h2', text: 'Who this is for' },
      {
        type: 'p',
        text: 'Anyone about to hire a developer, agency or freelancer for the first time — and anyone who already has, and has never actually checked. If that is you, the checklist below is worth ten minutes.',
      },
      { type: 'h2', text: 'The five things that must be yours' },
      { type: 'h3', text: '1. The domain name' },
      {
        type: 'p',
        text: 'The single most important one. Your domain is your address; if someone else holds the registration, they control where your customers land and what happens to your email. Register it yourself, with your own account and your own card, before the project starts. It takes ten minutes and it is the cheapest insurance in the whole process.',
      },
      { type: 'h3', text: '2. The source code' },
      {
        type: 'p',
        text: 'The repository should end up in an account you control, with the full history rather than a zip file dropped into your inbox at the end. History matters more than it sounds: the next developer can see how the thing evolved instead of guessing, which is the difference between an afternoon and a fortnight when something needs changing.',
      },
      { type: 'h3', text: '3. Hosting' },
      {
        type: 'p',
        text: 'Whatever the site or app runs on should be billed to you and logged into by you. If your developer is paying for hosting and adding it to an invoice, you have a dependency you did not agree to.',
      },
      { type: 'h3', text: '4. The backend and database' },
      {
        type: 'p',
        text: 'This one is missed most often. A Firebase project, a database, a storage bucket — these hold your actual data, which is usually worth far more than the code. The project should be under your account with billing attached to you, and your developer added as a collaborator rather than the other way round.',
      },
      { type: 'h3', text: '5. The app store accounts' },
      {
        type: 'p',
        text: 'For a mobile app, the Play Console and Apple Developer accounts should be registered to your business, with their own registration fees paid by you. Publishing under a developer\'s account happens, and it is a serious trap — your listing, your reviews and your install base end up inside someone else\'s profile, and moving an app between accounts afterwards is painful in a way that moving a website is not.',
      },
      {
        type: 'callout',
        title: 'The simple rule',
        text: 'Anything with a login or a renewal date should be in your name, with your developer invited in as a collaborator. Not the reverse. Invitations are easy to revoke; account ownership is not.',
      },
      { type: 'h2', text: 'The handover checklist' },
      {
        type: 'p',
        text: 'Run this before the final payment, not after. A developer who has done the job properly will find it quick to satisfy.',
      },
      {
        type: 'ol',
        items: [
          '**Log in to every account yourself.** Not a screenshot, not a promise — you, logging in, while the project is still live.',
          '**Confirm the domain registration shows your name** and note the renewal date in your calendar.',
          '**Check the repository is in your account** with full history, and that you can see the commits.',
          '**Confirm billing on hosting and backend is attached to your payment method.**',
          '**For an app, sign in to the store consoles** and confirm the listing sits under your organisation.',
          '**Get something written down** covering how to deploy a change, where things live, and what depends on what. It does not need to be long. It needs to exist.',
          '**Remove access you no longer need** once the engagement genuinely ends.',
        ],
      },
      { type: 'h2', text: 'What good looks like from the other side' },
      {
        type: 'p',
        rich: [
          'For what it is worth, this is how I work: repositories, hosting, Firebase projects, store listings and domains are created under your ownership or transferred at handover, and you get a walkthrough of how to run it. Nothing stays locked to me, and you are free to take the project to someone else at any point. I would rather be kept because the work is good than because leaving is expensive. More on how I run projects is on the ',
          { href: '/about', label: 'about page' },
          '.',
        ],
      },
      {
        type: 'p',
        text: 'Ask any developer you are considering the same question before you pay a deposit. The answer tells you a great deal — not just about ownership, but about how the rest of the engagement is likely to go.',
      },
      { type: 'h2', text: 'If you are already locked in' },
      {
        type: 'p',
        text: 'It is usually recoverable, and worth doing calmly rather than as an argument. Ask politely and specifically: transfer the domain, add me as owner on the repository, move billing to my card. Often that is all it takes. If you cannot reach them at all, domain registrars and platform providers have dispute processes, and proof of payment plus business documentation goes a long way.',
      },
      {
        type: 'p',
        text: 'The one genuinely hard case is a mobile app published under someone else\'s developer account. Plan for that to be slow, and start on it before you need it urgently.',
      },
    ],
    faq: [
      {
        q: 'Do I need a written contract for a small project?',
        a: 'Something in writing, yes — even a clear email covering scope, price, timeline and who owns what. It protects both sides, and the act of writing it down surfaces disagreements while they are still cheap to resolve.',
      },
      {
        q: 'My developer says they need to own the accounts to work on it. Is that true?',
        a: 'No. Every major platform supports inviting a collaborator with full working access while ownership stays with you. If someone insists otherwise, ask them to explain which platform limitation they mean.',
      },
      {
        q: 'What if I do not understand the technical side well enough to check?',
        a: 'You do not need to. The checklist above is just logging in to accounts and confirming your name is on them. If you cannot log in, that is the finding — no technical knowledge required.',
      },
      {
        q: 'Should I pay the full amount before handover is complete?',
        a: 'Holding a final portion until you have confirmed access is normal and reasonable, and a developer who has done this before will not be surprised by it. It is not an accusation; it is how the last step gets prioritised.',
      },
      {
        q: 'Does owning the code mean I can hire anyone else to change it?',
        a: 'Yes, and that is precisely the point. Owning the repository, the accounts and some basic documentation means any competent developer can pick it up — which is what keeps you from being stuck with anyone, including me.',
      },
    ],
    related: ['business-website-cost-gujarat-2026', 'mobile-app-or-website-for-your-business'],
    relatedProjects: ['jobzee', 'shiftly'],
    serviceKey: 'web',
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
