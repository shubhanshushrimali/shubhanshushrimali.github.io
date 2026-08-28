import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function ParticleField() {
  const meshRef = useRef()
  const count = 1500

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    const palette = [
      new THREE.Color('#a78bfa'),
      new THREE.Color('#60a5fa'),
      new THREE.Color('#22d3ee'),
      new THREE.Color('#f472b6'),
    ]

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      pos[i3] = (Math.random() - 0.5) * 20
      pos[i3 + 1] = (Math.random() - 0.5) * 20
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
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.02
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.03

      const positions = meshRef.current.geometry.attributes.position.array
      for (let i = 0; i < count; i++) {
        const i3 = i * 3
        positions[i3 + 1] += Math.sin(state.clock.elapsedTime + i * 0.01) * 0.001
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
        size={0.03}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function FloatingOrb({ position, color, scale = 1 }) {
  const meshRef = useRef()
  const initialPos = useMemo(() => position, [])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = initialPos[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3
      meshRef.current.position.x = initialPos[0] + Math.cos(state.clock.elapsedTime * 0.3) * 0.2
    }
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial color={color} transparent opacity={0.08} />
    </mesh>
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
      pointerEvents: 'none'
    }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <ParticleField />
        <FloatingOrb position={[-4, 2, -3]} color="#a78bfa" scale={1.5} />
        <FloatingOrb position={[4, -2, -4]} color="#60a5fa" scale={2} />
        <FloatingOrb position={[0, 3, -5]} color="#22d3ee" scale={1.8} />
        <FloatingOrb position={[-3, -3, -2]} color="#f472b6" scale={1.2} />
      </Canvas>
    </div>
  )
}
