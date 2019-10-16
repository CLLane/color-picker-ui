import React from 'react';
import { shallow } from 'enzyme';
import ProjectForm from './ProjectForm';
import './ProjectForm.css';

describe('LoginForm', () => {
  let wrapper;
  let mockError;
  let mockProject;
  let mockProjects;
  let mockUpdateCurrentProject;
  let mockHandleSubmission;
  beforeEach(() => {
    mockProjects = [{
      id: 12345,
      name: 'Cool Project',
      user_id: 1
    }];
    mockProject = {
      id: 12345,
      name: 'Cool Project',
      user_id: 1
    };
    mockError = '';
    mockUpdateCurrentProject = jest.fn();
    mockHandleSubmission = jest.fn();
    wrapper = shallow(<ProjectForm
      error={mockError}
      currentProject={mockProject} 
      projects={mockProjects}
      updateCurrentProject={mockUpdateCurrentProject} 
      handleSubmission={mockHandleSubmission} 
      />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should update state when handle name change is called', () => {
    const mockEvent = {
      target: {
        name: 'projectName', 
        value: 'cool project'
      }
    };
    wrapper.instance().handleNameChange(mockEvent);
    const expectedProject = 'cool project';
    expect(wrapper.state('projectName')).toEqual(expectedProject);
  });

  it('should set state to new-project when select project is called, and set the current project to null on App', () => {
    wrapper.setState({select: 'bob'});
    wrapper.instance().selectProject('new-project');
    const expectedState = 'new-project';
    expect(mockUpdateCurrentProject).toHaveBeenCalledWith(null);
    expect(wrapper.state('select')).toEqual(expectedState);
  });

  it('if a project exists, it should set the project name to state', () => {
    wrapper.setState({select: 'cool project', paletteName:'cool palette'});
    const mockEvent = {
      preventDefault: jest.fn()
    };
    wrapper.instance().handleSubmit(mockEvent);
    expect(mockHandleSubmission).toHaveBeenCalledWith('cool project', 'cool palette')
  });

});