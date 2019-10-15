import React from 'react';
import { shallow, maount } from 'enzyme';
import { MemoryRouter } from 'react-router'
import App from './App';
import './App.css';
import LoginForm from "../LoginForm/LoginForm";
import ColorContainer  from "../ColorContainer/ColorContainer";
import ProjectForm from "../ProjectForm/ProjectForm";
import ProjectsContainer from "../ProjectsContainer/ProjectsContainer";
import PaletteContainer from "../PaletteContainer/PaletteContainer";

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });
  
  it('Should match the snapshot with the proper data passed in.', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
