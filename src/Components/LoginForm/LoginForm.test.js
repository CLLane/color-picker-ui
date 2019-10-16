import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from './LoginForm';
import './LoginForm.css';

describe('LoginForm', () => {
  let wrapper;
  let error;
  let mockClearError;
  let mockLoginUser;
  beforeEach(() => {
    mockClearError = jest.fn();
    mockLoginUser = jest.fn();
    wrapper = shallow(<LoginForm clearError={mockClearError} loginUser={mockLoginUser} />);
  });

  it('should match the snapshot that allows an existing user to login', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot that allows a new user to sign up', () => {
    wrapper.setState({ newUser: true });
    expect(wrapper).toMatchSnapshot();
  })

  it('should update state when handle change is called', () => {
    const mockEvent = {
      target: {
        name: 'email', 
        value: 'bob@gmail.com'
      }
    };
    wrapper.instance().handleChange(mockEvent);
    const expectedEmail = 'bob@gmail.com';
    expect(mockClearError).toHaveBeenCalled();
    expect(wrapper.state('email')).toEqual(expectedEmail);
  });

  it('should clear input values when called', () => {
    wrapper.setState({email: 'hi@gmailcom', password: 12345 });
    wrapper.instance().clearInputs();
    expect(wrapper.state('email')).toEqual('');
    expect(wrapper.state('password')).toEqual('');
  });

  it('should call login user with the proper email and password, and then clear inputs', () => {
    const mockEvent = {
      preventDefault: jest.fn()
    };
    wrapper.setState({email: 'bob@gmail.com', password: 12345 });
    wrapper.instance().handleLogin(mockEvent);
    expect(mockLoginUser).toHaveBeenCalledWith('bob@gmail.com', 12345);
  });

  it('it should toggle between showing a for a new or existing user', () => {
    const mockEvent = {
      preventDefault: jest.fn()
    };
    wrapper.instance().toggleNewUser(mockEvent);
    expect(wrapper.state('newUser')).toEqual(true);
  });

});