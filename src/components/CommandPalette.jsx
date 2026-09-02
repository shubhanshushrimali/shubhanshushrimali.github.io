import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiTerminal, FiX, FiCornerDownLeft, FiCpu, FiZap, FiLayers, FiBookOpen } from 'react-icons/fi'
import { PROFILE } from '../data/site'
import { soundFX } from '../utils/audio'
import './CommandPalette.css'

const commandList = [
  { cmd: 'help', desc: 'List commands' },
  { cmd: 'cat resume', desc: 'Print resume snapshot' },
  { cmd: 'writing', desc: 'Jump to Medium / DEV.to posts' },
  { cmd: 'agents', desc: 'Jump to Hermes / LangGraph work' },
  { cmd: 'run eisen', desc: 'Jump to Eisen Engine viewport' },
  { cmd: 'overclock', desc: 'Toggle high-contrast theme' },
  { cmd: 'contact', desc: 'Jump to contact' },
  { cmd: 'clear', desc: 'Clear history' },
  { cmd: 'exit', desc: 'Close palette' },
]

export default function CommandPalette({ isOpen, onClose, onToggleOverclock, isOverclocked }) {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: 'Type help, cat resume, writing, or agents.',
    },
  ])
  const inputRef = useRef(null)
  const terminalEndRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      soundFX.playClick()
    }
  }, [isOpen])

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const scrollTo = (id) => {
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      onClose()
    }, 280)
  }

  const handleCommand = (commandText) => {
    const cleanCmd = (commandText || input).trim().toLowerCase()
    if (!cleanCmd) return

    soundFX.playKeypress()
    const newHistory = [...history, { type: 'input', text: `> ${cleanCmd}` }]

    switch (cleanCmd) {
      case 'help':
      case '?':
        newHistory.push({
          type: 'output',
          text: commandList.map((c) => `  ${c.cmd.padEnd(14)} - ${c.desc}`).join('\n'),
        })
        break

      case 'cat resume':
      case 'resume':
        newHistory.push({
          type: 'output',
          text: `${PROFILE.name}
${PROFILE.title}
300K+ users | Top 10 genre | Unity, UE5, Eisen Engine
LangGraph, MCP, vLLM | Hermes + Graphify + desktop IDE
Agentic marketing agency (6-agent LangGraph graph)
${PROFILE.email}`,
        })
        setTimeout(() => {
          window.open(PROFILE.resumeHref, '_blank', 'noopener,noreferrer')
        }, 200)
        break

      case 'writing':
      case 'blog':
      case 'medium':
        newHistory.push({ type: 'success', text: 'Opening writing…' })
        scrollTo('writing')
        break

      case 'run eisen':
      case 'eisen':
        newHistory.push({ type: 'success', text: 'Opening Eisen Engine…' })
        scrollTo('eisen-viewport')
        break

      case 'agents':
      case 'langgraph':
      case 'hermes':
        newHistory.push({ type: 'success', text: 'Opening agent work…' })
        scrollTo('projects')
        break

      case 'benchmarks':
      case 'perf':
        newHistory.push({ type: 'success', text: 'Opening benchmarks…' })
        scrollTo('benchmarks')
        break

      case 'overclock':
      case 'matrix':
        onToggleOverclock()
        soundFX.playSuccess()
        newHistory.push({
          type: 'success',
          text: `Overclock ${!isOverclocked ? 'on' : 'off'}`,
        })
        break

      case 'contact':
        newHistory.push({ type: 'success', text: 'Opening contact…' })
        scrollTo('contact')
        break

      case 'clear':
      case 'cls':
        setHistory([])
        setInput('')
        return

      case 'exit':
      case 'quit':
        onClose()
        return

      default:
        newHistory.push({
          type: 'error',
          text: `Unknown: "${cleanCmd}". Type help.`,
        })
        break
    }

    setHistory(newHistory)
    setInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand()
    } else if (e.key === 'Escape') {
      onClose()
    } else {
      soundFX.playKeypress()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="cmd-palette-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="cmd-palette glass-card"
            initial={{ scale: 0.92, y: -20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: -20, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            <div className="cmd-palette__header">
              <div className="cmd-palette__title mono">
                <FiTerminal className="cmd-palette__icon" aria-hidden="true" />
                <span>COMMAND</span>
              </div>
              <div className="cmd-palette__actions">
                <span className="cmd-palette__kbd mono">ESC</span>
                <button className="cmd-palette__close" onClick={onClose} aria-label="Close" type="button">
                  <FiX aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="cmd-palette__quick">
              <button type="button" onClick={() => handleCommand('writing')} className="cmd-quick-pill mono">
                <FiBookOpen aria-hidden="true" /> writing
              </button>
              <button type="button" onClick={() => handleCommand('agents')} className="cmd-quick-pill mono">
                <FiCpu aria-hidden="true" /> agents
              </button>
              <button type="button" onClick={() => handleCommand('run eisen')} className="cmd-quick-pill mono">
                <FiLayers aria-hidden="true" /> eisen
              </button>
              <button type="button" onClick={() => handleCommand('overclock')} className="cmd-quick-pill cmd-quick-pill--accent mono">
                <FiZap aria-hidden="true" /> overclock
              </button>
            </div>

            <div className="cmd-palette__terminal mono">
              {history.map((item, idx) => (
                <div key={idx} className={`terminal-line terminal-line--${item.type}`}>
                  <pre>{item.text}</pre>
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>

            <div className="cmd-palette__input-bar">
              <span className="cmd-prompt mono">&gt;</span>
              <input
                ref={inputRef}
                type="text"
                className="cmd-input mono"
                placeholder="help, cat resume, writing…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-label="Command"
              />
              <button className="cmd-enter-btn" onClick={() => handleCommand()} aria-label="Run command" type="button">
                <FiCornerDownLeft aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
