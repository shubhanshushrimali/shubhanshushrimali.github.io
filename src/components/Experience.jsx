import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiCheckCircle, FiMapPin, FiCalendar } from 'react-icons/fi'
import { EXPERIENCES } from '../data/site'
import './Experience.css'

export default function Experience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section className="experience" id="experience" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-number">04. Experience</span>
          <h2>
            Production <span className="gradient-text">timeline</span>
          </h2>
          <p>
            Agent graphs and inference at Toba Tech, Unity/MMORPG servers at Carina, then real-time loops and XR.
          </p>
          <div className="section-line" />
        </motion.div>

        <div className="experience__timeline-list">
          {EXPERIENCES.map((exp, idx) => (
            <motion.div
              key={exp.company + exp.period}
              className="experience__item-card glass-card"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
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
                    <FiCalendar aria-hidden="true" /> {exp.period}
                  </div>
                  <div className="experience__item-location">
                    <FiMapPin aria-hidden="true" /> {exp.location}
                  </div>
                </div>
              </div>

              <ul className="experience__item-highlights">
                {exp.highlights.map((point) => (
                  <li key={point}>
                    <FiCheckCircle className="experience__check-icon" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

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
