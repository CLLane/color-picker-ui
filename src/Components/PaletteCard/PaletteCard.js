import React from 'react';
import './PaletteCard.css';
import { Link } from 'react-router-dom';


export const PaletteCard = ({ palette, trashPalette, grabPalette }) => {
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
      <h4>{palette.name}</h4>
      <div>{swatch}</div>
      {grabPalette && (
        <Link to='/'>
          <button onClick={() => grabPalette(palette)}>Grab Palette</button>
        </Link>
      )}
     {trashPalette && <button onClick={() => trashPalette(palette.id)}>Trash Can</button>}
    </div>
  );
}

export default PaletteCard;