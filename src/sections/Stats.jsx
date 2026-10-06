import { stats } from '../data/portfolio'
import './Stats.css'

export default function Stats() {
  return (
    <section className="stats" aria-label="Career highlights">
      <div className="container">
        <ul className="stats__grid glass">
          {stats.map(({ value, label }, index) => (
            <li key={label} className="stats__item reveal" style={{ '--delay': `${index * 90}ms` }}>
              <strong className="stats__value">{value}</strong>
              <span className="stats__label">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
