import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiTerminal, FiX, FiCornerDownLeft, FiCpu, FiZap, FiLayers, FiTrendingUp } from 'react-icons/fi'
import { soundFX } from '../utils/audio'
import './CommandPalette.css'

const commandList = [
  { cmd: 'help', desc: 'Display all available cyber shell commands' },
  { cmd: 'cat resume', desc: 'Display full engineering resume telemetry' },
  { cmd: 'run eisen', desc: 'Launch Eisen Engine 3D Interactive Viewport' },
  { cmd: 'agents', desc: 'Jump to LangGraph Multi-Agent Architecture visualizer' },
  { cmd: 'benchmarks', desc: 'Inspect low-level 60 FPS & vLLM performance graphs' },
  { cmd: 'overclock', desc: 'Trigger hyper-voltage Neon Cyber theme' },
  { cmd: 'contact', desc: 'Open direct encrypted message transmitter' },
  { cmd: 'clear', desc: 'Flush terminal history' },
  { cmd: 'exit', desc: 'Close developer command console' },
]

export default function CommandPalette({ isOpen, onClose, onToggleOverclock, isOverclocked }) {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: 'SHRIMALI_OS v2.6.4 (x86_64-engine-native)\nType "help" for a list of commands or click quick actions below.'
    }
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
          text: commandList.map((c) => `  ${c.cmd.padEnd(14)} - ${c.desc}`).join('\n')
        })
        break

      case 'cat resume':
      case 'resume':
        newHistory.push({
          type: 'output',
          text: `[ENGINEERING DOSSIER: SHUBHANSHU SHRIMALI]
ROLE: AI-Native Systems & Game Engineer (2+ Years Commercial)
SCALE: 300,000+ Active Players | Top 10 Genre Ranking (iOS/Android)
AI STACK: LangGraph, MCP, vLLM Speculative Decoding, QLoRA, Outlines, RunPod
ENGINE: Eisen Engine (C++/Vulkan), Unreal Engine 5 (GAS), Unity (DOTS/ECS)
EDUCATION: B.Tech CS (GITS, 8.3 CGPA) | International Black Belt Karate
LOCATION: Udaipur, Rajasthan, India | shubhanshu200425@gmail.com`
        })
        break

      case 'run eisen':
      case 'eisen':
        newHistory.push({ type: 'success', text: '>> Launching Eisen Engine 3D Simulation Viewport...' })
        setTimeout(() => {
          document.getElementById('eisen-viewport')?.scrollIntoView({ behavior: 'smooth' })
          onClose()
        }, 400)
        break

      case 'agents':
      case 'langgraph':
        newHistory.push({ type: 'success', text: '>> Navigating to LangGraph Cyclic StateGraph Visualizer...' })
        setTimeout(() => {
          document.getElementById('agent-graph')?.scrollIntoView({ behavior: 'smooth' })
          onClose()
        }, 400)
        break

      case 'benchmarks':
      case 'perf':
        newHistory.push({ type: 'success', text: '>> Navigating to Low-Level Performance Benchmarks...' })
        setTimeout(() => {
          document.getElementById('benchmarks')?.scrollIntoView({ behavior: 'smooth' })
          onClose()
        }, 400)
        break

      case 'overclock':
      case 'matrix':
        onToggleOverclock()
        soundFX.playSuccess()
        newHistory.push({
          type: 'success',
          text: `>> OVERCLOCK PROTOCOL ${!isOverclocked ? 'ENGAGED [HYPER-VOLTAGE ON]' : 'DISENGAGED [STANDARD RUNTIME]'}`
        })
        break

      case 'contact':
        newHistory.push({ type: 'success', text: '>> Initializing message transmitter...' })
        setTimeout(() => {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
          onClose()
        }, 400)
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
          text: `Unknown command: "${cleanCmd}". Type "help" to view executable commands.`
        })
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
          >
            {/* Header */}
            <div className="cmd-palette__header">
              <div className="cmd-palette__title mono">
                <FiTerminal className="cmd-palette__icon" />
                <span>SHRIMALI_TERMINAL // COMMAND_CENTER</span>
              </div>
              <div className="cmd-palette__actions">
                <span className="cmd-palette__kbd mono">ESC to exit</span>
                <button className="cmd-palette__close" onClick={onClose} aria-label="Close Command Center">
                  <FiX />
                </button>
              </div>
            </div>

            {/* Quick Command Pills */}
            <div className="cmd-palette__quick">
              <button onClick={() => handleCommand('run eisen')} className="cmd-quick-pill mono">
                <FiLayers /> run eisen
              </button>
              <button onClick={() => handleCommand('agents')} className="cmd-quick-pill mono">
                <FiCpu /> agents
              </button>
              <button onClick={() => handleCommand('benchmarks')} className="cmd-quick-pill mono">
                <FiTrendingUp /> benchmarks
              </button>
              <button onClick={() => handleCommand('overclock')} className="cmd-quick-pill cmd-quick-pill--accent mono">
                <FiZap /> overclock
              </button>
            </div>

            {/* Terminal Body Output */}
            <div className="cmd-palette__terminal mono">
              {history.map((item, idx) => (
                <div key={idx} className={`terminal-line terminal-line--${item.type}`}>
                  <pre>{item.text}</pre>
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>

            {/* Input Bar */}
            <div className="cmd-palette__input-bar">
              <span className="cmd-prompt mono">&gt;</span>
              <input
                ref={inputRef}
                type="text"
                className="cmd-input mono"
                placeholder="Type command (e.g. 'run eisen', 'cat resume', 'overclock')..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button className="cmd-enter-btn" onClick={() => handleCommand()} aria-label="Execute Command">
                <FiCornerDownLeft />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
