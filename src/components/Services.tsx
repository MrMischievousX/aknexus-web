import { AppWindow, Cloud, LifeBuoy, Server, Smartphone, Sparkles, type LucideIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { useRef, type PointerEvent } from 'react'
import { services, type ServiceId } from '../content'
import { EASE } from '../lib/motion'
import { Reveal, SectionHeading } from './Words'

const ICONS: Record<ServiceId, LucideIcon> = {
  web: AppWindow,
  mobile: Smartphone,
  backend: Server,
  cloud: Cloud,
  ai: Sparkles,
  support: LifeBuoy,
}

function ServiceCard({ service, index }: { service: (typeof services)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const Icon = ICONS[service.id]

  // The spotlight follows the pointer through CSS variables, so moving it never re-renders.
  const track = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--x', `${e.clientX - r.left}px`)
    el.style.setProperty('--y', `${e.clientY - r.top}px`)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={track}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.8, ease: EASE, delay: (index % 3) * 0.08 }}
      className="group relative overflow-hidden rounded-3xl border border-line bg-surface p-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: 'radial-gradient(420px circle at var(--x) var(--y), rgba(255,107,53,0.13), transparent 60%)' }}
      />
      <div className="relative flex h-full flex-col gap-5">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-raise text-text transition-colors duration-300 group-hover:bg-accent group-hover:text-navy">
          <Icon size={22} strokeWidth={1.75} />
        </span>
        <h3 className="text-2xl font-semibold">{service.title}</h3>
        <p className="text-soft">{service.text}</p>
        <ul className="mt-auto flex flex-wrap gap-2 pt-4">
          {service.points.map((point) => (
            <li key={point} className="rounded-full border border-line px-3 py-1 text-sm text-muted">
              {point}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export function Services() {
  return (
    <section id="services" className="container-x py-28 sm:py-36">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
        <SectionHeading lead="What we do." title="Everything your product needs, under one roof." />
        <Reveal className="max-w-lg text-lg text-soft lg:justify-self-end">
          One team for strategy, design, engineering and hosting, so nothing gets lost between agencies and you always know
          who to call.
        </Reveal>
      </div>
      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <ServiceCard key={service.id} service={service} index={i} />
        ))}
      </div>
    </section>
  )
}
