import { ArrowRight, ArrowUpRight, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, type MouseEvent } from 'react'
import { steps, type Project } from '../content'
import { EASE } from '../lib/motion'
import { lockScroll } from '../lib/smooth-scroll'
import { MagneticButton } from './MagneticButton'
import { Mockup } from './Mockup'

type Props = { project: Project; onClose: () => void; onDiscuss: () => void; onNext: () => void }

export function ProjectDetail({ project, onClose, onDiscuss, onNext }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const scroller = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    lockScroll(true)
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      lockScroll(false)
      window.removeEventListener('keydown', onKey)
      opener?.focus()
    }
  }, [onClose])

  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 })
  }, [project.id])

  const closeOnBackdrop = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <motion.div
      className="fixed inset-0 z-[60]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div aria-hidden className="absolute inset-0 bg-black/70 backdrop-blur-md" />
      <div ref={scroller} data-lenis-prevent className="absolute inset-0 overflow-y-auto overscroll-contain" onClick={closeOnBackdrop}>
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 60 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative mx-auto my-4 w-[min(1120px,calc(100%-24px))] rounded-[32px] border border-line bg-surface p-6 sm:my-10 sm:p-12"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <div className="flex items-start justify-between gap-6">
                <p className="flex items-center gap-3 text-sm text-muted">
                  <span className="rounded-full bg-raise px-3 py-1 text-soft">
                    {project.real ? 'Client work' : 'Example project'}
                  </span>
                  {project.sector}
                  {project.status ? <span className="text-muted">· {project.status}</span> : null}
                </p>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line transition-colors hover:bg-raise"
                >
                  <X size={18} />
                  <span className="sr-only">Close</span>
                </button>
              </div>

              <h2 id="project-title" className="mt-6 font-display text-[clamp(2rem,4.6vw,3.8rem)] font-semibold leading-[1.04]">
                <span className="text-muted">{project.name}</span>
                <br />
                {project.title}
              </h2>

              <div
                className={`mt-10 grid aspect-[16/9] place-items-center overflow-hidden rounded-[24px] text-[clamp(10px,1.2vw,15px)] leading-[1.3] text-navy ${project.shot ? '' : 'max-sm:aspect-square'}`}
                style={{ backgroundColor: project.color }}
              >
                {project.shot ? (
                  <img
                    src={project.shot}
                    alt={`${project.name.replace(/\.$/, '')} website`}
                    decoding="async"
                    className="h-full w-full object-cover object-top"
                  />
                ) : (
                  <Mockup kind={project.mockup} />
                )}
              </div>

              <div className="mt-12 grid gap-12 lg:grid-cols-2">
                <div>
                  <h3 className="text-sm font-medium text-muted">The need</h3>
                  <p className="mt-3 text-xl leading-relaxed">{project.need}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted">{project.real ? 'What we built' : "What we'd build"}</h3>
                  <ul className="mt-3 flex flex-col gap-3">
                    {project.build.map((item) => (
                      <li key={item} className="flex gap-3 text-lg text-soft">
                        <span aria-hidden className="mt-[0.6em] h-2 w-2 shrink-0 rotate-45 bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-12 border-t border-line pt-10">
                <h3 className="text-sm font-medium text-muted">{project.real ? 'How we ran it' : "How we'd run it"}</h3>
                <ol className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {steps.map((step, i) => (
                    <li key={step.title} className="rounded-2xl bg-raise p-5">
                      <span className="text-sm text-accent">{i + 1}</span>
                      <p className="mt-2 font-semibold">{step.title}</p>
                      <p className="mt-1 text-sm text-soft">{step.text}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-10">
                <ul className="flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <li key={s} className="rounded-full border border-line px-3 py-1 text-sm text-soft">
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  {project.url ? (
                    <MagneticButton variant="ghost" href={project.url}>
                      Visit the site <ArrowUpRight size={18} />
                    </MagneticButton>
                  ) : null}
                  <MagneticButton variant="ghost" onClick={onNext}>
                    Next project
                  </MagneticButton>
                  <MagneticButton onClick={onDiscuss}>
                    Discuss a project like this <ArrowRight size={18} />
                  </MagneticButton>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  )
}
