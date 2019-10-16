import React from "react";
import "./AllPaletteContainer.css";
import AllPaletteCard from "../AllPaletteCard/AllPaletteCard";

export const AllPaletteContainer = ({ palettes, grabPalette}) => {
  const paletteCards = palettes.map(palette => {
    return <AllPaletteCard palette={palette} grabPalette={grabPalette} key={palette.id} />;
  });

  return <section className='all-palette__container'>{paletteCards}</section>;
};

export default AllPaletteContainer;
