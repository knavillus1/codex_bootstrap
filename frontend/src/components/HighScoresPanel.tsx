import React from 'react'

export interface Score {
  initials: string
  score: number
}

interface Props {
  scores: Score[]
}

const HighScoresPanel = ({ scores }: Props) => (
  <aside className="high-scores-panel">
    <h2 className="high-scores-panel__title">HIGH SCORES</h2>
    <ol className="high-scores-panel__list">
      {scores.map((s, idx) => (
        <li key={idx} className="high-scores-panel__item">
          <span className="high-scores-panel__item-rank">{idx + 1}.</span>
          <span className="high-scores-panel__item-initials">{s.initials}</span>
          <span className="high-scores-panel__item-score">{s.score}</span>
        </li>
      ))}
    </ol>
  </aside>
)

export default HighScoresPanel
