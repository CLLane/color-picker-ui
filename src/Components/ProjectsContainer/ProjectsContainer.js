import React from 'react';
import ProjectCard from '../ProjectCard/ProjectCard'
import './ProjectsContainer.css';

export const ProjectsContainer = ({ projects, palettes }) => {
  const projectCards = projects.map((project, index) => {
    const projectPalettes = palettes.filter( palette => project.id === palette.project_id)
    return <ProjectCard project={project} palettes={projectPalettes} key={index} />
  })

  return (
    <section>
      {projectCards}
    </section>
  )
}

export default ProjectsContainer;