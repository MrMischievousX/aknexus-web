import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import { principles } from '../content'
import { Reveal } from './Words'

const TEXT =
  'AKNEXUS Technologies is a software studio for businesses that want to move fast without breaking what already works. We plan, design, build and run your product as one team, from the first sketch to every release after launch.'

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.16, 1])
  return (
    <>
      <motion.span style={{ opacity }}>{children}</motion.span>{' '}
    </>
  )
}

export function Statement() {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = TEXT.split(' ')

  return (
    <section aria-label="About AKNEXUS Technologies" className="container-x py-32 sm:py-44">
      <p
        ref={ref}
        className="max-w-[26ch] font-display text-[clamp(1.9rem,4.4vw,3.7rem)] font-semibold leading-[1.12] tracking-[-0.03em]"
      >
        {words.map((word, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
            {word}
          </Word>
        ))}
      </p>

      <div className="mt-20 grid gap-10 border-t border-line pt-10 sm:grid-cols-3">
        {principles.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08}>
            <h3 className="text-xl font-semibold">{p.title}</h3>
            <p className="mt-2 text-soft">{p.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
