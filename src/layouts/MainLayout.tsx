import React from 'react';

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <header className="Layout-header">
        <p>Hello from Rilind</p>
      </header>
      {children}
    </>
  );
};

interface Props {
  children: React.ReactNode;
}

export default MainLayout;
