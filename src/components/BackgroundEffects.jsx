import './BackgroundEffects.css'

// A few very faint, slow particles over the static dotted texture.
// Fixed positions keep renders deterministic; only the first 3 show on mobile.
const PARTICLES = [
  { x: 9, y: 22, size: 3, dur: 30, delay: 0 },
  { x: 86, y: 18, size: 4, dur: 34, delay: -12 },
  { x: 64, y: 74, size: 3, dur: 28, delay: -20 },
  { x: 24, y: 80, size: 3, dur: 32, delay: -6 },
  { x: 46, y: 40, size: 2, dur: 36, delay: -16 },
  { x: 94, y: 56, size: 3, dur: 30, delay: -24 },
]

export default function BackgroundEffects() {
  return (
    <div className="bg-fx" aria-hidden="true">
      {PARTICLES.map(({ x, y, size, dur, delay }) => (
        <span
          key={`${x}-${y}`}
          className="bg-fx__particle"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            '--size': `${size}px`,
            '--dur': `${dur}s`,
            '--delay': `${delay}s`,
          }}
        />
      ))}
    </div>
  )
}
