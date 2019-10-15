import React from 'react';
import './ColorCard.css';

export const ColorCard = ({ card, toggleColorLock}) => {
  let cardStyle = {
    background: card.color,
    height: "30vh",
    width: "30vh",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    marginRight: "5px",
    marginLeft: '5px',
    padding: "20px",
    boxShadow: "4px 4px 20px black"
  };

  const lockImage = card.locked ? 'Unlock' : 'Lock'
  return (
    <article style={cardStyle}>
      <button onClick={() => toggleColorLock(card.index)}>{ lockImage }</button>
      <input disabled={true} type='text' placeholder={ card.color }></input>
    </article>
  )
}

export default ColorCard;