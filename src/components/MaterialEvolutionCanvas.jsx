import { useEffect, useRef } from 'react'

const NUM_COLS = 34
const NUM_ROWS = 25
const SYMBOLS = ['0', '1', '0', '1', '+', '◇', '◈', '{', '}', ';', 'λ']
const REPULSOR_RADIUS = 220
const MAX_PUSH_FORCE = 120

function createDenseField() {
  const particles = []
  let id = 0

  for (let r = 0; r < NUM_ROWS; r++) {
    for (let c = 0; c < NUM_COLS; c++) {
      id++
      const nx = (c / (NUM_COLS - 1)) * 2 - 1.0
      const ny = (r / (NUM_ROWS - 1)) * 2 - 1.0
      const jitterX = (Math.random() - 0.5) * 0.06
      const jitterY = (Math.random() - 0.5) * 0.06

      particles.push({
        id,
        baseX: (nx + jitterX) * 980,
        baseY: (ny + jitterY) * 580,
        z: (Math.random() - 0.5) * 850,
        symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        isCopper: Math.random() < 0.28,
        isBright: Math.random() < 0.25,
        flipSpeed: 0.001 + Math.random() * 0.003,
        lastFlipTime: 0,
        driftPhase: Math.random() * Math.PI * 2,
        driftSpeed: 0.0002 + Math.random() * 0.0004,
        pushX: 0,
        pushY: 0
      })
    }
  }

  return particles
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
    const particles = createDenseField()

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
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave)
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
      const rotY = Math.sin(elapsed * 0.00006) * 0.08
      const rotX = Math.cos(elapsed * 0.00005) * 0.06
      const focalLength = 550
      const centerX = width * 0.5
      const centerY = height * 0.5
      const maxRadius = Math.hypot(width * 0.5, height * 0.5)
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY)
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX)
      const projectedPoints = []

      particles.forEach((p) => {
        const px = p.baseX + Math.sin(elapsed * p.driftSpeed + p.driftPhase) * 18
        const py = p.baseY + Math.cos(elapsed * p.driftSpeed * 0.8 + p.driftPhase) * 14
        const pz = p.z

        const x1 = px * cosY - pz * sinY
        const z1 = px * sinY + pz * cosY
        const y2 = py * cosX - z1 * sinX
        const z2 = py * sinX + z1 * cosX

        const scale = focalLength / (focalLength + z2 + 500)
        let screenX = centerX + x1 * scale
        let screenY = centerY + y2 * scale

        let targetPushX = 0
        let targetPushY = 0
        if (isMouseInWindow) {
          const dx = screenX - mousePx
          const dy = screenY - mousePy
          const dist = Math.hypot(dx, dy)
          if (dist < REPULSOR_RADIUS && dist > 0.1) {
            const force = Math.pow(1 - dist / REPULSOR_RADIUS, 1.8)
            const angle = Math.atan2(dy, dx)
            targetPushX = Math.cos(angle) * force * MAX_PUSH_FORCE
            targetPushY = Math.sin(angle) * force * MAX_PUSH_FORCE
          }
        }

        p.pushX += (targetPushX - p.pushX) * 0.12
        p.pushY += (targetPushY - p.pushY) * 0.12
        screenX += p.pushX
        screenY += p.pushY

        const edgeRatio = Math.min(1.0, Math.hypot(screenX - centerX, screenY - centerY) / (maxRadius * 0.7))
        const radialFactor = 0.45 + Math.pow(edgeRatio, 1.2) * 0.55

        let currentSymbol = p.symbol
        if (p.symbol === '0' || p.symbol === '1') {
          if (now - p.lastFlipTime > 2200 + (p.id % 7) * 400) {
            p.symbol = p.symbol === '0' ? '1' : '0'
            p.lastFlipTime = now
          }
          currentSymbol = p.symbol
        }

        projectedPoints.push({ screenX, screenY, scale, z: z2, p, radialFactor, currentSymbol })
      })

      projectedPoints.sort((a, b) => b.z - a.z)

      ctx.lineWidth = 0.9
      for (let i = 0; i < projectedPoints.length; i += 2) {
        const p1 = projectedPoints[i]
        if (p1.scale < 0.2) continue
        for (let j = i + 1; j < projectedPoints.length; j += 2) {
          const p2 = projectedPoints[j]
          const dx = p1.screenX - p2.screenX
          const dy = p1.screenY - p2.screenY
          const distSq = dx * dx + dy * dy
          if (distSq < 10500) {
            const avgRadial = (p1.radialFactor + p2.radialFactor) * 0.5
            const lineAlpha = (1 - distSq / 10500) * 0.55 * avgRadial * Math.min(p1.scale, p2.scale)
            const isCopper = p1.p.isCopper || p2.p.isCopper
            ctx.beginPath()
            ctx.moveTo(p1.screenX, p1.screenY)
            ctx.lineTo(p2.screenX, p2.screenY)
            ctx.strokeStyle = isCopper
              ? `rgba(200, 126, 74, ${lineAlpha * 1.8})`
              : `rgba(184, 180, 170, ${lineAlpha * 1.2})`
            ctx.stroke()
          }
        }
      }

      projectedPoints.forEach((pt) => {
        const { screenX, screenY, scale, p, radialFactor, currentSymbol } = pt
        const alpha = Math.max(0.25, Math.min(1, (scale - 0.15) * 2.2)) * radialFactor
        const fontSize = Math.max(9, Math.round((15 + radialFactor * 5) * scale))
        const twinkle = Math.sin(now * p.flipSpeed + p.id) * 0.2 + 0.8

        ctx.save()
        ctx.translate(screenX, screenY)
        if (p.isCopper) {
          ctx.fillStyle = `rgba(200, 126, 74, ${alpha * twinkle * 1.1})`
          if (scale > 0.45) {
            ctx.shadowColor = 'rgba(200, 126, 74, 0.7)'
            ctx.shadowBlur = 10 * scale
          }
        } else if (p.isBright) {
          ctx.fillStyle = `rgba(244, 240, 232, ${alpha * twinkle * 1.1})`
          if (scale > 0.45) {
            ctx.shadowColor = 'rgba(244, 240, 232, 0.8)'
            ctx.shadowBlur = 8 * scale
          }
        } else {
          ctx.fillStyle = `rgba(184, 180, 170, ${alpha * 0.9 * twinkle})`
          ctx.shadowBlur = 0
        }
        ctx.font = `${fontSize}px "JetBrains Mono", monospace`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(currentSymbol, 0, 0)
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