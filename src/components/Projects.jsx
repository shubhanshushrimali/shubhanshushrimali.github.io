import { FiGithub, FiExternalLink, FiTerminal, FiCheck } from 'react-icons/fi'
import EisenEngineViewport from './EisenEngineViewport'
import AgentGraphVisualizer from './AgentGraphVisualizer'
import { PROJECTS } from '../data/site'
import { soundFX } from '../utils/audio'
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal'
import './Projects.css'

export default function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="container">
        <ScrollReveal className="section-header" variant="fade-up">
          <span className="section-number">02. Selected work</span>
          <h2>
            Games, engines, <span className="gradient-text">agents</span>
          </h2>
          <p>
            Eisen Engine, 64-player UE5 netcode, Hermes + Graphify + desktop IDE, an agentic marketing agency, research agents, and the publishing pipeline.
          </p>
          <div className="section-line" />
        </ScrollReveal>

        <StaggerContainer className="projects__showcase-list" delay={0.1}>
          {PROJECTS.map((project) => (
            <StaggerItem
              key={project.id}
              className={`project-featured-card glass-card ${project.featured ? 'project-featured-card--major' : ''}`}
            >
              <div className="project-featured-card__info">
                <div className="project-featured-card__top">
                  <span className={`hud-badge hud-badge--${project.badgeColor} mono`}>
                    {project.badge}
                  </span>
                  <span className="project-featured-card__year mono">{project.year}</span>
                </div>

                <h3 className="project-featured-card__title font-heading">{project.title}</h3>
                <h4 className="project-featured-card__subtitle mono">{project.subtitle}</h4>
                <p className="project-featured-card__desc">{project.description}</p>

                <ul className="project-featured-card__highlights">
                  {project.highlights.map((h) => (
                    <li key={h}>
                      <FiCheck className="project-highlight-icon" aria-hidden="true" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="project-featured-card__tech">
                  {project.tech.map((t) => (
                    <span key={t} className="project-tech-tag mono">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="project-featured-card__actions">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline"
                      onClick={() => soundFX.playClick()}
                    >
                      <FiGithub aria-hidden="true" /> Source
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      onClick={() => soundFX.playClick()}
                    >
                      <FiExternalLink aria-hidden="true" /> Live
                    </a>
                  )}
                </div>
              </div>

              {project.codeSnippet && (
                <div className="project-featured-card__terminal">
                  <div className="terminal-header">
                    <div className="terminal-dots">
                      <span className="dot dot--red" />
                      <span className="dot dot--yellow" />
                      <span className="dot dot--green" />
                    </div>
                    <span className="terminal-title mono">
                      <FiTerminal aria-hidden="true" /> {project.codeSnippet.filename}
                    </span>
                  </div>
                  <pre className="terminal-body mono">
                    <code>{project.codeSnippet.code}</code>
                  </pre>
                </div>
              )}

              {project.has3DViewport && (
                <div className="project-featured-card__custom-interactive">
                  <EisenEngineViewport />
                </div>
              )}

              {project.hasAgentVisualizer && (
                <div className="project-featured-card__custom-interactive">
                  <AgentGraphVisualizer />
                </div>
              )}
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
