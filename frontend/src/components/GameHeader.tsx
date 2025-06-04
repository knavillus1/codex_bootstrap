import React from 'react'

interface Props {
  score: number
  lives: number
}

const GameHeader = ({ score, lives }: Props) => (
  <header className="game-header w-full max-w-screen-md flex justify-between items-center pb-4 border-b-2 border-dashed border-pink-500">
    <h1 className="game-header__title text-2xl text-yellow-300 drop-shadow-[2px_2px_0_#ff00ff]">Pac Invaders</h1>
    <div className="game-header__stats text-cyan-300 text-right flex gap-4">
      <span className="game-header__stat-item"><span className="label text-gray-300">SCORE:</span> <span className="value text-white">{score}</span></span>
      <span className="game-header__stat-item"><span className="label text-gray-300">LIVES:</span> <span className="value text-white">{lives}</span></span>
    </div>
  </header>
)

export default GameHeader
