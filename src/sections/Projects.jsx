import { useState } from 'react'
import { projects } from '../data/portfolio'
import SectionHeading from '../components/SectionHeading'
import ProjectCard from '../components/ProjectCard'
import ProjectModal from '../components/ProjectModal'
import './Projects.css'

export default function Projects() {
  const [selected, setSelected] = useState(null)

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading
          id="projects-title"
          eyebrow="Featured Work"
          title="My Projects"
          subtitle="Production websites from my client work, selected from 15+ live projects — with what I built on each."
        />

        <div className="projects__grid">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              onViewDetails={setSelected}
              style={{ '--delay': `${index * 140}ms` }}
            />
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
