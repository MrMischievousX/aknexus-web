export const EMAIL = 'akash@aknexus.org'

export const navLinks = [
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Work' },
  { id: 'process', label: 'Process' },
  { id: 'about', label: 'About' },
] as const

export const heroBuilds = ['web platforms', 'mobile apps', 'cloud infrastructure', 'AI products', 'internal tools']

export type ServiceId = 'web' | 'mobile' | 'backend' | 'cloud' | 'ai' | 'support'

export const services: { id: ServiceId; title: string; text: string; points: string[] }[] = [
  {
    id: 'web',
    title: 'Web platforms',
    text: 'Customer portals, dashboards, marketplaces and internal tools that stay fast as you grow.',
    points: ['React and Next.js', 'Accounts, roles and payments', 'Admin and reporting'],
  },
  {
    id: 'mobile',
    title: 'Mobile apps',
    text: 'Native Android and iOS apps, or one cross-platform app, taken all the way through store review.',
    points: ['Kotlin and Swift', 'React Native', 'Store releases and updates'],
  },
  {
    id: 'backend',
    title: 'Backends and APIs',
    text: 'The servers, databases and integrations behind your product, designed for the traffic you expect next year.',
    points: ['Node.js, NestJS and Go', 'PostgreSQL', 'Third-party integrations'],
  },
  {
    id: 'cloud',
    title: 'Cloud and DevOps',
    text: 'Infrastructure as code, automatic releases and monitoring, so shipping is routine and outages are rare.',
    points: ['AWS and Google Cloud', 'Terraform and Kubernetes', 'CI/CD and observability'],
  },
  {
    id: 'ai',
    title: 'AI products',
    text: 'Assistants, document processing and automation that save real hours, with cost and quality under control.',
    points: ['LLM integrations', 'Retrieval (RAG)', 'Evaluation and guardrails'],
  },
  {
    id: 'support',
    title: 'Support and maintenance',
    text: 'Updates, fixes and security patches for apps already live, including apps another team built.',
    points: ['Monitoring and on-call', 'Upgrades and patches', 'Takeovers and rescues'],
  },
]

export const capabilities = ['Web platforms', 'Mobile apps', 'Backends and APIs', 'Cloud and DevOps', 'AI products', 'Support and maintenance']

export const stack = [
  'React', 'Next.js', 'TypeScript', 'Kotlin', 'Swift', 'React Native', 'Node.js', 'NestJS', 'Go',
  'PostgreSQL', 'AWS', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Grafana', 'LLM APIs',
]

export const audiences = [
  {
    title: 'Founders launching a first product',
    text: 'We turn the idea into a working first version, then help you learn from real users and improve it.',
  },
  {
    title: 'Companies outgrowing spreadsheets',
    text: 'We replace manual work with software your team actually wants to use, connected to the tools you already have.',
  },
  {
    title: 'Teams whose app needs rescuing',
    text: 'We take over existing code, stabilise it and get releases moving again, without a rewrite unless you need one.',
  },
]

export type Mockup = 'phone' | 'browser' | 'chat' | 'terminal'

export type Project = {
  id: string
  name: string
  title: string
  sector: string
  summary: string
  need: string
  build: string[]
  stack: string[]
  color: string
  mockup: Mockup
  services: ServiceId[]
  /** Delivered client work rather than an illustrative example. */
  real?: boolean
  /** Screenshot in /public/projects. Shown instead of the drawn mockup. */
  shot?: string
  /** Live site, when there is one to link to. */
  url?: string
  /** Short note shown next to the sector, e.g. when a site is no longer up. */
  status?: string
  /** Extra places the work can be seen, such as the app stores. */
  links?: { label: string; href: string }[]
}

export const projects: Project[] = [
  {
    id: 'sufra',
    name: 'Sufra Rewards.',
    title: 'Ordering and loyalty across a group of restaurant brands.',
    sector: 'Hospitality, Saudi Arabia',
    summary:
      'One account across several restaurant brands: delivery and dine-in ordering, points and tiers, catering bookings and gift cards, shared by the website and the iOS and Android apps.',
    need: 'Each brand in the group ran its own ordering and its own loyalty, so a regular customer earned nothing by eating across the group.',
    build: [
      'Delivery and dine-in ordering across every brand in the group',
      'A points and tiers programme that carries across all of them',
      'Catering bookings, gift cards and deals',
      'One Expo codebase behind the website and both store apps',
      'Arabic and English throughout, including right-to-left layout',
    ],
    stack: ['React Native', 'Expo', 'React Native Web', 'iOS', 'Android'],
    color: '#0B6E4F',
    mockup: 'phone',
    services: ['web', 'mobile', 'backend'],
    real: true,
    shot: '/projects/sufra.webp',
    url: 'https://www.sufra.sa',
    links: [
      { label: 'App Store', href: 'https://apps.apple.com/sa/app/sufra-food-delivery-rewards/id6471874736' },
      { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.sufra.app' },
    ],
  },
  {
    id: 'clothe',
    name: 'Clothe.',
    title: 'A graphic-tee label with a storefront of its own.',
    sector: 'Direct-to-consumer fashion',
    summary:
      'An online store for a streetwear label, with collections, product pages, rupee checkout and a custom-order route that carries the design straight into WhatsApp.',
    need: 'The label needed a shop of its own, one that could show collections properly, take payment in rupees and handle one-off custom orders.',
    build: [
      'A storefront with collections, product pages, sizes and colourways',
      'Cart and checkout, with Razorpay for rupee payments',
      'A custom-order route that carries design and fabric into WhatsApp',
      'Reviews, an Instagram feed and the delivery and returns promises',
    ],
    stack: ['React', 'TanStack Router', 'Vite', 'Firebase', 'Razorpay', 'Cloudflare'],
    color: '#E7D9C9',
    mockup: 'browser',
    services: ['web', 'backend', 'cloud'],
    real: true,
    shot: '/projects/clothe.webp',
    url: 'https://clothe.life',
  },
  {
    id: 'bloomsight',
    name: 'Bloomsight Ventures.',
    title: 'A startup investment platform, on the web and both stores.',
    sector: 'Venture and fintech',
    summary:
      'A platform for finding and backing early-stage Indian startups, with investor sign-up on the web and companion apps shipped to the App Store and Google Play.',
    need: 'Deal flow was handled over email and spreadsheets, with no single place for investors to sign up, browse startups and follow what they had backed.',
    build: [
      'A web platform for browsing startups and registering as an investor',
      'Companion iOS and Android apps, taken through both store reviews',
      'Investor accounts, onboarding and verification',
      'A public site for the fund, its thesis and its portfolio',
    ],
    stack: ['React Native', 'Expo', 'iOS', 'Android'],
    color: '#0E7C86',
    mockup: 'phone',
    services: ['web', 'mobile', 'backend'],
    real: true,
    shot: '/projects/bloomsight.webp',
    status: 'Site no longer live',
  },
]

export const steps = [
  { title: 'Discover', text: 'A first call about what you need, who it is for and what a good result looks like.' },
  { title: 'Plan', text: 'A written proposal with the scope, timeline and a fixed quote, so you know exactly what you are buying.' },
  { title: 'Build', text: 'One- or two-week cycles, with working software to try at the end of every week.' },
  { title: 'Launch and run', text: 'We release, monitor and improve it, then hand over or keep it running for you.' },
]

export const models = [
  { title: 'Fixed-price project', text: 'For a defined product or feature, like a first version.', billing: 'Paid in milestones' },
  { title: 'Dedicated developers', text: 'For ongoing work where the plan changes as you learn.', billing: 'Billed monthly, per developer' },
  { title: 'Support retainer', text: 'For apps already live that need updates, fixes and monitoring.', billing: 'Monthly hours, urgent issues first' },
]

export const principles = [
  { title: 'You own everything', text: 'Code, designs and cloud accounts are in your name from day one.' },
  { title: 'Working software every week', text: 'A demo and a short written update, so nothing comes as a surprise.' },
  { title: 'Written down, handed over', text: 'Docs and runbooks, so your team can run it without us.' },
]

export const faqs = [
  {
    q: 'Why work with AKNEXUS?',
    a: 'You work directly with the people building your product. You own the code and accounts from day one, see working software every week, and get a fixed quote before we start.',
  },
  {
    q: 'What is it like to work with us?',
    a: 'We agree the scope and plan up front, then work in one- or two-week cycles. Each week you get a demo, a short written update and one shared channel for questions.',
  },
  {
    q: 'How long does a project take from start to launch?',
    a: 'It depends on the scope. After our first call you get a written timeline with the quote, broken into milestones you approve one by one.',
  },
  {
    q: 'Which projects do you take on?',
    a: 'Web apps, Android and iOS apps, backends, cloud setups and AI features for businesses. We also take over and maintain apps another team built.',
  },
  {
    q: 'Why hire developers if I have AI tools?',
    a: 'AI tools write code quickly, but someone still has to decide what to build, keep it secure and run it in production. We use AI where it helps and take responsibility for the result.',
  },
  {
    q: "What if I don't like the result?",
    a: 'You see working software every week, so problems surface early and get fixed. Defined projects are paid in milestones, and you approve each one before the next starts.',
  },
  {
    q: 'Who owns the code?',
    a: 'You do. The code, designs and cloud accounts are in your name from day one, and you have full access throughout.',
  },
  {
    q: 'Do you sign an NDA?',
    a: 'Yes. We can sign yours, or send ours, before you share any details.',
  },
]
