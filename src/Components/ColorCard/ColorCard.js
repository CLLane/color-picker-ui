import React from 'react';
import './ColorCard.css';

export const ColorCard = ({ card, toggleColorLock}) => {
  let cardStyle = {
    background: card.color,
    display: 'flex',
    flexDirection: 'column',
    width: '30vh',
    height: '30vh',
    justifyContent: 'flex-end',
    borderRadius: '8px',
    alignItems: 'center'
  }

  const lockImage = card.locked ? 'Unlock' : 'Lock'
  return (
    <article style={cardStyle}>
      <button onClick={() => toggleColorLock(card.index)}>{ lockImage }</button>
      <input disabled={true} type='text' placeholder={ card.color }></input>
    </article>
  )
}

export default ColorCard;