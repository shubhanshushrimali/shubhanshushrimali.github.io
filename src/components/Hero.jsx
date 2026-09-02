import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import {
  FiArrowDown,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiBookOpen,
} from 'react-icons/fi'
import { SiMedium, SiDevdotto } from 'react-icons/si'
import { PROFILE, HERO } from '../data/site'
import './Hero.css'

const metricClass = {
  gold: 'gradient-text-gold',
  steel: 'gradient-text',
  sage: 'gradient-text-neon',
}

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="container hero__content">
        <motion.div
          className="hero__hud-status"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="pulse-dot"></span>
          <span className="hero__hud-text mono">{HERO.status}</span>
        </motion.div>

        <motion.p
          className="hero__greeting mono"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {HERO.greeting}
        </motion.p>

        <motion.h1
          className="hero__name font-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {PROFILE.firstName.toUpperCase()}{' '}
          <span className="gradient-text">{PROFILE.lastName.toUpperCase()}</span>
        </motion.h1>

        <motion.div
          className="hero__tagline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <span className="hero__tagline-prefix mono">&gt; specialization: </span>
          <TypeAnimation
            sequence={HERO.sequences}
            wrapper="span"
            speed={50}
            className="hero__tagline-typed gradient-text-neon mono"
            repeat={Infinity}
          />
        </motion.div>

        <motion.p
          className="hero__description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <strong>{PROFILE.title}.</strong> {HERO.description}
        </motion.p>

        <motion.div
          className="hero__metrics-grid"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
        >
          {HERO.metrics.map((metric) => (
            <div key={metric.label} className="hero__metric-card glass-card">
              <span className={`hero__metric-num ${metricClass[metric.tone] || 'gradient-text'}`}>
                {metric.num}
              </span>
              <span className="hero__metric-label mono">{metric.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <a href="#projects" className="btn btn-primary">
            View agent work
            <FiArrowDown aria-hidden="true" />
          </a>
          <a href="#writing" className="btn btn-outline">
            Read writing
          </a>
          <a href={PROFILE.resumeHref} target="_blank" rel="noopener noreferrer" className="btn btn-outline mono">
            <FiBookOpen aria-hidden="true" /> Resume
          </a>
        </motion.div>

        <motion.div
          className="hero__socials"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.05 }}
        >
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="hero__social-link" title="GitHub">
            <FiGithub aria-hidden="true" />
          </a>
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="hero__social-link" title="LinkedIn">
            <FiLinkedin aria-hidden="true" />
          </a>
          <a href={PROFILE.devto} target="_blank" rel="noopener noreferrer" className="hero__social-link" title="DEV.to">
            <SiDevdotto aria-hidden="true" />
          </a>
          <a href={PROFILE.medium} target="_blank" rel="noopener noreferrer" className="hero__social-link" title="Medium">
            <SiMedium aria-hidden="true" />
          </a>
          <a href={`mailto:${PROFILE.email}`} className="hero__social-link" title="Email">
            <FiMail aria-hidden="true" />
          </a>
          <a href={PROFILE.phoneHref} className="hero__social-link" title="Phone">
            <FiPhone aria-hidden="true" />
          </a>
        </motion.div>
      </div>

      <motion.div
        className="hero__scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <FiArrowDown size={20} color="var(--accent-gold)" aria-hidden="true" />
        </motion.div>
        <span className="mono">SCROLL</span>
      </motion.div>
    </section>
  )
}
