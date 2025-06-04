import React, { useState, FormEvent } from 'react'
import { submitScore } from '../api'

interface Props {
  onScoreSubmitted: () => void
}

const GameFooter = ({ onScoreSubmitted }: Props) => {
  const [initials, setInitials] = useState('')
  const [score, setScore] = useState(0)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await submitScore(initials, score)
      setInitials('')
      setScore(0)
      onScoreSubmitted()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <footer className="game-footer w-full max-w-screen-md pt-4 border-t-2 border-dashed border-cyan-400 text-center">
      <form onSubmit={handleSubmit} className="game-footer__initials-form flex gap-2 justify-center mb-2">
        <label htmlFor="initials" className="sr-only">Initials</label>
        <input
          id="initials"
          value={initials}
          onChange={(e) => setInitials(e.target.value.toUpperCase())}
          maxLength={3}
          placeholder="AAA"
          className="game-footer__initials-input bg-gray-800 border border-green-500 p-1 w-16 text-center font-pixel"
        />
        <input
          type="number"
          value={score}
          onChange={(e) => setScore(parseInt(e.target.value) || 0)}
          className="bg-gray-800 border border-green-500 p-1 w-20 text-right"
        />
        <button type="submit" className="border border-green-500 px-2">
          Submit
        </button>
      </form>
      <div className="game-footer__message text-pink-400 min-h-[25px]">Use arrow keys to move. Space to shoot.</div>
    </footer>
  )
}

export default GameFooter
