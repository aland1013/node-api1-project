import React, { useState } from 'react';
import axios from 'axios';
import shortid from 'shortid';

const AddUserForm = () => {
  const [formState, setFormState] = useState({
    name: '',
    bio: '',
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
    const id = shortid.generate();

    axios.post('http://localhost:5000/api/users', { ...formState, id })
  }

  return (
  <>
    <h3>Add a User</h3>
    <form onSubmit={formSubmit}>
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
}

export default AddUserForm;