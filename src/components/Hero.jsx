import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { FiArrowDown, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="container hero__content">
        {/* Greeting */}
        <motion.p
          className="hero__greeting mono"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Hi, my name is
        </motion.p>

        {/* Name */}
        <motion.h1
          className="hero__name"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Shubhanshu <span className="gradient-text">Shrimali</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          className="hero__tagline"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <span className="hero__tagline-prefix">I build </span>
          <TypeAnimation
            sequence={[
              'Game Engines from scratch',
              2000,
              'Interactive 3D Experiences',
              2000,
              'Creative Software Solutions',
              2000,
              'High-Performance Systems',
              2000,
            ]}
            wrapper="span"
            speed={50}
            className="hero__tagline-typed gradient-text"
            repeat={Infinity}
          />
        </motion.div>

        {/* Description */}
        <motion.p
          className="hero__description"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          A passionate developer specializing in C++ game engine development, 
          real-time graphics, and building exceptional digital experiences. 
          Currently crafting the <span className="hero__highlight">Eisen Engine</span> — 
          a custom game engine built with OpenGL.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <a href="#projects" className="btn btn-primary">
            View My Work
            <FiArrowDown />
          </a>
          <a href="#contact" className="btn btn-outline">
            Get In Touch
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="hero__socials"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <a href="https://github.com/shubhanshushrimali" target="_blank" rel="noopener noreferrer" className="hero__social-link" aria-label="GitHub">
            <FiGithub />
          </a>
          <a href="https://linkedin.com/in/shubhanshushrimali" target="_blank" rel="noopener noreferrer" className="hero__social-link" aria-label="LinkedIn">
            <FiLinkedin />
          </a>
          <a href="mailto:shubhanshu200425@gmail.com" className="hero__social-link" aria-label="Email">
            <FiMail />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero__scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <FiArrowDown size={20} />
        </motion.div>
        <span>Scroll</span>
      </motion.div>
    </section>
  )
}
