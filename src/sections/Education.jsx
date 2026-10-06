import { FiAward, FiBookOpen, FiCalendar } from 'react-icons/fi'
import { education } from '../data/portfolio'
import SectionHeading from '../components/SectionHeading'
import Certifications from './Certifications'
import './Education.css'

export default function Education() {
  return (
    <section id="education" className="section" aria-labelledby="education-title">
      <div className="container">
        <SectionHeading
          id="education-title"
          eyebrow="Qualifications"
          title="Education & Certifications"
        />

        <div className="education__grid">
          <div className="education__column">
            <h3 className="education__heading">
              <FiBookOpen aria-hidden="true" /> Academic Background
            </h3>
            <ol className="edu-list">
              {education.map(({ degree, institution, period, score }, index) => (
                <li
                  key={degree}
                  className="edu-card glass reveal"
                  style={{ '--delay': `${index * 140}ms` }}
                >
                  <div className="edu-card__top">
                    <span className="edu-card__period">
                      <FiCalendar aria-hidden="true" /> {period}
                    </span>
                    <span className="edu-card__score">
                      <FiAward aria-hidden="true" /> {score}
                    </span>
                  </div>
                  <h4 className="edu-card__degree">{degree}</h4>
                  <p className="edu-card__institution">{institution}</p>
                </li>
              ))}
            </ol>
          </div>

          <Certifications />
        </div>
      </div>
    </section>
  )
}
