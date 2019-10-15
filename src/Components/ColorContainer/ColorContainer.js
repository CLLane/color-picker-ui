import React from "react";
import ColorCard from "../ColorCard/ColorCard";
import "./ColorContainer.css";
import newColors from '../../Images/generateColors.svg';

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
    <div className='color-container'>
      <section className='palette-container__section'>
        {colorCards}
      </section>
      <div className='generate-color__container'>
        <img className='generate-color__image' src={newColors} alt='generate colors' onClick={generateColors}/>
        <p className='generate-colors__paragraph'>Generate Colors</p>
      </div>
    </div>
  );
};

export default ColorContainer;
