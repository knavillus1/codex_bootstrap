import React from 'react'
import GameHeader from './components/GameHeader'
import GameCanvas from './components/GameCanvas'
import GameFooter from './components/GameFooter'
import HighScoresPanel from './components/HighScoresPanel'

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-black text-green-500 font-mono">
      <GameHeader />
      <div className="flex flex-row w-full max-w-screen-md">
        <GameCanvas />
        <HighScoresPanel />
      </div>
      <GameFooter />
    </div>
  )
}

export default App
