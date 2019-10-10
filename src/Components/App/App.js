import React, { Component } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { getUser } from "../../utilities/apiCalls";
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
  const userId = await getUser(userInfo);
  if(userId) {
    this.setState({user: {
      id: userId.id, 
      name: email.split('@')[0]
    }})
  }
}

  render(){
    console.log('this.state :', this.state);
    return (
      <>
      <h1>Hey</h1>
      <LoginForm 
        loginUser={this.loginUser}
      />
      </>
    )
  }
}

export default App;