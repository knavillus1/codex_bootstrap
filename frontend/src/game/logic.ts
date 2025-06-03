export function startGame(ctx: CanvasRenderingContext2D) {
  const step = () => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // Temporary player rectangle
    ctx.fillStyle = 'green'
    ctx.fillRect(
      ctx.canvas.width / 2 - 10,
      ctx.canvas.height - 20,
      20,
      10
    )

    requestAnimationFrame(step)
  }

  step()
}
