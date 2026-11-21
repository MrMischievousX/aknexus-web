import { ArrowRight } from 'lucide-react'
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { heroBuilds } from '../content'
import { useIntroDone } from '../lib/intro'
import { EASE } from '../lib/motion'
import { scrollToSection } from '../lib/smooth-scroll'
import { MagneticButton } from './MagneticButton'
import { Words } from './Words'

const NexusScene = lazy(() => import('./NexusScene'))

function Rotator({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % words.length), 2400)
    return () => clearInterval(timer)
  }, [words.length])

  return (
    <span className="relative inline-grid overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[index]}
          className="col-start-1 row-start-1 text-text"
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export function Hero({ onStart }: { onStart: () => void }) {
  const ready = useIntroDone()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const appear = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    transition: { duration: 0.9, ease: EASE, delay },
  })

  return (
    <section id="top" ref={ref} className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <motion.div
        aria-hidden
        style={{ scale: sceneScale, opacity: sceneOpacity }}
        className="pointer-events-none absolute inset-0 lg:left-[36%]"
      >
        <Suspense fallback={null}>
          <NexusScene play={ready} />
        </Suspense>
      </motion.div>
      <div
        aria-hidden
        className="hero-scrim pointer-events-none absolute inset-0"
      />

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="container-x relative z-10 flex flex-1 flex-col justify-center pb-32 pt-36"
      >
        <motion.p {...appear(0)} className="mb-8 inline-flex items-center gap-3 text-sm text-soft">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Open for new projects
        </motion.p>

        <h1 className="max-w-[11ch] font-display text-[clamp(3.4rem,10vw,9.5rem)] font-semibold leading-[0.9] tracking-[-0.05em]">
          <Words text="Software," play={ready} /> <Words text="built to run." play={ready} delay={0.12} />
        </h1>

        <motion.p {...appear(0.45)} className="mt-8 max-w-xl text-lg leading-relaxed text-soft sm:text-xl">
          AKNEXUS Technologies designs, builds and runs web, mobile and cloud products for businesses. One team, from the
          first sketch to every release after launch.
        </motion.p>

        <motion.div {...appear(0.6)} className="mt-10 flex flex-wrap gap-3">
          <MagneticButton onClick={onStart}>
            Start a project <ArrowRight size={18} />
          </MagneticButton>
          <MagneticButton variant="ghost" onClick={() => scrollToSection('services')}>
            What we do
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.div
        {...appear(0.8)}
        className="container-x relative z-10 flex items-end justify-between gap-6 pb-8 text-sm text-muted"
      >
        <p>
          We build <Rotator words={heroBuilds} />
        </p>
        <button
          type="button"
          onClick={() => scrollToSection('capabilities')}
          className="hidden items-center gap-3 transition-colors hover:text-text sm:flex"
        >
          Scroll
          <span className="relative h-10 w-px overflow-hidden bg-line">
            <motion.span
              className="absolute inset-x-0 top-0 h-1/2 bg-text"
              animate={{ y: ['-100%', '200%'] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </span>
        </button>
      </motion.div>
    </section>
  )
}
