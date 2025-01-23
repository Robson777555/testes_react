import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '.';

describe('<Button />', () => {
  it('should render the button with the text', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(<Button text="Click me" onClick={onClickMock} />);

    // Verifica se o botão foi renderizado com o texto correto
    const buttonWithText = getByText('Click me');
    console.log('Botão renderizado:', buttonWithText); // Verifique se o botão está sendo renderizado
    expect(buttonWithText).toBeInTheDocument();
  });

  it('should call function on button click', async () => {
    const fn = jest.fn(() => {
      console.log('Função onClick foi chamada!'); // Verifique se a função é chamada
    });
    render(<Button text="Load more" onClick={fn} />);

    // Encontra o botão pelo texto
    const button = screen.getByRole('button', { name: /load more/i });

    // Simula o clique no botão
    await userEvent.click(button);

    // Verifica se a função foi chamada uma vez
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled is true', async () => {
    render(<Button text="Load more" disabled={true} />);

    const button = screen.getByRole('button', { name: /load more/i });

    expect(button).toBeDisabled();
  });

  it('should be enabled when disabled is false', async () => {
    render(<Button text="Load more" disabled={false} />);

    const button = screen.getByRole('button', { name: /load more/i });

    expect(button).toBeEnabled();
  });

  it('should match snapshot', async () => {
    const { container } = render(<Button text="Load more" disabled={false} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
