import React from 'react';
import { useEffect, useState } from 'react';
import { getAllUsers } from './api/ApiMethods';
import './App.css';

interface User {
  _id: string;
  name: string;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

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
      </header>
    </div>
  );
};

export default App;
