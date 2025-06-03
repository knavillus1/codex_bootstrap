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
  const keys = new Set<string>()

  const keyDown = (e: KeyboardEvent) => keys.add(e.code)
  const keyUp = (e: KeyboardEvent) => keys.delete(e.code)
  window.addEventListener('keydown', keyDown)
  window.addEventListener('keyup', keyUp)

  const step = () => {
    if (keys.has('ArrowLeft')) player.x -= 3
    if (keys.has('ArrowRight')) player.x += 3
    player.x = Math.max(0, Math.min(ctx.canvas.width - player.w, player.x))

    if (keys.has('Space')) {
      if (bullets.length === 0 || bullets[bullets.length - 1].y < player.y - 30) {
        bullets.push({ x: player.x + player.w / 2 - 2, y: player.y, w: 4, h: 8 })
      }
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
        enemy.y = -100
      }
    }

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = 'red'
    ctx.fillRect(enemy.x, enemy.y, enemy.w, enemy.h)

    ctx.fillStyle = 'green'
    ctx.fillRect(player.x, player.y, player.w, player.h)

    ctx.fillStyle = 'yellow'
    bullets.forEach((b) => ctx.fillRect(b.x, b.y, b.w, b.h))

    requestAnimationFrame(step)
  }

  step()
}
