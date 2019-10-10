import React, { Component } from 'react';
import './LoginForm.css';

export class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    }
  }
  
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  handleLogin = e => {
    const { loginUser } = this.props;
    const { email, password } = this.state;
    e.preventDefault();
    loginUser(email, password);
    this.setState({
      email: '',
      password: ''
    })
  }

  render() {
    const { email, password } = this.state;
    return (
      <form>
        <input type='text' value={email} placeholder='Email' name='email' onChange={this.handleChange}></input>
        <input type='password' value={password} placeholder='Password' name='password' onChange={this.handleChange}></input>
        <button onClick={this.handleLogin}>Login</button>
      </form>
    )
  }
}

export default LoginForm;