import React, { Component } from 'react';
import './ProjectForm.css';

export class ProjectForm extends Component {
  constructor() {
    super();
    this.state = {
      project: null,
      palette: null,
    }
  };

  render() {
    const { projects } = this.props
    const options = projects.map( project => {
      return <option value={project.name}>{project.name}</option>
    })
    return (
      <form>
        <select>
          { options }
        </select>
      </form>
    )
  }
}