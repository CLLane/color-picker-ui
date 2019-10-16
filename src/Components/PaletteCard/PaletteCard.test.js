import React from 'react';
import { shallow } from 'enzyme';
import PaletteCard from './PaletteCard';
import './PaletteCard.css';

describe('Palette Card', () => {
  let wrapper;
  let mockPalette;
  let mockTrashPalette;
  let mockGrabPalette;
  let mockShowPalette;
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