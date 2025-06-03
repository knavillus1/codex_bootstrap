import React from 'react'

export interface Score {
  initials: string
  score: number
}

interface Props {
  scores: Score[]
}

const HighScoresPanel = ({ scores }: Props) => (
  <aside className="w-48 p-2 border-l border-green-500">
    <h2 className="text-xl mb-2">High Scores</h2>
    <ol className="list-decimal ml-4">
      {scores.map((s, idx) => (
        <li key={idx} className="flex justify-between">
          <span>{s.initials}</span>
          <span>{s.score}</span>
        </li>
      ))}
    </ol>
  </aside>
)

export default HighScoresPanel
