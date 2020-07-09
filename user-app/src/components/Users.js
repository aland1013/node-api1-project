import React from 'react';
import axios from 'axios';

const Users = ({ users, setUsers }) => {
  const deleteUser = (id) => {
    axios.delete(`http://localhost:5000/api/users/${id}`);
    axios.get('http://localhost:5000/api/users')
      .then(res => setUsers(res.data));
  }

  return (
    <>
      <h3>Users</h3>
      {users.map(user => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>Bio: {user.bio}</p>
          <p>Id: {user.id}</p>
          <button onClick={() => deleteUser(user.id)}>delete</button>
        </div>
      ))}
    </>
  );
}

export default Users;