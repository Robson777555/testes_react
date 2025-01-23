import React from "react";
import { render, screen } from '@testing-library/react';
import { Home } from '.';

describe('<Home />', () => {
  it('should render search, posts and load more', async () => {
    render(<Home />);

    // Aguarda a renderização dos posts
    const posts = await screen.findAllByRole('article');
    expect(posts).toHaveLength(3);
  });
});
