import useAuth from 'hooks/useAuth';
import React from 'react';
import Navigation from 'routes';
import AuthLayout from './AuthLayout';
import MainLayout from './MainLayout';

const Layout: React.FC = () => {
  const { isAuthenticated } = useAuth(false);
  return !isAuthenticated ? (
    <AuthLayout>
      <Navigation />
    </AuthLayout>
  ) : (
    <MainLayout>
      <Navigation />
    </MainLayout>
  );
};

export default Layout;
