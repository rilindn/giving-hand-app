import { useEffect, useState } from "react";
import { getAllUsers } from "./api/ApiMethods";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

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
          <h2>{user.name}</h2>
        ))}
      </header>
    </div>
  );
}

export default App;
