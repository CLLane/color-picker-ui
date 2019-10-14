import React, { Component } from 'react';
import './PaletteCard.css';
import { Link } from 'react-router-dom';


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
    <div>
      { error && <p>{error}</p> }
        <input type='text' onChange={this.handleChange} disabled={disabled} value={nameInput}></input>
      { disabled && <p onClick={this.editName}>Edit</p> } 
      { !disabled && <p onClick={this.saveName}>Save</p> }
      <div>{swatch}</div>
      {grabPalette && (
        <Link to="/">
          <button onClick={() => grabPalette(palette)}>Grab Palette</button>
        </Link>
      )}
      {trashPalette && (
        <button onClick={() => trashPalette(palette.id)}>Trash Can</button>
      )}
      {showPalette && (
        <button onClick={() => showPalette(palette)}>Grab Palette</button>
      )}
    </div>
  );
  }
}

export default PaletteCard;