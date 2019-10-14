import React, { Component } from "react";
import LoginForm from "../LoginForm/LoginForm";
import { ColorContainer } from "../ColorContainer/ColorContainer";
import { generateHexCode } from "../../utilities/helpers";
import "./App.css";
import  ProjectForm  from "../ProjectForm/ProjectForm";
import  ProjectsContainer  from "../ProjectsContainer/ProjectsContainer";
import PaletteContainer from "../PaletteContainer/PaletteContainer";
import { Route, Redirect, Link } from 'react-router-dom';
import {
  getUser,
  getUserProjects,
  getUserPalettes,
  postNewUser,
  postNewProject,
  postNewPalette,
  deletePalette,
  deleteProject,
  getAllPalettes
} from "../../utilities/apiCalls";

export class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      error: "",
      colors: [
        { color: generateHexCode(), locked: false },
        { color: generateHexCode(), locked: false },
        { color: generateHexCode(), locked: false },
        { color: generateHexCode(), locked: false },
        { color: generateHexCode(), locked: false }
      ],
      user: null,
      user_projects: [],
      user_palettes: [],
      currentProjec: null,
      palettes: []
    };
  }

  loginUser = async (email, password) => {
    const userInfo = { email, password };
    try {
      const userId = await getUser(userInfo);
      if (userId) {
        this.setState({
          user: {
            id: userId,
            name: email.split("@")[0]
          }
        });
        this.userProjects(userId);
      }
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  userProjects = async userId => {
    try {
      const projects = await getUserProjects(userId);
      this.setState({ user_projects: projects });
      this.userPalettes(projects);
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  userPalettes = async projects => {
    try {
      let palettePromises = projects.map(async project => {
        const { id } = project;
        const palette = await getUserPalettes(id);
        return palette;
      });
      const palettes = await Promise.all(palettePromises);
      this.setState({ user_palettes: palettes.flat() });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  signUpUser = async (email, password) => {
    const userInfo = { email, password };
    try {
      const userId = await postNewUser(userInfo);
      if (userId) {
        this.setState({
          user: {
            id: userId,
            name: email.split("@")[0]
          }
        });
      }
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  generateColors = () => {
    let { colors } = this.state;
    colors = colors.map(color => {
      return color.locked ? color : { color: generateHexCode(), locked: false };
    });
    this.setState({ colors });
  };


  toggleColorLock = (index) => {
    let { colors } = this.state;
    colors[index].locked = !colors[index].locked;
    this.setState({ colors })
  };

  handleSubmission = async (projectName, paletteName) => {
    const { colors, user, currentProject, user_projects } = this.state;
    const hex_codes = colors.map(colorObj => colorObj.color).join();
    if(user_projects.map(project => project.name).includes(projectName)) {
      const newPalette = { project_id: currentProject.id, hex_codes, name: paletteName };
      await this.createPalette(newPalette);
      this.userProjects(user.id);
    } else {
      const project_id = await this.createProject({ user_id: user.id, name: projectName });
      const newPalette = { project_id, hex_codes, name: paletteName };
      await this.createPalette(newPalette);
      this.userProjects(user.id);
    }
  }

  createProject = async (projectInfo) => {
    const projectId = await postNewProject(projectInfo);
    return projectId;
  }

  createPalette = async (paletteInfo) => {
    const paletteId = await postNewPalette(paletteInfo);
    return paletteId;
  }

  logoutUser = () => {
    this.setState({user: null})
  }

  trashPalette = async (id) => {
    const { user } = this.state;
    try {
      await deletePalette(id);
      await this.userProjects(user.id);
    } catch (error) {
      this.setState({error: error.message})
    }
  }

  trashProject = async (id) => {
    const { user } = this.state;
    try {
      await deleteProject(id);
      await this.userProjects(user.id);
      this.setState({ currentProject: null });
    } catch (error) {
      this.setState({error: error.message})
    }
  }

  allPalettes = async () => {
    try {
      const palettes = await getAllPalettes();
      this.setState({ palettes })
    } catch (error) {
      this.setState({ error: error.message })
    }
  }

  clearError = () => {
    this.setState({ error: '' });
  }

  updateCurrentProject = (project) => {
    this.setState({currentProject: project})
  }

  render() {
    const { error, user, colors, user_projects, user_palettes, currentProject, palettes} = this.state;
    return (
      <main>
        <Route path='/login' render={() => user ? <Redirect to='/'/> : (
          <>
            <img
              src="https://fontmeme.com/permalink/191011/986cec0ee62e1c276228d73cd566bdd2.png"
              alt="graffiti-fonts"
              border="0"
            />
            <LoginForm
              error={error}
              clearError={this.clearError}
              loginUser={this.loginUser}
              signUpUser={this.signUpUser}
            />
          </>
          )}/>
        <Route exact path='/' render={() => !user ? <Redirect to='/login' /> : (
            <>
            <h1>Welcome, {user.name}</h1>
            <button onClick={this.logoutUser}>Log Out</button>
            <Link to='/palettes'><button onClick={this.allPalettes}>Browse All Palettes</button></Link>
            <img
              src="https://fontmeme.com/permalink/191011/5ed4a0d9bcac8d65b68b8a1346771b36.png"
              alt="graffiti-fonts"
              border="0"
            />
            <ColorContainer
              colors={colors}
              generateColors={this.generateColors}
              toggleColorLock={this.toggleColorLock}
            /> 
            <ProjectForm 
              updateCurrentProject={this.updateCurrentProject}
              currentProject={currentProject}
              handleSubmission={this.handleSubmission}
              projects={user_projects}
            />
            <ProjectsContainer 
              projects={user_projects}
              palettes={user_palettes}
              trashPalette={this.trashPalette}
              trashProject={this.trashProject}
            />
            </>
          )
        } />
         <Route exact path='/palettes' render={() => !user ? <Redirect to='/login' /> : (
            <>
            <h1>Welcome, {user.name}</h1>
            <button onClick={this.logoutUser}>Log Out</button>
            <Link to='/'><button >Generate New Palette</button></Link>
            <img
              src="https://fontmeme.com/permalink/191011/5ed4a0d9bcac8d65b68b8a1346771b36.png"
              alt="graffiti-fonts"
              border="0"
            />
            <PaletteContainer 
              palettes={palettes}
            />
            <ProjectForm 
              updateCurrentProject={this.updateCurrentProject}
              currentProject={currentProject}
              handleSubmission={this.handleSubmission}
              projects={user_projects}
            />
            <ProjectsContainer 
              projects={user_projects}
              palettes={user_palettes}
              trashPalette={this.trashPalette}
              trashProject={this.trashProject}
            />
            </>
          )
        } />
      </main>
    );
  }
}

export default App;
