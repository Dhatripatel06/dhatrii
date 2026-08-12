// ---------------------------------------------------------------------------
// All site copy lives here. Image paths resolve against /public — a missing
// file renders as a labelled placeholder rather than a broken image.
// ---------------------------------------------------------------------------

export const profile = {
  name: 'Dhatri Patel',
  wordmark: 'Dhatri',
  firstName: 'Dhatri',
  lastName: 'Patel',
  role: 'Flutter & Web Developer',
  email: 'dhatripatel67@gmail.com',
  whatsapp: '919000000000', // country code + number, digits only
  location: 'Available Worldwide',
  portrait: '/images/portrait.jpg',
}

export const nav = [
  { id: 'top', label: 'Home' },
  { id: 'work', label: 'Projects' },
  { id: 'services', label: 'Services' },
  { id: 'pricing', label: 'Pricing' },
]

export const hero = {
  hello: 'Hello',
  roleLead: "I'm a",
  roleBold: 'Flutter Developer',
  roleTail: 'and Designer',
  quote:
    '“I design and build beautifully simple products, and I love what I do”',
  rating: { stars: 5, label: '50+ clients' },
  primaryCta: { label: 'Get Started', href: '#contact' },
  secondaryCta: { label: 'My Works', href: '#work' },
  contactLink: { label: 'Contact me', href: '#contact' },
}

export const brands = {
  title: "Trusted by the industry's leading brands",
  logos: ['Nenjam', 'MindHeal', 'SmartEcom', 'KCT Cafe', 'Helve Neue'],
}

export const journey = {
  eyebrow: 'My clients and me',
  titleLight: 'My journey in',
  titleBold: 'Numbers',
  note: 'Great products come from great collaboration',
  avatars: ['AM', 'SR', 'VS'],
  /* Two tiles side by side: a wide accent-filled one and a narrow dark one. */
  stats: [
    {
      eyebrow: 'Client retention',
      title: 'Clients who come back in 2026',
      value: '98%',
      featured: true,
    },
    {
      eyebrow: 'Work',
      title: 'Projects Done',
      value: '30',
      featured: false,
    },
  ],
}

export const work = {
  titleLight: 'Projects',
  titleBold: 'Done',
  lede: 'A showcase of the products I have designed and shipped, highlighting my skills and experience.',
  cta: { label: 'View All Projects', href: '#contact' },
}

export const projects = [
  {
    slug: 'nenjam-matrimony',
    title: 'Nenjam Matrimony',
    tags: 'flutter, firebase',
    image: '/images/nenjam-matrimony.jpg',
    tint: 'accent',
  },
  {
    slug: 'mindheal',
    title: 'MindHeal',
    tags: 'ai, mobile app',
    image: '/images/mindheal.jpg',
    tint: 'violet',
  },
  {
    slug: 'smartecom',
    title: 'SmartEcom',
    tags: 'react, commerce',
    image: '/images/smartecom.jpg',
    tint: 'emerald',
  },
  {
    slug: 'kct-cafe',
    title: 'KCT Cafe',
    tags: 'branding, web',
    image: '/images/kct-cafe.jpg',
    tint: 'indigo',
  },
]

export const experience = {
  startYear: '2021',
  endLabel: 'Present',
  entries: [
    {
      period: '2024 - Present',
      role: 'Independent',
      title: 'Product Developer',
      company: 'Freelance',
    },
    {
      period: '2023 - 2024',
      role: 'Senior',
      title: 'Flutter Developer',
      company: 'Helve Neue Agency',
    },
    {
      period: '2022 - 2023',
      role: 'Mid-level',
      title: 'Mobile Developer',
      company: 'Atlas Neue Studio',
    },
    {
      period: '2021 - 2022',
      role: 'Junior',
      title: 'Frontend Developer',
      company: 'Northwind Labs',
    },
  ],
}

export const services = {
  titleLight: 'What I',
  titleBold: 'Do',
  lede: 'Pick a track and see how I work inside it.',
  tabs: [
    {
      key: 'mobile',
      label: 'Mobile Apps',
      badge: '4 Years Exp',
      title: 'Mobile Apps',
      body: 'Cross-platform iOS and Android apps in Flutter — one codebase, native feel, shipped to both stores.',
      number: '01',
    },
    {
      key: 'web',
      label: 'Web Design',
      badge: '4 Years Exp',
      title: 'Web Design',
      body: 'Marketing sites and web apps hand-built in React. Fast, accessible, and fully yours to own.',
      number: '02',
    },
    {
      key: 'ai',
      label: 'AI Products',
      badge: '2 Years Exp',
      title: 'AI Products',
      body: 'Chat assistants, smart search and document Q&A wired into your product — practical AI that saves real time.',
      number: '03',
    },
  ],
}

/* Two stacked action cards that sit directly below the services panel. */
export const actionCards = [
  { icon: 'Rocket', label: 'Start Now', href: '#contact', outlined: false },
  { icon: 'Phone', label: 'Contact Me', href: '#contact', outlined: true },
]

export const tools = {
  titleLight: 'Tools I',
  titleBold: 'Use',
  lede: 'Proficient in industry-standard design and development tools.',
  items: [
    { name: 'Flutter', role: 'Mobile SDK', mark: '◈', color: '#42A5F5' },
    { name: 'React', role: 'Web Library', mark: '⬡', color: '#61DAFB' },
    { name: 'Firebase', role: 'Backend', mark: '▲', color: '#60A5FA' },
    { name: 'Figma', role: 'Design Tool', mark: '◉', color: '#F24E1E' },
    { name: 'Supabase', role: 'Database', mark: '⏦', color: '#3ECF8E' },
    { name: 'OpenAI', role: 'AI Platform', mark: '✳', color: '#F5F5F5' },
  ],
}

export const workProcess = {
  titleLight: 'Work',
  titleBold: 'Process',
  lede: 'A glimpse into how we go from a first call to a shipped product.',
  steps: [
    { number: '01.', icon: 'Search', title: ['Discovery', 'Session'] },
    { number: '02.', icon: 'Map', title: ['Strategy', 'Mapping'] },
    { number: '03.', icon: 'PenTool', title: ['Prototype', 'Creation'] },
    { number: '04.', icon: 'Rocket', title: ['Final', 'Delivery'] },
  ],
}

export const testimonials = {
  titleLight: 'What',
  titleBold: 'Clients Say',
  lede: 'Building trust through client testimonials and positive feedback.',
  items: [
    {
      name: 'Arjun Mehta',
      role: 'Founder, Nenjam',
      score: '98%',
      quote:
        'Dhatri understood the product better than we had explained it. She cut two features we thought we needed and she was right — we launched a month earlier.',
      stars: 5,
    },
    {
      name: 'Dr. Sneha Rao',
      role: 'Co-founder, MindHeal',
      score: '95%',
      quote:
        'The app felt finished from the very first build. Smooth, thoughtful, no rough edges. Users keep telling us how calm it feels to use.',
      stars: 5,
    },
    {
      name: 'Vikram Shah',
      role: 'Director, SmartEcom',
      score: '96%',
      quote:
        'We had been burned by an agency before. Working with one person who answers her own messages was faster and cheaper in every way.',
      stars: 5,
    },
  ],
}

export const pricing = {
  titleLight: 'Pricing',
  titleBold: 'Plan',
  lede: 'Choose the plan that fits your project.',
  note: 'For Custom Requests',
  plans: [
    {
      key: 'basic',
      name: 'Basic',
      tagline: 'Have a design ready to build? Or a small budget?',
      price: '$40',
      unit: '/ hours',
      delivery: 'Done in 2 weeks',
      cta: 'Get Started',
      features: [
        'Design with Figma',
        'Single platform build',
        'Support for 3 months',
        'Weekly progress builds',
        'Work on business days',
      ],
    },
    {
      key: 'premium',
      name: 'Premium',
      tagline: 'Need the whole product designed and shipped?',
      price: '$60',
      unit: '/ hours',
      delivery: 'Done in 1 week',
      cta: 'Get Started',
      features: [
        'Design with Figma, Framer',
        'iOS, Android and Web',
        'Support for 12 months',
        'Build and automate advanced workflows',
        'Work on business days and weekends',
        'Unlock every tool and premium module',
      ],
    },
  ],
}

export const faqs = {
  titleLight: 'Common',
  titleBold: 'Questions',
  lede: 'Helping you understand how I work and what you get.',
  footerNote: 'Do you have any concerns before we start?',
  footerCta: { label: 'Contact me', href: '#contact' },
  items: [
    {
      q: 'How long does a typical project take?',
      a: 'A landing page runs about two weeks. A full app or web product is usually five to ten weeks depending on screens and integrations. You get a firm timeline in writing before we start.',
    },
    {
      q: 'Do you work with clients outside India?',
      a: 'Constantly. Most of my clients are in the US, UK, UAE and Australia. I keep flexible hours for calls and I am reachable on WhatsApp, Slack or email.',
    },
    {
      q: 'What do you need from me to get started?',
      a: 'Just a clear idea of what problem you are solving and who for. Designs, branding or a spec are welcome but not required — creating them is part of the work.',
    },
    {
      q: 'Who owns the code and the accounts?',
      a: 'You do, completely. Repositories, Firebase projects, store listings and domains are created under your ownership or transferred to you at handover.',
    },
    {
      q: 'What happens after launch?',
      a: 'Every project includes 30 days of free bug fixes. After that you can take it in-house — I hand over documentation — or keep me on a light monthly retainer.',
    },
  ],
}

export const contact = {
  titleLight: 'Contact',
  titleBold: 'For Work',
  lede: 'Send a few lines about your idea and I will reply the same day, usually within a couple of hours.',
  budgets: ['Under $2k', '$2k – $6k', '$6k – $15k', '$15k+ / retainer', 'Not sure yet'],
  whatsappMessage: "Hi Dhatri! I found your portfolio and I'd like to talk about a project.",
}

/* Two closing cards that sit between the contact form and the footer. */
export const closing = {
  social: {
    label: 'Dhatri',
    titleLight: 'Explore',
    titleBold: 'Instagram',
    href: 'https://instagram.com/',
    image: '/images/instagram.jpg',
  },
  whyChoose: {
    titleLight: 'Why Choose',
    titleBold: 'Dhatri',
    tags: [
      'Clean code',
      'Fast delivery',
      'Direct contact',
      'Fixed pricing',
      'SEO ready',
      'Post-launch support',
    ],
  },
}

export const socials = [
  { icon: 'Twitter', label: 'X', href: 'https://x.com/' },
  { icon: 'Instagram', label: 'Instagram', href: 'https://instagram.com/' },
  { icon: 'Github', label: 'GitHub', href: 'https://github.com/' },
  { icon: 'Linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/' },
]
