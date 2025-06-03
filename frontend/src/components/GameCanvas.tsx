import React, { useRef, useEffect } from 'react'
import { startGame } from '../game/logic'

const GameCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    startGame(ctx)
  }, [])

  return <canvas ref={canvasRef} width={480} height={320} className="bg-black border border-green-500" />
}

export default GameCanvas
