export async function getScores() {
  const resp = await fetch('/api/scores');
  if (!resp.ok) throw new Error('Failed to fetch scores');
  return resp.json();
}

export async function submitScore(initials: string, score: number) {
  const params = new URLSearchParams({ initials, score: score.toString() });
  const resp = await fetch(`/api/scores?${params.toString()}`, {
    method: 'POST',
  });
  if (!resp.ok) throw new Error('Failed to submit score');
  return resp.json();
}
