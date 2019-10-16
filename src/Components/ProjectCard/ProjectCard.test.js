import React from 'react';
import { shallow } from 'enzyme';
import ProjectCard from './ProjectCard';
import './ProjectCard.css';

describe('Project Card', () => {
  let wrapper;
  let mockProject;
  let mockPalette;
  let mockPalettes;
  let mockShowPalette;
  let mockUpdateProjectName;
  let mockUpdatePaletteName;
  let mockTrashPalette;
  let mockGrabPalette;
  let mockTrashProject;
  beforeEach(() => {
    mockPalettes = [{
      id: 1, 
      name: 'Cool Colors',
      project_id: '12345',
      colorOne: '#FFFFFF',
      colorTwo: '#FFFFFF',
      colorThree: '#FFFFFF',
      colorFour: '#FFFFFF',
      colorFive: '#FFFFFF'
    },
    ];
    mockPalette = {
      id: 1, 
      name: 'Cool Colors',
      project_id: '12345',
      colorOne: '#FFFFFF',
      colorTwo: '#FFFFFF',
      colorThree: '#FFFFFF',
      colorFour: '#FFFFFF',
      colorFive: '#FFFFFF'
    };
    mockProject = {
      id: 12345,
      name: 'Cool Project',
      user_id: 1
    };
    mockUpdateProjectName = jest.fn();
    mockUpdatePaletteName = jest.fn();
    mockTrashPalette = jest.fn();
    mockGrabPalette = jest.fn();
    mockShowPalette = jest.fn();
    mockUpdatePaletteName = jest.fn();
    wrapper = shallow(<ProjectCard 
      project={mockProject}
      palette={mockPalette}
      palettes={mockPalettes}
      trashPalette={mockTrashPalette}
      trashProject={mockTrashProject}
      grabPalette={mockGrabPalette}
      showPalette={mockShowPalette}
      updateProjectName={mockUpdateProjectName}
      updatePaletteName={mockUpdatePaletteName}
    />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot when the project name is edittable', () => {
    wrapper.setState({disabled: false});
    expect(wrapper).toMatchSnapshot();

  });
  
  it('should allow the user to edit a project', () => {
    wrapper.find('img').at(0).simulate('click');
    expect(wrapper.state('disabled')).toEqual(false);
  });

  it('should allow the user to edit the name of the project', () => {
    wrapper.setState({ nameInput: 'Bob', disabled: false });
    wrapper.find('img').at(0).simulate('click');
    expect(mockUpdateProjectName).toHaveBeenCalledWith({...mockProject, name: 'Bob'})
  });


  it('should update the project name with what a user entered', () => {
    const mockEvent = {
      target: {
        value: 'amazing palette'
      }
    };
    wrapper.instance().handleChange(mockEvent);
    expect(wrapper.state('nameInput')).toEqual('amazing palette');
  });


});