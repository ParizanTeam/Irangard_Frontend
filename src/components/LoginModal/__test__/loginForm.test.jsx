import React from 'react';
import { LoginForm } from '../Forms';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import '@testing-library/jest-dom';

// Create a client
const queryClient = new QueryClient();

const MockLoginForm = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LoginForm />
    </QueryClientProvider>
  );
};


describe('LoginForm', () => {
  beforeEach(() => {
    render(<MockLoginForm />);
  });

  it('should render form correctly', () => {
    expect(screen.getByRole('form')).toBeVisible();
  });

  it('should render inputs correctly', () => {
    expect(screen.getAllByRole('textbox')).toHaveLength(2);
  });

  it('should render submit button correctly', () => {
    expect(screen.getByRole('button')).toBeVisible();
  });

  it('should display required error when value is invalid', async () => {
    fireEvent.submit(screen.getByRole('button'));
    expect(await screen.findAllByRole('alert')).toHaveLength(2);
  });

  it("should display matching error when password is invalid", async () => {
    fireEvent.input(screen.getByPlaceholderText("user_email"), {
      target: {
        value: "test"
      }
    });


    fireEvent.submit(screen.getByRole("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(screen.getByPlaceholderText("user_email").value).toBe("test");
  });

  it("should display min length error when password is invalid", async () => {
    fireEvent.input(screen.getByPlaceholderText("user_email"), {
      target: {
        value: "test"
      }
    });
    fireEvent.input(screen.getByPlaceholderText("password"), {
      target: {
        value: "pass"
      }
    });

    fireEvent.submit(screen.getByRole("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(screen.getByPlaceholderText("user_email").value).toBe(
      "test"
    );
    expect(screen.getByPlaceholderText("password").value).toBe("pass");
  });

  it("should not display error when value is valid", async () => {
    fireEvent.input(screen.getByPlaceholderText("user_email"), {
      target: {
        value: "test"
      }
    });

    fireEvent.input(screen.getByPlaceholderText("password"), {
      target: {
        value: "password"
      }
    });

    fireEvent.submit(screen.getByRole("button"));

    await waitFor(() => expect(screen.queryAllByRole("alert")).toHaveLength(0));
  });
});
