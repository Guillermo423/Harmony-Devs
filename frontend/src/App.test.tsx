import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { screen } = render(<App />); // Importa screen como una función dentro de render
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});