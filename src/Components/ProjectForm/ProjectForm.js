import React, { Component } from 'react';
import './ProjectForm.css';

export class ProjectForm extends Component {
  constructor() {
    super();
    this.state = {
      project: null,
      palette: null,
      new_project: false,
      project_save: '',
      palette_save: '' 
    }
  };

  selectProject = (value) => {
    const { projects } = this.props;
    let currentProject = projects.find(project => project.name === value);
    if ( currentProject ) {
      this.setState({ project: currentProject, new_project: true })
    } else {
      this.setState({ project: null, new_project: false})
    }
  }

  render() {
    const { projects } = this.props;
    const { new_project, project } = this.state;
    const placeholderText = !new_project ? 'Enter Project Name' : project.name
    const options = projects.map( project => {
      return <option value={project.name}>{project.name}</option>
    })
    return (
      <form>
        <select onChange={(e) => this.selectProject(e.target.value)}>
          <option value='new-project'>Create New Project</option>
          { options }
        </select>
        <input type='text' disabled={new_project} name='project-name' placeholder={ placeholderText }></input>
      </form>
    )
  }
}