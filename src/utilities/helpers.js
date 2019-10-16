export const cleanPalettes = palettes => {
  return palettes.map(palette => {
    const { id, project_id, name } = palette;
    let hexCodes = palette.hex_codes.split(',');
    return {
      id, 
      project_id,
      name,
      colorOne: hexCodes[0],
      colorTwo: hexCodes[1],
      colorThree: hexCodes[2],
      colorFour: hexCodes[3],
      colorFive: hexCodes[4]
    };
  });
};

export const generateHexCode = (hexbase = ['#']) => {
  let hexCodeValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F']

    let index = Math.floor(Math.random() * 15)
    if (hexbase.length === 7) {
      return hexbase.join('');
    } else {
      hexbase.push(hexCodeValues[index]);
      return generateHexCode(hexbase);
    };
}