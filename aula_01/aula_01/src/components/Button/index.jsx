import './styles.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
export class Button extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool, // Adicionando a propriedade disabled
  };
  render() {
    const { text, onClick, disabled } = this.props; // Desestruturando a propriedade disabled
    return (
      <button
        className="button"
        onClick={onClick}
        disabled={disabled} // Usando a propriedade disabled aqui
      >
        {text}
      </button>
    );
  }
}
