import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { EASE, EASE_IN_OUT } from '../lib/motion'

// The logo assembles, then the curtain lifts off the page. Plays once per browser session.
export function Intro({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(true)

  return (
    <AnimatePresence onExitComplete={onDone}>
      {show && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] grid place-items-center bg-bg"
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: 0.9, ease: EASE_IN_OUT, delay: 0.35 } }}
        >
          <div className="flex items-center gap-4 sm:gap-5">
            <svg viewBox="0 0 104 100" className="h-11 w-11 sm:h-16 sm:w-16" aria-hidden>
              <defs>
                <clipPath id="intro-x">
                  <rect width="104" height="100" />
                </clipPath>
              </defs>
              <g clipPath="url(#intro-x)">
                <motion.path
                  d="M-5,125 L109,-25"
                  className="stroke-text"
                  strokeWidth={22}
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.55, ease: EASE }}
                />
                <motion.path
                  d="M-5,-25 L109,125"
                  className="stroke-text"
                  strokeWidth={22}
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.55, ease: EASE, delay: 0.15 }}
                />
              </g>
              <motion.path
                d="M52,31 L71,50 L52,69 L33,50 Z"
                className="fill-bg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.55, duration: 0.25 }}
              />
              <motion.path
                d="M52,39 L63,50 L52,61 L41,50 Z"
                className="fill-accent"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.65, type: 'spring', stiffness: 420, damping: 14 }}
              />
            </svg>
            <span className="overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ delay: 0.7, duration: 0.7, ease: EASE }}
                onAnimationComplete={() => setShow(false)}
              >
                <img src={`${import.meta.env.BASE_URL}wordmark-white.svg`} alt="AKNEXUS" className="block h-8 w-auto sm:h-11 light:hidden" />
                <img src={`${import.meta.env.BASE_URL}wordmark.svg`} alt="AKNEXUS" className="hidden h-8 w-auto sm:h-11 light:block" />
              </motion.span>
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
