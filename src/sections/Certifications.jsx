import { FiAward } from 'react-icons/fi'
import { certifications } from '../data/portfolio'

export default function Certifications() {
  return (
    <div className="education__column">
      <h3 className="education__heading">
        <FiAward aria-hidden="true" /> Certifications
      </h3>
      <ul className="cert-list">
        {certifications.map(({ title, issuer }, index) => (
          <li
            key={title}
            className="cert-card glass reveal"
            style={{ '--delay': `${index * 100}ms` }}
          >
            <span className="cert-card__icon" aria-hidden="true">
              <FiAward />
            </span>
            <div>
              <h4 className="cert-card__title">{title}</h4>
              <p className="cert-card__issuer">{issuer}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
