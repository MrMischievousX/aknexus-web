import Lenis from 'lenis'
import { useEffect } from 'react'

const NAV_OFFSET = -80
let lenis: Lenis | null = null

export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    lenis = new Lenis({ autoRaf: true, lerp: 0.09, anchors: { offset: NAV_OFFSET } })
    return () => {
      lenis?.destroy()
      lenis = null
    }
  }, [])
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: id === 'top' ? 0 : NAV_OFFSET })
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function lockScroll(locked: boolean) {
  if (locked) lenis?.stop()
  else lenis?.start()
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}
