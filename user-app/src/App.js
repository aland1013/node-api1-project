import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Users from './components/Users';
import AddUserForm from './components/AddUserForm';
import EditUserForm from './components/EditUserForm';

function App() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then(res => setUsers(res.data))
      .catch(err => console.log('err', err));
  }, [users]);

  return (
    <>
      <Users users={users} setUsers={setUsers} />
      <AddUserForm />
      <EditUserForm />
    </>
  );
}

export default App;
