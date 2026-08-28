import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  SiCplusplus, SiOpengl, SiPython, SiReact, SiJavascript,
  SiDocker, SiGit, SiLinux, SiUnrealengine, SiTypescript
} from 'react-icons/si'
import './About.css'

const skills = [
  { icon: <SiCplusplus />, name: 'C++', color: '#00599C' },
  { icon: <SiOpengl />, name: 'OpenGL', color: '#5586A4' },
  { icon: <SiPython />, name: 'Python', color: '#3776AB' },
  { icon: <SiReact />, name: 'React', color: '#61DAFB' },
  { icon: <SiJavascript />, name: 'JavaScript', color: '#F7DF1E' },
  { icon: <SiTypescript />, name: 'TypeScript', color: '#3178C6' },
  { icon: <SiDocker />, name: 'Docker', color: '#2496ED' },
  { icon: <SiGit />, name: 'Git', color: '#F05032' },
  { icon: <SiLinux />, name: 'Linux', color: '#FCC624' },
  { icon: <SiUnrealengine />, name: 'Game Dev', color: '#0E1128' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="about" id="about" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.span variants={itemVariants} className="section-number">01. About Me</motion.span>
          <motion.h2 variants={itemVariants}>
            Who I <span className="gradient-text">Am</span>
          </motion.h2>
          <motion.div variants={itemVariants} className="section-line" />
        </motion.div>

        <motion.div
          className="about__grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Bio */}
          <motion.div className="about__bio glass-card" variants={itemVariants}>
            <p>
              Hey there! I'm Shubhanshu, a developer who loves building things from the ground up.
              My journey started with a curiosity about how games work under the hood — which led me
              to build <strong>Eisen Engine</strong>, a custom game engine using C++ and OpenGL.
            </p>
            <p>
              I enjoy working at the intersection of <strong>low-level systems programming</strong> and 
              <strong> creative visual experiences</strong>. Whether it's writing a rendering pipeline,
              building interactive web apps, or automating workflows — I love turning complex problems
              into elegant solutions.
            </p>
            <p>
              When I'm not coding, you can find me exploring new tech, contributing to open source,
              or diving deep into computer graphics research.
            </p>

            <div className="about__stats">
              <div className="about__stat">
                <span className="about__stat-number gradient-text">2+</span>
                <span className="about__stat-label">Years Experience</span>
              </div>
              <div className="about__stat">
                <span className="about__stat-number gradient-text">10+</span>
                <span className="about__stat-label">Projects Built</span>
              </div>
              <div className="about__stat">
                <span className="about__stat-number gradient-text">1</span>
                <span className="about__stat-label">Game Engine</span>
              </div>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div className="about__skills" variants={itemVariants}>
            <h3 className="about__skills-title">My Tech Stack</h3>
            <div className="about__skills-grid">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  className="about__skill-item glass-card"
                  whileHover={{ scale: 1.08, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.05, duration: 0.4 }}
                >
                  <span className="about__skill-icon" style={{ color: skill.color }}>
                    {skill.icon}
                  </span>
                  <span className="about__skill-name">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
