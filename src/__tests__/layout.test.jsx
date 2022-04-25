import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

// Create a client
const queryClient = new QueryClient();

const MockHeader = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Header />
      </QueryClientProvider>
    </BrowserRouter>
  );
};

describe('tests related to layout', () => {
  it('should render footer component correctly', () => {
    render(<Footer />);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('should render header component correctly', () => {
    render(<MockHeader />);
    expect(screen.getByTestId('main-navbar')).toBeInTheDocument();
  });

  it('should render logo component in header correctly', () => {
    render(<MockHeader />);
    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });

  it('should render categories in navbar correctly', () => {
    render(<MockHeader />);
    expect(screen.getByTestId('second-navbar')).toBeInTheDocument();
  });

  it('should render four categories in navbar', () => {
    render(<MockHeader />);
    expect(screen.getAllByTestId('second-navbar-item').length).toBe(4);
  });

  it('should call the onClick function when login modal btn is clicked', () => {
    render(<MockHeader />);
    const loginModalBtnElement = screen.getByTestId('login-modal-btn');
    expect(loginModalBtnElement).toBeInTheDocument();
    fireEvent.click(loginModalBtnElement);
    expect(screen.getByTestId('login-form-dialog-content')).toBeInTheDocument();
  });
});
