import React, { useState } from 'react';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginModal from '..';
import { QueryClient, QueryClientProvider } from 'react-query';

// Create a client
const queryClient = new QueryClient();

const MockLoginModal = () => {
  const [open, setOpen] = useState(true);
  return (
    <QueryClientProvider client={queryClient}>
      <LoginModal open={open} handleClose={() => setOpen(false)} />
    </QueryClientProvider>
  );
};

it('should render LoginModal component correctly', () => {
  render(<MockLoginModal />);
  expect(screen.getByTestId('login-modal')).toBeInTheDocument();
});
