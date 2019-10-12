import React from 'react';
import PaletteCard from '../PaletteCard/PaletteCard';
import './ProjectsContainer.css';

export const ProjectCard = ({ project, palettes }) => {
  const paletteCards = palettes.map(palette => {
    return <PaletteCard palette={palette} />
  })

  return (
    <article>
      <h3>{ project.name }</h3>
      { paletteCards }
    </article>
  )
}

export default ProjectCard;