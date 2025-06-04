import React from 'react'

export interface Score {
  initials: string
  score: number
}

interface Props {
  scores: Score[]
}

const HighScoresPanel = ({ scores }: Props) => (
  <aside className="high-scores-panel w-72 flex-shrink-0 p-4 bg-[rgba(30,0,20,0.7)] border-2 border-pink-500 flex flex-col">
    <h2 className="high-scores-panel__title text-lg text-green-400 text-center mb-4 pb-2 border-b border-green-400">HIGH SCORES</h2>
    <ol className="high-scores-panel__list overflow-y-auto flex-grow">
      {scores.map((s, idx) => (
        <li key={idx} className="high-scores-panel__item flex justify-between text-sm border-b border-dotted border-gray-300 last:border-b-0 py-1">
          <span className="high-scores-panel__item-rank text-cyan-300 w-6">{idx + 1}.</span>
          <span className="high-scores-panel__item-initials text-yellow-300 w-12 text-center">{s.initials}</span>
          <span className="high-scores-panel__item-score text-white flex-grow text-right">{s.score}</span>
        </li>
      ))}
    </ol>
  </aside>
)

export default HighScoresPanel
