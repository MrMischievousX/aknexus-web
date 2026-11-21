import clsx from 'clsx'
import { motion } from 'motion/react'
import { Fragment, type ReactNode } from 'react'
import { EASE } from '../lib/motion'

type WordsProps = {
  text: string
  className?: string
  delay?: number
  // The hero waits for the intro (`play`); everything else reveals when scrolled into view.
  play?: boolean
  inView?: boolean
}

const word = {
  hidden: { y: '110%' },
  shown: (delay: number) => ({ y: '0%', transition: { duration: 0.9, ease: EASE, delay } }),
}

export function Words({ text, className, delay = 0, play = true, inView = false }: WordsProps) {
  const words = text.split(' ')
  // The in-view check sits on the outer span: each word starts fully clipped, which reads as off-screen.
  const trigger = inView
    ? { whileInView: 'shown', viewport: { once: true, margin: '0px 0px -10% 0px' } }
    : { animate: play ? 'shown' : 'hidden' }

  return (
    <motion.span className={className} initial="hidden" {...trigger}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="-mb-[0.1em] inline-block overflow-hidden pb-[0.1em] align-top">
            <motion.span className="inline-block" variants={word} custom={delay + i * 0.05}>
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </motion.span>
  )
}

export function SectionHeading({ lead, title, id, className }: { lead: string; title: string; id?: string; className?: string }) {
  return (
    <h2 id={id} className={clsx('font-display text-[clamp(2.1rem,4.6vw,3.8rem)] font-semibold leading-[1.04]', className)}>
      <Words text={lead} inView className="text-muted" />
      <br />
      <Words text={title} inView delay={0.08} />
    </h2>
  )
}

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}
