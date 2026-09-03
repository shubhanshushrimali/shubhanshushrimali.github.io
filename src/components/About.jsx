import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  FiCpu,
  FiTrendingUp,
  FiLayers,
  FiTerminal,
  FiAward,
  FiCode,
  FiCheckCircle,
  FiZap,
} from 'react-icons/fi'
import { EDUCATION, FAQ, HONORS, LANGUAGES, PROFILE, SKILL_CATEGORIES } from '../data/site'
import './About.css'

const tabIcons = {
  ai: <FiCpu aria-hidden="true" />,
  engines: <FiLayers aria-hidden="true" />,
  growth: <FiTrendingUp aria-hidden="true" />,
  tooling: <FiTerminal aria-hidden="true" />,
}

export default function About() {
  const [activeTab, setActiveTab] = useState('engines')
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })

  return (
    <section className="about" id="about" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-number">01. Profile</span>
          <h2>
            About <span className="gradient-text">{PROFILE.name}</span>
          </h2>
          <p>
            {PROFILE.name} is an {PROFILE.title} in {PROFILE.location}. Production titles to 300K+ users,
            custom C++/Vulkan, UE5 netcode — plus LangGraph, Hermes, Graphify, and vLLM.
          </p>
          <div className="section-line" />
        </motion.div>

        <div className="about__top-grid">
          <motion.div
            className="about__bio-card glass-card"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="about__bio-header">
              <FiCode className="about__bio-icon" aria-hidden="true" />
              <h3>AI-Native Systems & Game Engineer</h3>
            </div>

            <p>
              {PROFILE.name} builds real-time games and the agent systems around them. Titles shipped to{' '}
              <strong>300,000+ players</strong> with <strong>Top 10 rankings on iOS &amp; Android</strong>,
              a custom engine in <strong>C++ / Vulkan</strong>, and 64-player dedicated servers.
            </p>

            <p>
              On the AI side: extra <strong>Hermes skills</strong>, <strong>Graphify</strong> query and code search,
              an <strong>Electron desktop IDE</strong>, and an <strong>agentic marketing agency</strong> —
              six LangGraph agents from a GitHub brief to a gated campaign. Same instinct as locking{' '}
              <strong>60 FPS on low-tier mobile</strong>.
            </p>

            <div className="about__quick-tags">
              <span className="hud-badge hud-badge--emerald">
                <FiZap aria-hidden="true" /> 300K+ players
              </span>
              <span className="hud-badge hud-badge--purple">
                <FiCpu aria-hidden="true" /> Eisen + UE5
              </span>
              <span className="hud-badge">
                <FiLayers aria-hidden="true" /> Hermes + Graphify
              </span>
            </div>
          </motion.div>

          <motion.div
            className="about__side-cards"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <div className="about__edu-card glass-card">
              <div className="about__side-header">
                <span className="about__side-badge mono">Education</span>
                <span className="about__cgpa-badge gradient-text-gold mono">CGPA {EDUCATION.cgpa}</span>
              </div>
              <h4>{EDUCATION.degree}</h4>
              <p className="about__side-sub">{EDUCATION.school} // {EDUCATION.years}</p>
              <p className="about__side-desc">{EDUCATION.focus}</p>
            </div>

            <div className="about__honors-card glass-card">
              <div className="about__side-header">
                <span className="about__side-badge mono">Discipline</span>
                <FiAward className="about__award-icon" aria-hidden="true" />
              </div>
              <div className="about__honor-items">
                {HONORS.map((honor) => (
                  <div key={honor.title} className="about__honor-item">
                    <FiAward className="about__honor-icon" aria-hidden="true" />
                    <div>
                      <strong>{honor.title}</strong>
                      <p>{honor.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="about__languages-strip glass-card"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <span className="about__strip-title mono">&gt; LANGUAGES:</span>
          <div className="about__languages-grid">
            {LANGUAGES.map((lang) => (
              <div key={lang.name} className="about__lang-item">
                <div className="about__lang-dot" style={{ background: lang.color }} />
                <span className="about__lang-name font-heading">{lang.name}</span>
                <span className="about__lang-level mono">{lang.level}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="about__matrix"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <div className="about__tabs" role="tablist" aria-label="Skill categories">
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={activeTab === cat.id}
                className={`about__tab-btn ${activeTab === cat.id ? 'about__tab-btn--active' : ''}`}
                onClick={() => setActiveTab(cat.id)}
              >
                <span className="about__tab-icon">{tabIcons[cat.id]}</span>
                <span>{cat.name}</span>
                <span className="about__tab-pill mono">{cat.badge}</span>
              </button>
            ))}
          </div>

          <div className="about__tab-panel glass-card">
            {SKILL_CATEGORIES.filter((c) => c.id === activeTab).map((category) => (
              <div key={category.id} className="about__skills-showcase">
                <div className="about__skills-showcase-header">
                  <h3 className="font-heading">{category.name}</h3>
                  <span className="hud-badge mono">PRODUCTION</span>
                </div>
                <div className="about__skill-pills-grid">
                  {category.skills.map((skill, idx) => (
                    <motion.div
                      key={skill}
                      className="about__skill-pill"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: idx * 0.04 }}
                    >
                      <FiCheckCircle className="about__pill-check" aria-hidden="true" />
                      <span>{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="about__faq glass-card"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="about__faq-title font-heading">Who is {PROFILE.name}?</h3>
          <dl className="about__faq-list">
            {FAQ.map((item) => (
              <div key={item.q} className="about__faq-item">
                <dt>{item.q}</dt>
                <dd>{item.a}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  )
}
