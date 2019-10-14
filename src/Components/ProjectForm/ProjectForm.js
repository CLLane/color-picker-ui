import React, { Component } from 'react';
import './ProjectForm.css';

export class ProjectForm extends Component {
  constructor() {
    super();
    this.state = {
      projectName: '',
      paletteName: '',
      select: 'new-project'
    }
  }

selectProject = (value) => {
  const { projects, updateCurrentProject } = this.props;
  const currentProject = projects.find(project => project.name === value);
  console.log('currentProject',currentProject)
  if (currentProject) {
    updateCurrentProject(currentProject);
    this.setState({ select:value });
  } else {
    this.setState({ select: 'new-project' });
  }
}

componentDidUpdate(prevProps) {
  const { projects } = this.props;
  if(projects.length !== prevProps.projects.length) {
    this.setState({ select: 'new-project' })
  }
}

handleNameChange = (e) => {
  this.setState({ [e.target.name]: e.target.value })
};

handleSubmit = async (e) => { 
  e.preventDefault();
  const { projectName, paletteName, select } = this.state;
  const { handleSubmission } = this.props;
  if(select !== 'new-project') {
    await handleSubmission(select, paletteName);
  } else {
    await handleSubmission(projectName, paletteName);
  }
  this.setState({ projectName: "", paletteName: "" });
}


  render() {
    const { projects, currentProject } = this.props;
     const { projectName, paletteName, select } = this.state;
     const options = projects.map((project, index) => {
       return <option key={index} value={project.name}>{project.name}</option>
     });
     let saveIsDisabled = projectName === '' || paletteName === '';
     if(select !== 'new-project') {
       saveIsDisabled = paletteName === '';
     }
     const projectPlaceholder = currentProject ? currentProject.name : 'Enter a Project';
    return (
      <form>
          <select value={select} onChange={(e) => this.selectProject(e.target.value)}>
          { options }
          <option value='new-project'>Create New Project</option>
        </select>
        { select === 'new-project' && <input type='text' name='projectName' placeholder={projectPlaceholder} onChange={this.handleNameChange} value={projectName}></input> }
        <input type='text' placeholder='Enter Palette Name' name='paletteName' onChange={this.handleNameChange} value={paletteName}></input>
        <button disabled={saveIsDisabled} onClick={this.handleSubmit}>Save</button>
      </form>
    )
  }
}

// export class ProjectForm extends Component {
//   constructor() {
//     super();
//     this.state = {
//       palette: null,
//       isExistingProject: false,
//       projectToSave: '',
//       paletteToSave: '',
//       selectValue: 'new-project'
//     }
//   };

//   componentDidUpdate(prevProps) {
//     const { projects } = this.props;
//     if(projects !== prevProps.projects) {
      
//     }
//   }

//   selectProject = (value) => {
//     const { projects } = this.props;
//     let currentProject = projects.find(project => project.name === value);
//     if ( currentProject ) {
//       this.setState({ isExistingProject: true, selectValue:value })
//     } else {
//       this.setState({ projectToSave: "", isExistingProject: false, selectValue: 'new-project'})
//     }
//   }

//   handleNameChange = (e) => {
//     this.setState({ [e.target.name]: e.target.value })
//   }

//   handleSubmit = async (e) => { 
//     e.preventDefault();
//     const { projectToSave, paletteToSave } = this.state;
//     const { handleSubmission } = this.props;
//     const projectId = await handleSubmission(projectToSave, paletteToSave);
//     const nameValue = projectToSave.name ? projectToSave.name : projectToSave;
//     const currentProject = { name: nameValue, id: projectId}
//     this.setState({ selectValue: nameValue, isExistingProject: true, paletteToSave: "", projectToSave: currentProject });
//   }

//   render() {
//     const { projects } = this.props;
//     const { isExistingProject, projectToSave, paletteToSave, selectValue } = this.state;
//     const projectPlaceholderText = isExistingProject ? projectToSave.name : 'Enter Project Name';
//     const projectNameValue = projectToSave.name ? projectToSave.name : projectToSave;
//     const options = projects.map((project, index) => {
//       return <option key={index} value={project.name}>{project.name}</option>
//     });
//     const saveIsDisabled = projectToSave === '' || paletteToSave === '';
//     return (
//       <form>
//         <select value={selectValue} onChange={(e) => this.selectProject(e.target.value)}>
//           { options }
//           <option value='new-project'>Create New Project</option>
//         </select>
//         <input type='text' disabled={isExistingProject} name='projectToSave' placeholder={ projectPlaceholderText } onChange={this.handleNameChange} value={projectNameValue}></input>
//         <input type='text' placeholder='Enter Palette Name' name='paletteToSave' onChange={this.handleNameChange} value={paletteToSave}></input>
//         <button disabled={saveIsDisabled} onClick={this.handleSubmit}>Save</button>
//       </form>
//     )
//   }
// }

export default ProjectForm;