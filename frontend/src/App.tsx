import React, { useEffect, useState } from 'react'
import GameHeader from './components/GameHeader'
import GameCanvas from './components/GameCanvas'
import GameFooter from './components/GameFooter'
import HighScoresPanel, { Score } from './components/HighScoresPanel'
import { getScores } from './api'

function App() {
  const [scores, setScores] = useState<Score[]>([])

  const fetchScores = async () => {
    try {
      const data = await getScores()
      setScores(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchScores()
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center bg-black text-green-500 font-pixel">
      <GameHeader />
      <div className="flex flex-row w-full max-w-screen-md">
        <GameCanvas />
        <HighScoresPanel scores={scores} />
      </div>
      <GameFooter onScoreSubmitted={fetchScores} />
    </div>
  )
}

export default App
