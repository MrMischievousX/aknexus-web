import { createContext, useContext } from 'react'

const SEEN_KEY = 'aknexus-intro-seen'

// Evaluated once at import, so StrictMode's double render can't consume the flag.
export const PLAY_INTRO = (() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  try {
    if (sessionStorage.getItem(SEEN_KEY)) return false
    sessionStorage.setItem(SEEN_KEY, '1')
  } catch {
    // Storage blocked (private mode): play the intro every time.
  }
  return true
})()

export const IntroContext = createContext(true)
export const useIntroDone = () => useContext(IntroContext)
