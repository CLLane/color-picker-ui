import React from 'react';
import { shallow } from 'enzyme';
import ProjectCard from './PaletteCard';
import './ProjectCard.css';

describe('Project Card', () => {
  let wrapper;
  let mockProject;
  let mockPalettes;
  let mockShowPalette;
  let mockUpdatePaletteName;
  let mockTrashPalette;
  beforeEach(() => {
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
    mockTrashPalette = jest.fn();
    mockGrabPalette = jest.fn();
    mockShowPalette = jest.fn();
    wrapper = shallow (<PaletteCard 
      palette={mockPalette}
      trashPalette={mockTrashPalette}
      grabPalette={mockGrabPalette}
      showPalette={mockShowPalette}
    />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should allow the user to edit the name of the palette', () => {

  });

  it('should allow the use to save the name of palette', () => {

  });

  it('should update the palette name with what a user entered', () => {
    const mockEvent = {
      target: {
        value: 'amazing palette'
      }
    };
    wrapper.instance().handleChange(mockEvent);
    expect(wrapper.state('nameInput')).toEqual('amazing palette');
  });


});