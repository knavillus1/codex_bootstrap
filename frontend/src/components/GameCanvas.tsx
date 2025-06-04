import React, { useRef, useEffect } from 'react'
import { startGame } from '../game/logic'

const GameCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const overlay = overlayRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    startGame(ctx, overlay ?? undefined)
  }, [])

  return (
    <div className="game-canvas-area">
      <div className="game-canvas-area__placeholder-text">(Game Canvas Area)</div>
      <canvas ref={canvasRef} width={480} height={320} />
      <div
        ref={overlayRef}
        style={{ display: 'none' }}
        className="game-canvas-area__overlay-message"
      />
    </div>
  )
}

export default GameCanvas
