import { getUser, getUserProjects, getUserPalettes } from './apiCalls';

describe('api Calls', () => {
  it('should get an array of palettes, that are cleaned', () => {
    let dirtyPalettes = [{
      id: 2,
      project_id: 22,
      name: 'Warm Colors',
      hex_codes: `#FFFFFF,#FFFFFF,#FFFFFF,#FFFFFF,#FFFFFF,`
    },
    {
      id: 3,
      project_id: 23,
      name: 'Cold Colors',
      hex_codes: `#FFFFFF,#FFFFFF,#FFFFFF,#FFFFFF,#FFFFFF,`
    }];
    const expected = [{
      id: 2,
      project_id: 22,
      name: 'Warm Colors',
      colorOne: '#FFFFFF',
      colorTwo: '#FFFFFF',
      colorThree: '#FFFFFF',
      colorFour: '#FFFFFF',
      colorFive: '#FFFFFF',
    },
    {
      id: 3,
      project_id: 23,
      name: 'Cold Colors',
      colorOne: '#FFFFFF',
      colorTwo: '#FFFFFF',
      colorThree: '#FFFFFF',
      colorFour: '#FFFFFF',
      colorFive: '#FFFFFF',
    }];
    
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true, 
        json: () => Promise.resolve(dirtyPalettes)
      });
    });
    
    expect(getUserPalettes(2)).resolves.toEqual(expected);
  });
});