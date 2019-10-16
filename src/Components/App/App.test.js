import React from 'react';
import { shallow, maount } from 'enzyme';
import { MemoryRouter } from 'react-router'
import App from './App';
import './App.css';

describe('App', () => {
  let wrapper;
  let mockUser;
  let mockProject;

  beforeEach(() => {
    wrapper = shallow(<App />);
    mockUser = {
      id: 1, 
      name: 'Bob'
    };
    mockProject = { id: 10, name: 'Cool project'};
    wrapper.setState({user: mockUser, currentProject: mockProject, user_projects: [mockProject] })
    window.fetch = jest.fn();
  });


  it('Should match the snapshot with the proper data passed in.', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should start with an array of 5 random colors', () => {
    expect(wrapper.state('colors').length).toEqual(5);
  });

  it('should be able to login a user and set the user to state', async () => {
    const mockUserInfo = { email: 'bob@gmail.com', password: 12345}
    const options = {
      method: 'POST',
      body: JSON.stringify(mockUserInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const url = 'http://localhost:3001/user/login';
    wrapper.instance().loginUser('bob@gmail.com', 12345);
    expect(window.fetch).toHaveBeenCalledWith(url, options);
  });

  it('should fetch palettes with the proper project id', async () => {
    window.fetch = jest.fn();
    await wrapper.instance().userPalettes([{id: 1}]);
    expect(window.fetch).toHaveBeenCalled();
  });

  it('should fetch projects with the proper user id', async () => {
    await wrapper.instance().userProjects(1);
    const url = 'http://localhost:3001/projects/1';
    expect(window.fetch).toHaveBeenCalledWith(url);
  });

  it('should try to sign up a user', async () => {
    const mockUserInfo = { email: 'bob@gmail.com', password: 12345}
    const options = {
      method: 'POST',
      body: JSON.stringify(mockUserInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const url = 'http://localhost:3001/user/signup';
    wrapper.instance().signUpUser('bob@gmail.com', 12345);
    expect(window.fetch).toHaveBeenCalledWith(url, options);
  });

  it('should generate a new random set of colors', () => {
    const oldColors = wrapper.state('colors');
    wrapper.instance().generateColors();
    const newColors = wrapper.state('colors');
    expect(newColors).not.toEqual(oldColors);
  });

  it('should toggle the locked property of a color, given the index', () => {
    const colorObj = wrapper.state('colors')[0];
    const expected = {...colorObj, locked: true};
    wrapper.instance().toggleColorLock(0);
    const updatedColorObj = wrapper.state('colors')[0];
    expect(updatedColorObj).toEqual(expected);
  });

  it('should try to create a new project given info', () => {
    wrapper.instance().createProject({name: 'test'});
    const options = {
      method: 'POST',
      body: JSON.stringify({name: 'test'}),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const url = 'http://localhost:3001/projects';
    expect(window.fetch).toHaveBeenCalledWith(url, options);
  });

  it('should try to create a new palette given info', () => {
    wrapper.instance().createPalette({name: 'test'});
    const options = {
      method: 'POST',
      body: JSON.stringify({name: 'test'}),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const url = 'http://localhost:3001/palettes';
    expect(window.fetch).toHaveBeenCalledWith(url, options);
  });

  it('it should logout a user', () => {
    wrapper.setState({user: {id: 1, name: 'Bob'}})
    wrapper.instance().logoutUser();
    expect(wrapper.state('user')).toEqual(null);
  });

  it('should try to delete a palette, given an id', async () => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const url = `http://localhost:3001/palettes/1`;
    await wrapper.instance().trashPalette(1);
    expect(window.fetch).toHaveBeenCalledWith(url, options);
  });

  it('should try to delete a project, given an id', async () => {
    wrapper.setState({user: {id:2, name: 'Bob'}});
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const url = `http://localhost:3001/projects/1`
    await wrapper.instance().trashProject(1);
    expect(window.fetch).toHaveBeenCalledWith(url, options);
  });

  it('should try to get all palettes', async () => {
    const url = 'http://localhost:3001/palettes'
    await wrapper.instance().allPalettes();
    expect(window.fetch).toHaveBeenCalledWith(url);
  })

  it('should update the current colors array, given a palette', () => {
    const mockPalette = {
      id: 1, 
      name: 'Cool Colors',
      project_id: '12345',
      colorOne: '#123456',
      colorTwo: '#123456',
      colorThree: '#123456',
      colorFour: '#123456',
      colorFive: '#123456'
    };
    const expected = [
      {color: '#123456', locked: true},
      {color: '#123456', locked: true},
      {color: '#123456', locked: true},
      {color: '#123456', locked: true},
      {color: '#123456', locked: true},
    ];
    wrapper.instance().grabPalette(mockPalette);
    expect(wrapper.state('colors')).toEqual(expected);
  });

  it('it should clear the error message', () => {
    wrapper.setState({error: 'test error'});
    wrapper.instance().clearError();
    expect(wrapper.state('error')).toEqual('');
  });

  it('should set the given project to state', () => {
    const mockProject = {id: 1, name: 'Cool project'};
    wrapper.instance().updateCurrentProject(mockProject);
    expect(wrapper.state('currentProject')).toEqual(mockProject);
  });

  it('should try to edit the name of a project', () => {
    const mockProject = { id: 2, name: 'New' };
    const options = {
      method: 'PATCH',
      body: JSON.stringify(mockProject),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const url = `http://localhost:3001/projects/2`;
    wrapper.instance().updateProjectName(mockProject);
    expect(window.fetch).toHaveBeenCalledWith(url, options);
  });

  it('should try to edit the name of a palette', () => {
    const mockPalette = { id: 2, name: 'New' };
    const options = {
      method: 'PATCH',
      body: JSON.stringify(mockPalette),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const url = `http://localhost:3001/palettes/2`;
    wrapper.instance().updatePaletteName(mockPalette);
    expect(window.fetch).toHaveBeenCalledWith(url, options);
  });

  it('should check if a project exists on the user before adding a palette', async () => {
    const colors = wrapper.state('colors');
    const hex_codes = colors.map(colorObj => colorObj.color).join();
    const mockPaletteInfo = { project_id: 10, hex_codes, name: 'Cool Palette' };
    wrapper.instance().handleSubmission('Cool project', 'Cool Palette');
      const options = {
        method: 'POST',
        body: JSON.stringify(mockPaletteInfo),
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const newPaletteUrl = 'http://localhost:3001/palettes';
      expect(window.fetch).toHaveBeenCalledWith(newPaletteUrl, options);
  });

  it('should create a new project before adding a palette, if the project does not exist', () => {
    const mockUser = wrapper.state('user');
    const mockProjectInfo = {
      user_id: mockUser.id,
      name: 'uncool project'
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(mockProjectInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const projectUrl = 'http://localhost:3001/projects';
    wrapper.instance().handleSubmission('uncool project', 'uncool palette');
    expect(window.fetch).toHaveBeenCalledWith(projectUrl, options);
  })

});
