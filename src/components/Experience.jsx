import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  FiBriefcase,
  FiTrendingUp,
  FiCpu,
  FiServer,
  FiZap,
  FiCheckCircle,
  FiMapPin,
  FiCalendar
} from 'react-icons/fi'
import './Experience.css'

const experiences = [
  {
    role: 'AI Systems Engineer, Game & App Developer',
    company: 'Toba Tech India',
    period: 'Jan 2026 – Present',
    location: 'India',
    type: 'Full-Time',
    badge: '300K+ Users & Top 10 Rank',
    badgeColor: 'cyan',
    highlights: [
      'Grew game audience from zero to 300K+ users, achieving Top 10 genre ranking on both iOS & Android through ASO, A/B tested paywalls, and staged rollouts.',
      'Architected cyclic multi-agent graphs via LangGraph with persistent state checkpoints, MCP tool servers, and automated eval harnesses using LangSmith with LLM-as-a-judge CI/CD gates.',
      'Deployed self-hosted vLLM inference on RunPod/Vast.ai with speculative decoding & prompt caching; built trace extraction pipelines for continuous QLoRA/PEFT fine-tuning.',
      'Shipped production casual, idle, puzzler, and runner titles in Unity (C#) and gamified apps in Flutter/Flame with complete ecosystems (tutorials, daily rewards, leaderboards, IAP, UGUI).',
      'Managed hybrid monetization: Firebase Analytics, Remote Config A/B tests, ad mediation (AdMob, AppLovin, Unity Ads), IAP funnels, and Crashlytics/Sentry across the 300K+ user base.',
      'Owned full cross-platform rollout: Web, iOS (Xcode/TestFlight), Android (Play Console), Fastlane automation, GitHub Actions CI/CD, and dynamic color theming pipelines.'
    ],
    tech: ['LangGraph', 'MCP', 'vLLM', 'QLoRA', 'Unity (C#)', 'Flutter/Flame', 'Firebase', 'AdMob', 'AppLovin', 'Fastlane', 'GitHub Actions']
  },
  {
    role: 'Unity & Real-Time Systems Developer',
    company: 'Carina Softlabs India',
    period: 'Nov 2024 – Dec 2025',
    location: 'India',
    type: 'Full-Time',
    badge: 'MMORPG & AWS Servers',
    badgeColor: 'purple',
    highlights: [
      'Shipped an MMORPG, 2.5D platformer, and mobile titles; architected authoritative headless servers on AWS via Mirror Networking with lag compensation for 50+ CCU.',
      'Designed scalable AWS backend (EC2, auto-scaling) for zero-downtime under traffic spikes; reduced memory by 35% and build size by 40% via Addressables.',
      'Profiled shaders (HLSL) and draw calls via RenderDoc & Unity Profiler, locking 60 FPS on low-tier mobile hardware.'
    ],
    tech: ['Unity (C#)', 'MMORPG', 'Mirror Networking', 'AWS EC2', 'Addressables', 'HLSL', 'RenderDoc', 'Profiler']
  },
  {
    role: 'Systems Developer (Contract)',
    company: 'Ingenuity Gaming',
    period: 'Aug 2024 – Sep 2024',
    location: 'Remote',
    type: 'Contract',
    badge: 'Deterministic Game Loops',
    badgeColor: 'emerald',
    highlights: [
      'Built deterministic 2D game loops, state machines, and payout engines in C#.',
      'Reduced runtime memory allocations by 25% via custom object pooling architecture.'
    ],
    tech: ['C#', 'State Machines', 'Game Loops', 'Object Pooling', 'Memory Optimization']
  },
  {
    role: 'XR Systems Intern',
    company: 'AIVARSE',
    period: 'Aug 2023 – Sep 2023',
    location: 'India',
    type: 'Internship',
    badge: '72+ FPS VR Engine',
    badgeColor: 'gold',
    highlights: [
      'Built immersive XR prototypes with OpenXR and Meta Quest SDK.',
      'Optimized VR rendering pipeline to sustain 72+ FPS on standalone headsets without frame drops.'
    ],
    tech: ['OpenXR', 'Meta Quest SDK', 'Unity VR', 'Performance Profiling', 'Spatial Computing']
  }
]

export default function Experience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section className="experience" id="experience" ref={ref}>
      <div className="container">
        
        {/* Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-number">03. Career Timeline</span>
          <h2>Production <span className="gradient-text">Experience</span></h2>
          <p>
            Track record of shipping commercial games to 300K+ players, deploying autonomous agent graphs, 
            and profiling low-latency real-time multiplayer systems.
          </p>
          <div className="section-line" />
        </motion.div>

        {/* Timeline List */}
        <div className="experience__timeline-list">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.company + exp.period}
              className="experience__item-card glass-card"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              <div className="experience__item-header">
                <div>
                  <div className="experience__item-badges">
                    <span className={`hud-badge hud-badge--${exp.badgeColor} mono`}>
                      {exp.badge}
                    </span>
                    <span className="experience__item-type mono">{exp.type}</span>
                  </div>
                  <h3 className="experience__item-role font-heading">{exp.role}</h3>
                  <h4 className="experience__item-company gradient-text-neon">{exp.company}</h4>
                </div>

                <div className="experience__item-meta mono">
                  <div className="experience__item-period">
                    <FiCalendar /> {exp.period}
                  </div>
                  <div className="experience__item-location">
                    <FiMapPin /> {exp.location}
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <ul className="experience__item-highlights">
                {exp.highlights.map((point, i) => (
                  <li key={i}>
                    <FiCheckCircle className="experience__check-icon" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Strip */}
              <div className="experience__item-tech">
                {exp.tech.map((t) => (
                  <span key={t} className="experience__tech-tag mono">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
