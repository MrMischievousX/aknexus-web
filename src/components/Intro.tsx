import { animate, AnimatePresence, motion, useMotionValue } from 'motion/react'
import { useLayoutEffect, useRef, useState } from 'react'
import { EASE, EASE_IN_OUT } from '../lib/motion'

// When the wordmark starts rising and the lockup slides back to its resting place.
const REVEAL = 0.52
const REVEAL_DURATION = 0.6

// The mark draws itself centred, then the wordmark rises beside it and pushes the
// pair into its final position. Plays once per browser session.
export function Intro({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(true)
  const lockup = useRef<HTMLDivElement>(null)
  const word = useRef<HTMLSpanElement>(null)
  // Offset that keeps the mark optically centred until the wordmark arrives.
  const x = useMotionValue(0)

  useLayoutEffect(() => {
    const row = lockup.current
    const text = word.current
    if (!row || !text) return
    const gap = parseFloat(getComputedStyle(row).columnGap) || 0
    // Half the space the wordmark will occupy, so the mark starts on the centre line.
    const offset = (text.offsetWidth + gap) / 2
    if (!offset) return
    x.set(offset)
    const controls = animate(x, 0, { delay: REVEAL, duration: REVEAL_DURATION, ease: EASE })
    return () => controls.stop()
  }, [x])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {show && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] grid place-items-center bg-bg"
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: 0.8, ease: EASE_IN_OUT, delay: 0.15 } }}
        >
          <motion.div ref={lockup} style={{ x }} className="flex items-center gap-4 sm:gap-5">
            <svg viewBox="0 0 104 100" className="h-11 w-11 shrink-0 sm:h-16 sm:w-16" aria-hidden>
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
                  transition={{ duration: 0.5, ease: EASE }}
                />
                <motion.path
                  d="M-5,-25 L109,125"
                  className="stroke-text"
                  strokeWidth={22}
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.12 }}
                />
              </g>
              <motion.path
                d="M52,31 L71,50 L52,69 L33,50 Z"
                className="fill-bg"
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.42, duration: 0.22, ease: EASE }}
              />
              <motion.path
                d="M52,39 L63,50 L52,61 L41,50 Z"
                className="fill-accent"
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                // Settles rather than wobbles, so it is at rest as the wordmark arrives.
                transition={{ delay: 0.5, type: 'spring', stiffness: 420, damping: 20 }}
              />
            </svg>
            <span ref={word} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ delay: REVEAL, duration: REVEAL_DURATION, ease: EASE }}
                onAnimationComplete={() => setShow(false)}
              >
                <img
                  src={`${import.meta.env.BASE_URL}wordmark-white.svg`}
                  alt="AKNEXUS"
                  width={754}
                  height={100}
                  className="block h-8 w-auto sm:h-11 light:hidden"
                />
                <img
                  src={`${import.meta.env.BASE_URL}wordmark.svg`}
                  alt="AKNEXUS"
                  width={754}
                  height={100}
                  className="hidden h-8 w-auto sm:h-11 light:block"
                />
              </motion.span>
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
