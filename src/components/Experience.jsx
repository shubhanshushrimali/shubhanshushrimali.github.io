import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiBriefcase, FiBook } from 'react-icons/fi'
import './Experience.css'

const experiences = [
  {
    type: 'work',
    title: 'Software Developer',
    company: 'Intelli-Verse-X',
    period: 'Present',
    description: 'Building interactive kiosk applications, web platforms, and creative tech solutions. Working with React, Docker, and cloud infrastructure.',
    tech: ['React', 'Docker', 'Kubernetes', 'Node.js'],
  },
  {
    type: 'project',
    title: 'Game Engine Developer',
    company: 'Eisen Engine (Personal)',
    period: 'Ongoing',
    description: 'Designing and developing a custom game engine from scratch. Implementing rendering pipeline, ECS architecture, event system, and debug tooling with ImGui.',
    tech: ['C++', 'OpenGL', 'GLSL', 'Premake'],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function Experience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="experience" id="experience" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-number">03. Experience</span>
          <h2>Where I've <span className="gradient-text">Worked</span></h2>
          <div className="section-line" />
        </motion.div>

        <motion.div
          className="experience__timeline"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {experiences.map((exp, i) => (
            <motion.div key={i} className="experience__item" variants={itemVariants}>
              <div className="experience__marker">
                <div className="experience__marker-dot">
                  {exp.type === 'work' ? <FiBriefcase size={16} /> : <FiBook size={16} />}
                </div>
                {i < experiences.length - 1 && <div className="experience__marker-line" />}
              </div>
              <div className="experience__card glass-card">
                <div className="experience__card-header">
                  <div>
                    <h3 className="experience__title">{exp.title}</h3>
                    <span className="experience__company gradient-text">{exp.company}</span>
                  </div>
                  <span className="experience__period mono">{exp.period}</span>
                </div>
                <p className="experience__description">{exp.description}</p>
                <div className="experience__tech">
                  {exp.tech.map(t => (
                    <span key={t} className="experience__tech-tag">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
