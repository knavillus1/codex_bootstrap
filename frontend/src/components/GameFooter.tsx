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
    <footer className="py-4 text-sm w-full max-w-screen-md">
      <form onSubmit={handleSubmit} className="flex gap-2 justify-center">
        <input
          value={initials}
          onChange={(e) => setInitials(e.target.value.toUpperCase())}
          maxLength={3}
          placeholder="AAA"
          className="bg-black border border-green-500 p-1 w-16 text-center"
        />
        <input
          type="number"
          value={score}
          onChange={(e) => setScore(parseInt(e.target.value) || 0)}
          className="bg-black border border-green-500 p-1 w-20 text-right"
        />
        <button
          type="submit"
          className="border border-green-500 px-2"
        >
          Submit
        </button>
      </form>
      <div className="mt-2 text-center">Use arrow keys to move. Space to shoot.</div>
    </footer>
  )
}

export default GameFooter
