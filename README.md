# AKNEXUS website

The marketing site for AKNEXUS Technologies: a single-page React app with a live 3D hero, scroll-driven motion and a
working contact form.

## Stack

| Concern | Library |
| --- | --- |
| App | React 19, TypeScript, Vite 8 |
| Styling | Tailwind CSS 4 (theme tokens in `src/index.css`) |
| Motion | Motion (`motion/react`): text reveals, scroll-linked effects, layout transitions |
| Smooth scrolling | Lenis |
| 3D hero | Three.js through React Three Fiber, lazy-loaded |
| Icons | Lucide |
| Fonts | Inter and Inter Tight, self-hosted through Fontsource |

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-checks, then builds to dist/
npm run preview    # serves the production build
npm run lint
```

## Deploy

Every push to `main` builds and deploys to GitHub Pages (`.github/workflows/deploy.yml`). To post the contact form to
an endpoint, set the `VITE_FORM_ENDPOINT` repository variable.

## Edit the content

Most copy lives in `src/content.ts`: services, example projects, process, FAQ and the contact email. Headlines and
section intros are written in their components. [Site content](#site-content) below lists every piece of text and the
file it lives in.

Still to fill in:

- The founder's bio in `src/components/About.tsx` (the dashed placeholder line), and a real photo in place of the icon.
- Real case studies when you have them. The four projects are marked as examples on purpose.

## Contact form

Copy `.env.example` to `.env.local` and set `VITE_FORM_ENDPOINT` to a form service URL (Formspree, Basin, or your own
endpoint that accepts JSON). Without it, the form opens the visitor's email app with the message ready to send.

## Deploy

It builds to static files, so any static host works:

- **Vercel or Netlify:** import the folder; build command `npm run build`, output directory `dist`.
- **Cloudflare Pages:** same build command and output directory.

Set `VITE_FORM_ENDPOINT` in the host's environment variables before building.

## How the page is put together

- Light and dark themes: the page follows the visitor's system setting until they use the sun/moon button in the nav,
  which saves their choice in the browser. Light-theme colours are in `src/index.css`, and the switching logic is in
  `src/lib/theme.ts`. A small script in `index.html` sets the theme before the first paint so the page never flashes.
- Motion respects the visitor's reduced-motion setting everywhere (`MotionConfig reducedMotion="user"`, and Lenis is off).

## Project files

Every file in the project, apart from `node_modules/` (installed packages), `dist/` (the build output) and macOS's
`.DS_Store` files.

### Root

| File | What it is |
| --- | --- |
| `index.html` | The page shell: title, description, link-preview tags, icons, and the script that sets the theme before the first paint. |
| `package.json` | Dependencies and the `dev`, `build`, `preview` and `lint` scripts. |
| `package-lock.json` | The exact installed versions. npm keeps it up to date; don't edit it by hand. |
| `vite.config.ts` | Build settings: the React and Tailwind plugins, and a higher chunk-size warning because the 3D scene is its own lazy-loaded file. |
| `tsconfig.json` | Points TypeScript at the two configs below. |
| `tsconfig.app.json` | TypeScript settings for the site code in `src/`. |
| `tsconfig.node.json` | TypeScript settings for `vite.config.ts`. |
| `.oxlintrc.json` | Lint rules (oxlint), including React's rules of hooks. |
| `.env.example` | Template for `.env.local`, which holds `VITE_FORM_ENDPOINT` for the contact form. |
| `.gitignore` | Keeps `node_modules`, `dist`, `.env.local` and editor files out of git. |
| `README.md` | This file. |

### `public/`: files served as they are

| File | What it is |
| --- | --- |
| `logo-white.svg` | Full logo (icon and AKNEXUS) in white, for the nav on the dark theme. |
| `logo.svg` | The same logo in navy, for the nav on the light theme. |
| `wordmark-white.svg` | The AKNEXUS wordmark alone in white: the logo intro and the large footer wordmark on the dark theme. |
| `wordmark.svg` | The same wordmark in navy, for the light theme. |
| `icon.svg` | The square icon, on the founder card in About. |
| `icon-white.svg` | A white version of the icon. The page doesn't use it yet. |
| `favicon-32.png` | The browser-tab icon, 32 × 32. |
| `apple-touch-icon.png` | The home-screen icon on iPhone and iPad, 180 × 180. |
| `og-image.png` | The preview image shown when the link is shared, 2400 × 481. |

### `src/`

| File | What it is |
| --- | --- |
| `main.tsx` | The entry point: loads the fonts, Lenis's styles and `index.css`, then renders `App`. |
| `App.tsx` | Puts the sections in order, and holds which example project is open and what the contact form is pre-filled with. |
| `index.css` | Tailwind setup and design tokens: colours for both themes, fonts, the `light:` variant, the hero scrim and shared classes. |
| `content.ts` | Most of the site's text: nav links, services, example projects, steps, ways of working, principles, FAQ and the email. |

### `src/components/`: the sections, in page order

| File | What it is |
| --- | --- |
| `Intro.tsx` | The logo intro: the logo assembles, then lifts off the page. Plays once per browser session. |
| `Nav.tsx` | The top bar: logo, section links (the current section is highlighted), theme button, "Start a project", and the mobile menu. |
| `ThemeToggle.tsx` | The sun/moon button that switches between light and dark. |
| `Hero.tsx` | The opening screen: headline, intro, buttons, the rotating "We build…" line, the scroll cue, and the 3D scene behind it. |
| `NexusScene.tsx` | The 3D network behind the hero (Three.js): nodes on a sphere, lines to their nearest neighbours, and orange signals moving along them. It loads lazily, pauses once scrolled away, calms down under reduced motion, and takes its colours from the theme. |
| `Capabilities.tsx` | Two drifting marquees, one of what we build and one of the tech stack. They speed up as you scroll. |
| `Statement.tsx` | The large paragraph that lights up word by word as you scroll, and the three principles. |
| `Services.tsx` | The six service cards. |
| `Audiences.tsx` | The "Who we build for" list. |
| `Work.tsx` | The four example project cards. |
| `Mockup.tsx` | The drawn product previews on the project cards: phone, browser, chat and terminal. |
| `ProjectDetail.tsx` | The dialog with an example project's full details. "Discuss a project like this" pre-fills the contact form. |
| `Process.tsx` | The four steps with a line that fills as you scroll, and the three ways to work together. |
| `About.tsx` | The about text and the founder card. |
| `Faq.tsx` | The FAQ, as open-and-close questions in two columns. |
| `Contact.tsx` | The email with a copy button, and the enquiry form with its checks. It posts to `VITE_FORM_ENDPOINT`, or opens the email app. |
| `Footer.tsx` | Tagline, links, email, and the large wordmark that rises as you scroll. |
| `MagneticButton.tsx` | The site's button, solid or outlined. On a mouse it leans toward the cursor. |
| `Words.tsx` | Shared text effects: `Words` (word-by-word reveal), `SectionHeading`, and `Reveal` (fade up on scroll). |

### `src/lib/`

| File | What it is |
| --- | --- |
| `theme.ts` | Light and dark themes: follows the system setting until the visitor picks one, saves the choice, cross-fades the switch. |
| `intro.ts` | Decides whether the logo intro plays, and tells the sections when it has finished. |
| `motion.ts` | The two easing curves used across the site. |
| `smooth-scroll.ts` | Lenis smooth scrolling, scrolling to a section, and locking the page while a dialog is open. |
| `use-active-section.ts` | Tracks which section is on screen, so the nav can highlight its link. |

## Site content

All the text on the site, in page order, with the file each piece lives in. This is a copy: when you change the text in
code, update it here too.

### Page title and link preview (`index.html`)

- **Title:** AKNEXUS · Software, built to run
- **Description:** AKNEXUS Technologies designs, builds and runs web, mobile and cloud products for businesses, from the
  first sketch to every release after launch.
- **Preview title:** AKNEXUS · Software, built to run
- **Preview description:** Web, mobile and cloud products for businesses, designed, built and run by one team.

### Navigation (`content.ts`, `Nav.tsx`)

- **Links:** Services · Work · Process · About. The mobile menu adds Contact.
- **Button:** Start a project

### Hero (`Hero.tsx`, `content.ts`)

- **Badge:** Open for new projects
- **Headline:** Software, built to run.
- **Intro:** AKNEXUS Technologies designs, builds and runs web, mobile and cloud products for businesses. One team, from
  the first sketch to every release after launch.
- **Buttons:** Start a project · What we do
- **Rotating line:** We build web platforms / mobile apps / cloud infrastructure / AI products / internal tools
- **Scroll cue:** Scroll

### Marquees (`content.ts`)

- **What we build:** Web platforms · Mobile apps · Backends and APIs · Cloud and DevOps · AI products · Support and
  maintenance
- **Stack:** React · Next.js · TypeScript · Kotlin · Swift · React Native · Node.js · NestJS · Go · PostgreSQL · AWS ·
  Google Cloud · Docker · Kubernetes · Terraform · GitHub Actions · Grafana · LLM APIs

### Statement (`Statement.tsx`, `content.ts`)

> AKNEXUS Technologies is a software studio for businesses that want to move fast without breaking what already works.
> We plan, design, build and run your product as one team, from the first sketch to every release after launch.

| Principle | Text |
| --- | --- |
| You own everything | Code, designs and cloud accounts are in your name from day one. |
| Working software every week | A demo and a short written update, so nothing comes as a surprise. |
| Written down, handed over | Docs and runbooks, so your team can run it without us. |

### Services (`Services.tsx`, `content.ts`)

**What we do.** Everything your product needs, under one roof.

One team for strategy, design, engineering and hosting, so nothing gets lost between agencies and you always know who to
call.

| Service | Text | Points |
| --- | --- | --- |
| Web platforms | Customer portals, dashboards, marketplaces and internal tools that stay fast as you grow. | React and Next.js · Accounts, roles and payments · Admin and reporting |
| Mobile apps | Native Android and iOS apps, or one cross-platform app, taken all the way through store review. | Kotlin and Swift · React Native · Store releases and updates |
| Backends and APIs | The servers, databases and integrations behind your product, designed for the traffic you expect next year. | Node.js, NestJS and Go · PostgreSQL · Third-party integrations |
| Cloud and DevOps | Infrastructure as code, automatic releases and monitoring, so shipping is routine and outages are rare. | AWS and Google Cloud · Terraform and Kubernetes · CI/CD and observability |
| AI products | Assistants, document processing and automation that save real hours, with cost and quality under control. | LLM integrations · Retrieval (RAG) · Evaluation and guardrails |
| Support and maintenance | Updates, fixes and security patches for apps already live, including apps another team built. | Monitoring and on-call · Upgrades and patches · Takeovers and rescues |

### Who we build for (`Audiences.tsx`, `content.ts`)

**Who we build for.** Businesses at every stage.

| Audience | Text |
| --- | --- |
| Founders launching a first product | We turn the idea into a working first version, then help you learn from real users and improve it. |
| Companies outgrowing spreadsheets | We replace manual work with software your team actually wants to use, connected to the tools you already have. |
| Teams whose app needs rescuing | We take over existing code, stabilise it and get releases moving again, without a rewrite unless you need one. |

### Example projects (`Work.tsx`, `ProjectDetail.tsx`, `Mockup.tsx`, `content.ts`)

**Example projects.** The kind of work we take on.

Each one shows what we'd build for a typical client and the tools we'd use. Tell us about yours and we'll send you a plan.

- **Card labels:** Example · See how we'd build it · View
- **Dialog labels:** Example project · The need · What we'd build · How we'd run it
- **Dialog buttons:** Next example · Discuss a project like this

#### 1. Clinic app. (Healthcare)

**Booking, reminders and payments for a busy clinic.**

An Android and iOS app where patients book and pay, reminders that cut missed visits, and a dashboard for the front desk.

- **The need:** Patients book by phone, the front desk juggles a paper diary, and missed appointments go unnoticed.
- **What we'd build:**
  - An Android and iOS app for booking, rescheduling and paying
  - Automatic SMS and WhatsApp reminders before each visit
  - A web dashboard for the front desk to run the day
  - Payments and receipts, reconciled every day
- **How we'd run it:** Kotlin · Swift · Node.js · PostgreSQL · AWS
- **Phone mockup:** Next appointment · Tue, 10:30 am · Dental check-up · Book a visit · Reminder sent

#### 2. Retail dashboard. (Retail)

**Every order and stock level in one place.**

Orders from the website, WhatsApp and the shop counter in one dashboard, with live stock and a daily sales report.

- **The need:** Orders arrive from the website, WhatsApp and the shop counter, and stock counts never match.
- **What we'd build:**
  - One dashboard for every order, whatever the channel
  - Live stock levels with low-stock alerts
  - A daily sales report by email
  - Roles for owners, managers and counter staff
- **How we'd run it:** Next.js · NestJS · PostgreSQL · Google Cloud
- **Browser mockup:** Orders today 128 · Low stock 6 · Sales ₹84k

#### 3. AI assistant. (Software company)

**Support answers from your own help articles.**

An assistant that answers customers from your help articles, shows its sources and hands over to a person when unsure.

- **The need:** The support team answers the same questions all day, and replies slow down as customers grow.
- **What we'd build:**
  - An assistant that answers from your help articles
  - A source link under every answer
  - Hand-over to a person when it is not sure
  - A list of unanswered questions, to improve your docs
- **How we'd run it:** LLM API · Retrieval (RAG) · Python · AWS
- **Chat mockup:**
  - Customer: How do I change my billing date?
  - Assistant: Go to Settings, then Billing, and pick a new date. It applies from next month. (From: Billing help article)
  - Customer: Can I talk to a person?
  - Assistant: Of course. I've passed this to the support team.

#### 4. Cloud move. (Any growing product)

**From one hand-run server to automatic releases.**

Infrastructure written as code, pipelines that test and deploy every change, and monitoring before customers notice.

- **The need:** The app runs on one server, every release is done by hand, and outages are noticed only when customers
  complain.
- **What we'd build:**
  - An AWS setup written in Terraform, rebuildable from scratch
  - Pipelines that test and deploy every change
  - One-step rollback when a release misbehaves
  - Monitoring and alerts that reach the right person
- **How we'd run it:** Terraform · Docker · GitHub Actions · AWS · Grafana
- **Terminal mockup:** ✓ Build image 1m 08s · ✓ Run tests 2m 31s · ✓ Scan for vulnerabilities 22s · ✓ Deploy to
  staging 47s · ● Deploy to production, running

### How we work (`Process.tsx`, `content.ts`)

**How we work.** Four steps. No surprises.

Every project follows the same path, so you always know what happens next and what it costs.

| Step | Text |
| --- | --- |
| 1. Discover | A first call about what you need, who it is for and what a good result looks like. |
| 2. Plan | A written proposal with the scope, timeline and a fixed quote, so you know exactly what you are buying. |
| 3. Build | One- or two-week cycles, with working software to try at the end of every week. |
| 4. Launch and run | We release, monitor and improve it, then hand over or keep it running for you. |

**Ways to work together**

| Model | Text | Billing |
| --- | --- | --- |
| Fixed-price project | For a defined product or feature, like a first version. | Paid in milestones |
| Dedicated developers | For ongoing work where the plan changes as you learn. | Billed monthly, per developer |
| Support retainer | For apps already live that need updates, fixes and monitoring. | Monthly hours, urgent issues first |

### About (`About.tsx`)

**About us.** A small studio with big-company standards.

We keep the team small on purpose, so you always talk to the people building your product. We'd rather ship one thing
properly than five things halfway, and we write everything down so your team can run it after we hand over.

- **Founder card:** Akash Tureha, Founder, AKNEXUS Technologies
- **Bio (placeholder):** Two or three sentences about you go here.

### FAQ (`Faq.tsx`, `content.ts`)

**Questions.** Answered before you ask.

- **Why work with AKNEXUS?** You work directly with the people building your product. You own the code and accounts from
  day one, see working software every week, and get a fixed quote before we start.
- **What is it like to work with us?** We agree the scope and plan up front, then work in one- or two-week cycles. Each
  week you get a demo, a short written update and one shared channel for questions.
- **How long does a project take from start to launch?** It depends on the scope. After our first call you get a written
  timeline with the quote, broken into milestones you approve one by one.
- **Which projects do you take on?** Web apps, Android and iOS apps, backends, cloud setups and AI features for
  businesses. We also take over and maintain apps another team built.
- **Why hire developers if I have AI tools?** AI tools write code quickly, but someone still has to decide what to build,
  keep it secure and run it in production. We use AI where it helps and take responsibility for the result.
- **What if I don't like the result?** You see working software every week, so problems surface early and get fixed.
  Defined projects are paid in milestones, and you approve each one before the next starts.
- **Who owns the code?** You do. The code, designs and cloud accounts are in your name from day one, and you have full
  access throughout.
- **Do you sign an NDA?** Yes. We can sign yours, or send ours, before you share any details.

### Contact (`Contact.tsx`, `content.ts`)

**Have a project in mind?** Let's build it.

Tell us what you want to build, who it's for and when you need it. We'll reply with questions or a time to talk.

- **Email:** akash@aknexus.org, with a Copy button. It shows "Copied", or "Selected, press ⌘C" (Ctrl+C on non-Apple
  devices) when the browser blocks copying.
- **Badge:** Open for new projects
- **Form fields:** Your name · Email · Company (optional) · About the project
- **What do you need?** The six services, any number of them
- **Budget:** Under ₹5 lakh · ₹5–15 lakh · ₹15–40 lakh · Over ₹40 lakh · Not sure yet
- **Timeline:** As soon as possible · In 1–3 months · In 3–6 months · Flexible
- **Field errors:**
  - Name: Enter your name.
  - Email: Enter an email address we can reply to.
  - About the project: Tell us a little about the project, at least a sentence.
- **Under the form:** "This opens your email app with the message ready to send." Once a form endpoint is set, this
  reads "We reply by email." instead.
- **Button:** Send enquiry (Sending… while it sends)
- **Sent through the form:** Thanks, it’s on its way. We’ll reply by email.
- **Sent through the email app:** Your email app should be open. Your message is ready to send from there. If nothing
  opened, email us at akash@aknexus.org.
- **After sending:** Write another message
- **If sending fails:** That didn't send. Try again, or email us at akash@aknexus.org.
- **Email subject:** Project enquiry from (their name). The body lists their name, email, company, needs, budget, timeline and
  message, skipping any they left empty.

### Footer (`Footer.tsx`, `content.ts`)

- **Tagline:** Software, built to run.
- **Text:** AKNEXUS Technologies designs, builds and runs web, mobile and cloud products for businesses.
- **Button:** Start a project
- **Explore:** Services · Work · Process · About · FAQ · Contact
- **Contact:** akash@aknexus.org
- **Bottom line:** © 2026 AKNEXUS Technologies · Back to top
