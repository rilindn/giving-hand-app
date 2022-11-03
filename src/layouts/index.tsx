import useAuth from 'hooks/useAuth';
import React from 'react';
import Navigation from 'routes';
import AuthLayout from './AuthLayout';
import MainLayout from './MainLayout';

const Layout: React.FC = () => {
  const { loading, isAuthenticated } = useAuth(false);

  return !loading ? (
    !isAuthenticated ? (
      <AuthLayout>
        <Navigation />
      </AuthLayout>
    ) : (
      <MainLayout>
        <Navigation />
      </MainLayout>
    )
  ) : (
    <div></div>
  );
};

export default Layout;
