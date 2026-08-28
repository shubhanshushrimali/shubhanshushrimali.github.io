import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Rotating Cyber Core Geometry (Hologram Polyhedron)
function CyberCore() {
  const coreRef = useRef()
  const ringRef = useRef()
  const ring2Ref = useRef()

  useFrame((state) => {
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
          color="#00f0ff"
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Inner Glowing Core */}
      <mesh>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial
          color="#a855f7"
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Orbiting Orbital Ring 1 */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.8, 0.015, 16, 100]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
      </mesh>

      {/* Orbiting Orbital Ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.2, 0.01, 16, 100]} />
        <meshBasicMaterial color="#ec4899" transparent opacity={0.4} />
      </mesh>
    </group>
  )
}

function ParticleField() {
  const meshRef = useRef()
  const count = 1800

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    const palette = [
      new THREE.Color('#00f0ff'),
      new THREE.Color('#a855f7'),
      new THREE.Color('#38bdf8'),
      new THREE.Color('#10b981'),
      new THREE.Color('#f43f5e'),
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
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.015
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.025

      const posArray = meshRef.current.geometry.attributes.position.array
      for (let i = 0; i < count; i++) {
        const i3 = i * 3
        posArray[i3 + 1] += Math.sin(state.clock.elapsedTime * 0.8 + i * 0.05) * 0.0015
      }
      meshRef.current.geometry.attributes.position.needsUpdate = true
    }
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
      >
        <ambientLight intensity={0.8} />
        <ParticleField />
        <CyberCore />
      </Canvas>
    </div>
  )
}
