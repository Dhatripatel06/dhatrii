// ---------------------------------------------------------------------------
// All site copy lives here. Image paths resolve against /public — a missing
// file renders as a labelled placeholder rather than a broken image.
// ---------------------------------------------------------------------------

export const profile = {
  name: 'Dhatri Patel',
  wordmark: 'Dhatri',
  firstName: 'Dhatri',
  lastName: 'Patel',
  role: 'Flutter Developer | UI/UX-Focused Mobile App Developer',
  email: 'dhatripatel67@gmail.com',
  whatsapp: '916355506411', // country code + number, digits only
  location: 'Bhavnagar / Ahmedabad, Gujarat, India',
  portrait: '/images/portrait-illustration.png',
}

/* Every contact CTA on the page opens WhatsApp with this message already
   typed, so there is a single place to change the wording. */
const WHATSAPP_MESSAGE = "Hi Dhatri! I found your portfolio and I'd like to talk about a project."

export const whatsappHref = `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`

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
  roleTail: 'focused on UI/UX',
  quote: '“I build beautiful and scalable mobile apps”',
  rating: { stars: 5, label: '6 featured projects' },
  primaryCta: { label: 'Get Started', href: whatsappHref },
  secondaryCta: { label: 'My Works', href: '#work' },
  contactLink: { label: 'Contact me', href: whatsappHref },
}

export const brands = {
  title: 'Certifications and programmes behind the work',
  logos: [
    'Oracle Generative AI Professional',
    'Oracle AI Foundations Associate',
    'Summer Analytics 2025',
    'Salesforce Certified',
    'dASHMESH Software Solutions',
  ],
}

export const journey = {
  eyebrow: 'My work so far',
  titleLight: 'My journey in',
  titleBold: 'Numbers',
  note: 'Every project below is designed, built and shipped end to end',
  avatars: ['MH', 'AC', 'SL'],
  /* Two tiles side by side: a wide accent-filled one and a narrow dark one. */
  stats: [
    {
      eyebrow: 'Technology',
      title: 'Technologies across mobile, web and AI',
      value: '20+',
      featured: true,
    },
    {
      eyebrow: 'Work',
      title: 'Projects Done',
      value: '6',
      featured: false,
    },
  ],
}

export const work = {
  titleLight: 'Projects',
  titleBold: 'Done',
  lede: 'A selection of the mobile and web products I have designed, built and shipped.',
  cta: { label: 'View All Projects', href: 'https://github.com/Dhatripatel06' },
}

export const projects = [
  {
    slug: 'mindheal',
    title: 'MindHeal',
    tags: 'ai mental health companion · flutter, onnx, ml kit',
    image: '/images/mindheal.png',
    tint: 'violet',
    href: 'https://github.com/Dhatripatel06/MindHeal_org',
  },
  {
    slug: 'agreecare',
    title: 'AgreeCare',
    tags: 'smart agriculture iot · flutter, firebase, getx',
    image: '/images/agreecare.jpg',
    tint: 'emerald',
    href: 'https://github.com/hetvidudhela/Agricare',
  },
  {
    slug: 'shiftly',
    title: 'Shiftly',
    tags: 'shift management platform · flutter, firestore, hive',
    image: '/images/shiftly.jpg',
    tint: 'accent',
    href: 'https://github.com/Dhatripatel06/shift_manager',
  },
  {
    slug: 'jobzee',
    title: 'JobZee',
    tags: 'full-stack job portal · react, node, socket.io',
    image: '/images/jobzee.jpg',
    tint: 'indigo',
    href: 'https://jobzee-two.vercel.app/',
  },
  {
    slug: 'learnnova',
    title: 'LearnNova',
    tags: 'elearning platform · react, tailwind, rest apis',
    image: '/images/learnnova.jpg',
    tint: 'neutral',
    href: 'https://github.com/isha-gohel181/Learn_nova',
  },
  {
    slug: 'masjid',
    title: 'Masjid',
    tags: 'interactive 3d simulation · c++, opengl, glut',
    image: '/images/masjid.jpg',
    tint: 'violet',
    href: 'https://github.com/ubeduk/masjid-e-aqsa',
  },
]

export const experience = {
  startYear: '2023',
  endLabel: 'Present',
  entries: [
    {
      period: 'Jan 2026 - Feb 2026',
      role: 'Intern',
      title: 'Front-End Developer',
      company: 'dASHMESH',
    },
    {
      period: '2024 - Present',
      role: 'Independent',
      title: 'Flutter Developer',
      company: 'Freelance',
    },
    {
      period: '2023 - 2026',
      role: 'Undergraduate',
      title: 'BCA',
      company: 'SSCCS, Bhavnagar',
    },
  ],
}

export const services = {
  titleLight: 'What I',
  titleBold: 'Do',
  lede: 'Cross-platform mobile apps, responsive web interfaces and on-device AI features.',
  /* Oversized wordmark that drifts across the foot of the section. */
  ghost: 'Explore my services',
  tabs: [
    {
      key: 'mobile',
      label: 'Mobile Apps',
      badge: 'Flutter · Dart',
      title: 'Mobile Apps',
      body: 'Cross-platform Android and iOS apps built in Flutter, with scalable state management in BLoC, GetX, Riverpod or Provider and full Firebase and REST API integration.',
      number: '01',
    },
    {
      key: 'web',
      label: 'Web Development',
      badge: 'React · Next.js',
      title: 'Web Development',
      body: 'Responsive, pixel-accurate interfaces hand-built in React, Next.js and Tailwind CSS, wired to REST APIs and shipped deployment-ready.',
      number: '02',
    },
    {
      key: 'ai',
      label: 'AI Features',
      badge: 'On-device ML',
      title: 'AI Features',
      body: 'Emotion, voice and image models running on-device with ONNX Runtime, TensorFlow Lite and Google ML Kit, plus Generative AI assistants inside your app.',
      number: '03',
    },
  ],
}

/* Two stacked action cards that sit directly below the services panel. */
export const actionCards = [
  { icon: 'Rocket', label: 'Start Now', href: whatsappHref, outlined: false },
  { icon: 'Phone', label: 'Contact Me', href: whatsappHref, outlined: true },
]

export const tools = {
  titleLight: 'Mastered',
  titleBold: 'Tools',
  lede: 'The stack I reach for across mobile, web and machine learning work.',
  items: [
    { name: 'Flutter', role: 'Mobile SDK', mark: '◈', color: '#42A5F5' },
    { name: 'Dart', role: 'Language', mark: '⏦', color: '#0175C2' },
    { name: 'Firebase', role: 'Backend', mark: '▲', color: '#60A5FA' },
    { name: 'React', role: 'Web Library', mark: '⬡', color: '#61DAFB' },
    { name: 'Figma', role: 'Design Tool', mark: '◉', color: '#F24E1E' },
    { name: 'TensorFlow', role: 'On-device ML', mark: '✳', color: '#F5F5F5' },
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
  titleLight: 'Awards &',
  titleBold: 'Recognition',
  lede: 'Work recognised at exhibitions, hackathons and an international conference.',
  items: [
    {
      name: '2nd Place',
      role: 'Flash@SSCCS IT Exhibition · MindHeal',
      score: '2025',
      quote:
        'MindHeal placed second at the Flash@SSCCS IT Exhibition for its on-device facial emotion and voice sentiment analysis.',
      stars: 5,
    },
    {
      name: 'Runner-Up',
      role: 'Flash@SSCCS IT Exhibition',
      score: '2024',
      quote:
        'Placed runner-up at the Flash@SSCCS IT Exhibition — one of two consecutive runner-up finishes across 2024 and 2025.',
      stars: 5,
    },
    {
      name: 'Research Paper',
      role: 'Published · International Multidisciplinary Conference',
      score: '2024',
      quote:
        'Research behind the AgreeCare smart agriculture system was published at the International Multidisciplinary Conference in December 2024.',
      stars: 5,
    },
    {
      name: 'Hackathon Finalist',
      role: 'Odoo x GVP Hackathon · LearnNova',
      score: '2026',
      quote:
        'LearnNova, a responsive eLearning platform built in React and Tailwind CSS, reached the finals of the Odoo x GVP Hackathon.',
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
  footerCta: { label: 'Contact me', href: whatsappHref },
  items: [
    {
      q: 'How long does a typical project take?',
      a: 'A landing page runs about two weeks. A full app or web product is usually five to ten weeks depending on screens and integrations. You get a firm timeline in writing before we start.',
    },
    {
      q: 'Do you work with clients outside India?',
      a: 'Yes. I work remotely from Gujarat, India and keep flexible hours for calls across time zones. Email and WhatsApp are the quickest ways to reach me.',
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
  lede: 'Send a few lines about your idea and I will get back to you, usually within a day.',
  budgets: ['Under $2k', '$2k – $6k', '$6k – $15k', '$15k+ / retainer', 'Not sure yet'],
  whatsappMessage: WHATSAPP_MESSAGE,
}

/* Two closing cards that sit between the contact form and the footer. */
export const closing = {
  social: {
    label: 'Dhatri',
    titleLight: 'Explore',
    titleBold: 'GitHub',
    href: 'https://github.com/Dhatripatel06',
    image: '/images/github.jpg',
  },
  whyChoose: {
    titleLight: 'Why Choose',
    titleBold: 'Dhatri',
    tags: [
      'Flutter and Dart',
      'Clean architecture',
      'Pixel-perfect UI',
      'Firebase and REST APIs',
      'On-device AI',
      'Direct contact',
    ],
  },
}

export const socials = [
  { icon: 'Github', label: 'GitHub', href: 'https://github.com/Dhatripatel06' },
  {
    icon: 'Linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/dhatri-patel-426846322',
  },
]
