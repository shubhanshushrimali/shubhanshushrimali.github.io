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

/* ─── Coordinated stagger entrance ─── */
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

const fadeUpSpring = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 80, damping: 20 },
  },
}

/* Text reveal: clip-path wipe from bottom */
const textReveal = {
  hidden: {
    opacity: 0,
    clipPath: 'inset(100% 0% 0% 0%)',
    y: 20,
  },
  visible: {
    opacity: 1,
    clipPath: 'inset(0% 0% 0% 0%)',
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8 },
  },
}

const metricClass = {
  gold: 'gradient-text-gold',
  steel: 'gradient-text',
  sage: 'gradient-text-neon',
}

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <motion.div
        className="hero__content"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="hero__hud-status" variants={fadeUp}>
          <span className="pulse-dot"></span>
          <span className="hero__hud-text mono">{HERO.status}</span>
        </motion.div>

        <motion.p className="hero__greeting mono" variants={fadeUp}>
          {HERO.greeting}
        </motion.p>

        <motion.h1 className="hero__name font-heading" variants={textReveal}>
          {PROFILE.firstName}{' '}
          <span className="gradient-text">{PROFILE.lastName}</span>
        </motion.h1>

        <motion.div className="hero__tagline" variants={fadeUp}>
          <span className="hero__tagline-prefix mono">&gt; specialization: </span>
          <TypeAnimation
            sequence={HERO.sequences}
            wrapper="span"
            speed={50}
            className="hero__tagline-typed gradient-text-neon mono"
            repeat={Infinity}
          />
        </motion.div>

        <motion.p className="hero__description" variants={fadeUp}>
          <strong>{PROFILE.name}</strong> is an {PROFILE.title} {HERO.description}
        </motion.p>

        <motion.div className="hero__metrics-grid" variants={fadeUpSpring}>
          {HERO.metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              className="hero__metric-card glass-card"
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.7 + i * 0.1,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span className={`hero__metric-num ${metricClass[metric.tone] || 'gradient-text'}`}>
                {metric.num}
              </span>
              <span className="hero__metric-label mono">{metric.label}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="hero__actions" variants={fadeUp}>
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

        <motion.div className="hero__socials" variants={fadeIn}>
          <a href={PROFILE.github} target="_blank" rel="me noopener noreferrer" className="hero__social-link" title="GitHub" aria-label={`${PROFILE.name} on GitHub`}>
            <FiGithub aria-hidden="true" />
          </a>
          <a href={PROFILE.linkedin} target="_blank" rel="me noopener noreferrer" className="hero__social-link" title="LinkedIn" aria-label={`${PROFILE.name} on LinkedIn`}>
            <FiLinkedin aria-hidden="true" />
          </a>
          <a href={PROFILE.devto} target="_blank" rel="me noopener noreferrer" className="hero__social-link" title="DEV.to" aria-label={`${PROFILE.name} on DEV.to`}>
            <SiDevdotto aria-hidden="true" />
          </a>
          <a href={PROFILE.medium} target="_blank" rel="me noopener noreferrer" className="hero__social-link" title="Medium" aria-label={`${PROFILE.name} on Medium`}>
            <SiMedium aria-hidden="true" />
          </a>
          <a href={`mailto:${PROFILE.email}`} rel="me" className="hero__social-link" title="Email" aria-label={`Email ${PROFILE.name}`}>
            <FiMail aria-hidden="true" />
          </a>
          <a href={PROFILE.phoneHref} className="hero__social-link" title="Phone">
            <FiPhone aria-hidden="true" />
          </a>
        </motion.div>
      </motion.div>

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
