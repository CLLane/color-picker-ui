import React, { Component } from 'react';
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
  render(){
    return (
      <h1>Hey</h1>
    )
  }
}

export default App;