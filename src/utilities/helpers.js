export const cleanPalettes = palettes => {
  return palettes.map(palette => {
    const { id, project_id } = palette;
    let hexCodes = palette.hex_codes.split(',');
    return {
      id, 
      project_id,
      colorOne: hexCodes[0],
      colorTwo: hexCodes[1],
      colorThree: hexCodes[2],
      colorFour: hexCodes[3],
      colorFive: hexCodes[4]
    };
  });
};