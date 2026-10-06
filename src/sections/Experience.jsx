import { FiBriefcase, FiCalendar, FiCheckCircle } from 'react-icons/fi'
import { experience } from '../data/portfolio'
import SectionHeading from '../components/SectionHeading'
import './Experience.css'

export default function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container">
        <SectionHeading
          id="experience-title"
          eyebrow="Career"
          title="Professional Experience"
          subtitle="Building responsive interfaces, React.js features and WordPress solutions for live client projects."
        />

        <ol className="timeline reveal-line">
          {experience.map((job) => (
            <li key={`${job.company}-${job.period}`} className="timeline__item reveal">
              <span className="timeline__marker" aria-hidden="true">
                <FiBriefcase />
              </span>

              <article className="job glass">
                <header className="job__header">
                  <div>
                    <h3 className="job__role">{job.role}</h3>
                    <p className="job__company">{job.company}</p>
                  </div>
                  <div className="job__meta">
                    <span className="job__period">
                      <FiCalendar aria-hidden="true" /> {job.period}
                    </span>
                    {job.current && <span className="job__badge">Current</span>}
                  </div>
                </header>

                <ul className="job__points">
                  {job.points.map((point) => (
                    <li key={point}>
                      <FiCheckCircle aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <ul className="job__tags" aria-label="Technologies used">
                  {job.tags.map((tag) => (
                    <li key={tag} className="chip">
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
