import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const TextInput = ({ searchValue, handleChange }) => {
  return (
    <input
      className="text-input"
      onChange={handleChange} // Atualiza o valor quando o usuário digita
      value={searchValue} // Valor controlado pela prop searchValue
      type="search"
      placeholder="Pesquise seu post aqui !"
    />
  );
};

// Validação das props
TextInput.propTypes = {
  searchValue: PropTypes.string.isRequired, // searchValue deve ser uma string e é obrigatório
  handleChange: PropTypes.func.isRequired, // handleChange deve ser uma função e é obrigatório
};

export default TextInput;
