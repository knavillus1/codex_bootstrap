import React, { useRef, useEffect } from 'react'

const GameCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [])

  return <canvas ref={canvasRef} width={480} height={320} className="bg-black border border-green-500" />
}

export default GameCanvas
