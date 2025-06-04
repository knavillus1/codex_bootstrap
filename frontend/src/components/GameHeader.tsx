import React from 'react'

interface Props {
  score: number
  lives: number
}

const GameHeader = ({ score, lives }: Props) => (
  <header className="game-header">
    <h1 className="game-header__title">Pac Invaders</h1>
    <div className="game-header__stats">
      <span className="game-header__stat-item"><span className="label">SCORE:</span> <span className="value">{score}</span></span>
      <span className="game-header__stat-item">
        <span className="label">LIVES:</span>
        <span className="value">
          {Array.from({ length: lives }).map((_, i) => (
            <span key={i} className="life-icon">●</span>
          ))}
        </span>
      </span>
    </div>
  </header>
)

export default GameHeader
