import React from 'react';
import PaletteCard from '../PaletteCard/PaletteCard';
import './ProjectCard.css';

export const ProjectCard = ({ project, palettes, trashPalette, trashProject }) => {
  const paletteCards = palettes.map((palette, index) => {
    return <PaletteCard key={index} palette={palette} trashPalette={trashPalette} />
  })

  return (
    <article>
      <h3>{ project.name }</h3>
      <button onClick={() => trashProject(project.id)}>Trash Project</button>
      { paletteCards }
    </article>
  )
}

export default ProjectCard;