import React from "react";
import "./PaletteContainer.css";
import PaletteCard from "../PaletteCard/PaletteCard";

export const PaletteContainer = ({ palettes, grabPalette, updatePaletteName }) => {
  const paletteCards = palettes.map(palette => {
    return <PaletteCard palette={palette} grabPalette={grabPalette} updatePaletteName={updatePaletteName} key={palette.id} />;
  });

  return <section>{paletteCards}</section>;
};

export default PaletteContainer;
