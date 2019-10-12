import React, { Component } from 'react';
import './ProjectForm.css';

export class ProjectForm extends Component {
  constructor() {
    super();
    this.state = {
      palette: null,
      isExistingProject: false,
      projectToSave: '',
      paletteToSave: '',
      selectValue: 'new-project'
    }
  };

  selectProject = (value) => {
    const { projects } = this.props;
    let currentProject = projects.find(project => project.name === value);
    if ( currentProject ) {
      this.setState({ projectToSave: currentProject, isExistingProject: true, selectValue:value })
    } else {
      this.setState({ projectToSave: "", isExistingProject: false, selectValue: 'new-project'})
    }
  }

  handleNameChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = async (e) => { 
    e.preventDefault();
    const { projectToSave, paletteToSave } = this.state;
    const { handleSubmission } = this.props;
    await handleSubmission(projectToSave, paletteToSave);
    const nameValue = projectToSave.name ? projectToSave.name : projectToSave;
    this.setState({ selectValue: nameValue, isExistingProject: true, paletteToSave: "" })
  }

  render() {
    const { projects } = this.props;
    const { isExistingProject, projectToSave, paletteToSave, selectValue } = this.state;
    const projectPlaceholderText = isExistingProject ? projectToSave.name : 'Enter Project Name';
    const projectNameValue = projectToSave.name ? projectToSave.name : projectToSave;
    const options = projects.map((project, index) => {
      return <option key={index} value={project.name}>{project.name}</option>
    })
    return (
      <form>
        <select value={selectValue} onChange={(e) => this.selectProject(e.target.value)}>
          { options }
          <option value='new-project'>Create New Project</option>
        </select>
        <input type='text' disabled={isExistingProject} name='projectToSave' placeholder={ projectPlaceholderText } onChange={this.handleNameChange} value={projectNameValue}></input>
        <input type='text' placeholder='Enter Palette Name' name='paletteToSave' onChange={this.handleNameChange} value={paletteToSave}></input>
        <button onClick={this.handleSubmit}>Save</button>
      </form>
    )
  }
}