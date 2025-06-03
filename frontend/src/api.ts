import { SimulationState, Stats } from './types';

const BASE_URL = '/simulation';

export async function resetSimulation(): Promise<void> {
  const res = await fetch(`${BASE_URL}/reset`, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to reset simulation');
}

export async function stepSimulation(): Promise<number> {
  const res = await fetch(`${BASE_URL}/step`, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to advance simulation');
  const data = (await res.json()) as { step: number };
  return data.step;
}

export async function fetchState(): Promise<SimulationState> {
  const res = await fetch(`${BASE_URL}/state`);
  if (!res.ok) throw new Error('Failed to fetch state');
  return (await res.json()) as SimulationState;
}

export async function fetchStats(): Promise<Stats> {
  const res = await fetch(`/stats`);
  if (!res.ok) throw new Error('Failed to fetch stats');
  return (await res.json()) as Stats;
}
