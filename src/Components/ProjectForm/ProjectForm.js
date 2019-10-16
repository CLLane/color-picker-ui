import React, { Component } from "react";
import saveNewPalette from '../../Images/saveNewPalette.svg';
import disableNewPalette from '../../Images/disableNewPalette.svg'
import "./ProjectForm.css";

export class ProjectForm extends Component {
  constructor() {
    super();
    this.state = {
      projectName: "",
      paletteName: "",
      select: "new-project"
    };
  }

  componentDidUpdate(prevProps) {
    const { projects } = this.props;
    if (projects.length !== prevProps.projects.length) {
      this.setState({ select: "new-project" });
    }
  }

  selectProject = value => {
    const { projects, updateCurrentProject } = this.props;
    if (value === "new-project") {
      updateCurrentProject(null);
      this.setState({ select: "new-project" });
    } else {
      const currentProject = projects.find(project => project.name === value);
      updateCurrentProject(currentProject);
      this.setState({ select: value });
    }
  };

  handleNameChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { projectName, paletteName, select } = this.state;
    const { handleSubmission } = this.props;
    if (select !== "new-project") {
      await handleSubmission(select, paletteName);
    } else {
      await handleSubmission(projectName, paletteName);
    }
    this.setState({ projectName: "", paletteName: "" });
  };

  render() {
    const { projects, currentProject, error } = this.props;
    const { projectName, paletteName, select } = this.state;
    const options = projects.map((project, index) => {
      return (
        <option key={index} value={project.name}>
          {project.name}
        </option>
      );
    });
    const disableProjectName = currentProject ? true : false;
    let saveIsDisabled = projectName === "" || paletteName === "";
    if (select !== "new-project") {
      saveIsDisabled = paletteName === "";
    };
    const projectPlaceholder = currentProject
      ? currentProject.name
      : "Enter a Project";
    return (
      <div className="project-form__container">
        <form className='project__form'>
          <select
            className="project-name__dropdown"
            value={select}
            onChange={e => this.selectProject(e.target.value)}
          >
            {options}
            <option value="new-project">Create New Project</option>
          </select>
          <input
            maxlength="25"
            className="project-name__input"
            type="text"
            disabled={disableProjectName}
            name="projectName"
            placeholder={projectPlaceholder}
            onChange={this.handleNameChange}
            value={projectName}
          ></input>
          <input
            maxlength="13"
            className="palette-name__input"
            type="text"
            placeholder="Enter Palette Name"
            name="paletteName"
            onChange={this.handleNameChange}
            value={paletteName}
          ></input>
          { !saveIsDisabled && <img src={saveNewPalette} alt='save new palette' onClick={this.handleSubmit}/> }
          { saveIsDisabled && <img src={disableNewPalette} alt='disable save palette'/> }
          { error && <p>{error}</p> }
        </form>
      </div>
    );
  }
}

export default ProjectForm;
