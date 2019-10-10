import React, { Component } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { getUser, getUserProjects, getUserPalettes } from "../../utilities/apiCalls";
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
    this.setState({error: error.message})
  }
};

userProjects = async(userId) => {
  try {
    const projects = await getUserProjects(userId);
    console.log(projects)
    if(projects.length) {
      this.setState({ user_projects: projects})
    }
  } catch (error) {
    this.setState({error: error.message})
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
      /> }
      </>
    )
  }
}

export default App;