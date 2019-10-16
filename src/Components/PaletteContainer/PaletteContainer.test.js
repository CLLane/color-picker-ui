import React from 'react';
import { shallow } from 'enzyme';
import './PaletteContainer.css';
import PaletteContainer from './PaletteContainer';

describe('Palette Container', () => {
  let wrapper;
  let mockPalettes;
  let mockGrabPalette;
  let mockUpdatePaletteName;
  beforeEach(() => {
    mockPalettes = [
      {
        id: 1, 
        name: 'Cool Colors',
        project_id: '12345',
        colorOne: '#FFFFFF',
        colorTwo: '#FFFFFF',
        colorThree: '#FFFFFF',
        colorFour: '#FFFFFF',
        colorFive: '#FFFFFF'
      },
      {
        id: 2, 
        name: 'Warm Colors',
        project_id: '12345',
        colorOne: '#FFFFFF',
        colorTwo: '#FFFFFF',
        colorThree: '#FFFFFF',
        colorFour: '#FFFFFF',
        colorFive: '#FFFFFF'
      }
    ];
    mockGrabPalette = jest.fn();
    mockUpdatePaletteName = jest.fn();
    wrapper = shallow(<PaletteContainer 
      palettes={mockPalettes}
      grabPalette={mockGrabPalette}
      updatePaletteName={mockUpdatePaletteName}
    />);
  });

  it('should match the snapshot, given a set of colors', () => {
    expect(wrapper).toMatchSnapshot();
  });

});