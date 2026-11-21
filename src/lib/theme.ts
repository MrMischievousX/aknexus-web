import { useSyncExternalStore } from 'react'
import { flushSync } from 'react-dom'

export type Theme = 'light' | 'dark'

const KEY = 'aknexus-theme'
const systemLight = matchMedia('(prefers-color-scheme: light)')
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)')
const listeners = new Set<() => void>()

function stored(): Theme | null {
  try {
    const value = localStorage.getItem(KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

// index.html sets data-theme before first paint, so this is always one of the two.
const current = (): Theme => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')

function apply(theme: Theme) {
  document.documentElement.dataset.theme = theme
  const bg = getComputedStyle(document.documentElement).getPropertyValue('--color-bg').trim()
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', bg)
  listeners.forEach((listener) => listener())
}

// With no saved choice, keep following the system setting.
systemLight.addEventListener('change', () => {
  if (!stored()) apply(systemLight.matches ? 'light' : 'dark')
})

export function toggleTheme() {
  const next: Theme = current() === 'light' ? 'dark' : 'light'
  try {
    localStorage.setItem(KEY, next)
  } catch {
    // Storage blocked: the switch still applies for this visit.
  }
  // flushSync so React's half of the change is in the new snapshot the cross-fade captures.
  const swap = () => flushSync(() => apply(next))
  if (document.startViewTransition && !reducedMotion.matches) document.startViewTransition(swap)
  else swap()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function useTheme() {
  return useSyncExternalStore(subscribe, current)
}
