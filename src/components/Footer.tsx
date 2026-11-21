import { ArrowUp } from 'lucide-react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { EMAIL, navLinks } from '../content'
import { scrollToSection } from '../lib/smooth-scroll'
import { MagneticButton } from './MagneticButton'

export function Footer({ onStart }: { onStart: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const y = useTransform(scrollYProgress, [0, 1], ['45%', '0%'])

  return (
    <footer className="relative overflow-hidden border-t border-line pt-20">
      <div className="container-x grid gap-12 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="font-display text-3xl font-semibold tracking-[-0.03em]">Software, built to run.</p>
          <p className="mt-3 max-w-sm text-muted">
            AKNEXUS Technologies designs, builds and runs web, mobile and cloud products for businesses.
          </p>
          <MagneticButton onClick={onStart} className="mt-8">
            Start a project
          </MagneticButton>
        </div>
        <nav className="md:col-span-3" aria-label="Footer">
          <p className="mb-4 text-sm text-muted">Explore</p>
          <ul className="flex flex-col gap-2">
            {[...navLinks, { id: 'faq', label: 'FAQ' }, { id: 'contact', label: 'Contact' }].map((link) => (
              <li key={link.id}>
                <button type="button" onClick={() => scrollToSection(link.id)} className="text-soft transition-colors hover:text-text">
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-3">
          <p className="mb-4 text-sm text-muted">Contact</p>
          <p className="break-all text-soft">{EMAIL}</p>
        </div>
      </div>

      <div ref={ref} className="container-x mt-20 overflow-hidden">
        <motion.div style={{ y }}>
          <img src={`${import.meta.env.BASE_URL}wordmark-white.svg`} alt="" className="w-full opacity-[0.07] light:hidden" />
          <img src={`${import.meta.env.BASE_URL}wordmark.svg`} alt="" className="hidden w-full opacity-[0.07] light:block" />
        </motion.div>
      </div>

      <div className="container-x flex flex-wrap items-center justify-between gap-4 border-t border-line py-6 text-sm text-muted">
        <span>© 2026 AKNEXUS Technologies</span>
        <button type="button" onClick={() => scrollToSection('top')} className="inline-flex items-center gap-2 transition-colors hover:text-text">
          Back to top <ArrowUp size={14} />
        </button>
      </div>
    </footer>
  )
}
