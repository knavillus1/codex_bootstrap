import React, { useRef, useEffect } from 'react'
import { startGame } from '../game/logic'

interface GameState {
  score: number
  lives: number
  level: number
  gameStatus: 'title' | 'ready' | 'playing' | 'playerdeath' | 'gameover'
  message: string
  showInitialsForm: boolean
}

interface Props {
  onGameStateChange: (newState: Partial<GameState>) => void
}

const GameCanvas = ({ onGameStateChange }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const overlay = overlayRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    startGame(ctx, overlay ?? undefined, onGameStateChange)
  }, [onGameStateChange])

  return (
    <section className="game-canvas-area">
      <canvas ref={canvasRef} width={480} height={320} />
      <div
        ref={overlayRef}
        style={{ display: 'none' }}
        className="game-canvas-area__overlay-message"
      />
    </section>
  )
}

export default GameCanvas
