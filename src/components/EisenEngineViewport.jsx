import { useState, useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { motion } from 'framer-motion'
import { FiPlay, FiPause, FiActivity, FiLayers, FiMaximize2, FiCpu, FiEye } from 'react-icons/fi'
import * as THREE from 'three'
import { soundFX } from '../utils/audio'
import './EisenEngineViewport.css'

// Shader Mode 1: Vulkan Wireframe Mesh
function VulkanWireframeMesh({ isPaused }) {
  const meshRef = useRef()
  const innerRef = useRef()

  useFrame((state) => {
    if (isPaused) return
    const t = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.4
      meshRef.current.rotation.y = t * 0.6
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.3
      innerRef.current.rotation.z = t * 0.5
    }
  })

  return (
    <group scale={1.6}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[1.5, 2]} />
        <meshBasicMaterial color="#38BDF8" wireframe transparent opacity={0.7} />
      </mesh>
      <mesh ref={innerRef}>
        <dodecahedronGeometry args={[0.9, 0]} />
        <meshBasicMaterial color="#22C55E" wireframe transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

// Shader Mode 2: Quantum GLSL Raymarched Torus
function QuantumCoreMesh({ isPaused }) {
  const torusRef = useRef()
  const torusRef2 = useRef()

  useFrame((state) => {
    if (isPaused) return
    const t = state.clock.getElapsedTime()
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.5
      torusRef.current.rotation.y = t * 0.7
    }
    if (torusRef2.current) {
      torusRef2.current.rotation.y = -t * 0.6
      torusRef2.current.rotation.z = t * 0.4
    }
  })

  return (
    <group scale={1.5}>
      <mesh ref={torusRef}>
        <torusKnotGeometry args={[1, 0.28, 128, 32]} />
        <meshStandardMaterial
          color="#8B5CF6"
          emissive="#38BDF8"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
          wireframe={false}
        />
      </mesh>
      <mesh ref={torusRef2}>
        <torusGeometry args={[1.8, 0.02, 16, 100]} />
        <meshBasicMaterial color="#38BDF8" />
      </mesh>
    </group>
  )
}

// Shader Mode 3: Kinetic Physics Particle Vortex
function KineticParticleVortex({ isPaused }) {
  const pointsRef = useRef()
  const count = 3000

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const pColor1 = new THREE.Color('#38BDF8')
    const pColor2 = new THREE.Color('#8B5CF6')
    const pColor3 = new THREE.Color('#22C55E')

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const radius = 1 + Math.random() * 3.5
      const theta = Math.random() * Math.PI * 2
      const y = (Math.random() - 0.5) * 2.5

      pos[i3] = Math.cos(theta) * radius
      pos[i3 + 1] = y
      pos[i3 + 2] = Math.sin(theta) * radius

      const mixCol = Math.random() > 0.5 ? pColor1 : (Math.random() > 0.5 ? pColor2 : pColor3)
      col[i3] = mixCol.r
      col[i3 + 1] = mixCol.g
      col[i3 + 2] = mixCol.b
    }
    return [pos, col]
  }, [])

  useFrame((state) => {
    if (isPaused) return
    const t = state.clock.getElapsedTime()
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.4
      pointsRef.current.rotation.z = Math.sin(t * 0.2) * 0.15
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.035} vertexColors transparent opacity={0.85} blending={THREE.AdditiveBlending} />
    </points>
  )
}

export default function EisenEngineViewport() {
  const [renderMode, setRenderMode] = useState('vulkan') // 'vulkan' | 'quantum' | 'particles'
  const [isPaused, setIsPaused] = useState(false)
  const [fps, setFps] = useState(60)

  // Calculate real browser FPS
  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()
    let animId

    const loop = () => {
      frameCount++
      const now = performance.now()
      if (now - lastTime >= 1000) {
        setFps(Math.min(60, Math.round((frameCount * 1000) / (now - lastTime))))
        frameCount = 0
        lastTime = now
      }
      animId = requestAnimationFrame(loop)
    }
    animId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animId)
  }, [])

  const handleModeChange = (mode) => {
    soundFX.playClick()
    setRenderMode(mode)
  }

  const togglePause = () => {
    soundFX.playClick()
    setIsPaused(!isPaused)
  }

  return (
    <div className="eisen-viewport glass-card" id="eisen-viewport">
      
      {/* Top HUD Telemetry Bar */}
      <div className="eisen-viewport__hud-bar">
        <div className="hud-metric">
          <span className="hud-metric__dot pulse-dot"></span>
          <span className="hud-metric__label mono">ENGINE:</span>
          <span className="hud-metric__val hud-metric__val--cyan mono">EISEN_RHI (VULKAN 1.3)</span>
        </div>

        <div className="hud-metric">
          <span className="hud-metric__label mono">FPS:</span>
          <span className="hud-metric__val hud-metric__val--emerald mono">{fps} FPS</span>
        </div>

        <div className="hud-metric hud-metric--desktop">
          <span className="hud-metric__label mono">FRAME_TIME:</span>
          <span className="hud-metric__val mono">{(1000 / (fps || 60)).toFixed(1)} ms</span>
        </div>

        <div className="hud-metric hud-metric--desktop">
          <span className="hud-metric__label mono">DRAWCALLS:</span>
          <span className="hud-metric__val mono">42 BATCHED</span>
        </div>

        <div className="hud-metric hud-metric--desktop">
          <span className="hud-metric__label mono">ARENA_ALLOC:</span>
          <span className="hud-metric__val hud-metric__val--gold mono">0 HEAP FRAG</span>
        </div>
      </div>

      {/* 3D Viewport Screen */}
      <div className="eisen-viewport__canvas-wrap">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }} style={{ background: 'transparent' }}>
          <ambientLight intensity={0.7} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#38BDF8" />
          <pointLight position={[-10, -10, -10]} intensity={1.2} color="#8B5CF6" />

          {renderMode === 'vulkan' && <VulkanWireframeMesh isPaused={isPaused} />}
          {renderMode === 'quantum' && <QuantumCoreMesh isPaused={isPaused} />}
          {renderMode === 'particles' && <KineticParticleVortex isPaused={isPaused} />}
        </Canvas>

        {/* Reticle / Viewport Crosshairs */}
        <div className="viewport-overlay">
          <div className="crosshair-tl"></div>
          <div className="crosshair-tr"></div>
          <div className="crosshair-bl"></div>
          <div className="crosshair-br"></div>
          <div className="viewport-tag mono">EISEN_SIMULATION_VIEWPORT // ACTIVE</div>
        </div>
      </div>

      {/* Bottom Shader Controls Bar */}
      <div className="eisen-viewport__controls">
        <div className="mode-toggle-group">
          <button
            className={`mode-btn mono ${renderMode === 'vulkan' ? 'mode-btn--active' : ''}`}
            onClick={() => handleModeChange('vulkan')}
          >
            <FiLayers /> VULKAN_WIREFRAME
          </button>
          <button
            className={`mode-btn mono ${renderMode === 'quantum' ? 'mode-btn--active' : ''}`}
            onClick={() => handleModeChange('quantum')}
          >
            <FiCpu /> QUANTUM_CORE
          </button>
          <button
            className={`mode-btn mono ${renderMode === 'particles' ? 'mode-btn--active' : ''}`}
            onClick={() => handleModeChange('particles')}
          >
            <FiActivity /> PARTICLE_VORTEX
          </button>
        </div>

        <button className="pause-btn mono" onClick={togglePause} title={isPaused ? 'Resume' : 'Pause'}>
          {isPaused ? <FiPlay /> : <FiPause />}
          <span>{isPaused ? 'RESUME' : 'FREEZE'}</span>
        </button>
      </div>

    </div>
  )
}
