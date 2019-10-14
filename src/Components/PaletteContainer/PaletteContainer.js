import React from "react";
import "./PaletteContainer.css";
import PaletteCard from "../PaletteCard/PaletteCard";

export const PaletteContainer = ({ palettes }) => {
  const paletteCards = palettes.map(palette => {
    return <PaletteCard palette={palette} key={palette.id} />;
  });

  return <section>{paletteCards}</section>;
};

export default PaletteContainer;
