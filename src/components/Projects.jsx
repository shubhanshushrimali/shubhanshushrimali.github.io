import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  FiGithub,
  FiExternalLink,
  FiTerminal,
  FiCpu,
  FiLayers,
  FiServer,
  FiBookOpen,
  FiCheck,
  FiActivity
} from 'react-icons/fi'
import EisenEngineViewport from './EisenEngineViewport'
import AgentGraphVisualizer from './AgentGraphVisualizer'
import { soundFX } from '../utils/audio'
import './Projects.css'

const majorProjects = [
  {
    id: 'eisen',
    title: 'Eisen Engine — AI-Native C++ Game Engine',
    subtitle: 'Custom Engine Architecture & Vulkan Multi-Backend RHI',
    year: '2025 – Present',
    featured: true,
    badge: 'Flagship Core Project',
    badgeColor: 'cyan',
    description:
      'A custom next-generation game engine built from scratch in C/C++. Features Vulkan & OpenGL graphics abstraction, custom memory arenas & pool allocators, cache-friendly Entity-Component-System (ECS), and an AI-native runtime for procedural generation and autonomous LLM agent execution within the game loop.',
    highlights: [
      'Vulkan 1.3 & OpenGL multi-backend rendering pipeline with batch rendering',
      'AI-native subsystems for procedural content generation & runtime LLM agent hooks',
      'Custom linear memory arenas & pool allocators minimizing heap fragmentation to 0%',
      'Integrated ImGui debug dockspace & live engine profiling with GLSL shader reflection'
    ],
    tech: ['C++', 'C', 'Vulkan', 'OpenGL', 'GLSL', 'ECS', 'Custom Allocators', 'Premake', 'ImGui'],
    github: 'https://github.com/shubhanshushrimali/Eisen-Engine',
    live: null,
    has3DViewport: true
  },
  {
    id: 'ue5-rpg',
    title: 'Open-World 64-Player Multiplayer RPG',
    subtitle: 'Unreal Engine 5 (C++) Dedicated Server Architecture',
    year: '2024 – 2025',
    featured: true,
    badge: 'Multiplayer Systems',
    badgeColor: 'purple',
    description:
      'Massive open-world RPG developed in Unreal Engine 5 with authoritative 64-player dedicated servers hosted on AWS EC2. Built utilizing Gameplay Ability System (GAS) for replicated attributes/spells, AI behavior trees, vehicle physics, and Steamworks authentication.',
    highlights: [
      'GAS (Gameplay Ability System) replicated combat, attributes & spell cooldowns',
      'Authoritative 64-player dedicated server with lag compensation & client prediction on AWS',
      'Massive landscape streaming with World Partition & Niagara GPU compute VFX',
      'Hierarchical AI behavior trees for dynamic open-world creature ecosystems'
    ],
    tech: ['Unreal Engine 5', 'C++', 'GAS', 'Niagara VFX', 'Steamworks', 'AWS EC2', 'Multiplayer'],
    github: 'https://github.com/shubhanshushrimali',
    live: null,
    codeSnippet: {
      filename: 'RPGAbilitySystemComponent.cpp',
      code: `// Unreal Engine 5 GAS Combat Replication
void ARPGCharacter::GrantAbility(TSubclassOf<UGameplayAbility> AbilityClass) {
    if (HasAuthority() && AbilityClass) {
        FGameplayAbilitySpec Spec(AbilityClass, 1, INDEX_NONE, this);
        AbilitySystemComponent->GiveAbility(Spec);
    }
}`
    }
  },
  {
    id: 'ai-agents',
    title: 'Autonomous AI Research & Distillation Agents',
    subtitle: 'LangGraph Cyclic Graphs & Self-Hosted vLLM Infrastructure',
    year: '2026',
    featured: true,
    badge: 'Autonomous AI',
    badgeColor: 'emerald',
    description:
      '24/7 autonomous multi-agent systems built with LangGraph and Model Context Protocol (MCP). Mines literature, extracts reasoning traces, executes code sandboxes, and formats fine-tuning datasets for continuous QLoRA/PEFT distillation on vLLM clusters.',
    highlights: [
      'Cyclic StateGraphs with persistent SQLite checkpointing & human-in-the-loop gates',
      'Model Context Protocol (MCP) tool server integration for multi-source research',
      'Automated trace extraction pipeline for continuous QLoRA dataset distillation'
    ],
    tech: ['Python', 'LangGraph', 'MCP', 'vLLM', 'QLoRA / PEFT', 'Docker', 'Vast.ai', 'RunPod'],
    github: 'https://github.com/shubhanshushrimali',
    live: null,
    hasAgentVisualizer: true
  }
]

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section className="projects" id="projects" ref={ref}>
      <div className="container">
        
        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-number">02. Game & Engine Showcases</span>
          <h2>Flagship <span className="gradient-text">Game Projects</span></h2>
          <p>
            Custom game engines, 64-player multiplayer netcode, VR simulations, and 
            autonomous AI pipelines for game content generation.
          </p>
          <div className="section-line" />
        </motion.div>

        {/* Featured Projects List */}
        <div className="projects__showcase-list">
          {majorProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              className={`project-featured-card glass-card ${project.featured ? 'project-featured-card--major' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              <div className="project-featured-card__info">
                
                {/* Badges & Title */}
                <div className="project-featured-card__top">
                  <span className={`hud-badge hud-badge--${project.badgeColor} mono`}>
                    {project.badge}
                  </span>
                  <span className="project-featured-card__year mono">{project.year}</span>
                </div>

                <h3 className="project-featured-card__title font-heading">{project.title}</h3>
                <h4 className="project-featured-card__subtitle mono">{project.subtitle}</h4>
                
                <p className="project-featured-card__desc">{project.description}</p>

                {/* Highlights List */}
                <ul className="project-featured-card__highlights">
                  {project.highlights.map((h, i) => (
                    <li key={i}>
                      <FiCheck className="project-highlight-icon" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Tags */}
                <div className="project-featured-card__tech">
                  {project.tech.map((t) => (
                    <span key={t} className="project-tech-tag mono">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="project-featured-card__actions">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline"
                      onClick={() => soundFX.playClick()}
                    >
                      <FiGithub /> Source Code
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
                      <FiExternalLink /> Live Platform
                    </a>
                  )}
                </div>
              </div>

              {/* Code / Visual Terminal Preview */}
              {project.codeSnippet && (
                <div className="project-featured-card__terminal">
                  <div className="terminal-header">
                    <div className="terminal-dots">
                      <span className="dot dot--red" />
                      <span className="dot dot--yellow" />
                      <span className="dot dot--green" />
                    </div>
                    <span className="terminal-title mono">
                      <FiTerminal /> {project.codeSnippet.filename}
                    </span>
                  </div>
                  <pre className="terminal-body mono">
                    <code>{project.codeSnippet.code}</code>
                  </pre>
                </div>
              )}

              {/* Embedded Eisen Engine 3D Interactive Viewport */}
              {project.has3DViewport && (
                <div className="project-featured-card__custom-interactive">
                  <EisenEngineViewport />
                </div>
              )}

              {/* Embedded LangGraph Agent Graph Visualizer */}
              {project.hasAgentVisualizer && (
                <div className="project-featured-card__custom-interactive">
                  <AgentGraphVisualizer />
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
