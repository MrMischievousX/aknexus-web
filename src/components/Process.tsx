import clsx from 'clsx'
import { motion, useInView, useScroll, useSpring } from 'motion/react'
import { useRef } from 'react'
import { models, steps } from '../content'
import { EASE } from '../lib/motion'
import { Reveal, SectionHeading } from './Words'

function Step({ step, index }: { step: (typeof steps)[number]; index: number }) {
  const ref = useRef<HTMLLIElement>(null)
  const reached = useInView(ref, { once: true, margin: '0px 0px -45% 0px' })

  return (
    <li ref={ref} className="relative pl-16">
      <span
        className={clsx(
          'absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full border text-sm font-semibold transition-colors duration-[400ms]',
          reached ? 'border-accent bg-accent text-navy' : 'border-line bg-surface text-muted',
        )}
      >
        {index + 1}
      </span>
      <h3 className="text-[clamp(1.6rem,2.6vw,2.2rem)] font-semibold leading-tight">{step.title}</h3>
      <p className="mt-3 max-w-md text-lg text-soft">{step.text}</p>
    </li>
  )
}

export function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.7', 'end 0.6'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section id="process" className="container-x py-28 sm:py-36">
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
          <SectionHeading lead="How we work." title="Four steps. No surprises." />
          <Reveal className="mt-6 max-w-md text-lg text-soft">
            Every project follows the same path, so you always know what happens next and what it costs.
          </Reveal>
        </div>
        <div ref={ref} className="relative lg:col-span-6 lg:col-start-7">
          <div aria-hidden className="absolute bottom-2 left-[19.5px] top-2 w-px bg-line" />
          <motion.div aria-hidden style={{ scaleY: progress }} className="absolute bottom-2 left-[19.5px] top-2 w-px origin-top bg-accent" />
          <ol className="flex flex-col gap-20">
            {steps.map((step, i) => (
              <Step key={step.title} step={step} index={i} />
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-28">
        <Reveal>
          <h3 className="text-2xl font-semibold">Ways to work together</h3>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {models.map((model, i) => (
            <motion.div
              key={model.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              viewport={{ once: true, margin: '0px 0px -60px 0px' }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.06 }}
              className="flex flex-col gap-3 rounded-3xl border border-line bg-surface p-8"
            >
              <h4 className="text-xl font-semibold">{model.title}</h4>
              <p className="text-soft">{model.text}</p>
              <p className="mt-auto pt-6 text-sm font-medium text-accent">{model.billing}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
