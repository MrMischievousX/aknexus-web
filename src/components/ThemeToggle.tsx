import { Moon, Sun } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { EASE } from '../lib/motion'
import { toggleTheme, useTheme } from '../lib/theme'

export function ThemeToggle() {
  const theme = useTheme()
  const Icon = theme === 'light' ? Moon : Sun

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
      className="relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full border border-line text-text transition-colors duration-200 hover:bg-raise"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={theme}
          className="grid place-items-center"
          initial={{ y: 14, rotate: -60, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: -14, rotate: 60, opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <Icon size={17} strokeWidth={1.8} />
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
