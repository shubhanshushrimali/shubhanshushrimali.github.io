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
    id: 'ai',
    name: 'AI & Agentic Systems',
    icon: <FiCpu />,
    badge: 'Core Focus',
    skills: [
      'LangGraph Cyclic StateGraphs',
      '24/7 Daemon Agent Loops',
      'Model Context Protocol (MCP)',
      'Eval Harness & LLM-as-Judge',
      'Trace Extraction Pipelines',
      'vLLM & Speculative Decoding',
      'Prompt Cache & Token Optimization',
      'LoRA / QLoRA Fine-Tuning',
      'Constrained JSON (Outlines)',
      'RunPod / Vast.ai GPU Clusters'
    ]
  },
  {
    id: 'engines',
    name: 'Engines & Real-Time Graphics',
    icon: <FiLayers />,
    badge: 'Flagship',
    skills: [
      'Unreal Engine 5 (C++, GAS)',
      'Unity (C#, DOTS/ECS, UGUI)',
      'Custom C++ Engine (Eisen Engine)',
      'Flutter / Flame / React Native',
      'HLSL / GLSL Shaders & Compute',
      'Niagara Particle VFX',
      'AWS Authoritative Dedicated Servers',
      'FastAPI / Node.js / Docker'
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
      'Xcode / Swift / TestFlight Staging',
      'Android Studio / Play Console',
      'Antigravity IDE & Cursor AI Workflows',
      'GitHub Actions & Fastlane CI/CD',
      'RenderDoc & Unity Profiler (60 FPS)',
      'Git / Perforce / Linux Systems'
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
  const [activeTab, setActiveTab] = useState('ai')
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
          <span className="section-number">01. Engineering Profile</span>
          <h2>Architecture & <span className="gradient-text">Skills Matrix</span></h2>
          <p>
            Operating across the full spectrum: from low-level C++/Vulkan game loops and shader optimization 
            to autonomous multi-agent graphs and cloud GPU clusters.
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
              <h3>AI Systems & Game Engineer</h3>
            </div>
            
            <p>
              I build high-concurrency, real-time interactive systems and autonomous AI graphs. 
              My work spans shipping production games to <strong>300,000+ active players</strong> (achieving 
              <strong> Top 10 rankings on iOS & Android</strong>), architecting <strong>cyclic LangGraph agent networks</strong> with MCP tooling, 
              and crafting custom game engines in <strong>C++ and Vulkan/OpenGL</strong>.
            </p>

            <p>
              I believe in building resilient systems — whether that's profiling HLSL shaders to lock 
              <strong> 60 FPS on low-tier mobile hardware</strong>, deploying speculative decoding on vLLM clusters, 
              or structuring authoritative 64-player server state synchronization.
            </p>

            <div className="about__quick-tags">
              <span className="hud-badge hud-badge--emerald">
                <FiZap /> 300K+ Production Reach
              </span>
              <span className="hud-badge hud-badge--purple">
                <FiCpu /> LangGraph & MCP Architect
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
