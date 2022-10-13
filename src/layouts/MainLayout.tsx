import React from 'react';

interface Props {
  children: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      MainLayout
      {children}
    </div>
  );
};

export default MainLayout;
