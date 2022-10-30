import React from 'react';
import Header from 'components/Header/Header';

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

interface Props {
  children: React.ReactNode;
}

export default MainLayout;
