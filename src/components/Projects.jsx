import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiGithub, FiExternalLink, FiFolder } from 'react-icons/fi'
import './Projects.css'

const featuredProjects = [
  {
    title: 'Eisen Engine',
    description: 'A custom C++ game engine built from scratch using OpenGL. Features include an entity component system (ECS), event-driven architecture, layer system, ImGui integration for debug tools, and a custom rendering pipeline with batch rendering.',
    tech: ['C++', 'OpenGL', 'GLFW', 'ImGui', 'Premake', 'GLSL'],
    github: 'https://github.com/shubhanshushrimali/Eisen-Engine',
    live: null,
    featured: true,
    image: null,
  },
]

const otherProjects = [
  {
    title: 'Portfolio Website',
    description: 'This very portfolio — built with React, Three.js, and Framer Motion. Features 3D particle background, smooth animations, and auto-deploy via GitHub Actions.',
    tech: ['React', 'Three.js', 'Framer Motion'],
    github: 'https://github.com/shubhanshushrimali/shubhanshushrimali.github.io',
    live: 'https://shubhanshushrimali.github.io',
  },
  {
    title: 'More Coming Soon',
    description: 'Continuously working on new projects exploring graphics programming, web technologies, and creative coding. Stay tuned!',
    tech: ['C++', 'Vulkan', 'Rust'],
    github: 'https://github.com/shubhanshushrimali',
    live: null,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section className="projects" id="projects" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.span variants={itemVariants} className="section-number">02. Projects</motion.span>
          <motion.h2 variants={itemVariants}>
            Things I've <span className="gradient-text">Built</span>
          </motion.h2>
          <motion.div variants={itemVariants} className="section-line" />
        </motion.div>

        {/* Featured Projects */}
        <motion.div
          className="projects__featured"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {featuredProjects.map((project, i) => (
            <motion.div key={project.title} className="project-featured glass-card" variants={itemVariants}>
              <div className="project-featured__content">
                <span className="project-featured__label mono">Featured Project</span>
                <h3 className="project-featured__title">{project.title}</h3>
                <p className="project-featured__description">{project.description}</p>
                <div className="project-featured__tech">
                  {project.tech.map(t => (
                    <span key={t} className="project-featured__tech-tag">{t}</span>
                  ))}
                </div>
                <div className="project-featured__links">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-featured__link" aria-label="GitHub">
                      <FiGithub size={22} />
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-featured__link" aria-label="Live Demo">
                      <FiExternalLink size={22} />
                    </a>
                  )}
                </div>
              </div>
              <div className="project-featured__visual">
                <div className="project-featured__code-window">
                  <div className="code-window__header">
                    <span className="code-window__dot code-window__dot--red"></span>
                    <span className="code-window__dot code-window__dot--yellow"></span>
                    <span className="code-window__dot code-window__dot--green"></span>
                    <span className="code-window__title mono">main.cpp</span>
                  </div>
                  <pre className="code-window__body mono">
{`#include <Eisen.h>

class Sandbox : public Eisen::Application
{
public:
    Sandbox()
    {
        PushLayer(new ExampleLayer());
    }
};

Eisen::Application* Eisen::CreateApp()
{
    return new Sandbox();
}`}
                  </pre>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Other Projects */}
        <motion.h3
          className="projects__other-title"
          variants={itemVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          Other Noteworthy Projects
        </motion.h3>

        <motion.div
          className="projects__grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {otherProjects.map((project) => (
            <motion.div
              key={project.title}
              className="project-card glass-card"
              variants={itemVariants}
              whileHover={{ y: -8 }}
            >
              <div className="project-card__header">
                <FiFolder size={36} className="project-card__icon" />
                <div className="project-card__links">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                      <FiGithub size={20} />
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label="Live">
                      <FiExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>
              <h4 className="project-card__title">{project.title}</h4>
              <p className="project-card__description">{project.description}</p>
              <div className="project-card__tech">
                {project.tech.map(t => (
                  <span key={t} className="project-card__tech-tag mono">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
