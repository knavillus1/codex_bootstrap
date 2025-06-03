import React, { useEffect, useState } from 'react';
import { fetchStats } from '../api';
import { Stats } from '../types';

const StatsDisplay: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetchStats().then(setStats).catch(() => setStats(null));
  }, []);

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
