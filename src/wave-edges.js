// Waves and hover effects are disabled below this viewport width.
export const WAVE_MOBILE_BREAKPOINT_PX = 768
export const WAVE_EDGE_DEPTH_PX = 24
export const WAVE_EDGE_LENGTH_PX = 140
// Time for one full wave to pass: lower values move faster.
export const WAVE_EDGE_PERIOD_MS = 6000
// Extra crop at rest; hover removes this inset without changing the waves.
export const WAVE_REST_INSET_PX = 28
export const WAVE_HOVER_TRANSITION_MS = 400

export function waveEdgePath(width, height, elapsedMs, extraInset = 0) {
  const depth = Math.min(WAVE_EDGE_DEPTH_PX, width * 0.04)
  const inset = Math.min(Math.max(0, extraInset), width * 0.2)
  const phase = (elapsedMs / WAVE_EDGE_PERIOD_MS) * Math.PI * 2
  const segments = Math.max(2, Math.ceil(height / 6))
  const left = []
  const right = []
  for (let index = 0; index <= segments; index++) {
    const y = height * index / segments
    const position = y / WAVE_EDGE_LENGTH_PX * Math.PI * 2
    // Positive phase travels upward; negative phase travels downward.
    const leftInset = inset + depth * (1 + Math.sin(position + phase)) / 2
    const rightInset = inset + depth * (1 + Math.sin(position - phase)) / 2
    left.push(`${leftInset.toFixed(2)},${y.toFixed(2)}`)
    right.push(`${(width - rightInset).toFixed(2)},${y.toFixed(2)}`)
  }
  return `M${left[0]} L${right.join(' L')} L${left.reverse().join(' L')} Z`
}

// Quote text speed along the edges, in pixels per second.
export const WAVE_TEXT_SPEED_PX_PER_SECOND = 28
export const WAVE_TEXT_OFFSET_PX = 16
// Distance between parallel columns of quotes filling each side margin.
export const WAVE_TEXT_COLUMN_GAP_PX = 24

export function waveTextPaths(width, height, elapsedMs, extraInset = 0) {
  const depth = Math.min(WAVE_EDGE_DEPTH_PX, width * 0.04)
  const inset = Math.min(Math.max(0, extraInset), width * 0.2)
  const phase = elapsedMs / WAVE_EDGE_PERIOD_MS * Math.PI * 2
  // Extend past the screen so repeated text enters and exits without popping.
  const segments = Math.max(2, Math.ceil(height * 3 / 6))
  const left = []
  const right = []
  for (let index = 0; index <= segments; index++) {
    const y = -height + height * 3 * index / segments
    const position = y / WAVE_EDGE_LENGTH_PX * Math.PI * 2
    const leftX = inset + depth * (1 + Math.sin(position + phase)) / 2 - WAVE_TEXT_OFFSET_PX
    const rightX = width - inset - depth * (1 + Math.sin(position - phase)) / 2 + WAVE_TEXT_OFFSET_PX
    left.push(`${leftX.toFixed(2)},${y.toFixed(2)}`)
    right.push(`${rightX.toFixed(2)},${y.toFixed(2)}`)
  }
  return {
    left: `M${left.join(' L')}`,
    right: `M${right.reverse().join(' L')}`,
  }
}
