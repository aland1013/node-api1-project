import React, { useState } from 'react';
import axios from 'axios';

const EditUserForm = () => {
  const [formState, setFormState] = useState({
    id: '',
    name: '',
    bio: ''
  });

  const inputChange = (e) => {
    e.persist();
    const newFormData = {
      ...formState,
      [e.target.name]: e.target.value
    };
    setFormState(newFormData);
  };

  const formSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:5000/api/users/${formState.id}`, 
      { name: formState.name, bio: formState.bio }
    );
  }

  return (
    <>
      <h3>Edit a User</h3>
      <form onSubmit={formSubmit}>
      <label htmlFor='id'>
        Id: 
        <input
          type='text'
          name='id'
          onChange={inputChange}
          value={formState.id}
        />
      </label>
      <label htmlFor='name'>
        Name: 
        <input
          type='text'
          name='name'
          onChange={inputChange}
          value={formState.name}
        />
      </label>
      <label htmlFor='bio'>
        Bio: 
        <input
          type='text'
          name='bio'
          onChange={inputChange}
          value={formState.bio}
        />
      </label>
      <button type='submit'>submit</button>
    </form>
    </>
  );
};

export default EditUserForm;