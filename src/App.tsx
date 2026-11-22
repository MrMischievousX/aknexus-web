import { AnimatePresence, MotionConfig } from 'motion/react'
import { useCallback, useState } from 'react'
import { About } from './components/About'
import { Audiences } from './components/Audiences'
import { Capabilities } from './components/Capabilities'
import { Contact, type Brief } from './components/Contact'
import { Faq } from './components/Faq'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Intro } from './components/Intro'
import { Nav } from './components/Nav'
import { Process } from './components/Process'
import { ProjectDetail } from './components/ProjectDetail'
import { Services } from './components/Services'
import { Statement } from './components/Statement'
import { Work } from './components/Work'
import { projects } from './content'
import { IntroContext, PLAY_INTRO } from './lib/intro'
import { lockScroll, scrollToSection, useSmoothScroll } from './lib/smooth-scroll'

export default function App() {
  useSmoothScroll()
  const [introDone, setIntroDone] = useState(!PLAY_INTRO)
  const [openId, setOpenId] = useState<string | null>(null)
  const [brief, setBrief] = useState<Brief | null>(null)

  const startProject = useCallback(() => scrollToSection('contact'), [])
  const closeProject = useCallback(() => setOpenId(null), [])

  const project = projects.find((p) => p.id === openId) ?? null

  const discuss = () => {
    if (!project) return
    setOpenId(null)
    setBrief({
      services: project.services,
      message: `We're interested in something like your ${project.name.replace(/\.$/, '').toLowerCase()} example.`,
      key: Date.now(),
    })
    // The dialog unlocks scrolling as it leaves; unlock now so the scroll below isn't swallowed.
    lockScroll(false)
    scrollToSection('contact')
  }

  const nextProject = () => {
    const i = projects.findIndex((p) => p.id === openId)
    setOpenId(projects[(i + 1) % projects.length].id)
  }

  return (
    <IntroContext.Provider value={introDone}>
      <MotionConfig reducedMotion="user">
        {PLAY_INTRO && <Intro onDone={() => setIntroDone(true)} />}
        <Nav onStart={startProject} />
        <main>
          <Hero onStart={startProject} />
          <Capabilities />
          <Statement />
          <Services />
          <Audiences />
          <Work onOpen={setOpenId} />
          <Process />
          <About />
          <Faq />
          <Contact brief={brief} />
        </main>
        <Footer onStart={startProject} />
        <AnimatePresence>
          {project && (
            <ProjectDetail key="project" project={project} onClose={closeProject} onDiscuss={discuss} onNext={nextProject} />
          )}
        </AnimatePresence>
      </MotionConfig>
    </IntroContext.Provider>
  )
}
