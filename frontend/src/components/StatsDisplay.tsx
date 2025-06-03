import React, { useEffect, useState } from 'react';
import { fetchStats } from '../api';
import { Stats } from '../types';

const StatsDisplay: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats()
      .then((s) => {
        setStats(s);
        setError(null);
      })
      .catch(() => {
        setStats(null);
        setError('Failed to load stats');
      });
  }, []);

  if (error) return <div>{error}</div>;
  if (!stats) return <div>Loading stats...</div>;

  return (
    <div className="stats-display">
      <p>Step: {stats.step}</p>
      <ul>
        {Object.entries(stats.counts).map(([type, count]) => (
          <li key={type}>{type}: {count}</li>
        ))}
      </ul>
    </div>
  );
};

export default StatsDisplay;
