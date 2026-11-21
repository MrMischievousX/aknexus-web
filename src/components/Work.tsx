import clsx from 'clsx'
import { ArrowUpRight } from 'lucide-react'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import { useRef, useState, type PointerEvent } from 'react'
import { projects, type Project } from '../content'
import { Mockup } from './Mockup'
import { Reveal, SectionHeading } from './Words'

function TiltCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const rotateX = useSpring(0, { stiffness: 150, damping: 18 })
  const rotateY = useSpring(0, { stiffness: 150, damping: 18 })
  const cursorX = useSpring(0, { stiffness: 500, damping: 40 })
  const cursorY = useSpring(0, { stiffness: 500, damping: 40 })
  const [hover, setHover] = useState(false)

  const track = (e: PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    rotateY.set(px * 10)
    rotateX.set(-py * 10)
    cursorX.set(e.clientX - r.left)
    cursorY.set(e.clientY - r.top)
  }
  const leave = () => {
    rotateX.set(0)
    rotateY.set(0)
    setHover(false)
  }

  return (
    <div style={{ perspective: 1200 }}>
      <motion.button
        type="button"
        onClick={onOpen}
        onPointerEnter={(e) => setHover(e.pointerType === 'mouse')}
        onPointerMove={track}
        onPointerLeave={leave}
        style={{ rotateX, rotateY, backgroundColor: project.color }}
        aria-label={`View details of the ${project.name.replace(/\.$/, '')} example`}
        className="relative grid aspect-[16/11] w-full place-items-center overflow-hidden rounded-[28px] text-[clamp(9px,1.05vw,13px)] leading-[1.3] text-navy max-sm:aspect-square max-sm:text-[10px] md:cursor-none"
      >
        <Mockup kind={project.mockup} />
        <motion.span
          aria-hidden
          style={{ x: cursorX, y: cursorY }}
          animate={{ scale: hover ? 1 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          className="pointer-events-none absolute left-0 top-0 -ml-12 -mt-12 grid h-24 w-24 place-items-center rounded-full bg-bg text-sm font-medium text-text"
        >
          View
        </motion.span>
      </motion.button>
    </div>
  )
}

function ProjectRow({ project, index, onOpen }: { project: Project; index: number; onOpen: (id: string) => void }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1])
  const rotate = useTransform(scrollYProgress, [0, 1], [index % 2 ? 3 : -3, 0])
  const flipped = index % 2 === 1

  return (
    <article ref={ref} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
      <div className={clsx('flex flex-col gap-6 lg:col-span-5', flipped && 'lg:order-2 lg:col-start-8')}>
        <Reveal className="flex items-center gap-3 text-sm text-muted">
          <span className="rounded-full bg-raise px-3 py-1 text-soft">Example</span>
          {project.sector}
        </Reveal>
        <Reveal delay={0.05}>
          <h3 className="font-display text-[clamp(1.8rem,3vw,2.6rem)] font-semibold leading-[1.08]">
            <span className="text-muted">{project.name}</span>
            <br />
            {project.title}
          </h3>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col gap-6">
          <p className="max-w-md text-soft">{project.summary}</p>
          <ul className="flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <li key={s} className="rounded-full bg-surface px-3 py-1 text-sm text-soft">
                {s}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => onOpen(project.id)}
            className="group inline-flex items-center gap-2 self-start border-b border-line pb-1 text-sm font-medium transition-colors hover:border-text"
          >
            See how we'd build it
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </Reveal>
      </div>
      <motion.div style={{ scale, rotate }} className={clsx('lg:col-span-7', flipped && 'lg:order-1 lg:col-start-1')}>
        <TiltCard project={project} onOpen={() => onOpen(project.id)} />
      </motion.div>
    </article>
  )
}

export function Work({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <section id="work" className="py-28 sm:py-36">
      <div className="container-x grid gap-8 lg:grid-cols-2 lg:items-end">
        <SectionHeading lead="Example projects." title="The kind of work we take on." />
        <Reveal className="max-w-lg text-lg text-soft lg:justify-self-end">
          Each one shows what we'd build for a typical client and the tools we'd use. Tell us about yours and we'll send you a
          plan.
        </Reveal>
      </div>
      <div className="container-x mt-20 flex flex-col gap-28 sm:gap-36">
        {projects.map((project, i) => (
          <ProjectRow key={project.id} project={project} index={i} onOpen={onOpen} />
        ))}
      </div>
    </section>
  )
}
