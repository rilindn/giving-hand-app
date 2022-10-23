import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';

import { AuthContextProvider } from './contexts/AuthContext';
import theme from './theme/mui';
import Layout from './layouts/index';

const App: React.FC = () => {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
    >
      <ThemeProvider theme={theme}>
        <AuthContextProvider>
          <Layout />
        </AuthContextProvider>
      </ThemeProvider>
    </SnackbarProvider>
  );
};

export default App;
