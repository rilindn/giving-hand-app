import useAuth from 'hooks/useAuth';
import React from 'react';
import Navigation from 'routes';
import AuthLayout from './AuthLayout';
import MainLayout from './MainLayout';

const Layout: React.FC = () => {
  const { authData } = useAuth(false);
  return (
    <div className="Layout">
      {!authData?._id ? (
        <AuthLayout>
          <Navigation />
        </AuthLayout>
      ) : (
        <MainLayout>
          <Navigation />
        </MainLayout>
      )}
    </div>
  );
};

export default Layout;
