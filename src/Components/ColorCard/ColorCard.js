import React from 'react';
import './ColorCard.css';

export const ColorCard = ({ card, toggleColorLock}) => {
  let cardStyle = {
    background: card.color
  }

  const lockImage = card.locked ? 'Unlock' : 'Lock'
  return (
    <article style={cardStyle}>
      <button onClick={() => toggleColorLock(card.index)}>{ lockImage }</button>
      <input disabled='true' type='text' placeholder={ card.color }></input>
    </article>
  )
}

export default ColorCard;