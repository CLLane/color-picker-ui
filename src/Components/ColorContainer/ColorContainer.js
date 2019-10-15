import React from "react";
import ColorCard from "../ColorCard/ColorCard";
import "./ColorContainer.css";

export const ColorContainer = ({ colors, generateColors, toggleColorLock }) => {
  const colorCards = colors.map((card, index) => {
    return (
      <ColorCard 
      card={ {...card, index} } 
      toggleColorLock={toggleColorLock} 
      key={index} 
      />
    );
  });

  return (
    <>
      <section className='palette-container__section'>
        {colorCards}
      </section>
      <button onClick={generateColors}>Generate New Colors</button>
    </>
  );
};

export default ColorContainer;
