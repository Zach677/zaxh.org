import { useEffect, useRef, useState } from 'react'
import themeManager from '@/theme/ThemeManager'

type Season = 'spring' | 'summer' | 'autumn' | 'winter'

interface Particle {
  x: number
  y: number
  radius: number
  speed: number
  opacity: number
  wind: number
  rotation: number
  rotationSpeed: number
  type: Season
  color: string
}

const getSeason = (): Season => {
  const month = new Date().getMonth() + 1 // 1-12
  if (month >= 3 && month <= 5) return 'spring'
  if (month >= 6 && month <= 8) return 'summer'
  if (month >= 9 && month <= 11) return 'autumn'
  return 'winter'
}

export const SeasonalEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDark, setIsDark] = useState(false)
  const [season, setSeason] = useState<Season>('winter')

  useEffect(() => {
    setSeason(getSeason())

    const checkTheme = () => {
      const theme = themeManager.getTheme()
      if (theme === 'dark') {
        setIsDark(true)
      } else if (theme === 'system') {
        setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
      } else {
        setIsDark(false)
      }
    }

    checkTheme()
    return themeManager.registerListener(checkTheme)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    let animationFrameId: number
    let particles: Particle[] = []

    const getColors = (s: Season, dark: boolean) => {
      switch (s) {
        case 'spring':
          return ['#ffb7c5', '#ff91a4', '#f8c8dc']
        case 'summer':
          return dark
            ? ['#ffffff', '#f1f5f9', '#fefce8']
            : ['#f8fafc', '#f1f5f9', '#fef9c3']
        case 'autumn':
          return ['#ea580c', '#f59e0b', '#c2410c', '#9a3412', '#b45309']
        case 'winter':
          return dark ? ['#ffffff'] : ['#e2e8f0']
        default:
          return ['#ffffff']
      }
    }

    const initParticles = () => {
      const count = Math.floor((window.innerWidth * window.innerHeight) / 15000)
      const colors = getColors(season, isDark)

      particles = Array.from({ length: count }, () => {
        const radius =
          season === 'winter' ? Math.random() * 4 + 2 : Math.random() * 5 + 3
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: radius,
          speed: (Math.random() * 0.5 + 0.2) * (radius / 2.5),
          opacity: Math.random() * 0.5 + 0.4,
          wind: Math.random() * 0.4 - 0.2,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.03,
          type: season,
          color: colors[Math.floor(Math.random() * colors.length)],
        }
      })
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const drawSnowflake = (c: CanvasRenderingContext2D, p: Particle) => {
      c.save()
      c.translate(p.x, p.y)
      c.rotate(p.rotation)
      c.globalAlpha = p.opacity
      c.strokeStyle = isDark ? 'white' : '#cbd5e1'
      c.lineWidth = 1
      c.lineCap = 'round'

      for (let i = 0; i < 6; i++) {
        c.beginPath()
        c.moveTo(0, 0)
        c.lineTo(0, -p.radius)
        c.stroke()
        c.beginPath()
        c.moveTo(0, -p.radius * 0.6)
        c.lineTo(-p.radius * 0.3, -p.radius * 0.8)
        c.moveTo(0, -p.radius * 0.6)
        c.lineTo(p.radius * 0.3, -p.radius * 0.8)
        c.stroke()
        c.rotate(Math.PI / 3)
      }
      c.restore()
    }

    const drawLeaf = (c: CanvasRenderingContext2D, p: Particle) => {
      c.save()
      c.translate(p.x, p.y)
      c.rotate(p.rotation)
      c.globalAlpha = p.opacity
      c.fillStyle = p.color

      // Draw a more realistic leaf shape (pointed at both ends)
      c.beginPath()
      c.moveTo(0, -p.radius * 1.5)
      // Top right
      c.quadraticCurveTo(p.radius, -p.radius, p.radius * 0.5, 0)
      // Bottom right
      c.quadraticCurveTo(p.radius, p.radius, 0, p.radius * 1.5)
      // Bottom left
      c.quadraticCurveTo(-p.radius, p.radius, -p.radius * 0.5, 0)
      // Top left
      c.quadraticCurveTo(-p.radius, -p.radius, 0, -p.radius * 1.5)
      c.fill()

      // Vein
      c.strokeStyle = 'rgba(0,0,0,0.15)'
      c.lineWidth = 0.5
      c.beginPath()
      c.moveTo(0, -p.radius * 1.5)
      c.lineTo(0, p.radius * 1.5)
      c.stroke()

      c.restore()
    }

    const drawDandelion = (c: CanvasRenderingContext2D, p: Particle) => {
      c.save()
      c.translate(p.x, p.y)
      c.rotate(p.rotation)
      c.globalAlpha = p.opacity
      c.strokeStyle = p.color
      c.fillStyle = p.color
      c.lineWidth = 0.5

      // Center seed
      c.beginPath()
      c.arc(0, 0, 1, 0, Math.PI * 2)
      c.fill()

      // Hairs (pappus)
      for (let i = 0; i < 8; i++) {
        c.rotate(Math.PI / 4)
        c.beginPath()
        c.moveTo(0, 0)
        c.lineTo(0, p.radius)
        c.stroke()

        // Tiny branches at the end of each hair
        c.beginPath()
        c.moveTo(0, p.radius * 0.8)
        c.lineTo(-p.radius * 0.2, p.radius)
        c.moveTo(0, p.radius * 0.8)
        c.lineTo(p.radius * 0.2, p.radius)
        c.stroke()
      }

      c.restore()
    }

    const drawPetal = (c: CanvasRenderingContext2D, p: Particle) => {
      c.save()
      c.translate(p.x, p.y)
      c.rotate(p.rotation)
      c.globalAlpha = p.opacity
      c.fillStyle = p.color

      c.beginPath()
      c.moveTo(0, 0)
      c.bezierCurveTo(
        -p.radius,
        -p.radius,
        -p.radius * 1.5,
        p.radius / 2,
        0,
        p.radius,
      )
      c.bezierCurveTo(p.radius * 1.5, p.radius / 2, p.radius, -p.radius, 0, 0)
      c.fill()

      c.restore()
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        if (p.type === 'winter') {
          drawSnowflake(ctx, p)
        } else if (p.type === 'spring') {
          drawPetal(ctx, p)
        } else if (p.type === 'summer') {
          drawDandelion(ctx, p)
        } else {
          drawLeaf(ctx, p)
        }

        p.y += p.speed
        p.x += p.wind + Math.sin(p.y / 50) * 0.5
        p.rotation += p.rotationSpeed

        if (p.y > canvas.height + p.radius) {
          p.y = -p.radius
          p.x = Math.random() * canvas.width
        }

        if (p.x > canvas.width + p.radius) {
          p.x = -p.radius
        } else if (p.x < -p.radius) {
          p.x = canvas.width + p.radius
        }
      })

      animationFrameId = requestAnimationFrame(draw)
    }

    window.addEventListener('resize', resize)
    resize()
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isDark, season])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 50,
      }}
    />
  )
}
