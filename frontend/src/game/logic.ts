import mazeLayouts from './mazeLayouts'
import { createUFO, updateUFO, UFO, Rect as UfoRect } from './ufo'

interface Rect {
  x: number
  y: number
  w: number
  h: number
}

function intersects(a: Rect, b: Rect): boolean {
  return (
    a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y
  )
}

function drawMaze(ctx: CanvasRenderingContext2D, maze: string[]) {
  const cell = 20
  ctx.fillStyle = 'blue'
  maze.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      if (row[x] === '#') {
        ctx.fillRect(x * cell, y * cell, cell, cell)
      }
    }
  })
}

interface GameStateUpdate {
  score?: number
  lives?: number
  level?: number
  gameStatus?: 'title' | 'ready' | 'playing' | 'playerdeath' | 'gameover'
  message?: string
  showInitialsForm?: boolean
}

export function startGame(
  ctx: CanvasRenderingContext2D,
  overlay?: HTMLDivElement,
  onGameStateChange?: (newState: GameStateUpdate) => void
) {
  const player: Rect = {
    x: ctx.canvas.width / 2 - 10,
    y: ctx.canvas.height - 20,
    w: 20,
    h: 10,
  }
  const enemy: Rect = {
    x: ctx.canvas.width / 2 - 10,
    y: 20,
    w: 20,
    h: 10,
  }
  const bullets: Rect[] = []
  const enemyBullets: Rect[] = []
  const pellets: Rect[] = []
  let powerPellet: Rect | null = null
  let frightenedTimer = 0
  let ufo: UFO | null = null
  let ufoSpawnTimer = 600
  let mazeIndex = 0
  let enemyDx = 2
  let enemyShootTimer = 0
  let score = 0
  let lives = 3
  let level = 1
  let state: 'title' | 'ready' | 'playing' | 'playerdeath' | 'gameover' = 'title'
  let stateTimer = 0
  const keys = new Set<string>()

  const keyDown = (e: KeyboardEvent) => keys.add(e.code)
  const keyUp = (e: KeyboardEvent) => keys.delete(e.code)
  window.addEventListener('keydown', keyDown)
  window.addEventListener('keyup', keyUp)

  const updateState = () => {
    onGameStateChange?.({
      score,
      lives,
      level,
      gameStatus: state,
      message: state === 'title' ? 'PRESS ENTER TO START' : 
               state === 'ready' ? 'GET READY!' :
               state === 'playerdeath' ? 'YOU DIED' :
               state === 'gameover' ? `GAME OVER - SCORE: ${score}` : 
               `LEVEL ${level}`,
      showInitialsForm: state === 'gameover' && score > 0
    })
  }

  const step = () => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    drawMaze(ctx, mazeLayouts[mazeIndex])

    // Update React state
    updateState()

    if (state === 'title') {
      overlay && (overlay.innerText = 'PRESS ENTER TO START')
      overlay && (overlay.style.display = 'block')
      if (keys.has('Enter')) {
        state = 'ready'
        stateTimer = 120
        keys.delete('Enter')
        updateState()
      }
      requestAnimationFrame(step)
      return
    }

    if (state === 'ready') {
      overlay && (overlay.innerText = 'GET READY!')
      overlay && (overlay.style.display = 'block')
      stateTimer--
      if (stateTimer <= 0) {
        state = 'playing'
        overlay && (overlay.style.display = 'none')
        updateState()
      }
      requestAnimationFrame(step)
      return
    }

    if (state === 'playerdeath') {
      overlay && (overlay.innerText = 'YOU DIED')
      overlay && (overlay.style.display = 'block')
      stateTimer--
      if (stateTimer <= 0) {
        if (lives <= 0) {
          state = 'gameover'
        } else {
          state = 'ready'
          stateTimer = 120
        }
        overlay && (overlay.style.display = 'none')
      }
      requestAnimationFrame(step)
      return
    }

    if (state === 'gameover') {
      overlay && (overlay.innerText = `GAME OVER - SCORE: ${score}`)
      overlay && (overlay.style.display = 'block')
      updateState()
      return
    }

    // playing state
    if (keys.has('ArrowLeft')) player.x -= 3
    if (keys.has('ArrowRight')) player.x += 3
    player.x = Math.max(0, Math.min(ctx.canvas.width - player.w, player.x))

    if (keys.has('Space')) {
      if (bullets.length === 0 || bullets[bullets.length - 1].y < player.y - 30) {
        bullets.push({ x: player.x + player.w / 2 - 2, y: player.y, w: 4, h: 8 })
      }
    }

    // enemy movement
    const currentEnemyDx = frightenedTimer > 0 ? enemyDx / 2 : enemyDx
    enemy.x += currentEnemyDx
    if (enemy.x <= 0 || enemy.x + enemy.w >= ctx.canvas.width) {
      enemyDx *= -1
      enemy.y += 20
    }

    // enemy shooting
    enemyShootTimer--
    if (enemyShootTimer <= 0 && frightenedTimer <= 0) {
      enemyBullets.push({
        x: enemy.x + enemy.w / 2 - 2,
        y: enemy.y + enemy.h,
        w: 4,
        h: 8,
      })
      enemyShootTimer = Math.max(30, 120 - level * 10)
    }

    bullets.forEach((b) => (b.y -= 5))
    for (let i = bullets.length - 1; i >= 0; i--) {
      const b = bullets[i]
      if (b.y + b.h < 0) {
        bullets.splice(i, 1)
        continue
      }
      if (intersects(b, enemy)) {
        bullets.splice(i, 1)
        enemy.y = 20
        enemy.x = Math.random() * (ctx.canvas.width - enemy.w)
        mazeIndex = (mazeIndex + 1) % mazeLayouts.length
        level += 1
        score += 100
        updateState()
      }
    }

    enemyBullets.forEach((b) => (b.y += frightenedTimer > 0 ? 1 : 3))
    for (let i = enemyBullets.length - 1; i >= 0; i--) {
      const b = enemyBullets[i]
      if (b.y > ctx.canvas.height) {
        enemyBullets.splice(i, 1)
        continue
      }
      if (intersects(b, player)) {
        enemyBullets.splice(i, 1)
        lives -= 1
        if (lives <= 0) {
          state = 'gameover'
        } else {
          state = 'playerdeath'
          stateTimer = 120
        }
        updateState()
      }
    }

    // pellets
    if (Math.random() < 0.01) {
      pellets.push({
        x: Math.random() * (ctx.canvas.width - 6),
        y: 0,
        w: 6,
        h: 6,
      })
    }
    pellets.forEach((p) => (p.y += 2))
    for (let i = pellets.length - 1; i >= 0; i--) {
      const p = pellets[i]
      if (p.y > ctx.canvas.height) {
        pellets.splice(i, 1)
        continue
      }
      if (intersects(p, player)) {
        pellets.splice(i, 1)
        score += 10
        updateState()
      }
    }

    // power pellet
    if (!powerPellet && Math.random() < 0.002) {
      powerPellet = {
        x: Math.random() * (ctx.canvas.width - 8),
        y: Math.random() * (ctx.canvas.height - 8),
        w: 8,
        h: 8,
      }
    }
    if (powerPellet) {
      if (intersects(player, powerPellet)) {
        powerPellet = null
        frightenedTimer = 420
      } else {
        ctx.fillStyle = 'orange'
        ctx.fillRect(powerPellet.x, powerPellet.y, powerPellet.w, powerPellet.h)
      }
    }

    if (frightenedTimer > 0) {
      frightenedTimer--
    }

    // UFO logic
    ufoSpawnTimer--
    if (ufoSpawnTimer <= 0 && !ufo) {
      ufo = createUFO(ctx.canvas.width)
      ufoSpawnTimer = 600 + Math.random() * 600
    }
    if (ufo) {
      updateUFO(ufo, ctx.canvas.width)
      ctx.fillStyle = 'pink'
      ctx.fillRect(ufo.x, ufo.y, ufo.w, ufo.h)
      for (let i = bullets.length - 1; i >= 0; i--) {
        if (intersects(bullets[i], ufo as UfoRect)) {
          bullets.splice(i, 1)
          score += 200
          ufo.active = false
          updateState()
        }
      }
      if (!ufo.active) {
        ufo = null
      }
    }

    // draw objects
    ctx.fillStyle = frightenedTimer > 0 ? 'blue' : 'red'
    ctx.fillRect(enemy.x, enemy.y, enemy.w, enemy.h)

    ctx.fillStyle = 'green'
    ctx.fillRect(player.x, player.y, player.w, player.h)

    ctx.fillStyle = 'yellow'
    bullets.forEach((b) => ctx.fillRect(b.x, b.y, b.w, b.h))
    ctx.fillStyle = 'white'
    enemyBullets.forEach((b) => ctx.fillRect(b.x, b.y, b.w, b.h))
    ctx.fillStyle = 'purple'
    pellets.forEach((p) => ctx.fillRect(p.x, p.y, p.w, p.h))

    ctx.fillStyle = 'green'
    ctx.textAlign = 'left'
    ctx.fillText(`Score: ${score}  Lives: ${lives}  Level: ${level}`, 5, 10)

    requestAnimationFrame(step)
  }

  step()
}
