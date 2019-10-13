import React from 'react';
import ProjectCard from '../ProjectCard/ProjectCard'
import './ProjectsContainer.css';

export const ProjectsContainer = ({ projects, palettes, trashPalette }) => {
  const projectCards = projects.map((project, index) => {
    const projectPalettes = palettes.filter( palette => project.id === palette.project_id)
    return <ProjectCard project={project} palettes={projectPalettes} trashPalette={trashPalette} key={index} />
  })

  return (
    <section>
      {projectCards}
    </section>
  )
}

export default ProjectsContainer;