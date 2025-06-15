import type { Texture } from 'pixi.js'
import {
  Application,
  Graphics,
  Particle,
  ParticleContainer,
} from 'pixi.js'
import { createNoise3D } from 'simplex-noise'

export function useBackgroundDots(container: HTMLElement, isDark: boolean = false) {
  const SCALE = 200
  const LENGTH = 5
  const SPACING = 15

  const noise3d = createNoise3D()
  const existingPoints = new Set<string>()
  const points: { x: number, y: number, opacity: number, particle: Particle }[] = []

  let w = window.innerWidth
  let h = window.innerHeight

  let app: Application
  let particleContainer: ParticleContainer
  let dotTexture: Texture

  function getForceOnPoint(x: number, y: number, z: number) {
    return (noise3d(x / SCALE, y / SCALE, z) - 0.5) * 2 * Math.PI
  }

  function createDotTexture(app: Application): Texture {
    const color = isDark ? 0x666666 : 0xCCCCCC
    const g = new Graphics().circle(0, 0, 0.6).fill(color)
    return app.renderer.generateTexture(g)
  }

  function addPoints() {
    for (let x = -SPACING / 2; x < w + SPACING; x += SPACING) {
      for (let y = -SPACING / 2; y < h + SPACING; y += SPACING) {
        const id = `${x}-${y}`
        if (existingPoints.has(id))
          continue
        existingPoints.add(id)

        const particle = new Particle(dotTexture)
        particle.anchorX = 0.5
        particle.anchorY = 0.5
        particleContainer.addParticle(particle)

        const opacity = Math.random() * 0.5 + 0.5
        points.push({ x, y, opacity, particle })
      }
    }
  }

  function resetParticles() {
    if (!app)
      return

    // 移除旧容器并销毁
    app.stage.removeChild(particleContainer)
    particleContainer.destroy()

    // 创建新容器
    particleContainer = new ParticleContainer({
      dynamicProperties: { position: true, alpha: true },
    })
    app.stage.addChild(particleContainer)

    // 清空记录
    points.length = 0
    existingPoints.clear()

    // 重建粒子
    addPoints()
  }

  function throttle(fn: () => void, delay: number) {
    let timer: number | null = null
    return () => {
      if (timer)
        clearTimeout(timer)
      timer = window.setTimeout(() => {
        fn()
        timer = null
      }, delay)
    }
  }

  async function setup() {
    app = new Application()
    await app.init({
      backgroundAlpha: 0,
      antialias: true,
      resolution: window.devicePixelRatio,
      resizeTo: container,
      autoDensity: true,
      eventMode: 'none',
    })
    container.appendChild(app.canvas)

    // 设置 canvas 样式
    const canvas = app.canvas
    Object.assign(canvas.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      zIndex: '-1',
      pointerEvents: 'none',
    })

    // 初始化容器与粒子
    particleContainer = new ParticleContainer({
      dynamicProperties: { position: true, alpha: true },
    })
    app.stage.addChild(particleContainer)

    dotTexture = createDotTexture(app)
    addPoints()

    app.ticker.add(() => {
      const t = Date.now() / 10000
      for (const p of points) {
        const { x, y, opacity, particle } = p
        const rad = getForceOnPoint(x, y, t)
        const len = (noise3d(x / SCALE, y / SCALE, t * 2) + 0.5) * LENGTH
        const nx = x + Math.cos(rad) * len
        const ny = y + Math.sin(rad) * len

        particle.x = nx
        particle.y = ny
        particle.alpha = (Math.abs(Math.cos(rad)) * 0.8 + 0.2) * opacity
      }
    })

    const resizeHandler = throttle(() => {
      w = window.innerWidth
      h = window.innerHeight
      resetParticles()
    }, 200)

    window.addEventListener('resize', resizeHandler)

    return () => {
      window.removeEventListener('resize', resizeHandler)
      app.destroy(true, { children: true, texture: true, textureSource: true })
    }
  }

  setup()
    .then((dispose) => {
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          for (const node of mutation.removedNodes) {
            if (node === container) {
              dispose()
              observer.disconnect()
              return
            }
          }
        }
      })
      observer.observe(container.parentElement ?? document.body, { childList: true })
    })
    .catch(console.error)
}
