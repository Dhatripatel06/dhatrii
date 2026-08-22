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
  rating: { stars: 5, label: '5 featured projects' },
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
      value: '5',
      featured: false,
    },
  ],
}

export const work = {
  titleLight: 'Projects',
  titleBold: 'Done',
  lede: 'A selection of the mobile and web products I have designed, built and shipped.',
  cta: { label: 'View All Projects', href: '/projects' },
}

/* Copy for the /projects index and the shared furniture on every case study
   at /projects/<slug>. The per-project writing lives on `projects` below. */
export const projectsIndex = {
  eyebrow: 'Case studies',
  titleLight: 'Selected',
  titleBold: 'Projects',
  lede: 'Five products, each taken from a blank repository to something people can open. Pick one to read how it was built.',
  meta: {
    title: 'Projects',
    description:
      'Case studies from Dhatri Patel — Flutter, React and AI products taken from first sketch to shipped build.',
  },
}

export const projectPage = {
  backLabel: 'All projects',
  nextLabel: 'Next project',
  overviewLabel: 'Overview',
  processLabel: 'How it was built',
  detailsLabel: 'Project details',
  cta: {
    titleLight: 'Want something',
    titleBold: 'like this built?',
    lede: 'Tell me what you have in mind and I will come back with a plan, a timeline and a price.',
    label: 'Start a project',
    href: whatsappHref,
  },
}

/* Scroll order is deliberate — the two shipped, most demo-able products lead.
   Each entry doubles as the source for its case-study page at
   /projects/<slug>, so nothing about a project is duplicated anywhere else. */
export const projects = [
  {
    slug: 'jobzee',
    title: 'JobZee',
    tags: 'full-stack job portal · react, node, socket.io',
    image: '/images/jobzeecover.png',
    tint: 'indigo',
    href: 'https://jobzee-two.vercel.app/',
    detail: {
      lede: 'A full-stack hiring platform where candidates and recruiters meet, apply and talk in real time.',
      overview: {
        eyebrow: 'Built for two audiences at once',
        heading: 'A job portal that keeps both sides moving',
        body: 'JobZee pairs a public job board with an authenticated dashboard for each role. Candidates search, filter and apply with a stored profile; recruiters post openings and move applicants through stages. Socket.IO carries the conversation between them, so an application never goes quiet while someone waits on email.',
      },
      phases: [
        {
          label: 'Discovery',
          title: 'Mapping two journeys before writing a line',
          body: 'Candidate and recruiter needs pull a product in opposite directions. I wrote both journeys out first — search to offer, post to hire — and let the shared screens fall out of the overlap instead of designing one flow and bolting the other on.',
        },
        {
          label: 'Development',
          title: 'Turning the flows into a working stack',
          body: 'A React front end talks to a Node and Express API over REST, with authentication, role-based routing and file uploads for resumes. Socket.IO runs alongside it for messaging and application updates, so the interface reacts the moment something changes server-side.',
        },
        {
          label: 'Strategy',
          title: 'Shipping in slices, not in one drop',
          body: 'Auth, listings, applications and messaging each landed as a self-contained slice that worked end to end before the next one started. The deployed build was never more than one feature away from being demonstrable.',
        },
      ],
      meta: [
        { label: 'Role', value: 'Design and full-stack development' },
        { label: 'Type', value: 'Web application' },
        { label: 'Stack', value: 'React, Node, Express, Socket.IO' },
      ],
      result: {
        heading: 'The Result',
        body: 'A deployed portal that handles the full hiring loop — search, apply, review, respond — with live messaging rather than a mailbox in the middle of it.',
      },
      links: [{ label: 'View Live Site', href: 'https://jobzee-two.vercel.app/' }],
    },
  },
  {
    slug: 'agreecare',
    title: 'AgreeCare',
    tags: 'smart agriculture iot · flutter, firebase, getx',
    image: '/images/agreecarecover.png',
    tint: 'emerald',
    href: 'https://github.com/hetvidudhela/Agricare',
    detail: {
      lede: 'A smart-agriculture app that puts live field readings and irrigation control in a farmer’s pocket.',
      overview: {
        eyebrow: 'Sensors are only half the problem',
        heading: 'Field data that reads clearly on a phone',
        body: 'AgreeCare pulls sensor readings — soil moisture, temperature, humidity — into a Flutter app backed by Firebase, and turns them into a screen someone can act on standing in a field. Thresholds, alerts and irrigation controls sit one tap from the dashboard rather than behind a settings tree.',
      },
      phases: [
        {
          label: 'Discovery',
          title: 'Designing for sunlight and one hand',
          body: 'The app is used outdoors, often one-handed, often on a mid-range device. That set the constraints early: high-contrast type, large tap targets, and a dashboard that answers whether a field needs water right now before it answers anything else.',
        },
        {
          label: 'Development',
          title: 'Live data without a stuttering UI',
          body: 'Firebase streams readings into the app while GetX keeps state, routing and dependency injection out of the widget tree. Incoming values update the dashboard reactively, so the interface stays responsive even as readings arrive continuously.',
        },
        {
          label: 'Strategy',
          title: 'One layer at a time',
          body: 'Data model first, then the read-only dashboard, then control and alerting on top. Each layer was usable on its own, which kept the hardware side and the app side able to progress independently.',
        },
      ],
      meta: [
        { label: 'Role', value: 'Mobile design and development' },
        { label: 'Type', value: 'IoT mobile application' },
        { label: 'Stack', value: 'Flutter, Firebase, GetX' },
      ],
      result: {
        heading: 'The Result',
        body: 'A cross-platform app that turns a stream of raw sensor values into a single readable screen — and lets the person reading it act on what it says.',
      },
      links: [{ label: 'View on GitHub', href: 'https://github.com/hetvidudhela/Agricare' }],
    },
  },
  {
    slug: 'mindheal',
    title: 'MindHeal',
    tags: 'ai mental health companion · flutter, onnx, ml kit',
    image: '/images/mindheal.png',
    tint: 'violet',
    href: 'https://github.com/Dhatripatel06/MindHeal_org',
    detail: {
      lede: 'An AI mental-health companion that reads emotion on the device, so nothing personal has to leave the phone.',
      overview: {
        eyebrow: 'Private by construction',
        heading: 'On-device intelligence, not a cloud round trip',
        body: 'MindHeal runs emotion recognition locally with ONNX Runtime and Google ML Kit, then wraps the result in mood tracking, journalling and guided support. Because inference happens on the device, the sensitive part of the experience works without shipping a face or a voice to a server.',
      },
      phases: [
        {
          label: 'Discovery',
          title: 'Starting from what must never leave the phone',
          body: 'Mental-health data is the kind you design around, not for. I drew the privacy line first — inference on-device, nothing sensitive synced — and every later decision had to fit inside it.',
        },
        {
          label: 'Development',
          title: 'Fitting a model into a mobile budget',
          body: 'Getting an emotion model to run smoothly inside a Flutter app meant working within a real memory and latency budget: quantised ONNX models, ML Kit for camera-side detection, and inference kept off the UI thread so the interface never blocks while a frame is processed.',
        },
        {
          label: 'Strategy',
          title: 'A companion, not a diagnosis',
          body: 'The product deliberately stays supportive rather than clinical. Model output feeds reflection and tracking, and the copy throughout is careful never to present a prediction as a verdict about the person using it.',
        },
      ],
      meta: [
        { label: 'Role', value: 'Product design and development' },
        { label: 'Type', value: 'AI mobile application' },
        { label: 'Stack', value: 'Flutter, ONNX Runtime, ML Kit' },
      ],
      result: {
        heading: 'The Result',
        body: 'A companion app where the AI work happens on the device it belongs to — responsive in the hand, and private without asking the user to trust a server.',
      },
      links: [{ label: 'View on GitHub', href: 'https://github.com/Dhatripatel06/MindHeal_org' }],
    },
  },
  {
    slug: 'learnnova',
    title: 'LearnNova',
    tags: 'elearning platform · react, tailwind, rest apis',
    image: null, // drop learnnova.jpg into /public/images and set the path here
    tint: 'neutral',
    href: 'https://github.com/isha-gohel181/Learn_nova',
    detail: {
      lede: 'An e-learning platform built around the part that usually gets neglected: staying with a course to the end.',
      overview: {
        eyebrow: 'Courses are easy to start and easy to abandon',
        heading: 'Structure that carries a learner through',
        body: 'LearnNova organises catalogue, course detail, lesson playback and progress into one React interface. Progress is visible on every screen a learner touches, so picking a course back up after a week never starts with a hunt for where they left off.',
      },
      phases: [
        {
          label: 'Discovery',
          title: 'Following one learner end to end',
          body: 'Rather than designing screens in isolation, the flow was drawn as a single path — browse, enrol, learn, resume — and each screen judged by whether it moved someone along that path or stalled them.',
        },
        {
          label: 'Development',
          title: 'A component system that scales with the catalogue',
          body: 'React and Tailwind CSS carry a small set of reusable primitives — cards, filters, players, progress — consumed by every view and fed from REST APIs. Adding a course category is a data change, not a new page.',
        },
        {
          label: 'Strategy',
          title: 'Responsive as a requirement, not a pass at the end',
          body: 'Learners move between phone and laptop mid-course, so every layout was built fluid from the first commit instead of being retrofitted with breakpoints once the desktop view looked right.',
        },
      ],
      meta: [
        { label: 'Role', value: 'Front-end design and development' },
        { label: 'Type', value: 'Web platform' },
        { label: 'Stack', value: 'React, Tailwind CSS, REST APIs' },
      ],
      result: {
        heading: 'The Result',
        body: 'A learning interface that stays legible as the catalogue grows, and keeps a learner’s place visible on every screen they land on.',
      },
      links: [{ label: 'View on GitHub', href: 'https://github.com/isha-gohel181/Learn_nova' }],
    },
  },
  {
    slug: 'shiftly',
    title: 'Shiftly',
    tags: 'shift management platform · flutter, firestore, hive',
    image: '/images/shiftlycover.png',
    tint: 'accent',
    href: 'https://github.com/Dhatripatel06/shift_manager',
    detail: {
      lede: 'A shift-management app for teams whose rota changes faster than a spreadsheet can be re-sent.',
      overview: {
        eyebrow: 'Rotas move; spreadsheets do not',
        heading: 'One schedule everybody actually sees',
        body: 'Shiftly keeps shifts, swaps and availability in a single Firestore-backed schedule, with Hive caching locally so the roster is readable the moment the app opens — and still readable when the signal drops mid-shift.',
      },
      phases: [
        {
          label: 'Discovery',
          title: 'Watching where the schedule breaks down',
          body: 'The failure is rarely the rota itself — it is the version of it someone is looking at. That pointed the product at a single shared source of truth, with changes propagating rather than being re-announced.',
        },
        {
          label: 'Development',
          title: 'Offline-first, then online',
          body: 'Hive holds a local copy of the schedule and Firestore reconciles it, so the app opens straight into content instead of a spinner. Writes queue and settle when connectivity returns, which matters on a shop floor or a back-of-house network.',
        },
        {
          label: 'Strategy',
          title: 'Keeping the daily action one tap deep',
          body: 'Managers and staff use the same app for different reasons. Roles change what the home screen offers, but both land on the thing they opened it for — the current shift — without navigating for it.',
        },
      ],
      meta: [
        { label: 'Role', value: 'Mobile design and development' },
        { label: 'Type', value: 'Team scheduling application' },
        { label: 'Stack', value: 'Flutter, Firestore, Hive' },
      ],
      result: {
        heading: 'The Result',
        body: 'A scheduling app that stays usable offline and keeps one version of the rota in front of everyone who depends on it.',
      },
      links: [{ label: 'View on GitHub', href: 'https://github.com/Dhatripatel06/shift_manager' }],
    },
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
    icon: 'Instagram',
    label: 'Dhatri',
    titleLight: 'Explore',
    titleBold: 'Instagram',
    href: 'https://www.instagram.com/dhatrii.tech',
    // Its own asset, not the hero portrait: two <Image>s sharing one src
    // collide in next/image's LCP bookkeeping and mislabel the hero as lazy.
    image: null,
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
  { icon: 'Instagram', label: 'Instagram', href: 'https://www.instagram.com/dhatrii.tech' },
]
