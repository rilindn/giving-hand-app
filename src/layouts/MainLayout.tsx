import React from 'react';
import Header from 'components/Header/Header';
import Sidebar from 'components/Sidebar/Sidebar';

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <Sidebar />
      {children}
    </>
  );
};

interface Props {
  children: React.ReactNode;
}

export default MainLayout;
