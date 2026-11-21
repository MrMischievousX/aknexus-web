import clsx from 'clsx'
import { motion, useSpring } from 'motion/react'
import { useRef, type PointerEvent, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  onClick?: () => void
  variant?: 'solid' | 'ghost'
  type?: 'button' | 'submit'
  className?: string
  disabled?: boolean
}

export function MagneticButton({ children, onClick, variant = 'solid', type = 'button', className, disabled }: Props) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 })
  const y = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 })

  const pull = (e: PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== 'mouse' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.4)
  }
  const release = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      onPointerMove={pull}
      onPointerLeave={release}
      style={{ x, y }}
      whileTap={{ scale: 0.96 }}
      className={clsx(
        'group relative inline-flex h-12 shrink-0 items-center justify-center overflow-hidden rounded-full px-6 text-[0.95rem] font-medium transition-colors duration-300 disabled:pointer-events-none disabled:opacity-60',
        variant === 'solid' ? 'bg-text text-bg' : 'border border-line text-text hover:border-text hover:text-bg',
        className,
      )}
    >
      <span
        aria-hidden
        className={clsx(
          'absolute inset-0 origin-bottom scale-y-0 rounded-full transition-transform duration-500 ease-out-expo group-hover:scale-y-100',
          variant === 'solid' ? 'bg-accent' : 'bg-text',
        )}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  )
}
