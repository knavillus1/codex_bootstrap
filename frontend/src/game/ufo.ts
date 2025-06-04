export interface Rect {
  x: number
  y: number
  w: number
  h: number
}

export interface UFO extends Rect {
  active: boolean
  dx: number
}

export function createUFO(canvasWidth: number): UFO {
  return { x: -30, y: 40, w: 30, h: 12, active: true, dx: 2 }
}

export function updateUFO(ufo: UFO, canvasWidth: number) {
  if (!ufo.active) return
  ufo.x += ufo.dx
  if (ufo.x > canvasWidth) {
    ufo.active = false
  }
}
