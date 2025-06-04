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
      <GameHeader score={0} lives={3} />
      <div className="game-main-content flex flex-col md:flex-row gap-5 w-full max-w-screen-md flex-wrap">
        <GameCanvas />
        <HighScoresPanel scores={scores} />
      </div>
      <GameFooter onScoreSubmitted={fetchScores} />
    </div>
  )
}

export default App
