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
    const { clearError } = this.props;
    clearError();
    this.setState({ [e.target.name]: e.target.value });
  };

  clearInputs = () => {
    this.setState({
      email: '',
      password: ''
    });
  };
  
  handleLogin = e => {
    const { loginUser } = this.props;
    const { email, password } = this.state;
    e.preventDefault();
    loginUser(email, password);
    this.clearInputs();
  };

  toggleNewUser = e => {
    e.preventDefault();
    const { newUser } = this.state;
    this.setState({ newUser: !newUser });
  };

  handleSignUp = e => {
    const { signUpUser } = this.props;
    const { email, password } = this.state;
    e.preventDefault();
    signUpUser(email, password);
    this.clearInputs();
  };

  render() {
    const { email, password, newUser } = this.state;
    const { error } = this.props;
    return (
      <form className='sign-in_form'>
        <input type='text' value={email} placeholder='Email' name='email' onChange={this.handleChange}></input>
        <input type='password' value={password} placeholder='Password' name='password' onChange={this.handleChange}></input>
        { !newUser && <button onClick={this.handleLogin}>{<img src="https://fontmeme.com/permalink/191011/8b36e600f13d2e8bca6002973f735b84.png" alt="graffiti-fonts" border="0"/>}</button> }
        {newUser && <button onClick={this.handleSignUp}>{<img src="https://fontmeme.com/permalink/191011/8e4934228d7a5e0d23888f81c63bcfcd.png" alt="graffiti-fonts" border="0"/>}</button> }
        {newUser && <button onClick={this.toggleNewUser}>{<img src="https://fontmeme.com/permalink/191011/638e3f86d1ed72f908e3e5c26e09a2f5.png" alt="Sign In" border="0"/>}</button>}
        { error && <p>Login failed, please re-enter information.</p> }
        {!newUser && <button onClick={this.toggleNewUser}>{<img src="https://fontmeme.com/permalink/191011/1857f34f8065b95bfa5d7c167f12c23d.png" alt="graffiti-fonts" border="0"/>}</button>}
      </form>
    );
  };
};

export default LoginForm;