import React from "react";
import ColorCard from "../ColorCard/ColorCard";
import "./ColorContainer.css";

export const ColorContainer = ({ colors, generateColors }) => {
  const colorCards = colors.map((card, index) => {
    return <ColorCard card={card} key={index} />;
  });

  return (
  <section>
    {colorCards}
    <button onClick={ generateColors }>Generate New Colors</button>
  </section>
  );
};

export default ColorContainer;