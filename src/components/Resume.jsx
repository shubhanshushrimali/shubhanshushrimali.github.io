import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiDownload, FiMapPin, FiMail, FiGithub, FiLinkedin } from 'react-icons/fi'
import { PROFILE, HERO, EXPERIENCES, PROJECTS, EDUCATION } from '../data/site'
import './Resume.css'

export default function Resume() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })

  return (
    <section className="resume-section" id="resume" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-number">05. Resume</span>
          <h2>
            One page. <span className="gradient-text">Games and agents.</span>
          </h2>
          <p>{HERO.description}</p>
          <div className="section-line" />
        </motion.div>

        <motion.div
          className="resume-sheet glass-card"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="resume-sheet__head">
            <div>
              <h3 className="font-heading">{PROFILE.name}</h3>
              <p className="resume-sheet__role">{PROFILE.title}</p>
              <div className="resume-sheet__meta mono">
                <span>
                  <FiMapPin aria-hidden="true" /> {PROFILE.location}
                </span>
                <a href={`mailto:${PROFILE.email}`}>
                  <FiMail aria-hidden="true" /> {PROFILE.email}
                </a>
              </div>
            </div>
            <a
              href={PROFILE.resumeHref}
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiDownload aria-hidden="true" /> Print / save PDF
            </a>
          </div>

          <div className="resume-sheet__grid">
            <div>
              <h4 className="resume-sheet__label mono">Experience</h4>
              <ul className="resume-sheet__list">
                {EXPERIENCES.map((job) => (
                  <li key={job.company + job.period}>
                    <strong>{job.role}</strong>
                    <span className="resume-sheet__sub">
                      {job.company} · {job.period}
                    </span>
                    <p>{job.highlights[0]}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="resume-sheet__label mono">Selected work</h4>
              <ul className="resume-sheet__list">
                {PROJECTS.slice(0, 3).map((project) => (
                  <li key={project.id}>
                    <strong>{project.title}</strong>
                    <p>{project.highlights[0]}</p>
                  </li>
                ))}
              </ul>
              <h4 className="resume-sheet__label mono">Education</h4>
              <p className="resume-sheet__edu">
                <strong>{EDUCATION.degree}</strong>
                <span>
                  {EDUCATION.school} · CGPA {EDUCATION.cgpa}
                </span>
              </p>
              <div className="resume-sheet__links">
                <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">
                  <FiGithub aria-hidden="true" /> GitHub
                </a>
                <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
                  <FiLinkedin aria-hidden="true" /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
