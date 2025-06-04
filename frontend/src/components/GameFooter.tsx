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
    <footer className="game-footer">
      <form onSubmit={handleSubmit} className="game-footer__initials-form">
        <label htmlFor="initials">ENTER INITIALS:</label>
        <input
          id="initials"
          value={initials}
          onChange={(e) => setInitials(e.target.value.toUpperCase())}
          maxLength={3}
          className="game-footer__initials-input"
        />
        <button type="submit">Submit</button>
      </form>
      <div className="game-footer__message">Use arrow keys to move. Space to shoot.</div>
    </footer>
  )
}

export default GameFooter
