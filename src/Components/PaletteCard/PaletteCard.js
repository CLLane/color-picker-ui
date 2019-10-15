import React, { Component } from 'react';
import './PaletteCard.css';
import { Link } from 'react-router-dom';
import editIcon from "../../Images/editIcon.svg";
import trashIcon from "../../Images/trashIcon.svg";
import expandIcon from '../../Images/expandIcon.svg';
import saveIcon from '../../Images/saveIcon.svg';


export class PaletteCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameInput: props.palette.name,
      disabled: true,
      error: ''
    }
  }

  editName = () => {
    this.setState({ disabled: false });
  };

  saveName = async () => {
    const { palette, updatePaletteName } = this.props;
    const { nameInput } = this.state;
    const newPalette = {
      ...palette,
      name: nameInput
    };
    updatePaletteName(newPalette);
    this.setState({ disabled: true});
  };

  handleChange = (e) => {
    this.setState({ nameInput: e.target.value})
  };


  render() {
  const { palette, trashPalette, grabPalette, showPalette } = this.props;
  const { nameInput, disabled, error } = this.state;
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
        <div className='palette__container'>
          {error && <p>{error}</p>}
          <input
            type="text"
            onChange={this.handleChange}
            disabled={disabled}
            value={nameInput}
          ></input>
          {disabled && <img src={editIcon} alt='edit palette' onClick={this.editName}/>}
          {!disabled && <img src={saveIcon} alt='save icon' onClick={this.saveName}/>}
          <div className='swatch__container'>
            {swatch}
            {grabPalette && (
              <Link to="/">
                <img src={expandIcon} alt='expand palette' onClick={() => grabPalette(palette)}/>
              </Link>
            )}
            {trashPalette && (
              <img src={trashIcon} alt='delete palette' onClick={() => trashPalette(palette.id)}/>
            )}
            {showPalette && (
              <img src={expandIcon} alt='expand palette' onClick={() => showPalette(palette)}/>
            )}
          </div>
        </div>
      );
  }
}

export default PaletteCard;