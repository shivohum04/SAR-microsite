import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Immediately invoked fetchUsers function using useCallback
  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get('/user');
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, []); // No dependencies, fetchUsers doesn't need to change

  // Defined handleSearch using useCallback to ensure it doesn’t change unless searchTerm changes
  const handleSearch = useCallback(async () => {
    try {
      const response = await axios.get(`/user/search?query=${searchTerm}`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error performing search:", error);
    }
  }, [searchTerm]); // Dependencies array includes searchTerm

  // useEffect for debouncing search input
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        handleSearch();
      } else {
        fetchUsers();
      }
    }, 500); // Debounce delay

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, handleSearch, fetchUsers]); // Include handleSearch and fetchUsers in dependencies array

  return (
    <div style={{ textAlign: 'center' }}>
      <input
        type="text"
        placeholder="Search by name, city..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ margin: '20px 0', padding: '10px', width: '300px' }}
      />
      <div style={{ overflowX: 'auto' }}>
        <table style={{ margin: 'auto', width: '80%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
              <th>City</th>
              <th>Lectrix Count</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.phone_no}</td>
                <td>{user.city}</td>
                <td>{user.bikecount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
