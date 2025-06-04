import React, { useRef, useEffect } from 'react'
import { startGame } from '../game/logic'

const GameCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    startGame(ctx)
  }, [])

  return (
    <div className="game-canvas-area relative flex justify-center items-center flex-grow min-w-[320px]">
      <canvas ref={canvasRef} width={480} height={320} className="bg-black border-2 border-cyan-400 shadow-inner shadow-cyan-400" />
      <div ref={overlayRef} className="game-canvas-area__overlay-message absolute text-yellow-300 drop-shadow-[2px_2px_0_#ff00ff] text-2xl">GET READY!</div>
    </div>
  )
}

export default GameCanvas
