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
  FiZap
} from 'react-icons/fi'
import './About.css'

const skillCategories = [
  {
    id: 'engines',
    name: 'Engines & Real-Time Graphics',
    icon: <FiLayers />,
    badge: 'Core Focus',
    skills: [
      'Custom C++ Engine (Eisen Engine — Vulkan/OpenGL)',
      'Unreal Engine 5 (C++, GAS, Niagara)',
      'Unity (C#, DOTS/ECS, UGUI)',
      'HLSL / GLSL Shaders & Compute',
      'VR Simulations (OpenXR, Meta Quest SDK)',
      'Niagara Particle VFX & GPU Compute',
      'AWS Authoritative Dedicated Servers',
      'Flutter / Flame / React Native'
    ]
  },
  {
    id: 'growth',
    name: 'Scale, Growth & Monetization',
    icon: <FiTrendingUp />,
    badge: '300K+ Users',
    skills: [
      '300K+ Users Scaled (Top 10 Genre)',
      'Firebase Analytics & Remote Config',
      'A/B Testing & Feature Flags',
      'Ad Mediation (AdMob / AppLovin)',
      'In-App Purchase (IAP) Funnels',
      'App Store Optimization (ASO)',
      'Crashlytics / Sentry Observability'
    ]
  },
  {
    id: 'tooling',
    name: 'Platforms, CI/CD & Profiling',
    icon: <FiTerminal />,
    badge: 'DevOps',
    skills: [
      'RenderDoc & Unity Profiler (60 FPS Targeting)',
      'Xcode / Swift / TestFlight Staging',
      'Android Studio / Play Console',
      'GitHub Actions & Fastlane CI/CD',
      'Git / Perforce / Linux Systems',
      'Docker / RunPod / Vast.ai'
    ]
  },
  {
    id: 'ai',
    name: 'AI & Agentic Systems',
    icon: <FiCpu />,
    badge: 'Secondary',
    skills: [
      'LangGraph Cyclic StateGraphs',
      'Model Context Protocol (MCP)',
      'vLLM & Speculative Decoding',
      'LoRA / QLoRA Fine-Tuning',
      'Prompt Cache & Token Optimization',
      'RunPod / Vast.ai GPU Clusters'
    ]
  }
]

const coreLanguages = [
  { name: 'C / C++', level: 'Advanced / Engine Core', color: '#00599c' },
  { name: 'C# (Unity / DOTS)', level: 'Production Systems', color: '#68217a' },
  { name: 'Python', level: 'AI Agents & vLLM Pipelines', color: '#3776ab' },
  { name: 'Dart / Flutter', level: 'Cross-Platform Apps', color: '#02569b' },
  { name: 'Swift', level: 'iOS Native / Tooling', color: '#f05138' },
  { name: 'TypeScript / JS', level: 'Web & Visual Tools', color: '#3178c6' },
]

export default function About() {
  const [activeTab, setActiveTab] = useState('engines')
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })

  return (
    <section className="about" id="about" ref={ref}>
      <div className="container">
        
        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-number">01. Game Engineering Profile</span>
          <h2>Engine & <span className="gradient-text">Skills Matrix</span></h2>
          <p>
            Full-stack game engineer: from low-level C++/Vulkan rendering and shader optimization 
            to VR simulations, multiplayer backends, and shipped production titles.
          </p>
          <div className="section-line" />
        </motion.div>

        {/* Bio & Education/Honors Row */}
        <div className="about__top-grid">
          
          {/* Executive Bio */}
          <motion.div
            className="about__bio-card glass-card"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="about__bio-header">
              <FiCode className="about__bio-icon" />
              <h3>Game Engine Developer & Creative Coder</h3>
            </div>
            
            <p>
              I build real-time interactive systems and ship production games to massive audiences. 
              My work spans growing titles to <strong>300,000+ active players</strong> (achieving 
              <strong>Top 10 rankings on iOS & Android</strong>), crafting custom game engines in 
              <strong>C++ and Vulkan/OpenGL</strong>, and building immersive VR training simulations.
            </p>

            <p>
              I believe in building resilient systems — whether that's profiling HLSL shaders to lock 
              <strong>60 FPS on low-tier mobile hardware</strong>, architecting authoritative 64-player 
              server state synchronization, or designing VR escape rooms with physics-based puzzles.
            </p>

            <div className="about__quick-tags">
              <span className="hud-badge hud-badge--emerald">
                <FiZap /> 300K+ Players Shipped
              </span>
              <span className="hud-badge hud-badge--purple">
                <FiCpu /> Custom Engine Architect
              </span>
              <span className="hud-badge">
                <FiLayers /> C++ & Vulkan Specialist
              </span>
            </div>
          </motion.div>

          {/* Education & Athletic Honors */}
          <motion.div
            className="about__side-cards"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            {/* Education Card */}
            <div className="about__edu-card glass-card">
              <div className="about__side-header">
                <span className="about__side-badge mono">Education</span>
                <span className="about__cgpa-badge gradient-text-gold mono">CGPA 8.3 / 10.0</span>
              </div>
              <h4>B.Tech in Computer Science</h4>
              <p className="about__side-sub">Geetanjali Institute of Technical Studies (GITS) // 2021 – 2025</p>
              <p className="about__side-desc">Focus in Systems Programming, Distributed Architectures, Computer Graphics & AI.</p>
            </div>

            {/* Honors Card */}
            <div className="about__honors-card glass-card">
              <div className="about__side-header">
                <span className="about__side-badge mono">Discipline & Honors</span>
                <FiAward className="about__award-icon" />
              </div>
              <div className="about__honor-items">
                <div className="about__honor-item">
                  <span className="about__honor-bullet">🥋</span>
                  <div>
                    <strong>International Black Belt</strong>
                    <p>Karate — Global certification in martial discipline and focus.</p>
                  </div>
                </div>
                <div className="about__honor-item">
                  <span className="about__honor-bullet">🏊</span>
                  <div>
                    <strong>State-Level Swimmer</strong>
                    <p>Competitive state-level swimming champion representing Rajasthan.</p>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>
        </div>

        {/* Core Languages Strip */}
        <motion.div
          className="about__languages-strip glass-card"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <span className="about__strip-title mono">&gt; CORE_LANGUAGES:</span>
          <div className="about__languages-grid">
            {coreLanguages.map((lang) => (
              <div key={lang.name} className="about__lang-item">
                <div className="about__lang-dot" style={{ background: lang.color }} />
                <span className="about__lang-name font-heading">{lang.name}</span>
                <span className="about__lang-level mono">{lang.level}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Interactive Deep-Dive Skills Matrix Tabs */}
        <motion.div
          className="about__matrix"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          {/* Tabs */}
          <div className="about__tabs">
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                className={`about__tab-btn ${activeTab === cat.id ? 'about__tab-btn--active' : ''}`}
                onClick={() => setActiveTab(cat.id)}
              >
                <span className="about__tab-icon">{cat.icon}</span>
                <span>{cat.name}</span>
                <span className="about__tab-pill mono">{cat.badge}</span>
              </button>
            ))}
          </div>

          {/* Tab Content Display */}
          <div className="about__tab-panel glass-card">
            {skillCategories
              .filter((c) => c.id === activeTab)
              .map((category) => (
                <div key={category.id} className="about__skills-showcase">
                  <div className="about__skills-showcase-header">
                    <h3 className="font-heading">{category.name}</h3>
                    <span className="hud-badge mono">PROVEN PRODUCTION EXPERIENCE</span>
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
                        <FiCheckCircle className="about__pill-check" />
                        <span>{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
