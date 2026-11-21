import { Plus } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useId, useState } from 'react'
import { faqs } from '../content'
import { EASE } from '../lib/motion'
import { SectionHeading } from './Words'

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  const id = useId()

  return (
    <div className="border-b border-line">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-medium"
      >
        {q}
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3, ease: EASE }} className="shrink-0 text-muted">
          <Plus size={20} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="max-w-xl pb-6 text-soft">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Faq() {
  const half = Math.ceil(faqs.length / 2)
  return (
    <section id="faq" className="container-x py-28 sm:py-36">
      <SectionHeading lead="Questions." title="Answered before you ask." />
      <div className="mt-14 grid gap-x-12 md:grid-cols-2">
        {[faqs.slice(0, half), faqs.slice(half)].map((column, c) => (
          <div key={c} className="border-t border-line">
            {column.map((f) => (
              <Item key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
