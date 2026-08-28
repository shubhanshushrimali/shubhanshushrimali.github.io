import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  FiPlay,
  FiRotateCw,
  FiCpu,
  FiCheckCircle,
  FiServer,
  FiActivity,
  FiDatabase,
  FiTerminal,
  FiZap
} from 'react-icons/fi'
import { soundFX } from '../utils/audio'
import './AgentGraphVisualizer.css'

const graphNodes = [
  { id: 'input', label: 'User Goal / Task', icon: <FiTerminal />, type: 'entry' },
  { id: 'planner', label: 'LangGraph Planner Agent', icon: <FiCpu />, type: 'core' },
  { id: 'mcp', label: 'MCP Tool Ecosystem', icon: <FiActivity />, type: 'tool' },
  { id: 'vllm', label: 'vLLM GPU Cluster (RunPod)', icon: <FiServer />, type: 'infra' },
  { id: 'eval', label: 'LLM-as-a-Judge Eval Gate', icon: <FiCheckCircle />, type: 'eval' },
  { id: 'distill', label: 'QLoRA Trace Distillation', icon: <FiDatabase />, type: 'output' },
]

const sampleLogs = [
  '[LangGraph::StateGraph] Node "Planner" invoked with active checkpoint session_8c0f.',
  '[PlannerAgent] Decomposing task -> Generated 3 sub-goals with schema constraints.',
  '[MCP::Router] Dispatching Tool "code_sandbox_exec" & "literature_miner".',
  '[vLLM::Inference] Speculative decoding on RunPod RTX 4090 -> 114.2 tok/s.',
  '[EvalJudge] Running LangSmith automated rubric eval -> PASS (Score: 0.96).',
  '[StateGraph::Checkpoint] State persisted to SQLite. Extracting reasoning trace for LoRA distillation.'
]

export default function AgentGraphVisualizer() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })
  const [activeStep, setActiveStep] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [logs, setLogs] = useState([])

  const runSimulation = () => {
    if (isRunning) return
    setIsRunning(true)
    setActiveStep(1)
    setLogs([sampleLogs[0]])
    soundFX.playSuccess()

    let step = 1
    const interval = setInterval(() => {
      step++
      if (step <= graphNodes.length) {
        setActiveStep(step)
        setLogs((prev) => [...prev, sampleLogs[step - 1] || ''])
        soundFX.playClick()
      } else {
        clearInterval(interval)
        setIsRunning(false)
      }
    }, 1100)
  }

  return (
    <div className="agent-graph-section glass-card" id="agent-graph" ref={ref}>
      
      {/* Header */}
      <div className="agent-graph__header">
        <div>
          <div className="agent-graph__badge-row">
            <span className="hud-badge hud-badge--purple mono">
              <FiCpu /> LangGraph Cyclic StateGraph
            </span>
            <span className="agent-graph__status mono">
              {isRunning ? 'AGENT_SIMULATION: RUNNING' : 'AGENT_SIMULATION: READY'}
            </span>
          </div>
          <h3 className="font-heading">Autonomous Multi-Agent Architecture & Inference Pipeline</h3>
          <p className="agent-graph__desc">
            Production multi-agent cyclic loops with persistent state checkpoints, Model Context Protocol (MCP), 
            self-hosted vLLM speculative decoding, and continuous QLoRA trace distillation.
          </p>
        </div>

        <button
          className="btn btn-primary agent-run-btn mono"
          onClick={runSimulation}
          disabled={isRunning}
        >
          {isRunning ? <FiRotateCw className="spin-icon" /> : <FiPlay />}
          <span>{isRunning ? 'EXECUTING LOOP...' : 'RUN AGENT LOOP'}</span>
        </button>
      </div>

      {/* Interactive Node Graph */}
      <div className="agent-graph__node-container">
        {graphNodes.map((node, i) => {
          const isActive = activeStep === i + 1
          const isPassed = activeStep > i + 1

          return (
            <div key={node.id} className="node-wrapper">
              <motion.div
                className={`graph-node graph-node--${node.type} ${isActive ? 'graph-node--active' : ''} ${
                  isPassed ? 'graph-node--passed' : ''
                }`}
                animate={isActive ? { scale: [1, 1.06, 1] } : { scale: 1 }}
                transition={{ duration: 0.6, repeat: isActive ? Infinity : 0 }}
              >
                <div className="node-icon">{node.icon}</div>
                <span className="node-label mono">{node.label}</span>
                {isActive && <span className="node-pulse-ring"></span>}
              </motion.div>

              {i < graphNodes.length - 1 && (
                <div className={`graph-connector ${isPassed || isActive ? 'graph-connector--active' : ''}`}>
                  <span className="connector-dot"></span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Live Trace Stream Output */}
      <div className="agent-graph__console mono">
        <div className="console-header">
          <span className="console-title">
            <FiTerminal /> RUNTIME_TRACE_STREAM // LANGSMITH_EVALS
          </span>
          <span className="console-meta">VLLM: ACTIVE | CHECKPOINTS: ENABLED</span>
        </div>
        <div className="console-body">
          {logs.length === 0 ? (
            <span className="console-idle">&gt; Click "RUN AGENT LOOP" to initiate multi-agent cyclic execution trace...</span>
          ) : (
            logs.map((line, idx) => (
              <motion.div
                key={idx}
                className="console-line"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <span className="console-prefix">&gt;&gt;</span> {line}
              </motion.div>
            ))
          )}
        </div>
      </div>

    </div>
  )
}
