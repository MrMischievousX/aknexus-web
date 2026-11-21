import clsx from 'clsx'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'
import { navLinks } from '../content'
import { EASE, EASE_IN_OUT } from '../lib/motion'
import { lockScroll, scrollToSection } from '../lib/smooth-scroll'
import { useActiveSection } from '../lib/use-active-section'
import { MagneticButton } from './MagneticButton'
import { ThemeToggle } from './ThemeToggle'

const SECTION_IDS = navLinks.map((l) => l.id)
const MOBILE_LINKS = [...navLinks, { id: 'contact', label: 'Contact' }]

export function Nav({ onStart }: { onStart: () => void }) {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(SECTION_IDS)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = scrollY.getPrevious() ?? 0
    setHidden(y > previous && y > 240)
    setSolid(y > 24)
  })

  useEffect(() => {
    lockScroll(open)
  }, [open])

  const go = (id: string) => {
    // Unlock before scrolling: a stopped Lenis ignores scrollTo.
    lockScroll(false)
    setOpen(false)
    scrollToSection(id)
  }

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? '-110%' : '0%' }}
        transition={{ duration: 0.45, ease: EASE }}
        className={clsx(
          'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300',
          solid && !open ? 'border-line bg-bg/75 backdrop-blur-xl' : 'border-transparent',
        )}
      >
        <div className="container-x flex h-[72px] items-center justify-between gap-6">
          <button type="button" onClick={() => go('top')} aria-label="AKNEXUS, back to top" className="shrink-0">
            <img src={`${import.meta.env.BASE_URL}logo-white.svg`} alt="" className="h-[22px] w-auto sm:h-6 light:hidden" />
            <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="" className="hidden h-[22px] w-auto sm:h-6 light:block" />
          </button>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => go(link.id)}
                className={clsx(
                  'relative rounded-full px-4 py-2 text-[0.95rem] transition-colors duration-200',
                  active === link.id ? 'text-text' : 'text-soft hover:text-text',
                )}
              >
                {active === link.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-raise"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <span className="hidden sm:block">
              <MagneticButton onClick={onStart} className="h-10 px-5 text-sm">
                Start a project
              </MagneticButton>
            </span>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="relative grid h-10 w-10 place-items-center rounded-full border border-line lg:hidden"
            >
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
              <motion.span
                className="absolute h-[1.5px] w-4 rounded bg-text"
                animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -3 }}
                transition={{ duration: 0.3, ease: EASE }}
              />
              <motion.span
                className="absolute h-[1.5px] w-4 rounded bg-text"
                animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 3 }}
                transition={{ duration: 0.3, ease: EASE }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-bg pb-10 pt-28 lg:hidden"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.6, ease: EASE_IN_OUT }}
          >
            <nav className="container-x flex flex-col gap-1" aria-label="Mobile">
              {MOBILE_LINKS.map((link, i) => (
                <span key={link.id} className="overflow-hidden">
                  <motion.button
                    type="button"
                    onClick={() => go(link.id)}
                    initial={{ y: '100%' }}
                    animate={{ y: '0%' }}
                    transition={{ delay: 0.2 + i * 0.05, duration: 0.7, ease: EASE }}
                    className="block py-1 text-left font-display text-[2.6rem] font-semibold leading-tight tracking-[-0.03em]"
                  >
                    {link.label}
                  </motion.button>
                </span>
              ))}
            </nav>
            <div className="container-x">
              <MagneticButton onClick={() => go('contact')} className="w-full">
                Start a project
              </MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
