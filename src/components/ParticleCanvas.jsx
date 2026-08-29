import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Check if user prefers reduced motion
function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(mq.matches)
    const handler = (e) => setPrefersReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return prefersReduced
}

// Determine particle count based on device
function getParticleCount() {
  if (typeof window === 'undefined') return 1200
  const width = window.innerWidth
  if (width < 768) return 500
  if (width < 1024) return 900
  return 1800
}

// Rotating Cyber Core Geometry (Hologram Polyhedron)
function CyberCore({ reducedMotion }) {
  const coreRef = useRef()
  const ringRef = useRef()
  const ring2Ref = useRef()

  useFrame((state) => {
    if (reducedMotion) return
    const t = state.clock.getElapsedTime()
    if (coreRef.current) {
      coreRef.current.rotation.x = t * 0.25
      coreRef.current.rotation.y = t * 0.35
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -t * 0.4
      ringRef.current.rotation.x = Math.sin(t * 0.3) * 0.5
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = t * 0.5
      ring2Ref.current.rotation.z = Math.cos(t * 0.2) * 0.6
    }
  })

  return (
    <group position={[4.5, 0.5, -2]} scale={1.8}>
      {/* Central Wireframe Polyhedron */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial
          wireframe
          color="#c9a55a"
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Inner Glowing Core */}
      <mesh>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial
          color="#7c6fa0"
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Orbiting Orbital Ring 1 */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.8, 0.015, 16, 100]} />
        <meshBasicMaterial color="#7090b0" transparent opacity={0.6} />
      </mesh>

      {/* Orbiting Orbital Ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.2, 0.01, 16, 100]} />
        <meshBasicMaterial color="#c05e3c" transparent opacity={0.4} />
      </mesh>
    </group>
  )
}

function ParticleField({ reducedMotion, particleCount }) {
  const meshRef = useRef()
  const count = particleCount

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    const palette = [
      new THREE.Color('#c9a55a'),
      new THREE.Color('#7090b0'),
      new THREE.Color('#a8c4d8'),
      new THREE.Color('#5a8a6c'),
      new THREE.Color('#8892a4'),
    ]

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      pos[i3] = (Math.random() - 0.5) * 26
      pos[i3 + 1] = (Math.random() - 0.5) * 26
      pos[i3 + 2] = (Math.random() - 0.5) * 20

      const color = palette[Math.floor(Math.random() * palette.length)]
      col[i3] = color.r
      col[i3 + 1] = color.g
      col[i3 + 2] = color.b
    }

    return [pos, col]
  }, [count])

  useFrame((state) => {
    if (reducedMotion || !meshRef.current) return

    meshRef.current.rotation.x = state.clock.elapsedTime * 0.015
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.025

    const posArray = meshRef.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      posArray[i3 + 1] += Math.sin(state.clock.elapsedTime * 0.8 + i * 0.05) * 0.0015
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

export default function ParticleCanvas() {
  const reducedMotion = usePrefersReducedMotion()
  const [mounted, setMounted] = useState(false)
  const [particleCount] = useState(() => getParticleCount())

  // Lazy-mount: defer Three.js canvas until after first paint
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  if (!mounted) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      pointerEvents: 'none',
      overflow: 'hidden'
    }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        frameloop={reducedMotion ? 'demand' : 'always'}
      >
        <ambientLight intensity={0.8} />
        <ParticleField reducedMotion={reducedMotion} particleCount={particleCount} />
        <CyberCore reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  )
}
