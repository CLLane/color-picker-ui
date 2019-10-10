import React, { Component } from 'react';
import './LoginForm.css';

export class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      newUser: false
    }
  }
  
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  clearInputs = () => {
    this.setState({
      email: '',
      password: ''
    })
  }
  
  handleLogin = e => {
    const { loginUser } = this.props;
    const { email, password } = this.state;
    e.preventDefault();
    loginUser(email, password);
    this.clearInputs();
  }

  toggleNewUser = e => {
    e.preventDefault();
    const { newUser } = this.state;
    this.setState({ newUser: !newUser })
  }

  handleSignUp = e => {
    const { signUpUser } = this.props;
    const { email, password } = this.state;
    e.preventDefault();
    signUpUser(email, password);
    this.clearInputs();
  }

  render() {
    const { email, password, newUser } = this.state;
    const { error } = this.props;
    return (
      <form>
        { !newUser && <button onClick={this.toggleNewUser}>SignUp</button>}
        { newUser && <button onClick={this.toggleNewUser}>Login</button>}
        <input type='text' value={email} placeholder='Email' name='email' onChange={this.handleChange}></input>
        <input type='password' value={password} placeholder='Password' name='password' onChange={this.handleChange}></input>
        { !newUser && <button onClick={this.handleLogin}>Login</button> }
        { newUser && <button onClick={this.handleSignUp}>Create Account</button> }
        { error && <p>Login failed, please re-enter information.</p> }
      </form>
    )
  }
}

export default LoginForm;