import React, { Component } from "react";
import LoginForm from "../LoginForm/LoginForm";
import {
  getUser,
  getUserProjects,
  getUserPalettes,
  postNewUser
} from "../../utilities/apiCalls";
import { ColorContainer } from "../ColorContainer/ColorContainer";
import { generateHexCode } from "../../utilities/helpers";
import "./App.css";

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
      user_palettes: []
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
      if (projects.length) {
        this.setState({ user_projects: projects });
        this.userPalettes(projects);
      }
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  userPalettes = async projects => {
    try {
      let palettePromises = projects.map(async project => {
        const { id } = project;
        console.log("map id", id);
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
  }

  render() {
    const { error, user, colors } = this.state;
    console.log("this.state :", this.state);
    return (
      <main>
        {user && <h1>Welcome, {user.name}</h1>}
        <img
          src="https://fontmeme.com/permalink/191011/5ed4a0d9bcac8d65b68b8a1346771b36.png"
          alt="graffiti-fonts"
          border="0"
        />
        {!user && (
          <img
            src="https://fontmeme.com/permalink/191011/986cec0ee62e1c276228d73cd566bdd2.png"
            alt="graffiti-fonts"
            border="0"
          />
        )}
        {!user && (
          <LoginForm
            error={error}
            loginUser={this.loginUser}
            signUpUser={this.signUpUser}
          />
        )}
        {user && (
          <ColorContainer
            colors={colors}
            generateColors={this.generateColors}
            toggleColorLock={this.toggleColorLock}
          />
        )}
      </main>
    );
  }
}

export default App;
