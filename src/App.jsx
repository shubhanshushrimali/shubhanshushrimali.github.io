import { useState, useEffect, lazy, Suspense, useCallback } from 'react'
import './index.css'
import './styles/cinematic.css'
import {
  useMagneticCursor,
  useScrollAnimations,
  useSmoothScroll,
  useFilmGrain,
  useMagneticButtons,
  useScrollProgress,
  useSectionReveals
} from './hooks/useCinematicEngine'
import ParticleCanvas from './components/ParticleCanvas'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Experience from './components/Experience'
import BenchmarksSection from './components/BenchmarksSection'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CommandPalette from './components/CommandPalette'
import { soundFX } from './utils/audio'

/* Lazy-load heavy components that aren't visible above the fold */
const VideoShowcase = lazy(() => import('./components/VideoShowcase'))

/* Loading fallback for lazy components */
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
        LOADING MODULE...
      </span>
    </div>
  )
}

function App() {
  const [isCmdOpen, setIsCmdOpen] = useState(false)
  const [isOverclocked, setIsOverclocked] = useState(false)

  // ═══ Cinematic Engine Hooks ═══
  useMagneticCursor()
  useScrollAnimations()
  useSmoothScroll()
  useFilmGrain()
  useMagneticButtons()
  useScrollProgress()
  useSectionReveals()

  // Mouse-follow radial glow on glass cards
  useEffect(() => {
    const handleCardMouse = (e) => {
      const card = e.currentTarget
      const rect = card.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      card.style.setProperty('--mouse-x', `${x}%`)
      card.style.setProperty('--mouse-y', `${y}%`)
    }

    const cards = document.querySelectorAll('.glass-card')
    cards.forEach(c => c.addEventListener('mousemove', handleCardMouse))
    return () => cards.forEach(c => c.removeEventListener('mousemove', handleCardMouse))
  }, [])

  // Keyboard shortcut listener for Ctrl+K, Cmd+K, and ~ (Tilde/Console)
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

  // Easter Egg: Konami Code Sequence (Up, Up, Down, Down, Left, Right, Left, Right, B, A)
  useEffect(() => {
    const konamiCode = [
      'ArrowUp',
      'ArrowUp',
      'ArrowDown',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ArrowLeft',
      'ArrowRight',
      'b',
      'a'
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

  const toggleOverclock = () => {
    setIsOverclocked(!isOverclocked)
  }

  return (
    <div className={`app-root ${isOverclocked ? 'app-root--overclock' : ''}`}>
      {/* 3D WebGL Background Canvas */}
      <ParticleCanvas />

      {/* Navigation Header */}
      <Navbar
        onOpenCmd={() => setIsCmdOpen(true)}
        isOverclocked={isOverclocked}
        onToggleOverclock={toggleOverclock}
      />

      {/* Main Content Flow */}
      <main id="main-content">
        <Hero />
        <About />
        <Projects />
        <Suspense fallback={<SectionLoader />}>
          <VideoShowcase />
        </Suspense>
        <Experience />
        <BenchmarksSection />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Developer Command Palette HUD (Ctrl+K) */}
      <CommandPalette
        isOpen={isCmdOpen}
        onClose={() => setIsCmdOpen(false)}
        onToggleOverclock={toggleOverclock}
        isOverclocked={isOverclocked}
      />
    </div>
  )
}

export default App
