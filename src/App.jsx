import { useState, useEffect } from 'react'
import './index.css'
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

function App() {
  const [isCmdOpen, setIsCmdOpen] = useState(false)
  const [isOverclocked, setIsOverclocked] = useState(false)

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
      <main>
        <Hero />
        <About />
        <Projects />
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
