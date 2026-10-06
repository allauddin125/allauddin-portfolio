import { FiArrowUpRight, FiCheck, FiExternalLink, FiInfo } from 'react-icons/fi'
import ExternalLink from './ExternalLink'
import './ProjectCard.css'

export default function ProjectCard({ project, onViewDetails, style }) {
  const { title, category, image, url, tech, description, contribution } = project

  return (
    <article className="project-card glass reveal" style={style}>
      {/* Duplicate of the "Live Website" button for mouse users; hidden from keyboard/AT to avoid a repeated link */}
      <ExternalLink href={url} className="project-card__media" tabIndex={-1} aria-hidden="true">
        <img
          src={image}
          alt={`Homepage screenshot of the ${title} website`}
          width="800"
          height="500"
          loading="lazy"
          decoding="async"
        />
        <span className="project-card__overlay">
          View Live Website <FiArrowUpRight />
        </span>
      </ExternalLink>

      <div className="project-card__body">
        <p className="project-card__category">{category}</p>
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__desc">{description}</p>

        <div className="project-card__contribution">
          <h4 className="project-card__label">My contribution</h4>
          <ul>
            {contribution.map((item) => (
              <li key={item}>
                <FiCheck aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <ul className="project-card__tech" aria-label={`${title} technologies`}>
          {tech.map((item) => (
            <li key={item} className="chip">
              {item}
            </li>
          ))}
        </ul>

        <div className="project-card__actions">
          <ExternalLink
            href={url}
            className="btn btn--primary btn--sm"
            aria-label={`Visit the ${title} live website (opens in a new tab)`}
          >
            <FiExternalLink aria-hidden="true" /> Live Website
          </ExternalLink>
          <button
            type="button"
            className="btn btn--ghost btn--sm"
            onClick={() => onViewDetails(project)}
            aria-haspopup="dialog"
            aria-label={`View details about ${title}`}
          >
            <FiInfo aria-hidden="true" /> View Details
          </button>
        </div>
      </div>
    </article>
  )
}
