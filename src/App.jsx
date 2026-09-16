import { useState, useEffect, lazy, Suspense } from 'react'
import './index.css'
import './styles/cinematic.css'
import {
  useScrollAnimations,
  useSectionLineAnimations,
  useSmoothScroll,
  useScrollProgress
} from './hooks/useCinematicEngine'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Writing from './components/Writing'
import Experience from './components/Experience'
import BenchmarksSection from './components/BenchmarksSection'
import Resume from './components/Resume'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CommandPalette from './components/CommandPalette'
import { soundFX } from './utils/audio'

const ParticleCanvas = lazy(() => import('./components/ParticleCanvas'))
const VideoShowcase = lazy(() => import('./components/VideoShowcase'))

function SectionLoader() {
  return (
    <div className="glass-card" style={{
      maxWidth: 600,
      margin: '3rem auto',
      textAlign: 'center',
      padding: '3rem'
    }}>
      <div className="pulse-dot" style={{ margin: '0 auto 1rem' }} />
      <span className="mono" style={{ color: 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
        LOADING…
      </span>
    </div>
  )
}

function App() {
  const [isCmdOpen, setIsCmdOpen] = useState(false)
  const [isOverclocked, setIsOverclocked] = useState(false)

  // Cinematic engine hooks (GSAP-free)
  useScrollAnimations()
  useSectionLineAnimations()
  useSmoothScroll()
  useScrollProgress()

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsCmdOpen((prev) => !prev)
      } else if (e.key === '`' || e.key === '~') {
        e.preventDefault()
        setIsCmdOpen((prev) => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Konami code → overclock mode
  useEffect(() => {
    const konamiCode = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'b', 'a'
    ]
    let konamiIndex = 0

    const handleKonami = (e) => {
      if (e.key.toLowerCase() === konamiCode[konamiIndex].toLowerCase()) {
        konamiIndex++
        if (konamiIndex === konamiCode.length) {
          setIsOverclocked((prev) => !prev)
          soundFX.playSuccess()
          konamiIndex = 0
        }
      } else {
        konamiIndex = 0
      }
    }

    window.addEventListener('keydown', handleKonami)
    return () => window.removeEventListener('keydown', handleKonami)
  }, [])

  return (
    <div className={`app-root ${isOverclocked ? 'app-root--overclock' : ''}`}>
      <Suspense fallback={null}>
        <ParticleCanvas />
      </Suspense>

      <Navbar
        onOpenCmd={() => setIsCmdOpen(true)}
        isOverclocked={isOverclocked}
        onToggleOverclock={() => setIsOverclocked(!isOverclocked)}
      />

      <main id="main-content">
        <Hero />
        <About />
        <Projects />
        <Writing />
        <Suspense fallback={<SectionLoader />}>
          <VideoShowcase />
        </Suspense>
        <Experience />
        <BenchmarksSection />
        <Resume />
        <Contact />
      </main>

      <Footer />

      <CommandPalette
        isOpen={isCmdOpen}
        onClose={() => setIsCmdOpen(false)}
        onToggleOverclock={() => setIsOverclocked(!isOverclocked)}
        isOverclocked={isOverclocked}
      />
    </div>
  )
}

export default App
