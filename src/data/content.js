// ---------------------------------------------------------------------------
// All site copy lives here. Image paths resolve against /public — a missing
// file renders as a labelled placeholder rather than a broken image.
// ---------------------------------------------------------------------------

export const profile = {
  name: 'Dhatri Patel',
  wordmark: 'Dhatri',
  firstName: 'Dhatri',
  lastName: 'Patel',
  role: 'Freelance Flutter & React Developer',
  email: 'dhatripatel67@gmail.com',
  whatsapp: '916355506411', // country code + number, digits only
  location: 'Bhavnagar, Gujarat, India',
  serviceAreas: ['Bhavnagar', 'Rajkot', 'Ahmedabad', 'Remote worldwide'],
  portrait: '/images/portrait-illustration.png',
}

/* Every contact CTA on the page opens WhatsApp with this message already
   typed, so there is a single place to change the wording. */
const WHATSAPP_MESSAGE = "Hi Dhatri! I found your portfolio and I'd like to talk about a project."

export const whatsappHref = `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`

/* An item with an `href` is a route; one without is a section on the home page
   that the header scrolls to. Home is reachable from the wordmark, so the pill
   carries five links plus the Contact button inside its 640px width. */
export const nav = [
  { id: 'work', label: 'Work', href: '/projects' },
  { id: 'services', label: 'Services', href: '/services' },
  { id: 'about', label: 'About', href: '/about' },
  { id: 'blog', label: 'Blog', href: '/blog' },
  { id: 'pricing', label: 'Pricing' },
]

export const hero = {
  hello: 'Hello',
  /* Role and base, so the first line answers "who" and "where" at a glance. */
  eyebrow: 'Freelance Flutter & React Developer · Bhavnagar, India',
  headline: 'I build mobile apps and websites that are ready to ship.',
  lede: 'I help startups and growing businesses turn ideas into polished Flutter apps, React websites and Firebase-powered products — working directly with you from design to deployment.',
  /* Replaces the old star rating. Both halves are countable from this file:
     `projects` has five entries, and the stack names come from their meta. */
  proof: {
    lead: '5 shipped products',
    stack: 'Flutter · React · Firebase · AI · UI/UX',
  },
  primaryCta: { label: 'Start a Project', href: '#contact' },
  secondaryCta: { label: 'View My Work', href: '#work' },
  availability: 'Bhavnagar, India — available worldwide',
  contactLink: { label: 'WhatsApp me', href: whatsappHref },
}

export const brands = {
  /* These are programmes and certifications, not clients. The heading has to
     say so plainly — an unlabelled logo strip reads as a client list. */
  title: 'Certifications & Training',
  a11yLabel: 'Certifications and training completed',
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
  /* Project initials, not people. Labelled so the overlapping stack cannot
     be mistaken for a row of client avatars. */
  avatars: ['MH', 'AC', 'SL'],
  avatarsLabel: 'Featured projects: MindHeal, AgreeCare and Shiftly',
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
  eyebrow: 'Selected work',
  titleLight: 'Selected',
  titleBold: 'Projects',
  lede: 'Five products, each taken from a blank repository to something people can open. Pick one to read how it was built.',
  /* States what these are, so the set is not read as a client roster. */
  note: 'Products I designed and built end to end. Shiftly was a client collaboration; the rest are personal, academic and hackathon projects, some built with collaborators.',
  meta: {
    title: 'Projects — Flutter & React Case Studies | Dhatri Patel',
    description:
      'Five case studies from Dhatri Patel: Flutter apps, React web platforms and on-device AI, each taken from a blank repository to a working build.',
  },
}

export const projectPage = {
  backLabel: 'All projects',
  nextLabel: 'Next project',
  overviewLabel: 'Overview',
  processLabel: 'How it was built',
  detailsLabel: 'Project details',
  problemLabel: 'The problem',
  goalLabel: 'The goal',
  featuresLabel: 'Key features',
  challengesLabel: 'Challenges',
  learnedLabel: 'What I learned',
  relatedLabel: 'Related work',
  serviceLabel: 'The service behind this build',
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
    seoDescriptor: 'Full-Stack Job Portal',
    published: true,
    schemaType: 'WebApplication',
    applicationCategory: 'BusinessApplication',
    related: ['learnnova', 'shiftly'],
    serviceKey: 'web',
    title: 'JobZee',
    tags: 'full-stack job portal · react, node, socket.io',
    image: '/images/jobzeecover.png',
    tint: 'indigo',
    href: 'https://jobzee-two.vercel.app/',
    detail: {
      lede: 'A full-stack hiring platform where candidates and recruiters meet, apply and talk in real time.',
      problem:
        'Hiring breaks down in the gap between applying and hearing back. Candidates submit into silence, recruiters lose track of who is at which stage, and the whole conversation ends up scattered across inboxes.',
      goal:
        'Build one place where both sides of a hire can act — search and apply, post and review — with the conversation attached to the application rather than living in email.',
      features: [
        'Public job board with search and filtering',
        'Separate authenticated dashboards for candidates and recruiters',
        'Stored candidate profile and resume upload, so applying is not re-typing',
        'Recruiters post openings and move applicants through stages',
        'Real-time messaging and application updates over Socket.IO',
      ],
      challenges: [
        {
          title: 'Two audiences, one interface',
          body: 'Candidate and recruiter needs pull a product in opposite directions. Designing either one first would have made the other an afterthought, so both journeys were written out before any screen was drawn and the shared screens fell out of the overlap.',
        },
        {
          title: 'Keeping the interface in step with the server',
          body: 'An application that changes state silently is the exact problem the product exists to solve. Socket.IO runs alongside the REST API so the interface reacts the moment something changes server-side, rather than waiting for a refresh.',
        },
      ],
      learned:
        'Designing two roles at once is far cheaper than retrofitting the second one. Writing both journeys end to end before building meant the shared screens were deliberate rather than compromises, and shipping in self-contained slices kept the deployed build demonstrable at every point instead of only at the end.',
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
    seoDescriptor: 'Smart Agriculture IoT App',
    published: true,
    schemaType: 'CreativeWork',
    applicationCategory: null,
    related: ['mindheal', 'shiftly'],
    serviceKey: 'flutter',
    title: 'AgreeCare',
    tags: 'smart agriculture iot · flutter, firebase, getx',
    image: '/images/agreecarecover.png',
    tint: 'emerald',
    href: 'https://github.com/hetvidudhela/Agricare',
    detail: {
      lede: 'A smart-agriculture app that puts live field readings and irrigation control in a farmer’s pocket.',
      problem:
        'Sensor hardware produces a stream of numbers. On its own that is not useful to the person standing in a field deciding whether to irrigate — the data exists, but the decision it should support does not.',
      goal:
        'Turn a raw feed of soil, temperature and humidity readings into a single screen someone can read outdoors, one-handed, and act on immediately.',
      features: [
        'Live soil moisture, temperature and humidity from Firebase',
        'Dashboard that answers whether a field needs water before anything else',
        'Configurable thresholds with alerts',
        'Irrigation control one tap from the dashboard, not buried in settings',
        'High-contrast type and large tap targets for outdoor use',
      ],
      challenges: [
        {
          title: 'Designing for sunlight and one hand',
          body: 'The app is used outdoors, often one-handed, often on a mid-range device. That ruled out dense layouts and small controls early, and set the constraint that the primary question had to be answered without scrolling.',
        },
        {
          title: 'Continuous data without a stuttering interface',
          body: 'Readings arrive continuously. Keeping state, routing and dependency injection in GetX rather than in the widget tree meant incoming values could update the dashboard reactively without the UI becoming janky as the stream ran.',
        },
      ],
      learned:
        'Constraints from the environment turned out to be more useful than any feature list. Deciding it had to be readable in direct sunlight, one-handed, settled a dozen later design questions on its own — and building the data model, then the read-only dashboard, then control on top let the hardware and app sides progress independently.',
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
    seoDescriptor: 'On-Device AI Mental Health App',
    published: true,
    schemaType: 'CreativeWork',
    applicationCategory: null,
    related: ['agreecare', 'jobzee'],
    serviceKey: 'flutter',
    title: 'MindHeal',
    tags: 'ai mental health companion · flutter, onnx, ml kit',
    image: '/images/mindheal.png',
    tint: 'violet',
    href: 'https://github.com/Dhatripatel06/MindHeal_org',
    detail: {
      lede: 'An AI mental-health companion that reads emotion on the device, so nothing personal has to leave the phone.',
      problem:
        'Emotion recognition normally means sending a face or a voice to a server. For mental-health support that is exactly the wrong shape: the data most worth protecting is the data the feature needs.',
      goal:
        'Run the sensitive part of the experience entirely on the device, and wrap it in something supportive rather than clinical — so the product is useful without asking anyone to trust a server.',
      features: [
        'On-device emotion recognition with ONNX Runtime and Google ML Kit',
        'Camera-side detection that never uploads a frame',
        'Mood tracking over time',
        'Journalling and guided support flows',
        'Copy written to inform reflection, never to deliver a verdict',
      ],
      challenges: [
        {
          title: 'Fitting a model inside a mobile budget',
          body: 'Running inference in a Flutter app meant working within a real memory and latency budget: quantised ONNX models, ML Kit handling camera-side detection, and inference kept off the UI thread so the interface never blocks while a frame is processed.',
        },
        {
          title: 'Staying supportive rather than diagnostic',
          body: 'A model output is a probability, not a fact about a person. The harder problem was linguistic — every string had to present a reading as something to reflect on rather than a conclusion about the user, which constrained the interface as much as the technical budget did.',
        },
      ],
      learned:
        'Drawing the privacy line first — inference on-device, nothing sensitive synced — made every later decision easier, because anything that did not fit inside it was simply not an option. The genuinely hard part was not the model; it was writing copy that stays honest about what a prediction is.',
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
    seoDescriptor: 'E-Learning Platform',
    published: true,
    schemaType: 'CreativeWork',
    applicationCategory: null,
    related: ['jobzee', 'mindheal'],
    serviceKey: 'web',
    title: 'LearnNova',
    tags: 'elearning platform · react, tailwind, rest apis',
    image: '/images/learnnova.png',
    tint: 'neutral',
    href: 'https://github.com/isha-gohel181/Learn_nova',
    detail: {
      lede: 'An e-learning platform built around the part that usually gets neglected: staying with a course to the end.',
      problem:
        'Online courses are easy to start and easy to abandon. The failure is rarely the content — it is that returning after a week begins with a hunt for where you left off.',
      goal:
        'Organise catalogue, course detail, lesson playback and progress into one interface where a learner can always see where they are, and get back to it in one action.',
      features: [
        'Course catalogue with filtering',
        'Course detail and lesson playback',
        'Progress visible on every screen a learner touches',
        'Reusable component set — cards, filters, players, progress — fed from REST APIs',
        'Fluid layouts built responsive from the first commit',
      ],
      challenges: [
        {
          title: 'Designing the path, not the screens',
          body: 'Screens designed in isolation produced a catalogue that looked fine and a journey that stalled. Drawing the flow as one path — browse, enrol, learn, resume — and judging each screen by whether it moved a learner along that path changed which screens were needed at all.',
        },
        {
          title: 'Keeping it legible as the catalogue grows',
          body: 'A small set of primitives consumed by every view means adding a course category is a data change rather than a new page — which is what stops an interface degrading as content is added to it.',
        },
      ],
      learned:
        'Building responsive from the first commit was cheaper than retrofitting breakpoints once a desktop view already looked right. And the component system paid for itself the moment the catalogue grew: the constraint that everything reuse the same primitives is what kept the interface coherent.',
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
    seoDescriptor: 'Shift Management App',
    published: true,
    schemaType: 'CreativeWork',
    applicationCategory: null,
    related: ['agreecare', 'mindheal'],
    serviceKey: 'flutter',
    title: 'Shiftly',
    tags: 'shift management platform · flutter, firestore, hive',
    image: '/images/shiftlycover.png',
    tint: 'accent',
    href: 'https://github.com/Dhatripatel06/shift_manager',
    detail: {
      lede: 'A shift-management app for teams whose rota changes faster than a spreadsheet can be re-sent.',
      problem:
        'A rota is not usually wrong — the version someone is looking at is. Re-sending a spreadsheet creates another version rather than replacing the last one, and shop-floor connectivity is exactly where a cloud-only app stops working.',
      goal:
        'Keep one shared schedule that propagates changes instead of re-announcing them, and stays readable when the signal drops mid-shift.',
      features: [
        'Single Firestore-backed schedule for shifts, swaps and availability',
        'Hive local cache, so the app opens into content rather than a spinner',
        'Writes queue offline and settle when connectivity returns',
        'Role-aware home screen for managers and staff',
        'The current shift reachable without navigating for it',
      ],
      challenges: [
        {
          title: 'Offline-first, then online',
          body: 'Treating the local copy as the source the interface reads from — and Firestore as what reconciles it — is the opposite of the usual order, and it is what makes the roster readable on a back-of-house network instead of showing a loading state.',
        },
        {
          title: 'One app, two reasons to open it',
          body: 'Managers and staff need different things from the same data. Rather than building two apps or one cluttered one, roles change what the home screen offers while both land on the thing they actually opened it for.',
        },
      ],
      learned:
        'The useful reframe was that the problem was version control, not scheduling. Once the goal became one propagating source of truth rather than a better way to send a rota around, the offline-first architecture followed naturally from where the app is actually used.',
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

/**
 * The only project list any public surface may render.
 *
 * Publication is explicit in both directions: `published` must be a literal
 * true or false on every entry. A missing flag is a build error rather than a
 * default, because either default is wrong — silently publishing an unfinished
 * case study exposes work that is not ready, and silently hiding one loses
 * real work with no signal. Forcing the author to say which removes the guess.
 *
 * Draft entries stay in `projects` so their structure is version-controlled
 * and reviewable while they are still unpublishable.
 */
const undeclared = projects.filter((project) => typeof project.published !== 'boolean')
if (undeclared.length > 0) {
  throw new Error(
    `Project(s) missing an explicit "published" boolean: ${undeclared
      .map((project) => project.slug)
      .join(', ')}. Set published: true to make a case study public, or published: false to keep it a draft.`,
  )
}

export const publishedProjects = projects.filter((project) => project.published === true)

export const experience = {
  aboutLink: 'More about how I work with clients',
  startYear: '2023',
  endLabel: 'Present',
  /* Current role first, so the carousel opens on what is true today.
     `role` is the light line, `title` the bold one, `company` the pill. */
  entries: [
    {
      period: 'Jun 2026 — Present',
      role: 'Current role',
      title: 'Application Developer',
      company: 'Grow Spark Consulting',
      location: 'Remote',
    },
    {
      period: '2025 — Present',
      role: 'Independent',
      title: 'Freelance Developer',
      company: 'Self-employed',
      location: 'Bhavnagar, Gujarat · remote worldwide',
    },
    {
      period: 'Jan 2026 — Feb 2026',
      role: 'Internship',
      title: 'Front-End Developer',
      company: 'dASHMESH Software Solutions',
      location: 'Gujarat, India',
    },
    {
      period: '2023 — 2026',
      role: 'Undergraduate',
      title: 'BCA',
      company: 'SSCCS, Bhavnagar',
      location: 'Bhavnagar, Gujarat',
    },
  ],
}

/* Four services, each answering the questions a buyer actually asks before
   enquiring: what it is, who it is for, what lands, how long, what it costs.
   Deliberately written without framework names in the body copy — `stack` is
   there for the developers who look, `body` is for the person paying. */
export const services = {
  titleLight: 'What I',
  titleBold: 'Build',
  lede: 'Four ways I work with clients — from a single business website to a full cross-platform app.',
  /* Oversized wordmark that drifts across the foot of the section. */
  ghost: 'Explore my services',
  cta: { label: 'See all services', href: '/services' },
  items: [
    {
      key: 'flutter',
      /* Short label for the tab strip; `title` is the full service name. */
      label: 'Flutter Apps',
      badge: 'Android & iOS',
      title: 'Flutter App Development',
      number: '01',
      body: 'One app can serve both Android and iPhone, so you do not need to maintain two separate native codebases. A change you ask for lands on both at once rather than being built twice.',
      forWho:
        'Founders who need a real mobile app in the stores, and businesses whose customers expect to book, order or track something from their phone.',
      deliverables: [
        'A working app on both Android and iPhone',
        'Sign-in, user accounts and secure data storage',
        'Screens that keep working when the signal drops',
        'Submission to the Play Store and App Store',
        'Every account and the source code in your name',
      ],
      stack: 'Flutter · Dart · Firebase · REST APIs',
      planKey: 'app',
      caseStudies: ['shiftly', 'mindheal', 'agreecare'],
    },
    {
      key: 'web',
      label: 'Web Apps',
      badge: 'Web platforms',
      title: 'Web Development',
      number: '02',
      body: 'Software that runs in a browser — dashboards, portals, booking systems, internal tools. The kind of thing that replaces a spreadsheet several people are emailing back and forth.',
      forWho:
        'Businesses running an operation on shared spreadsheets, and startups whose product is the website itself rather than an app.',
      deliverables: [
        'User accounts with different access for different roles',
        'An admin area where you manage everything yourself',
        'Your data in a proper database, backed up',
        'Connections to services you already pay for',
        'Deployed live, on hosting you own',
      ],
      stack: 'React · Next.js · Node · Firebase',
      planKey: 'mvp',
      caseStudies: ['jobzee', 'learnnova'],
    },
    {
      key: 'design',
      label: 'Websites',
      badge: 'Design & build',
      title: 'Website Design',
      number: '03',
      body: 'The website a customer finds when they search for you and decide whether to get in touch. Designed and built as one job, so there is no handover gap between a picture of a website and a working one.',
      forWho:
        'Local businesses in Bhavnagar, Rajkot and Ahmedabad with no website or an outdated one, and anyone whose current site does not work properly on a phone.',
      deliverables: [
        'Four to six pages, designed around what you sell',
        'Reads correctly on phones, tablets and desktops',
        'An enquiry form and a WhatsApp button',
        'Set up so Google can find and list you',
        'Live on your own domain, with a short handover call',
      ],
      stack: 'Next.js · Tailwind CSS · Figma',
      planKey: 'website',
      caseStudies: ['learnnova', 'jobzee'],
    },
    {
      key: 'mvp',
      label: 'MVPs',
      badge: 'First version',
      title: 'MVP Development',
      number: '04',
      body: 'The smallest version of your idea that real people can actually use. We agree what the first release must do, cut everything that can wait, and build that — so you learn from users instead of from guesses.',
      forWho:
        'Founders validating an idea, and anyone who needs something working to show investors, a first cohort of users or a pilot client.',
      deliverables: [
        'A scoped feature list agreed before any code is written',
        'A working product people outside the team can use',
        'Something demoable at the end of every stage',
        'Analytics, so you can see what people actually do',
        'A clear list of what comes next, and what it costs',
      ],
      stack: 'React · Flutter · Firebase · Node',
      planKey: 'mvp',
      caseStudies: ['jobzee', 'mindheal'],
    },
  ],
}

/** Price and timeline for a service come from the pricing table, never from a
    second copy of the numbers — the two can then never disagree on the page. */
export const planFor = (key) => pricing.plans.find((plan) => plan.key === key)

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
    },
    {
      name: 'Runner-Up',
      role: 'Flash@SSCCS IT Exhibition',
      score: '2024',
      quote:
        'Placed runner-up at the Flash@SSCCS IT Exhibition — one of two consecutive runner-up finishes across 2024 and 2025.',
    },
    {
      name: 'Research Paper',
      role: 'Published · International Multidisciplinary Conference',
      score: '2024',
      quote:
        'Research behind the AgreeCare smart agriculture system was published at the International Multidisciplinary Conference in December 2024.',
    },
    {
      name: 'Hackathon Finalist',
      role: 'Odoo x GVP Hackathon · LearnNova',
      score: '2026',
      quote:
        'LearnNova, a responsive eLearning platform built in React and Tailwind CSS, reached the finals of the Odoo x GVP Hackathon.',
    },
  ],
}

/* Prices are stored as numbers and formatted for display, so the structured
   data and the visible card are the same figures by construction — schema can
   never quote a price the page does not show. `en-IN` gives the lakh grouping
   (1,80,000) that Indian visitors expect. */
const INR = new Intl.NumberFormat('en-IN')
const USD = new Intl.NumberFormat('en-US')
const inrRange = (min, max) =>
  min === max ? `₹${INR.format(min)}` : `₹${INR.format(min)} – ₹${INR.format(max)}`
const usdRange = (min, max) =>
  min === max ? `$${USD.format(min)}` : `$${USD.format(min)} – $${USD.format(max)}`

/* Each plan carries its numeric bounds plus the strings derived from them. */
const PLANS = [
  {
    key: 'website',
    name: 'Business Website',
    tagline: 'A credible online presence for a business that does not have one yet.',
    inr: [18000, 40000],
    usd: [400, 900],
    delivery: 'About 2 weeks',
    cta: 'Start a Project',
    features: [
      '4–6 sections, designed and built',
      'Responsive across phone, tablet and desktop',
      'Contact form and WhatsApp button',
      'Basic on-page SEO and metadata',
      'Deployed live, on your own hosting',
    ],
  },
  {
    key: 'mvp',
    name: 'Web App / MVP',
    tagline: 'A first working version of your product, built to be shown and tested.',
    inr: [75000, 180000],
    usd: [1500, 4000],
    delivery: 'About 5–6 weeks',
    cta: 'Start a Project',
    features: [
      'User accounts and authentication',
      'Database and API integration',
      'Admin panel for managing content',
      'Deployment and handover of every account',
      'Built in slices, so there is always something to demo',
    ],
  },
  {
    key: 'app',
    name: 'Flutter App',
    tagline: 'One codebase, Android and iOS, ready for the stores.',
    inr: [120000, 300000],
    usd: [2500, 6000],
    delivery: 'About 6–10 weeks',
    cta: 'Start a Project',
    features: [
      'Cross-platform Android and iOS from one codebase',
      'Firebase or REST API integration',
      'Offline handling and state management',
      'Play Store and App Store submission',
      'Source code and store accounts in your name',
    ],
  },
  {
    key: 'care',
    name: 'Maintenance',
    tagline: 'Ongoing support once the product is live.',
    inr: [25000, 25000],
    usd: [500, 500],
    unit: '/ month',
    delivery: 'Monthly · cancel any time',
    cta: 'Start a Project',
    features: [
      'Bug fixes and dependency updates',
      'Small feature and content changes',
      'Store and platform compliance updates',
      'Uptime and crash monitoring',
      'Priority reply on email and WhatsApp',
    ],
  },
]

/* ------------------------------------------------- client testimonials --
   Real feedback only, in the words the person actually gave. Nothing here is
   paraphrased, and `rating` and `image` stay null unless someone explicitly
   approved a star rating or a photograph — an invented rating is the same
   fabrication as an invented quote. */
export const clientTestimonials = {
  titleLight: 'What',
  titleBold: 'Clients Say',
  lede: 'Feedback from people I have worked with.',
  items: [
    {
      name: 'Vishrut Donda',
      project: 'Shiftly',
      location: 'London, UK',
      role: 'Client',
      quote:
        'Dhatri understood what we were trying to build with Shiftly and turned the idea into a clean, practical product. Communication was smooth, and she was proactive about solving issues along the way. I really appreciated the attention to detail and the effort put into making the product feel polished.',
      rating: null,
      image: null,
    },
    {
      name: 'Mahesh Patel',
      project: 'Smart Macro Sales',
      location: 'Ahmedabad, India',
      role: 'Client',
      quote:
        'Smart Macro Sales has made our daily sales and billing work much easier. Orders, payments and invoices are now properly managed in one place. It is simple to use and very helpful for our FMCG business. Really good software for managing daily business work.',
      rating: null,
      image: null,
    },
    {
      name: 'Ketan Shah',
      project: 'Smart Macro Sales',
      location: 'Rajkot, India',
      role: 'Client',
      quote:
        'Using Smart Macro Sales has made our daily work much easier. We can easily manage orders, payments and invoices in one place. It is simple to use and saves us a lot of time. Overall, a very useful software for our business.',
      rating: null,
      image: null,
    },
  ],
}

/** Entries carrying real, approved wording. */
export const approvedTestimonials = clientTestimonials.items.filter(
  (item) => typeof item.quote === 'string' && item.quote.trim().length > 0,
)

export const pricing = {
  titleLight: 'Pricing',
  titleBold: 'Plans',
  lede: 'Fixed-scope packages rather than an hourly rate, so you know the number before the work starts.',
  /* Shown under every card. The ranges are starting points, not quotes — the
     copy has to say that everywhere the numbers appear. */
  note: 'Starting ranges · firm quote after scoping',
  disclaimer:
    'These are starting ranges based on typical scope. Your final quote depends on screens, integrations and content, and I confirm it in writing — with a timeline — before any work begins.',
  currency: { inr: 'INR', usd: 'USD' },
  plans: PLANS.map((plan) => ({
    ...plan,
    priceInr: inrRange(plan.inr[0], plan.inr[1]),
    priceUsd: usdRange(plan.usd[0], plan.usd[1]),
  })),
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
      a: 'A business website runs about two weeks. A web app or MVP is usually five to six weeks, and a full Flutter app six to ten weeks, depending on screens and integrations. You get a firm timeline in writing before we start.',
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
  titleLight: 'Tell me what',
  titleBold: "you're building",
  /* No response-time promise here. The FAQ describes what happens after a
     project starts; how fast an enquiry gets answered is not something the
     repository can evidence, so the copy does not claim it. */
  lede: 'Share a little about the project and timeline. I will review it and get back to you.',
  projectTypes: [
    'Business website',
    'Web app or MVP',
    'Mobile app (Android + iOS)',
    'Redesign of something existing',
    'Ongoing maintenance',
    'Something else',
  ],
  timelines: [
    'As soon as possible',
    'Within 1–2 months',
    'In 3+ months',
    'Just exploring for now',
  ],
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

/* ---------------------------------------------------------------- /about --
   Written as an introduction to a working relationship, not a CV. Everything
   here is either verifiable from this file (projects, stack, experience) or a
   statement about how I work, which is mine to make. No invented biography. */
export const about = {
  meta: {
    title: 'About Dhatri Patel | Freelance Flutter & React Developer, Bhavnagar',
    description:
      'Freelance Flutter and React developer based in Bhavnagar, Gujarat. How I work with startups, growing businesses and local businesses — direct, fixed-scope and remote-friendly.',
  },
  eyebrow: 'About',
  titleLight: 'Work directly with',
  titleBold: 'the person building it',
  lede: 'I am Dhatri Patel, a freelance Flutter and React developer based in Bhavnagar, Gujarat. I build mobile apps, websites and first product versions for startups, growing businesses and local businesses — and remotely for clients anywhere.',
  intro: [
    'Most of what I build starts the same way: someone has been describing an idea to people for months and needs it to exist. That might be an app their customers can book from, a website that finally works on a phone, or a first version of a product they want to put in front of real users.',
    'I take that from the first conversation through to a live build. Design, development and deployment are one job rather than three handovers, which is usually the difference between a project that ships and one that stalls between contractors.',
    'I am early in my career and straightforward about it. What that means in practice is that you get the person writing the code on every call, a scope agreed in writing before anything starts, and pricing that reflects where I am rather than what an agency would charge.',
  ],
  audience: {
    title: 'Who I work with',
    lede: 'Three kinds of projects come up most often.',
    groups: [
      {
        icon: 'Rocket',
        name: 'Startups',
        body: 'Founders who need a first version built and shipped — something real to test with users, show investors or run a pilot on.',
      },
      {
        icon: 'TrendingUp',
        name: 'Growing businesses',
        body: 'Teams who have outgrown spreadsheets and manual processes and need a proper tool their staff and customers can actually use.',
      },
      {
        icon: 'Store',
        name: 'Local businesses',
        body: 'Shops, clinics, cafés and services in Bhavnagar, Rajkot and Ahmedabad who need a website customers can find, read on a phone and contact from.',
      },
    ],
    remote: {
      title: 'Working remotely',
      body: 'I am based in Bhavnagar and work with clients across Gujarat and internationally. Calls happen on whatever you already use, and I keep flexible hours so a time-zone gap does not turn a quick question into a two-day wait.',
    },
  },
  working: {
    title: 'How working together goes',
    points: [
      {
        title: 'You talk to me, not an account manager',
        body: 'There is no team to pass your project between. The person you brief is the person building it, so nothing is lost in translation and answers do not need a meeting first.',
      },
      {
        title: 'Scope and price agreed up front',
        body: 'Before any work starts you get what is being built, what it costs and when it lands, in writing. If the scope changes later, we agree the change before I build it — no surprise invoices.',
      },
      {
        title: 'You see it while it is being built',
        body: 'Work goes out in stages you can open and click through, not one reveal at the end. If something is heading the wrong way, we find out in week two rather than week six.',
      },
      {
        title: 'You own everything',
        body: 'Repositories, hosting, Firebase projects, store listings and domains are set up in your name or transferred at handover. Nothing stays locked to me, and you are free to take it in-house at any point.',
      },
      {
        title: 'Plain language, not jargon',
        body: 'You should not need to know what a framework is to make good decisions about your own product. I explain trade-offs in terms of cost, time and what your users will notice.',
      },
    ],
  },
  process: {
    title: 'How a project runs',
    lede: 'The same five stages whether it is a two-week website or a ten-week app.',
    steps: [
      {
        number: '01',
        title: 'First conversation',
        body: 'A call or a WhatsApp thread about what you are trying to do and who for. Free, and it usually takes half an hour.',
      },
      {
        number: '02',
        title: 'Scope and quote',
        body: 'I write down what the build includes, what it does not, the timeline and a fixed price. You approve it before anything begins.',
      },
      {
        number: '03',
        title: 'Design',
        body: 'Screens and flows first, so we are agreeing on something you can look at rather than a description. Changes are cheap at this stage — that is the point of doing it here.',
      },
      {
        number: '04',
        title: 'Build',
        body: 'Built in slices that work end to end, with something you can open at the end of each one. You see progress weekly rather than waiting for a reveal.',
      },
      {
        number: '05',
        title: 'Launch and handover',
        body: 'Deployed live, accounts transferred to you, and a walkthrough of how to run it. Thirty days of bug fixes are included after launch.',
      },
    ],
  },
  stack: {
    title: 'What I build with',
    lede: 'Chosen to keep your build cost down and your options open — not because a tool is fashionable.',
    groups: [
      {
        name: 'Mobile apps',
        tools: 'Flutter, Dart',
        why: 'One codebase serves both Android and iPhone, so there are not two separate native apps to build and keep in step.',
      },
      {
        name: 'Websites and web apps',
        tools: 'React, Next.js, Tailwind CSS',
        why: 'Fast to load and easy for Google to read, which is most of what makes a site findable.',
      },
      {
        name: 'Data and accounts',
        tools: 'Firebase, Firestore, Node, REST APIs',
        why: 'Handles sign-in, storage and scaling without a server you have to pay for and babysit from day one.',
      },
      {
        name: 'On-device AI',
        tools: 'ONNX Runtime, TensorFlow Lite, ML Kit',
        why: 'Runs the model on the phone itself, so sensitive data never has to leave the user’s device.',
      },
      {
        name: 'Design',
        tools: 'Figma',
        why: 'Where screens get agreed before they get built, when changes still cost minutes instead of days.',
      },
    ],
  },
  experienceIntro: {
    title: 'Where I work now',
    lede: 'Alongside freelance projects I work as an application developer, and I studied computer applications in Bhavnagar.',
  },
  cta: {
    titleLight: 'Have an idea',
    titleBold: 'you want to build?',
    lede: 'Tell me what you are working on and I will come back with a plan, a timeline and a price.',
  },
}

/* --------------------------------------------------------------- /services */
export const servicesPage = {
  meta: {
    title: 'Services | Flutter Apps, Web Development & MVPs | Dhatri Patel',
    description:
      'Flutter app development, web development, website design and MVP builds for startups, growing businesses and local businesses in Gujarat — with starting prices and realistic timelines.',
  },
  eyebrow: 'Services',
  titleLight: 'What I can',
  titleBold: 'build for you',
  lede: 'Four fixed-scope services, each with a realistic timeline and a clear list of what lands. Every project starts the same way — a conversation about what you actually need.',
  labels: {
    forWho: 'Who it is for',
    deliverables: 'What you get',
    timeline: 'Typical timeline',
    stack: 'Built with',
    caseStudies: 'Related work',
  },
  note: 'Not sure which one fits? Describe the problem and I will tell you which of these it is — or that you do not need me at all.',
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
