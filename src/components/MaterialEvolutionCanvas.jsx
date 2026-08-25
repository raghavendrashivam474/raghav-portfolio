import { useEffect, useRef } from 'react'

/**
 * MaterialEvolutionCanvas — Multilingual Aryntra System Matrix
 *
 * Integrates Japanese Katakana (ラ, ガ, ヴ, シ, ン), Devanagari (रा, अ, सं),
 * and CLI system ciphers into the background 3D canvas mesh.
 */

const NUM_PARTICLES = 440
const SYSTEM_NODES = [
  { tag: '[01_ANV]', label: 'Anveksha Engine',  cx: -480, cy: -180 },
  { tag: '[02_AYM]', label: 'Aayaam CLI',       cx:  520, cy: -120 },
  { tag: '[03_TRK]', label: 'Tarka Agent Core', cx:  380, cy:  260 }
]

const MULTILINGUAL_GLYPHS = [
  '>_', '◈', '◇', 'ƒ(x)', '→', '::', '01', '10', '{ }',
  'ラ', 'ガ', 'ヴ', 'シ', 'ン', 'タ', 'ル', // Japanese Katakana
  'रा', 'अ', 'सं',                          // Devanagari
  '[ANV]', '[AYM]', '[TRK]'
]

function createAryntraTopology() {
  const particles = []
  let id = 0

  for (let i = 0; i < NUM_PARTICLES; i++) {
    id++
    const clusterIdx = i % 4
    let baseX, baseY, z, isHub = false, hubTag = ''

    if (clusterIdx < 3) {
      const node = SYSTEM_NODES[clusterIdx]
      const angle = Math.random() * Math.PI * 2
      const radius = 60 + Math.pow(Math.random(), 1.2) * 380

      baseX = node.cx + Math.cos(angle) * radius
      baseY = node.cy + Math.sin(angle) * (radius * 0.7)
      z = (Math.random() - 0.5) * 750

      if (i < 6) {
        isHub = true
        hubTag = node.tag
      }
    } else {
      const nx = (Math.random() * 2 - 1) * 980
      const ny = (Math.random() * 2 - 1) * 580
      baseX = nx
      baseY = ny
      z = (Math.random() - 0.5) * 850
    }

    const glyph = isHub ? hubTag : MULTILINGUAL_GLYPHS[Math.floor(Math.random() * MULTILINGUAL_GLYPHS.length)]
    const isCopper = isHub || Math.random() < 0.28
    const isBright = isHub || Math.random() < 0.22

    particles.push({
      id,
      baseX,
      baseY,
      z,
      glyph,
      isHub,
      isCopper,
      isBright,
      driftPhase: Math.random() * Math.PI * 2,
      driftSpeed: 0.00018 + Math.random() * 0.00035,
      pushX: 0,
      pushY: 0
    })
  }

  const pulses = []
  for (let p = 0; p < 18; p++) {
    pulses.push({
      id: p,
      fromIdx: Math.floor(Math.random() * (NUM_PARTICLES / 2)),
      toIdx: Math.floor(Math.random() * (NUM_PARTICLES / 2)),
      progress: Math.random(),
      speed: 0.004 + Math.random() * 0.006
    })
  }

  return { particles, pulses }
}

export default function MaterialEvolutionCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let animationFrameId
    const { particles, pulses } = createAryntraTopology()

    let mousePx = -9999
    let mousePy = -9999
    let isMouseInWindow = false

    const handleMouseMove = (e) => {
      mousePx = e.clientX
      mousePy = e.clientY
      isMouseInWindow = true
    }

    const handleMouseLeave = () => {
      isMouseInWindow = false
      mousePx = -9999
      mousePy = -9999
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave)

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    const startTime = performance.now()

    const render = (now) => {
      const dpr = window.devicePixelRatio || 1
      const width = canvas.width / dpr
      const height = canvas.height / dpr

      ctx.save()
      ctx.scale(dpr, dpr)
      ctx.clearRect(0, 0, width, height)

      const elapsed = prefersReducedMotion ? 5000 : Math.max(0, now - startTime)

      const rotY = Math.sin(elapsed * 0.00005) * 0.07
      const rotX = Math.cos(elapsed * 0.00004) * 0.05
      const focalLength = 550
      const centerX = width * 0.5
      const centerY = height * 0.5
      const maxRadius = Math.hypot(width * 0.5, height * 0.5)

      const cosY = Math.cos(rotY), sinY = Math.sin(rotY)
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX)
      const projectedPoints = []

      particles.forEach((p) => {
        const driftX = Math.sin(elapsed * p.driftSpeed + p.driftPhase) * 16
        const driftY = Math.cos(elapsed * p.driftSpeed * 0.85 + p.driftPhase) * 12
        const px = p.baseX + driftX
        const py = p.baseY + driftY
        const pz = p.z

        const x1 = px * cosY - pz * sinY
        const z1 = px * sinY + pz * cosY
        const y2 = py * cosX - z1 * sinX
        const z2 = py * sinX + z1 * cosX

        const cameraZ = 500
        const scale = focalLength / (focalLength + z2 + cameraZ)
        let screenX = centerX + x1 * scale
        let screenY = centerY + y2 * scale

        let targetPushX = 0
        let targetPushY = 0

        if (isMouseInWindow && !prefersReducedMotion) {
          const dx = screenX - mousePx
          const dy = screenY - mousePy
          const dist = Math.hypot(dx, dy)

          if (dist < 220 && dist > 0.1) {
            const force = Math.pow(1 - dist / 220, 1.8)
            const angle = Math.atan2(dy, dx)
            targetPushX = Math.cos(angle) * force * 120
            targetPushY = Math.sin(angle) * force * 120
          }
        }

        p.pushX += (targetPushX - p.pushX) * 0.12
        p.pushY += (targetPushY - p.pushY) * 0.12
        screenX += p.pushX
        screenY += p.pushY

        const distFromCenter = Math.hypot(screenX - centerX, screenY - centerY)
        const edgeRatio = Math.min(1.0, distFromCenter / (maxRadius * 0.68))
        const quietZoneFactor = Math.min(1.0, Math.max(0.15, (distFromCenter - 110) / (maxRadius * 0.45)))
        const radialFactor = (0.30 + Math.pow(edgeRatio, 1.3) * 0.70) * quietZoneFactor

        projectedPoints.push({ screenX, screenY, scale, z: z2, p, radialFactor, glyph: p.glyph })
      })

      projectedPoints.sort((a, b) => b.z - a.z)

      // Render Wireframes
      ctx.lineWidth = 0.9
      const edgeConnections = []

      for (let i = 0; i < projectedPoints.length; i += 2) {
        const p1 = projectedPoints[i]
        if (p1.scale < 0.2 || p1.radialFactor < 0.12) continue

        for (let j = i + 1; j < projectedPoints.length; j += 2) {
          const p2 = projectedPoints[j]
          const dx = p1.screenX - p2.screenX
          const dy = p1.screenY - p2.screenY
          const distSq = dx * dx + dy * dy

          if (distSq < 11500) {
            const avgRadial = (p1.radialFactor + p2.radialFactor) * 0.5
            const lineAlpha = (1 - distSq / 11500) * 0.5 * avgRadial * Math.min(p1.scale, p2.scale)
            const isCopper = p1.p.isCopper || p2.p.isCopper

            ctx.beginPath()
            ctx.moveTo(p1.screenX, p1.screenY)
            ctx.lineTo(p2.screenX, p2.screenY)
            ctx.strokeStyle = isCopper
              ? `rgba(200, 126, 74, ${lineAlpha * 1.8})`
              : `rgba(184, 180, 170, ${lineAlpha * 1.1})`
            ctx.stroke()

            edgeConnections.push({ p1, p2, alpha: lineAlpha })
          }
        }
      }

      // Render Pulses
      if (!prefersReducedMotion && edgeConnections.length > 0) {
        pulses.forEach((pulse) => {
          pulse.progress += pulse.speed
          if (pulse.progress >= 1.0) {
            pulse.progress = 0
            pulse.edgeIdx = Math.floor(Math.random() * edgeConnections.length)
          }

          const conn = edgeConnections[pulse.edgeIdx || 0]
          if (conn) {
            const { p1, p2, alpha } = conn
            const px = p1.screenX + (p2.screenX - p1.screenX) * pulse.progress
            const py = p1.screenY + (p2.screenY - p1.screenY) * pulse.progress

            ctx.save()
            ctx.fillStyle = `rgba(223, 154, 100, ${alpha * 2.2})`
            ctx.shadowColor = 'rgba(200, 126, 74, 0.9)'
            ctx.shadowBlur = 8
            ctx.beginPath()
            ctx.arc(px, py, 2.5 * p1.scale, 0, Math.PI * 2)
            ctx.fill()
            ctx.restore()
          }
        })
      }

      // Render Multilingual Glyphs
      projectedPoints.forEach((pt) => {
        const { screenX, screenY, scale, p, radialFactor, glyph } = pt

        const depthAlpha = Math.max(0.18, Math.min(1.0, (scale - 0.15) * 2.1))
        const alpha = depthAlpha * radialFactor
        const fontSize = p.isHub ? Math.max(11, Math.round(18 * scale)) : Math.max(8, Math.round((14 + radialFactor * 4) * scale))

        ctx.save()
        ctx.translate(screenX, screenY)

        if (p.isHub) {
          ctx.fillStyle = `rgba(200, 126, 74, ${alpha * 1.3})`
          ctx.shadowColor = 'rgba(200, 126, 74, 0.8)'
          ctx.shadowBlur = 12 * scale
          ctx.font = `600 ${fontSize}px "JetBrains Mono", monospace`
        } else if (p.isCopper) {
          ctx.fillStyle = `rgba(200, 126, 74, ${alpha * 1.1})`
          if (scale > 0.45 && radialFactor > 0.35) {
            ctx.shadowColor = 'rgba(200, 126, 74, 0.65)'
            ctx.shadowBlur = 9 * scale * radialFactor
          }
          ctx.font = `${fontSize}px "JetBrains Mono", monospace`
        } else if (p.isBright) {
          ctx.fillStyle = `rgba(244, 240, 232, ${alpha * 1.1})`
          if (scale > 0.45 && radialFactor > 0.35) {
            ctx.shadowColor = 'rgba(244, 240, 232, 0.75)'
            ctx.shadowBlur = 7 * scale * radialFactor
          }
          ctx.font = `${fontSize}px "JetBrains Mono", monospace`
        } else {
          ctx.fillStyle = `rgba(184, 180, 170, ${alpha * 0.85})`
          ctx.shadowBlur = 0
          ctx.font = `${fontSize}px "JetBrains Mono", monospace`
        }

        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(glyph, 0, 0)
        ctx.restore()
      })

      ctx.restore()
      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
      aria-hidden="true"
    />
  )
}