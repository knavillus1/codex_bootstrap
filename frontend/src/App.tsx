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
    <div className="game-wrapper" id="spaceManPacInvadersApp">
      <GameHeader score={0} lives={3} />
      <div className="game-main-content">
        <GameCanvas />
        <HighScoresPanel scores={scores} />
      </div>
      <GameFooter onScoreSubmitted={fetchScores} />
    </div>
  )
}

export default App
