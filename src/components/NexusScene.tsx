import { Canvas, useFrame } from '@react-three/fiber'
import { useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import { useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useTheme, type Theme } from '../lib/theme'

const ORANGE = '#ff6b35'
// bg matches --color-bg, so the fog fades far nodes into the page. Additive glow would wash out on a light page.
const PALETTES = {
  dark: { bg: '#121212', ink: '#f4f4f2', line: '#ffffff', lineOpacity: 0.2, glowBlending: THREE.AdditiveBlending, glowOpacity: 0.42 },
  light: { bg: '#f6f6f3', ink: '#0f1b2d', line: '#0f1b2d', lineOpacity: 0.16, glowBlending: THREE.NormalBlending, glowOpacity: 0.3 },
} satisfies Record<Theme, unknown>
type Palette = (typeof PALETTES)[Theme]
const PULSES = 24
const HUB_LINKS = 14
const NEIGHBOURS = 3

type Graph = { points: THREE.Vector3[]; edges: [number, number][]; adjacency: number[][] }

// Evenly spread points on a sphere, nudged in and out a little so the shell reads as organic.
function fibonacciSphere(count: number, radius: number) {
  const golden = Math.PI * (3 - Math.sqrt(5))
  return Array.from({ length: count }, (_, i) => {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = golden * i
    const wobble = 1 + Math.sin(i * 12.9898) * 0.06
    return new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(radius * wobble)
  })
}

function buildGraph(count: number): Graph {
  const points = fibonacciSphere(count, 2.3)
  const edges: [number, number][] = []
  const seen = new Set<string>()
  points.forEach((p, i) => {
    const nearest = points
      .map((q, j) => ({ j, d: p.distanceToSquared(q) }))
      .filter((n) => n.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, NEIGHBOURS)
    for (const { j } of nearest) {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`
      if (!seen.has(key)) {
        seen.add(key)
        edges.push([i, j])
      }
    }
  })
  const adjacency = points.map(() => [] as number[])
  for (const [a, b] of edges) {
    adjacency[a].push(b)
    adjacency[b].push(a)
  }
  return { points, edges, adjacency }
}

function useDotTexture() {
  return useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = 64
    const ctx = canvas.getContext('2d')!
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    gradient.addColorStop(0, 'rgba(255,255,255,1)')
    gradient.addColorStop(0.4, 'rgba(255,255,255,0.85)')
    gradient.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 64, 64)
    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    return texture
  }, [])
}

function Network({ count, play, reduced, palette }: { count: number; play: boolean; reduced: boolean; palette: Palette }) {
  const group = useRef<THREE.Group>(null)
  const pulseMesh = useRef<THREE.InstancedMesh>(null)
  const glow = useRef<THREE.Sprite>(null)
  const dot = useDotTexture()
  const graph = useMemo(() => buildGraph(count), [count])

  const pointPositions = useMemo(() => new Float32Array(graph.points.flatMap((p) => [p.x, p.y, p.z])), [graph])
  const linePositions = useMemo(
    () =>
      new Float32Array(
        graph.edges.flatMap(([a, b]) => {
          const p = graph.points[a]
          const q = graph.points[b]
          return [p.x, p.y, p.z, q.x, q.y, q.z]
        }),
      ),
    [graph],
  )
  const hubPositions = useMemo(() => {
    const step = Math.floor(graph.points.length / HUB_LINKS)
    return new Float32Array(
      Array.from({ length: HUB_LINKS }, (_, i) => {
        const p = graph.points[i * step]
        return [0, 0, 0, p.x, p.y, p.z]
      }).flat(),
    )
  }, [graph])

  // Signals travel edge to edge, never doubling straight back. Per-frame simulation state, so it lives in a ref.
  const pulses = useRef(
    Array.from({ length: PULSES }, (_, i) => {
      const [from, to] = graph.edges[(i * 37) % graph.edges.length]
      return { from, to, t: (i % 7) / 7, speed: 0.35 + ((i * 13) % 10) / 25 }
    }),
  )
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const assembled = useRef(0)

  useFrame((state, delta) => {
    const g = group.current
    if (!g) return
    const dt = Math.min(delta, 0.05)
    if (play) assembled.current = Math.min(1, assembled.current + dt * 0.7)
    const grow = 1 - Math.pow(1 - assembled.current, 3)

    g.scale.setScalar(0.5 + 0.5 * grow)
    if (!reduced) g.rotation.y += dt * 0.08
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, state.pointer.y * 0.25, 0.05)
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, -state.pointer.x * 0.1, 0.05)

    const mesh = pulseMesh.current
    if (mesh) {
      pulses.current.forEach((p, i) => {
        if (!reduced) p.t += dt * p.speed
        if (p.t >= 1) {
          p.t -= 1
          const options = graph.adjacency[p.to].filter((n) => n !== p.from)
          p.from = p.to
          p.to = options.length ? options[Math.floor(Math.random() * options.length)] : graph.adjacency[p.to][0]
        }
        dummy.position.lerpVectors(graph.points[p.from], graph.points[p.to], p.t)
        dummy.scale.setScalar(grow)
        dummy.updateMatrix()
        mesh.setMatrixAt(i, dummy.matrix)
      })
      mesh.instanceMatrix.needsUpdate = true
    }

    if (glow.current) {
      const breathe = reduced ? 1.5 : 1.5 + Math.sin(state.clock.elapsedTime * 2) * 0.18
      glow.current.scale.setScalar(breathe * grow)
    }
  })

  return (
    <group ref={group}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={palette.line} transparent opacity={palette.lineOpacity} depthWrite={false} />
      </lineSegments>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[hubPositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={ORANGE} transparent opacity={0.3} depthWrite={false} fog={false} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pointPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial map={dot} color={palette.ink} size={0.095} sizeAttenuation transparent depthWrite={false} />
      </points>
      <instancedMesh ref={pulseMesh} args={[undefined, undefined, PULSES]}>
        <sphereGeometry args={[0.042, 12, 12]} />
        <meshBasicMaterial color={ORANGE} toneMapped={false} fog={false} />
      </instancedMesh>
      <mesh>
        <sphereGeometry args={[0.14, 32, 32]} />
        <meshBasicMaterial color={ORANGE} toneMapped={false} fog={false} />
      </mesh>
      <sprite ref={glow}>
        <spriteMaterial
          map={dot}
          color={ORANGE}
          transparent
          opacity={palette.glowOpacity}
          depthWrite={false}
          blending={palette.glowBlending}
          toneMapped={false}
          fog={false}
        />
      </sprite>
    </group>
  )
}

export default function NexusScene({ play }: { play: boolean }) {
  const [visible, setVisible] = useState(true)
  const reduced = useReducedMotion() ?? false
  const palette = PALETTES[useTheme()]
  const count = useMemo(() => (window.innerWidth < 768 ? 130 : 220), [])
  const { scrollY } = useScroll()

  // Stop rendering once the hero (one screen tall) is scrolled away.
  useMotionValueEvent(scrollY, 'change', (y) => setVisible(y < window.innerHeight * 1.1))

  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 8.4], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop={visible ? 'always' : 'never'}
        eventSource={document.body}
        eventPrefix="client"
        // offsetSize ignores the hero's scroll-linked scale, so the canvas isn't reallocated every frame.
        resize={{ scroll: false, offsetSize: true }}
      >
        <fog attach="fog" args={[palette.bg, 6.6, 11.2]} />
        <Network count={count} play={play} reduced={reduced} palette={palette} />
      </Canvas>
    </div>
  )
}
