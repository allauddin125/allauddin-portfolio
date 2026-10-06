import { useEffect, useRef } from 'react'
import { FiCheckCircle, FiExternalLink, FiX } from 'react-icons/fi'
import ExternalLink from './ExternalLink'
import './ProjectModal.css'

// Native <dialog> gives us focus trapping, Escape-to-close and focus return for free.
export default function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (project && !dialog.open) dialog.showModal()
    if (!project && dialog.open) dialog.close()
  }, [project])

  const handleBackdropClick = (event) => {
    if (event.target === dialogRef.current) dialogRef.current.close()
  }

  return (
    <dialog
      ref={dialogRef}
      className="project-modal"
      aria-labelledby="project-modal-title"
      onClose={onClose}
      onClick={handleBackdropClick}
    >
      {project && (
        <div className="project-modal__panel">
          <button
            type="button"
            className="project-modal__close"
            aria-label="Close project details"
            onClick={() => dialogRef.current.close()}
          >
            <FiX aria-hidden="true" />
          </button>

          <img
            className="project-modal__image"
            src={project.image}
            alt={`Homepage screenshot of the ${project.title} website`}
            width="800"
            height="500"
          />

          <div className="project-modal__body">
            <p className="project-modal__category">{project.category}</p>
            <h3 id="project-modal-title" className="project-modal__title">
              {project.title}
            </h3>
            <p>{project.description}</p>

            <h4 className="project-modal__subheading">Key Contributions</h4>
            <ul className="project-modal__list">
              {project.highlights.map((item) => (
                <li key={item}>
                  <FiCheckCircle aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h4 className="project-modal__subheading">Technologies</h4>
            <ul className="project-modal__tech">
              {project.tech.map((item) => (
                <li key={item} className="chip">
                  {item}
                </li>
              ))}
            </ul>

            <ExternalLink href={project.url} className="btn btn--primary project-modal__cta">
              <FiExternalLink aria-hidden="true" /> Visit Live Website
              <span className="sr-only"> (opens in a new tab)</span>
            </ExternalLink>
          </div>
        </div>
      )}
    </dialog>
  )
}
