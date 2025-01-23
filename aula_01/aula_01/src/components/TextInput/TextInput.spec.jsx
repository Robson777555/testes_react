import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextInput from '.';

describe('<TextInput />', () => {
  it('Should have a value of searchValue', () => {
    const fn = jest.fn(); // Mock da função handleChange
    render(<TextInput handleChange={fn} searchValue={'testando'} />);

    // Busca o input pelo placeholder
    const input = screen.getByPlaceholderText(/pesquise seu post aqui/i);

    // Verifica se o input está no documento
    expect(input).toBeInTheDocument();

    // Verifica se o valor do input está correto
    expect(input.value).toBe('testando');
  });

  it('Should call handleChange function on each key pressed', async () => {
    const fn = jest.fn(); // Mock da função handleChange
    let searchValue = ''; // Valor inicial vazio

    // Função para atualizar o valor do input
    const handleChange = (event) => {
      searchValue = event.target.value; // Atualiza o valor
      fn(event); // Chama a função mock
    };

    // Renderiza o componente com o valor inicial e a função de atualização
    const { rerender } = render(<TextInput handleChange={handleChange} searchValue={searchValue} />);

    // Busca o input pelo placeholder
    const input = screen.getByPlaceholderText(/pesquise seu post aqui/i);

    const value = 'O valor';

    // Simula a digitação do usuário
    for (let i = 0; i < value.length; i++) {
      await userEvent.type(input, value[i]); // Digita uma letra por vez
      rerender(<TextInput handleChange={handleChange} searchValue={searchValue} />); // Reatualiza o componente
    }

    // Verifica se a função handleChange foi chamada para cada tecla pressionada
    expect(fn).toHaveBeenCalledTimes(value.length);

    // Verifica se o valor do input foi atualizado corretamente
    expect(input.value).toBe(value);
  });

  it('Should match snapshot', () => {
    const fn = jest.fn(); // Mock da função handleChange
    const { container } = render(<TextInput handleChange={fn} searchValue={'testando'} />);

    expect(container).toMatchSnapshot();
  });
});
