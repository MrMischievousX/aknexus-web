import clsx from 'clsx'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react'
import type { ReactNode } from 'react'
import { capabilities, stack } from '../content'

const COPIES = 4

function wrap(min: number, max: number, value: number) {
  const range = max - min
  return ((((value - min) % range) + range) % range) + min
}

// A marquee that drifts on its own and speeds up with the page's scroll velocity.
function VelocityRow({ children, speed, className }: { children: ReactNode; speed: number; className?: string }) {
  const reduced = useReducedMotion()
  const base = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const boost = useTransform(velocity, [-1500, 0, 1500], [5, 0, 5], { clamp: false })
  const x = useTransform(base, (v) => `${wrap(-100 / COPIES, (-100 / COPIES) * 2, v)}%`)

  useAnimationFrame((_, delta) => {
    if (reduced) return
    const step = speed * (1 + Math.abs(boost.get())) * (delta / 1000)
    base.set(base.get() + step)
  })

  return (
    <div className={clsx('overflow-hidden', className)}>
      <motion.div className="flex w-max" style={{ x }}>
        {Array.from({ length: COPIES }, (_, k) => (
          <div key={k} aria-hidden={k > 0} className="flex shrink-0 items-center">
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

function Diamond() {
  return <span aria-hidden className="mx-6 inline-block h-3 w-3 rotate-45 bg-accent sm:mx-10 sm:h-4 sm:w-4" />
}

export function Capabilities() {
  return (
    <section id="capabilities" aria-label="What we build" className="border-y border-line py-10 sm:py-14">
      <VelocityRow speed={-2.2}>
        {capabilities.map((c) => (
          <span key={c} className="flex items-center font-display text-[clamp(2.4rem,6vw,5rem)] font-semibold tracking-[-0.04em]">
            {c}
            <Diamond />
          </span>
        ))}
      </VelocityRow>
      <VelocityRow speed={1.4} className="mt-6">
        {stack.map((s) => (
          <span key={s} className="mx-3 rounded-full border border-line px-4 py-1.5 text-sm text-muted">
            {s}
          </span>
        ))}
      </VelocityRow>
    </section>
  )
}
