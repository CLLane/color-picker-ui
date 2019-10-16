import React from 'react';
import './AllPaletteCard.css';
import { Link } from 'react-router-dom';
import expandIcon from '../../Images/expandIcon.svg';

export const AllPaletteCard = ({ palette, grabPalette }) => {
  const colors = Object.values(palette).slice(3)
  const swatch = colors.map((hex, index) => {
    const divStyle = {
      background: hex,
      height: '15vh',
      width: '15vh',
      borderRadius: '8px',
      marginRight: '2.5px',
      marginLeft: '2.5px',
      marginTop: '3px',
    }
    return <div style={divStyle} key={index}></div>
  })


  return (
          <div className='all-swatch__container'>
            <p className='swatch-name__paragraph'>{palette.name}</p>
            <div className='inner-swatch__container'>
              {swatch}
            </div>
              <Link to="/">
                <img className='swatch-expand__img' src={expandIcon} alt='expand palette' onClick={() => grabPalette(palette)}/>
              </Link>
          </div>
  )
}

export default AllPaletteCard;