import { useEffect, useRef, useState } from 'react'
import themeManager from '@/theme/ThemeManager'

interface Snowflake {
  x: number
  y: number
  radius: number
  speed: number
  opacity: number
  wind: number
  rotation: number
  rotationSpeed: number
}

export const Snowfall = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
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

  useEffect(
    function () {
      if (!isDark) return

      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      let animationFrameId: number
      let snowflakes: Snowflake[] = []

      const resize = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        initSnowflakes()
      }

      const initSnowflakes = () => {
        const count = Math.floor(
          (window.innerWidth * window.innerHeight) / 15000,
        )
        snowflakes = Array.from({ length: count }, () => {
          const radius = Math.random() * 4 + 2
          return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: radius,
            // Larger snowflakes fall slightly faster (parallax effect)
            speed: (Math.random() * 0.5 + 0.2) * (radius / 2),
            opacity: Math.random() * 0.4 + 0.3,
            wind: Math.random() * 0.2 - 0.1,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.02,
          }
        })
      }

      const drawSnowflake = (
        ctx: CanvasRenderingContext2D,
        snowflake: Snowflake,
      ) => {
        ctx.save()
        ctx.translate(snowflake.x, snowflake.y)
        ctx.rotate(snowflake.rotation)
        ctx.globalAlpha = snowflake.opacity
        ctx.strokeStyle = 'white'
        ctx.lineWidth = 1
        ctx.lineCap = 'round'

        for (let i = 0; i < 6; i++) {
          ctx.beginPath()
          ctx.moveTo(0, 0)
          ctx.lineTo(0, -snowflake.radius)
          ctx.stroke()

          // Short arm branches
          ctx.beginPath()
          ctx.moveTo(0, -snowflake.radius * 0.6)
          ctx.lineTo(-snowflake.radius * 0.3, -snowflake.radius * 0.8)
          ctx.moveTo(0, -snowflake.radius * 0.6)
          ctx.lineTo(snowflake.radius * 0.3, -snowflake.radius * 0.8)
          ctx.stroke()

          ctx.rotate(Math.PI / 3)
        }
        ctx.restore()
      }

      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        snowflakes.forEach((snowflake) => {
          drawSnowflake(ctx, snowflake)

          snowflake.y += snowflake.speed
          snowflake.x += snowflake.wind
          snowflake.rotation += snowflake.rotationSpeed

          if (snowflake.y > canvas.height + snowflake.radius) {
            snowflake.y = -snowflake.radius
            snowflake.x = Math.random() * canvas.width
          }

          if (snowflake.x > canvas.width + snowflake.radius) {
            snowflake.x = -snowflake.radius
          } else if (snowflake.x < -snowflake.radius) {
            snowflake.x = canvas.width + snowflake.radius
          }
        })

        animationFrameId = requestAnimationFrame(draw)
      }

      const cleanup = () => {
        window.removeEventListener('resize', resize)
        cancelAnimationFrame(animationFrameId)
      }

      window.addEventListener('resize', resize)
      resize()
      draw()

      return cleanup
    },
    [isDark],
  )

  if (!isDark) return null

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
