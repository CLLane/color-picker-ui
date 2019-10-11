import React from 'react';
import './ColorCard.css';

export const ColorCard = ({ card, toggleColorLock}) => {
  let cardStyle = {
    background: card.color
  }
  return (
    <article style={cardStyle}>
      {card.locked && <button onClick={() => toggleColorLock(card.index)}>Unlock</button>}
      {!card.locked && <button onClick={() => toggleColorLock(card.index)}>Lock</button>}
      <input type='text' placeholder={ card.color }></input>
    </article>
  )
}

export default ColorCard;