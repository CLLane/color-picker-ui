import { cleanPalettes, generateHexCode } from './helpers';

describe('Clean Palettes', () =>{
  it('should return a cleaned palette', () => {
    const dirtyPalettes = [{
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
      expect(cleanPalettes(dirtyPalettes)).toEqual(expected)
  });
});

describe('generateHexCode', () => {
  it('should return a 7 digit string', () => {
    const expected = '#FFFFFF';
    expect(generateHexCode()[0]).toEqual(expected[0])
    expect(generateHexCode().length).toEqual(expected.length)
  })  
});