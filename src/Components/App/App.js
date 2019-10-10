import React, { Component } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { getUser, getUserProjects, getUserPalettes, postNewUser } from "../../utilities/apiCalls";
import './App.css';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      error: '',
      colors: [],
      user: null,
      user_projects: [],
      user_palettes: []
    }
  }

loginUser = async (email, password) => {
  const userInfo = { email, password };
  try {
    const userId = await getUser(userInfo);
    if(userId) {
      this.setState({ user: {
        id: userId, 
        name: email.split('@')[0]
      }});
      this.userProjects(userId);
    }
  } catch (error) {
    this.setState({ error: error.message });
  }
};

userProjects = async (userId) => {
  try {
    const projects = await getUserProjects(userId);
    if(projects.length) {
      this.setState({ user_projects: projects});
      this.userPalettes(projects);
    }
  } catch (error) {
    this.setState({ error: error.message });
  }
}

userPalettes = async (projects) => {
  try {
    let palettePromises = projects.map(async project => {
      const { id } = project;
      console.log('map id', id)
      const palette = await getUserPalettes(id);
      return palette;
    });
    const palettes = await Promise.all(palettePromises);
    this.setState({user_palettes: palettes.flat()});
  } catch (error) {
    this.setState({ error: error.message });
  }
};

signUpUser = async (email, password) => {
  const userInfo = { email, password };
  try {
    const userId = await postNewUser(userInfo)
    if(userId) {
      this.setState({
        user: {
          id: userId,
          name: email.split('@')[0]
        }
      });
    }
  } catch (error) {
    this.setState({ error: error.message })
  } 
}

  render(){
    const { error, user } = this.state;
    console.log('this.state :', this.state);
    return (
      <>
      { user && <h1>Hey, { user.name }</h1> }
      { !user && <h1> Color Picker </h1> }
      { !user && <LoginForm 
        error={error}
        loginUser={this.loginUser}
        signUpUser={this.signUpUser}
      /> }
      </>
    )
  }
}

export default App;