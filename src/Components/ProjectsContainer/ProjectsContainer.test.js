import React from 'react';
import { shallow } from 'enzyme';
import './ProjectsContainer.css';
import ProjectsContainer from './ProjectsContainer';

describe('Projects Container', () => {
  let wrapper;
  let mockProjects;
  let mockPalettes;
  let mockGrabPalette;
  let mockUpdatePaletteName;
  let mockUpdateProjectName;
  let mockTrashPalette;
  let mockTrashProject;
  beforeEach(() => {
    mockPalettes = [
      {
        id: 1, 
        name: 'Cool Colors',
        project_id: 12345,
        colorOne: '#FFFFFF',
        colorTwo: '#FFFFFF',
        colorThree: '#FFFFFF',
        colorFour: '#FFFFFF',
        colorFive: '#FFFFFF'
      },
      {
        id: 2, 
        name: 'Warm Colors',
        project_id: 12345,
        colorOne: '#FFFFFF',
        colorTwo: '#FFFFFF',
        colorThree: '#FFFFFF',
        colorFour: '#FFFFFF',
        colorFive: '#FFFFFF'
      }
    ];
    mockProjects = [{
      id: 12345,
      name: 'Cool Project',
      user_id: 1
    }];
    mockTrashProject = jest.fn();
    mockTrashPalette = jest.fn();
    mockGrabPalette = jest.fn();
    mockUpdatePaletteName = jest.fn();
    wrapper = shallow(<ProjectsContainer 
      projects={mockProjects}
      palettes={mockPalettes}
      showPalette={mockGrabPalette}
      updatePaletteName={mockUpdatePaletteName}
      updateProjectName={mockUpdateProjectName}
      trashProject={mockTrashProject}
      trashPalette={mockTrashPalette}
    />);
  });

  it('should match the snapshot, given a set of colors', () => {
    expect(wrapper).toMatchSnapshot();
  });

});