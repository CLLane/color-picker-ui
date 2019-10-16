import React from 'react';
import { shallow } from 'enzyme';
import AllPaletteCard from './AllPaletteCard';
import './AllPaletteCard.css';

describe('AllPalette Card', () => {
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
    wrapper = shallow (<AllPaletteCard 
      palette={mockPalette}
      trashPalette={mockTrashPalette}
      grabPalette={mockGrabPalette}
      showPalette={mockShowPalette}
    />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should be able to pass the palette to the grabPalette function', () => {
    wrapper.find('.swatch-expand__img').simulate('click');
    expect(mockGrabPalette).toHaveBeenCalledWith(mockPalette);
  });
});