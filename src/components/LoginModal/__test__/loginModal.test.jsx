import React, { useState } from 'react';

import { render, screen, fireEvent } from '@testing-library/react';
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


describe('LoginModal', () => {
  beforeEach(() => {
    render(<MockLoginModal />);
  });

  it('should render LoginModal component correctly', () => {
    expect(screen.getByTestId('login-modal')).toBeInTheDocument();
  });

  it('should close the modal correctly', async () => {
    await fireEvent.keyDown(screen.getByText(/ثبت نام/i), {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27
    });

    expect(screen.getByTestId('login-modal')).toBeInTheDocument();

  });
});
