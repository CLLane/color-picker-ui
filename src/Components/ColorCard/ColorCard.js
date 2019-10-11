import React from 'react';
import './ColorCard.css';

export const ColorCard = ({ card }) => {
  let cardStyle = {
    background: card.color
  }
  return (
    <article style={cardStyle}>
      hi
    </article>
  )
}

export default ColorCard;