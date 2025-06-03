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

export function startGame(ctx: CanvasRenderingContext2D) {
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
  let enemyDx = 2
  let enemyShootTimer = 0
  let score = 0
  let lives = 3
  let level = 1
  let state: 'title' | 'playing' | 'gameover' = 'title'
  const keys = new Set<string>()

  const keyDown = (e: KeyboardEvent) => keys.add(e.code)
  const keyUp = (e: KeyboardEvent) => keys.delete(e.code)
  window.addEventListener('keydown', keyDown)
  window.addEventListener('keyup', keyUp)

  const step = () => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    if (state === 'title') {
      ctx.fillStyle = 'green'
      ctx.textAlign = 'center'
      ctx.fillText('Press Enter to Start', ctx.canvas.width / 2, ctx.canvas.height / 2)
      if (keys.has('Enter')) {
        state = 'playing'
        keys.delete('Enter')
      }
      requestAnimationFrame(step)
      return
    }

    if (state === 'gameover') {
      ctx.fillStyle = 'green'
      ctx.textAlign = 'center'
      ctx.fillText(`Game Over - Score: ${score}`, ctx.canvas.width / 2, ctx.canvas.height / 2)
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
    enemy.x += enemyDx
    if (enemy.x <= 0 || enemy.x + enemy.w >= ctx.canvas.width) {
      enemyDx *= -1
      enemy.y += 20
    }

    // enemy shooting
    enemyShootTimer--
    if (enemyShootTimer <= 0) {
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
        level += 1
        score += 100
      }
    }

    enemyBullets.forEach((b) => (b.y += 3))
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
        }
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
      }
    }

    // draw objects
    ctx.fillStyle = 'red'
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
