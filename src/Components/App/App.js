import React, { Component } from "react";
import LoginForm from "../LoginForm/LoginForm";
import { ColorContainer } from "../ColorContainer/ColorContainer";
import { generateHexCode } from "../../utilities/helpers";
import "./App.css";
import ProjectForm from "../ProjectForm/ProjectForm";
import ProjectsContainer from "../ProjectsContainer/ProjectsContainer";
import AllPaletteContainer from '../AllPalleteContainer/AllPaletteContainer.js'
import { Route, Redirect, Link } from "react-router-dom";
import {
  getUser,
  getUserProjects,
  getUserPalettes,
  postNewUser,
  postNewProject,
  postNewPalette,
  deletePalette,
  deleteProject,
  getAllPalettes,
  editProjectName,
  editPaletteName
} from "../../utilities/apiCalls";
import showAllPalettesIcon from "../../Images/showAllPalettes.svg";
import logOutIcon from '../../Images/logoutIcon.svg';
import generateColors from '../../Images/generateColors.svg';

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
      currentProject: null,
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

  toggleColorLock = index => {
    let { colors } = this.state;
    colors[index].locked = !colors[index].locked;
    this.setState({ colors });
  };

  handleSubmission = async (projectName, paletteName) => {
    const { colors, user, currentProject, user_projects } = this.state;
    const hex_codes = colors.map(colorObj => colorObj.color).join();
    const isPresent = user_projects.map(project => project.name).includes(projectName)
    if (isPresent && !currentProject) {
      this.setState({error: "All Project names must be unique!"});
    } else  if (isPresent && currentProject !== null) {
      const newPalette = {
        project_id: currentProject.id,
        hex_codes,
        name: paletteName
      };
      await this.createPalette(newPalette);
      this.userProjects(user.id);
    } else {
      const project_id = await this.createProject({
        user_id: user.id,
        name: projectName
      });
      const newPalette = { project_id, hex_codes, name: paletteName };
      await this.createPalette(newPalette);
      this.userProjects(user.id);
    }
  };

  createProject = async projectInfo => {
    try {
      const projectId = await postNewProject(projectInfo);
      return projectId;
    } catch (error){
      this.setState({ error: error.message})
    }
  };

  createPalette = async paletteInfo => {
    try {
      const paletteId = await postNewPalette(paletteInfo);
      return paletteId;
    } catch(error) {
      this.setState({error: error.message})
    }
  };

  logoutUser = () => {
    this.setState({ user: null });
  };

  trashPalette = async id => {
    const { user } = this.state;
    try {
      await deletePalette(id);
      await this.userProjects(user.id);
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  trashProject = async id => {
    const { user } = this.state;
    try {
      await deleteProject(id);
      await this.userProjects(user.id);
      this.setState({ currentProject: null });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  allPalettes = async () => {
    try {
      const palettes = await getAllPalettes();
      this.setState({ palettes });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  grabPalette = palette => {
    const colors = Object.values(palette)
      .slice(3)
      .map(color => {
        return {
          color,
          locked: true
        };
      });
    this.setState({ colors });
  };

  clearError = () => {
    this.setState({ error: "" });
  };

  updateCurrentProject = project => {
    this.setState({ currentProject: project });
  };

  updateProjectName = async project => {
    const { user_projects } = this.state;
    try {
      const newProject = await editProjectName(project);
      const updated_projects = user_projects.map(project =>
        project.id === newProject.id ? newProject : project);
    this.setState({ user_projects: updated_projects });
    } catch(error) {
      this.setState({ error: error.message })
    }
  };

  updatePaletteName = async palette => {
    const { user_palettes } = this.state;
    try {
      const newPalette = await editPaletteName(palette);
      const updated_palettes = user_palettes.map(palette =>
      palette.id === newPalette.id ? newPalette : palette);
      this.setState({ user_palettes: updated_palettes });
    } catch(error) {
      this.setState({error: error.message})
    } 
  };

  render() {
    const {
      error,
      user,
      colors,
      user_projects,
      user_palettes,
      currentProject,
      palettes
    } = this.state;
    return (
      <main>
        <Route
          path="/login"
          render={() =>
            user ? (
              <Redirect to="/" />
            ) : (
              <>
                <img
                  className='login-logo'
                  src="https://fontmeme.com/permalink/191016/afa0303747b5196d2cf8ec2d726fe26c.png"
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
            )
          }
        />
        <Route
          exact
          path="/"
          render={() =>
            !user ? (
              <Redirect to="/login" />
            ) : (
              <>
                <h1>Welcome to {user.name}'s</h1>
                <div className="header-container">
                  <Link to="/palettes">
                    <img
                      src={showAllPalettesIcon}
                      alt="show all palettes"
                      className="all-palettes__button"
                      onClick={this.allPalettes}
                    />
                  </Link>
                  <img
                    className="logo__image"
                    src="https://fontmeme.com/permalink/191016/afa0303747b5196d2cf8ec2d726fe26c.png"
                    alt="graffiti-fonts"
                    border="0"
                  />
                  <img
                    src={logOutIcon}
                    alt="log out user"
                    className="log-out__button"
                    onClick={this.logoutUser}
                  />
                </div>
                <ColorContainer
                  colors={colors}
                  generateColors={this.generateColors}
                  toggleColorLock={this.toggleColorLock}
                />
                <ProjectForm
                  error={error}
                  updateCurrentProject={this.updateCurrentProject}
                  currentProject={currentProject}
                  handleSubmission={this.handleSubmission}
                  projects={user_projects}
                />
                <ProjectsContainer
                  updateProjectName={this.updateProjectName}
                  updatePaletteName={this.updatePaletteName}
                  projects={user_projects}
                  palettes={user_palettes}
                  trashPalette={this.trashPalette}
                  trashProject={this.trashProject}
                  showPalette={this.grabPalette}
                />
              </>
            )
          }
        />
        <Route
          exact
          path="/palettes"
          render={() =>
            !user ? (
              <Redirect to="/login" />
            ) : (
              <>
                <h1>Welcome, {user.name}</h1>
                <div className="header-container">
                  <Link to="/">
                    <img
                      src={generateColors}
                      alt="generate colors"
                      onClick={() => this.userProjects(user.id)}
                    />
                  </Link>
                  <img
                    src="https://fontmeme.com/permalink/191016/afa0303747b5196d2cf8ec2d726fe26c.png"
                    alt="graffiti-fonts"
                    border="0"
                  />
                  <img
                    src={logOutIcon}
                    alt="log out user"
                    onClick={this.logoutUser}
                  />
                </div>
                <AllPaletteContainer
                  palettes={palettes}
                  grabPalette={this.grabPalette}
                />
              </>
            )
          }
        />
      </main>
    );
  }
}

export default App;
