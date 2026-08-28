import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  FiTrendingUp,
  FiZap,
  FiCpu,
  FiLayers,
  FiCheckCircle,
  FiSliders,
  FiActivity
} from 'react-icons/fi'
import { soundFX } from '../utils/audio'
import './BenchmarksSection.css'

const benchmarks = [
  {
    id: 'mobile-fps',
    title: 'Mobile Real-Time Graphics Optimization',
    context: 'Unity / HLSL / RenderDoc Profiling (Carina Softlabs & Toba Tech)',
    unoptimized: {
      label: 'Standard Unprofiled Build',
      fps: '28-38 FPS (Hitching)',
      ram: '480 MB RAM',
      buildSize: '185 MB APK',
      drawCalls: '320+ Draw Calls',
      barPercent: 45,
      color: '#ef4444'
    },
    optimized: {
      label: 'Engine-Level Shaders & Addressables',
      fps: 'Rock-Solid 60 FPS Locked',
      ram: '312 MB (-35% RAM)',
      buildSize: '110 MB (-40% Build Size)',
      drawCalls: '48 Batched Draw Calls',
      barPercent: 100,
      color: '#10b981'
    },
    summary:
      'Profiled HLSL shaders, batched draw calls with GPU instancing, and streamed assets via Addressables to lock 60 FPS on low-tier mobile hardware.'
  },
  {
    id: 'vllm-throughput',
    title: 'vLLM Inference & Speculative Decoding',
    context: 'RunPod / Vast.ai GPU Clusters & Autonomous Agent Loops',
    unoptimized: {
      label: 'Standard Transformers Inference',
      throughput: '18.4 tok/sec',
      latency: '1,420 ms TTFT',
      cache: 'No Prompt Caching',
      cost: '$4.80 / 1M Tokens',
      barPercent: 25,
      color: '#ef4444'
    },
    optimized: {
      label: 'vLLM + Speculative Decoding + Caching',
      throughput: '114.2 tok/sec (6.2x Throughput)',
      latency: '210 ms TTFT (-85% Latency)',
      cache: 'Prefix KV-Cache Reuse',
      cost: '$0.78 / 1M Tokens (-83% Cost)',
      barPercent: 100,
      color: '#00f0ff'
    },
    summary:
      'Deployed self-hosted vLLM with speculative draft models and prompt prefix caching across GPU clusters, scaling agent loop throughput by 6.2x.'
  },
  {
    id: 'eisen-memory',
    title: 'Eisen Engine Memory Allocation',
    context: 'Custom C++ Arena & Pool Allocator Architecture',
    unoptimized: {
      label: 'Standard malloc() Heap Allocation',
      allocs: '48,000 mallocs/sec',
      fragmentation: 'High Heap Fragmentation',
      spikes: '16.8ms GC/Defrag Spikes',
      cacheMiss: '14.2% L1/L2 Cache Misses',
      barPercent: 30,
      color: '#ef4444'
    },
    optimized: {
      label: 'Eisen Linear Arena & Pool Allocator',
      allocs: '0 Runtime mallocs in Frame Loop',
      fragmentation: '0% Heap Fragmentation',
      spikes: '0ms Allocation Spikes',
      cacheMiss: '1.8% Cache Miss (Contiguous)',
      barPercent: 100,
      color: '#a855f7'
    },
    summary:
      'Engineered pre-allocated memory arenas with contiguous cache-line alignment, completely eliminating runtime heap allocations during render ticks.'
  }
]

export default function BenchmarksSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })
  const [activeBenchmark, setActiveBenchmark] = useState('mobile-fps')
  const [sliderPos, setSliderPos] = useState(50) // 0 to 100

  const handleSelect = (id) => {
    soundFX.playClick()
    setActiveBenchmark(id)
  }

  const current = benchmarks.find((b) => b.id === activeBenchmark) || benchmarks[0]

  return (
    <section className="benchmarks-section" id="benchmarks" ref={ref}>
      <div className="container">
        
        {/* Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-number">04. Systems Performance</span>
          <h2>Quantitative <span className="gradient-text">Optimization Benchmarks</span></h2>
          <p>
            Real measurable impact: from locking 60 FPS on low-tier mobile hardware to 
            6.2x throughput speedups on distributed GPU inference clusters.
          </p>
          <div className="section-line" />
        </motion.div>

        {/* Benchmark Selector Tabs */}
        <div className="benchmarks__tabs">
          {benchmarks.map((b) => (
            <button
              key={b.id}
              className={`benchmarks__tab-btn ${activeBenchmark === b.id ? 'benchmarks__tab-btn--active' : ''}`}
              onClick={() => handleSelect(b.id)}
            >
              <FiActivity className="bench-tab-icon" />
              <span className="bench-tab-title">{b.title}</span>
            </button>
          ))}
        </div>

        {/* Comparative Benchmark Card */}
        <motion.div
          key={current.id}
          className="benchmark-card glass-card"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="benchmark-card__header">
            <div>
              <span className="benchmark-card__context mono">{current.context}</span>
              <h3 className="font-heading">{current.title}</h3>
            </div>
            <span className="hud-badge hud-badge--emerald mono">
              <FiCheckCircle /> VERIFIED BENCHMARKS
            </span>
          </div>

          {/* Comparative Grid */}
          <div className="benchmark-card__grid">
            
            {/* Unoptimized Column */}
            <div className="benchmark-col benchmark-col--before">
              <div className="benchmark-col__tag mono">BEFORE OPTIMIZATION</div>
              <h4>{current.unoptimized.label}</h4>
              
              <div className="benchmark-metrics-list">
                {current.unoptimized.fps && (
                  <div className="benchmark-metric-item">
                    <span className="metric-name mono">Frame Rate:</span>
                    <span className="metric-val metric-val--bad mono">{current.unoptimized.fps}</span>
                  </div>
                )}
                {current.unoptimized.throughput && (
                  <div className="benchmark-metric-item">
                    <span className="metric-name mono">Throughput:</span>
                    <span className="metric-val metric-val--bad mono">{current.unoptimized.throughput}</span>
                  </div>
                )}
                {current.unoptimized.allocs && (
                  <div className="benchmark-metric-item">
                    <span className="metric-name mono">Allocations:</span>
                    <span className="metric-val metric-val--bad mono">{current.unoptimized.allocs}</span>
                  </div>
                )}
                {current.unoptimized.ram && (
                  <div className="benchmark-metric-item">
                    <span className="metric-name mono">Memory Usage:</span>
                    <span className="metric-val mono">{current.unoptimized.ram}</span>
                  </div>
                )}
                {current.unoptimized.latency && (
                  <div className="benchmark-metric-item">
                    <span className="metric-name mono">Latency (TTFT):</span>
                    <span className="metric-val mono">{current.unoptimized.latency}</span>
                  </div>
                )}
                {current.unoptimized.fragmentation && (
                  <div className="benchmark-metric-item">
                    <span className="metric-name mono">Fragmentation:</span>
                    <span className="metric-val mono">{current.unoptimized.fragmentation}</span>
                  </div>
                )}
              </div>

              <div className="benchmark-bar-track">
                <div
                  className="benchmark-bar-fill benchmark-bar-fill--bad"
                  style={{ width: `${current.unoptimized.barPercent}%` }}
                ></div>
              </div>
            </div>

            {/* Optimized Column */}
            <div className="benchmark-col benchmark-col--after">
              <div className="benchmark-col__tag benchmark-col__tag--opt mono">AFTER SHRIMALI OPTIMIZATION</div>
              <h4 className="gradient-text-neon">{current.optimized.label}</h4>
              
              <div className="benchmark-metrics-list">
                {current.optimized.fps && (
                  <div className="benchmark-metric-item">
                    <span className="metric-name mono">Frame Rate:</span>
                    <span className="metric-val metric-val--good mono">{current.optimized.fps}</span>
                  </div>
                )}
                {current.optimized.throughput && (
                  <div className="benchmark-metric-item">
                    <span className="metric-name mono">Throughput:</span>
                    <span className="metric-val metric-val--good mono">{current.optimized.throughput}</span>
                  </div>
                )}
                {current.optimized.allocs && (
                  <div className="benchmark-metric-item">
                    <span className="metric-name mono">Allocations:</span>
                    <span className="metric-val metric-val--good mono">{current.optimized.allocs}</span>
                  </div>
                )}
                {current.optimized.ram && (
                  <div className="benchmark-metric-item">
                    <span className="metric-name mono">Memory Usage:</span>
                    <span className="metric-val metric-val--good mono">{current.optimized.ram}</span>
                  </div>
                )}
                {current.optimized.latency && (
                  <div className="benchmark-metric-item">
                    <span className="metric-name mono">Latency (TTFT):</span>
                    <span className="metric-val metric-val--good mono">{current.optimized.latency}</span>
                  </div>
                )}
                {current.optimized.fragmentation && (
                  <div className="benchmark-metric-item">
                    <span className="metric-name mono">Fragmentation:</span>
                    <span className="metric-val metric-val--good mono">{current.optimized.fragmentation}</span>
                  </div>
                )}
              </div>

              <div className="benchmark-bar-track">
                <div
                  className="benchmark-bar-fill benchmark-bar-fill--good"
                  style={{ width: `${current.optimized.barPercent}%` }}
                ></div>
              </div>
            </div>

          </div>

          <p className="benchmark-card__summary">
            <strong>Architecture Key:</strong> {current.summary}
          </p>
        </motion.div>

      </div>
    </section>
  )
}
