import React from 'react';
import { SignupForm } from '../Forms';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import '@testing-library/jest-dom';

// Create a client
const queryClient = new QueryClient();

const MockSignupForm = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SignupForm />
    </QueryClientProvider>
  );
};


describe('SignupForm', () => {
  beforeEach(() => {
    render(<MockSignupForm />);
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

  it("should display matching error when email is empty", async () => {
    fireEvent.input(screen.getByPlaceholderText("username"), {
      target: {
        value: "test"
      }
    });

    fireEvent.submit(screen.getByRole("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(screen.getByPlaceholderText("username").value).toBe("test");
  });

  it("should display error when email is invalid", async () => {
    fireEvent.input(screen.getByPlaceholderText("username"), {
      target: {
        value: "test"
      }
    });
    fireEvent.input(screen.getByPlaceholderText("email"), {
      target: {
        value: "email"
      }
    });

    fireEvent.submit(screen.getByRole("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(screen.getByPlaceholderText("username").value).toBe(
      "test"
    );
    expect(screen.getByPlaceholderText("email").value).toBe("email");
  });

  it("should not display error when value is valid", async () => {
    fireEvent.input(screen.getByPlaceholderText("username"), {
      target: {
        value: "test"
      }
    });

    fireEvent.input(screen.getByPlaceholderText("email"), {
      target: {
        value: "email@gmail.com"
      }
    });

    fireEvent.submit(screen.getByRole("button"));

    await waitFor(() => expect(screen.queryAllByRole("alert")).toHaveLength(0));
  });
});
