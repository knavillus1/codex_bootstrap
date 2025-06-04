import React, { useState, FormEvent, useEffect } from 'react'
import { submitScore } from '../api'

interface Props {
  onScoreSubmitted: () => void
  message?: string
  showInitialsForm?: boolean
  currentScore?: number
}

const GameFooter = ({ onScoreSubmitted, message = "PRESS START", showInitialsForm = false, currentScore = 0 }: Props) => {
  const [initials, setInitials] = useState('')
  const [score, setScore] = useState(0)

  useEffect(() => {
    setScore(currentScore)
  }, [currentScore])

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
      <div className="game-footer__message">{message}</div>
      {showInitialsForm && (
        <form onSubmit={handleSubmit} className="game-footer__initials-form">
          <label htmlFor="initials">ENTER INITIALS:</label>
          <input
            id="initials"
            value={initials}
            onChange={(e) => setInitials(e.target.value.toUpperCase())}
            maxLength={3}
            className="game-footer__initials-input"
            required
          />
        </form>
      )}
    </footer>
  )
}

export default GameFooter
