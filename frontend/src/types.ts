export interface Organism {
  type: string;
  position: [number, number];
  size: number;
  energy: number;
}

export interface SimulationState {
  step: number;
  organisms: Organism[];
}

export interface Stats {
  step: number;
  counts: Record<string, number>;
}
