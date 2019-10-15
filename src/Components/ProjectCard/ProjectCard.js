import React, { Component } from 'react';
import PaletteCard from '../PaletteCard/PaletteCard';
import './ProjectCard.css';


export class ProjectCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameInput: props.project.name,
      disabled: true,
      error: ''
    }
  }
  
  editName = () => {
    this.setState({ disabled: false });
  };

  saveName = async () => {
    const { project, updateProjectName } = this.props;
    const { nameInput } = this.state;
    const newProject = {
      ...project,
      name: nameInput
    };
    updateProjectName(newProject);
    this.setState({ disabled: true});
  }

  handleChange = (e) => {
    this.setState({ nameInput: e.target.value})
  }


  render() {
    const { project, palettes, trashPalette, trashProject, showPalette, updatePaletteName} = this.props;
    const { disabled, nameInput, error } = this.state;
    const paletteCards = palettes.map((palette, index) => {
      return <PaletteCard key={index} palette={palette} trashPalette={trashPalette} showPalette={showPalette} updatePaletteName={updatePaletteName} />
    });

    return (
      <article className='project-card__article'>
        <div className='project-card__header'>
          { error && <p>{error}</p> }
          <input type='text' onChange={this.handleChange} disabled={disabled} value={nameInput}></input>
          { disabled && <p onClick={this.editName}>Edit</p> } 
          { !disabled && <p onClick={this.saveName}>Save</p> }
          <button onClick={() => trashProject(project.id)}>Trash Project</button>
        </div>
        { paletteCards }
      </article>
    ) 
  }
};

export default ProjectCard;