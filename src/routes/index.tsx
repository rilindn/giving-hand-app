import { Routes, Route } from 'react-router-dom';
import Home from '@/views/Home/Home';
import Login from '@/views/Login/Login';
import { useState } from 'react';

const Navigation: React.FC = () => {
  const [isAuthed, setIsAuthed] = useState(true);
  return (
    <Routes>
      {!isAuthed ? (
        <>
          <Route path="/login" element={<Login />} />
        </>
      ) : (
        <>
          <Route path="/home" element={<Home />} />
        </>
      )}
    </Routes>
  );
};

export default Navigation;
