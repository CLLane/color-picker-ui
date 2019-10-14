import React from 'react';
import './PaletteCard.css';


export const PaletteCard = ({ palette, trashPalette }) => {
  const colors = Object.values(palette).slice(2)
  const swatch = colors.map((hex, index) => {
    const divStyle = {
      background: hex,
      height: '5vh',
      width: '5vh',
    }
    return <div style={divStyle} key={index}></div>
  })

  return (
    <div>
      <h4>{ palette.name }</h4>
      <div>
        {swatch}
      </div>
      <button onClick={() => trashPalette(palette.id)}>Trash Can</button>
    </div>
  )
}

export default PaletteCard;