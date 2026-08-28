import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import {
  FiArrowDown,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiBookOpen,
  FiCpu,
  FiActivity,
  FiAward
} from 'react-icons/fi'
import { SiMedium, SiDevdotto } from 'react-icons/si'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="container hero__content">
        
        {/* HUD Telemetry Status */}
        <motion.div
          className="hero__hud-status"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="pulse-dot"></span>
          <span className="hero__hud-text mono">
            SYSTEM ONLINE // AI-NATIVE SYSTEMS & GAME ARCHITECT // 300K+ ACTIVE USERS
          </span>
        </motion.div>

        {/* Greeting */}
        <motion.p
          className="hero__greeting mono"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          &gt; init developer_profile --name
        </motion.p>

        {/* Name with Glitch / Gradient Power */}
        <motion.h1
          className="hero__name font-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          SHUBHANSHU <span className="gradient-text">SHRIMALI</span>
        </motion.h1>

        {/* Dynamic Typewriter Role */}
        <motion.div
          className="hero__tagline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <span className="hero__tagline-prefix mono">&gt; specialization: </span>
          <TypeAnimation
            sequence={[
              'Autonomous Multi-Agent Systems (LangGraph, MCP)',
              2000,
              'C++ & Vulkan Game Engine Architecture (Eisen)',
              2000,
              'Shipped Production Games to 300K+ Users (Top 10)',
              2000,
              'Self-Hosted vLLM & QLoRA Fine-Tuning Infrastructure',
              2000,
              '64-Player Authoritative Dedicated Server Architect',
              2000,
            ]}
            wrapper="span"
            speed={50}
            className="hero__tagline-typed gradient-text-neon mono"
            repeat={Infinity}
          />
        </motion.div>

        {/* Executive Summary */}
        <motion.p
          className="hero__description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <strong>AI-Native Systems & Game Engineer</strong> with 2+ years shipping production games and apps to 
          <span className="hero__highlight-pill"> 300K+ users </span> with <span className="hero__highlight-pill"> Top 10 genre rankings </span> 
          on both App Store & Google Play. Architect of cyclic multi-agent graphs (LangGraph, MCP, vLLM), 
          custom C++/Vulkan game engines, and low-latency multiplayer backends.
        </motion.p>

        {/* Core Live Stats Grid */}
        <motion.div
          className="hero__metrics-grid"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
        >
          <div className="hero__metric-card glass-card">
            <span className="hero__metric-num gradient-text">300K+</span>
            <span className="hero__metric-label mono">Production Users Shipped</span>
          </div>

          <div className="hero__metric-card glass-card">
            <span className="hero__metric-num gradient-text-gold">Top 10</span>
            <span className="hero__metric-label mono">App Store & Play Genre Rank</span>
          </div>

          <div className="hero__metric-card glass-card">
            <span className="hero__metric-num gradient-text-neon">60 FPS</span>
            <span className="hero__metric-label mono">Low-Tier Hardware Profiling</span>
          </div>

          <div className="hero__metric-card glass-card">
            <span className="hero__metric-num gradient-text">64 CCU</span>
            <span className="hero__metric-label mono">Dedicated Authoritative Servers</span>
          </div>
        </motion.div>

        {/* Call to Actions */}
        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <a href="#projects" className="btn btn-primary">
            Explore Engine & AI Projects
            <FiArrowDown />
          </a>
          <a href="#experience" className="btn btn-outline">
            View Production Experience
          </a>
          <a href="/resume.pdf" target="_blank" className="btn btn-outline mono">
            <FiBookOpen /> Download Full Resume
          </a>
        </motion.div>

        {/* Social Matrix */}
        <motion.div
          className="hero__socials"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.05 }}
        >
          <a href="https://github.com/shubhanshushrimali" target="_blank" rel="noopener noreferrer" className="hero__social-link" title="GitHub">
            <FiGithub />
          </a>
          <a href="https://linkedin.com/in/shubhanshushrimali" target="_blank" rel="noopener noreferrer" className="hero__social-link" title="LinkedIn">
            <FiLinkedin />
          </a>
          <a href="https://dev.to/shubhanshu_shrimali" target="_blank" rel="noopener noreferrer" className="hero__social-link" title="DEV.to">
            <SiDevdotto />
          </a>
          <a href="https://medium.com/@shubhanshu200425" target="_blank" rel="noopener noreferrer" className="hero__social-link" title="Medium">
            <SiMedium />
          </a>
          <a href="mailto:shubhanshu200425@gmail.com" className="hero__social-link" title="Email: shubhanshu200425@gmail.com">
            <FiMail />
          </a>
          <a href="tel:+918290529725" className="hero__social-link" title="Phone: +91-8290529725">
            <FiPhone />
          </a>
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
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
          <FiArrowDown size={20} color="var(--neon-cyan)" />
        </motion.div>
        <span className="mono">SCROLL_DOWN</span>
      </motion.div>
    </section>
  )
}
