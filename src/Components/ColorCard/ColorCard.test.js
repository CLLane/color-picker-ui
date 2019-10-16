import React from 'react';
import { shallow } from 'enzyme';
import ColorCard from './ColorCard';
import './ColorCard.css';

describe('Color Card', () => {
  let wrapper;
  let mockCard;
  let toggleColorMock;

  beforeEach(() => {
    mockCard = {
      color: '#FFFFFF',
      locked: false, 
      index: 0
    };
    toggleColorMock = jest.fn();
    wrapper = shallow(<ColorCard 
      card={mockCard} 
      toggleColorLock={toggleColorMock} 
      key={0}
    />);
  });

  it('should match the snapshot when the card is not locked', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot when the card is locked', () => {
    mockCard = { color: '#000000', locked: true };
    wrapper = shallow(<ColorCard 
      card={mockCard} 
      toggleColorLock={jest.fn} 
      key={0}
    />);
    expect(wrapper).toMatchSnapshot();
  });

  it('call the toggle lock function when the button is clicked', () => {
    wrapper.find('img').simulate('click');
    expect(toggleColorMock).toHaveBeenCalledWith(0);
  });
});


