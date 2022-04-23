import React from 'react';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../components/Footer';

it('should render footer component correctly', () => {
  render(<Footer />);
  expect(screen.getByTestId('footer')).toBeInTheDocument();
});
