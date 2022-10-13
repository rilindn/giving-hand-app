import React from 'react';
import { useEffect, useState } from 'react';
import { getAllUsers } from '@/api/ApiMethods';
import Navigation from '@/routes/index';
import AuthLayout from '@/layouts/AuthLayout';
import MainLayout from '@/layouts/MainLayout';

interface IUser {
  _id: string;
  name: string;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isAuth, setIsAuth] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const users = await getAllUsers();
    setUsers(users);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Hello from Rilind</p>
        {users?.map((user) => (
          <h2 key={user.name}>{user.name}</h2>
        ))}
        {!isAuth ? (
          <AuthLayout>
            <Navigation />
          </AuthLayout>
        ) : (
          <MainLayout>
            <Navigation />
          </MainLayout>
        )}
      </header>
    </div>
  );
};

export default App;
