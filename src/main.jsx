import React from 'react';
import ReactDOM from 'react-dom';
import './theme/main.scss';
import AppRouter from './routes/AppRouter';

import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './context/AuthContext';

// Create a client
const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
