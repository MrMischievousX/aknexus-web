import { motion } from 'motion/react'
import { audiences } from '../content'
import { EASE } from '../lib/motion'
import { SectionHeading } from './Words'

export function Audiences() {
  return (
    <section aria-labelledby="audiences-title" className="container-x py-28 sm:py-36">
      <SectionHeading id="audiences-title" lead="Who we build for." title="Businesses at every stage." />
      <ul className="mt-16 border-t border-line">
        {audiences.map((audience, i) => (
          <motion.li
            key={audience.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -60px 0px' }}
            transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
            className="group grid gap-4 border-b border-line py-10 md:grid-cols-12 md:items-center"
          >
            <h3 className="font-display text-[clamp(1.6rem,3vw,2.6rem)] font-semibold leading-tight transition-transform duration-500 ease-out-expo group-hover:translate-x-3 md:col-span-6">
              {audience.title}
            </h3>
            <p className="text-lg text-soft md:col-span-5 md:col-start-8">{audience.text}</p>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}
