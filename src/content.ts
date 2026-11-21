export const EMAIL = 'akash@aknexus.org'

export const navLinks = [
  { id: 'services', label: 'Services' },
  // { id: 'work', label: 'Work' },
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
}

export const projects: Project[] = [
  {
    id: 'clinic',
    name: 'Clinic app.',
    title: 'Booking, reminders and payments for a busy clinic.',
    sector: 'Healthcare',
    summary: 'An Android and iOS app where patients book and pay, reminders that cut missed visits, and a dashboard for the front desk.',
    need: 'Patients book by phone, the front desk juggles a paper diary, and missed appointments go unnoticed.',
    build: [
      'An Android and iOS app for booking, rescheduling and paying',
      'Automatic SMS and WhatsApp reminders before each visit',
      'A web dashboard for the front desk to run the day',
      'Payments and receipts, reconciled every day',
    ],
    stack: ['Kotlin', 'Swift', 'Node.js', 'PostgreSQL', 'AWS'],
    color: '#A8DCCD',
    mockup: 'phone',
    services: ['mobile', 'backend', 'cloud'],
  },
  {
    id: 'retail',
    name: 'Retail dashboard.',
    title: 'Every order and stock level in one place.',
    sector: 'Retail',
    summary: 'Orders from the website, WhatsApp and the shop counter in one dashboard, with live stock and a daily sales report.',
    need: 'Orders arrive from the website, WhatsApp and the shop counter, and stock counts never match.',
    build: [
      'One dashboard for every order, whatever the channel',
      'Live stock levels with low-stock alerts',
      'A daily sales report by email',
      'Roles for owners, managers and counter staff',
    ],
    stack: ['Next.js', 'NestJS', 'PostgreSQL', 'Google Cloud'],
    color: '#F4C09A',
    mockup: 'browser',
    services: ['web', 'backend', 'cloud'],
  },
  {
    id: 'assistant',
    name: 'AI assistant.',
    title: 'Support answers from your own help articles.',
    sector: 'Software company',
    summary: 'An assistant that answers customers from your help articles, shows its sources and hands over to a person when unsure.',
    need: 'The support team answers the same questions all day, and replies slow down as customers grow.',
    build: [
      'An assistant that answers from your help articles',
      'A source link under every answer',
      'Hand-over to a person when it is not sure',
      'A list of unanswered questions, to improve your docs',
    ],
    stack: ['LLM API', 'Retrieval (RAG)', 'Python', 'AWS'],
    color: '#C7BAF2',
    mockup: 'chat',
    services: ['ai', 'backend'],
  },
  {
    id: 'cloud',
    name: 'Cloud move.',
    title: 'From one hand-run server to automatic releases.',
    sector: 'Any growing product',
    summary: 'Infrastructure written as code, pipelines that test and deploy every change, and monitoring before customers notice.',
    need: 'The app runs on one server, every release is done by hand, and outages are noticed only when customers complain.',
    build: [
      'An AWS setup written in Terraform, rebuildable from scratch',
      'Pipelines that test and deploy every change',
      'One-step rollback when a release misbehaves',
      'Monitoring and alerts that reach the right person',
    ],
    stack: ['Terraform', 'Docker', 'GitHub Actions', 'AWS', 'Grafana'],
    color: '#FF6B35',
    mockup: 'terminal',
    services: ['cloud', 'support'],
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
