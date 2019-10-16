import React from 'react';
import { shallow } from 'enzyme';
import './ColorContainer.css';
import ColorContainer from './ColorContainer';

describe('Color Container', () => {
  let wrapper;
  let mockColors;
  let mockGenerateColors;
  let mockToggleColorLock;
  beforeEach(() => {
    mockColors = [
      { color: '#FFFFFF', locked: false },
      { color: '#FFFFFF', locked: false },
      { color: '#FFFFFF', locked: false },
      { color: '#FFFFFF', locked: false },
      { color: '#FFFFFF', locked: false }
    ];
    mockGenerateColors = jest.fn();
    mockToggleColorLock = jest.fn();
    wrapper = shallow(<ColorContainer 
      colors={mockColors}
      generateColors={mockGenerateColors}
      toggleColorLock={mockToggleColorLock}
    />);
  });

  it('should match the snapshot, given a set of colors', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call the generate colors function when clicked', () => {
    wrapper.find('.generate-color__container').simulate('click');
    expect(mockGenerateColors).toHaveBeenCalled();
  });
});