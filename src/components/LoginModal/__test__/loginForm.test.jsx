import React from 'react';
import { mount } from 'enzyme';
import { LoginForm } from '../Forms';

import { QueryClient, QueryClientProvider } from 'react-query';

// Create a client
const queryClient = new QueryClient();

const MockLoginForm = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LoginForm />
    </QueryClientProvider>
  );
};

const wrapper = mount(<MockLoginForm />);

test('should render LoginForm correctly', () => {
  expect(wrapper.find('form').length).toBe(1);
});

test('should render inputs correctly', () => {
  expect(wrapper.find('input').length).toBe(2);
});

test('should render submit button correctly', () => {
  expect(wrapper.find('button').length).toBe(1);
});
