import React from 'react';
import './ColorCard.css';
import unlockedIcon from '../../Images/unlockedIcon.svg';
import lockedIcon from '../../Images/lockedIcon.svg';

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

  const lockImage = card.locked ? lockedIcon : unlockedIcon;
  return (
    <article style={cardStyle}>
      <img
        src={lockImage}
        alt="unlocked"
        onClick={() => toggleColorLock(card.index)}
      />
      <input className='hex-code__input' disabled={true} type="text" placeholder={card.color}></input>
    </article>
  );
}

export default ColorCard;