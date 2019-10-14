import React from 'react';
import trashIcon from '../../Images/trash.svg'
import './PaletteCard.css';


export const PaletteCard = ({ palette }) => {
  const colors = Object.values(palette).slice(2)
  console.log('palette', palette)
  const swatch = colors.map((hex, index) => {
    const divStyle = {
      background: hex,
      height: '5vh',
      width: '5vh',
      borderRadius: '10% 30% 50% 70%'
      
      
    }
    return <div style={divStyle} key={index}></div>
  })

  return (
    <div>
      <h4>{ palette.name }</h4>
      <div className='palette-div'>
        {swatch}
      <img src={trashIcon} alt='trash icon'/>
      </div>
    </div>
  )
}

export default PaletteCard;