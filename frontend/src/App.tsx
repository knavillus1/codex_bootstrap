import React, { useEffect, useState, useCallback } from 'react'
import GameHeader from './components/GameHeader'
import GameCanvas from './components/GameCanvas'
import GameFooter from './components/GameFooter'
import HighScoresPanel, { Score } from './components/HighScoresPanel'
import { getScores } from './api'

interface GameState {
  score: number
  lives: number
  level: number
  gameStatus: 'title' | 'ready' | 'playing' | 'playerdeath' | 'gameover'
  message: string
  showInitialsForm: boolean
}

function App() {
  const [scores, setScores] = useState<Score[]>([])
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    lives: 3,
    level: 1,
    gameStatus: 'title',
    message: 'PRESS START',
    showInitialsForm: false
  })

  const fetchScores = async () => {
    try {
      const data = await getScores()
      setScores(data)
    } catch (err) {
      console.error('Failed to fetch scores:', err)
      // Retry after a short delay if initial fetch fails
      setTimeout(async () => {
        try {
          const data = await getScores()
          setScores(data)
        } catch (retryErr) {
          console.error('Retry failed:', retryErr)
        }
      }, 2000)
    }
  }

  const updateGameState = useCallback((newState: Partial<GameState>) => {
    setGameState(prev => ({ ...prev, ...newState }))
  }, [])

  useEffect(() => {
    fetchScores()
  }, [])

  return (
    <div className="game-wrapper" id="spaceManPacInvadersApp">
      <GameHeader score={gameState.score} lives={gameState.lives} />
      <main className="game-main-content">
        <GameCanvas onGameStateChange={updateGameState} />
        <HighScoresPanel scores={scores} />
      </main>
      <GameFooter 
        onScoreSubmitted={fetchScores} 
        message={gameState.message}
        showInitialsForm={gameState.showInitialsForm}
        currentScore={gameState.score}
      />
    </div>
  )
}

export default App
