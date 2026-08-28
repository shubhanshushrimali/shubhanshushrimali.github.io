import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiMenu,
  FiX,
  FiTerminal,
  FiVolume2,
  FiVolumeX,
  FiBookOpen,
  FiZap
} from 'react-icons/fi'
import { soundFX } from '../utils/audio'
import './Navbar.css'

const navLinks = [
  { name: 'Architecture', href: '#about' },
  { name: 'Showcases', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Benchmarks', href: '#benchmarks' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar({ onOpenCmd, isOverclocked, onToggleOverclock }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [isAudioMuted, setIsAudioMuted] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = navLinks.map((l) => l.href.replace('#', ''))
      for (const id of sections.reverse()) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 180) {
          setActiveSection(id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleToggleAudio = () => {
    const unmuted = soundFX.toggleMute()
    setIsAudioMuted(!unmuted)
  }

  const handleLinkClick = () => {
    soundFX.playClick()
    setMobileOpen(false)
  }

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${isOverclocked ? 'navbar--overclock' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="navbar__container">
        
        {/* Brand Logo */}
        <motion.a
          href="#hero"
          className="navbar__logo font-heading"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => soundFX.playClick()}
        >
          <span className="navbar__logo-bracket mono">&lt;</span>
          SS
          <span className="navbar__logo-bracket mono"> /&gt;</span>
        </motion.a>

        {/* Desktop Nav Links */}
        <div className="navbar__links">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              className={`navbar__link ${activeSection === link.href.replace('#', '') ? 'navbar__link--active' : ''}`}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.08 * i, duration: 0.5 }}
              whileHover={{ y: -2 }}
              onMouseEnter={() => soundFX.playHover()}
              onClick={() => soundFX.playClick()}
            >
              <span className="navbar__link-number mono">0{i + 1}.</span>
              {link.name}
            </motion.a>
          ))}
        </div>

        {/* Action Controls (Audio, Command Palette, Resume) */}
        <div className="navbar__right-actions">
          
          {/* Audio FX Toggle */}
          <button
            className={`navbar__action-btn ${!isAudioMuted ? 'navbar__action-btn--active' : ''}`}
            onClick={handleToggleAudio}
            title={isAudioMuted ? 'Enable Cyber SFX Audio' : 'Mute Cyber SFX Audio'}
            aria-label="Toggle Sound FX"
          >
            {isAudioMuted ? <FiVolumeX /> : <FiVolume2 />}
            <span className="btn-label-text mono">{isAudioMuted ? 'SFX_OFF' : 'SFX_ON'}</span>
          </button>

          {/* Terminal / Command Palette Trigger */}
          <button
            className="navbar__action-btn navbar__cmd-btn mono"
            onClick={() => {
              soundFX.playClick()
              onOpenCmd()
            }}
            title="Open Command Center (Ctrl+K)"
          >
            <FiTerminal />
            <span className="btn-label-text">CMD</span>
            <span className="cmd-badge">Ctrl+K</span>
          </button>

          {/* Resume PDF */}
          <motion.a
            href="/resume.pdf"
            className="btn btn-outline navbar__resume-btn mono"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => soundFX.playSuccess()}
          >
            <FiBookOpen /> Resume
          </motion.a>

          {/* Mobile Menu Toggle */}
          <button
            className="navbar__mobile-toggle"
            onClick={() => {
              soundFX.playClick()
              setMobileOpen(!mobileOpen)
            }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="navbar__mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="navbar__mobile-link"
                onClick={handleLinkClick}
              >
                {link.name}
              </a>
            ))}
            <div className="navbar__mobile-footer">
              <button
                className="btn btn-outline"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => {
                  setMobileOpen(false)
                  onOpenCmd()
                }}
              >
                <FiTerminal /> Open Command Console
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
