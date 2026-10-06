import { FiCode, FiDownload, FiMail, FiSmartphone, FiTool, FiUsers } from 'react-icons/fi'
import { profile, qualities } from '../data/portfolio'
import SectionHeading from '../components/SectionHeading'
import './About.css'

const icons = {
  code: FiCode,
  responsive: FiSmartphone,
  debug: FiTool,
  team: FiUsers,
}

// Split the resume summary into two readable paragraphs without altering the wording.
const [summaryLead, ...summaryRest] = profile.summary.split('. ')

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container about__grid">
        <div className="about__content">
          <SectionHeading id="about-title" eyebrow="About" title="About Me" align="left" />
          <div className="reveal">
            <p className="about__lead">{summaryLead}.</p>
            <p>{summaryRest.join('. ')}</p>
          </div>

          <p className="about__current reveal" style={{ '--delay': '80ms' }}>
            <span className="about__current-dot" aria-hidden="true" />
            <span>
              <span className="about__current-label">Currently</span> {profile.currentRole}
            </span>
          </p>

          <ul className="about__focus reveal" style={{ '--delay': '140ms' }} aria-label="Focus areas">
            {profile.focusAreas.map((area) => (
              <li key={area} className="chip">
                {area}
              </li>
            ))}
          </ul>

          <div className="about__actions reveal" style={{ '--delay': '200ms' }}>
            <a href={profile.resumeUrl} download={profile.resumeFileName} className="btn btn--primary">
              <FiDownload aria-hidden="true" /> Download Resume
            </a>
            <a href="#contact" className="btn btn--ghost">
              <FiMail aria-hidden="true" /> Contact Me
            </a>
          </div>
        </div>

        <ul className="about__cards">
          {qualities.map(({ icon, title, text }, index) => {
            const Icon = icons[icon]
            return (
              <li
                key={title}
                className="about__card glass reveal"
                style={{ '--delay': `${index * 90}ms` }}
              >
                <div className="about__card-top">
                  <span className="about__icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <span className="about__index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
