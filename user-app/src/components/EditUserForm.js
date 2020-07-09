import React, { useState } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    display: 'flex',
    flexDirection: 'column'
  },
  button: {
    width: 70
  }
}));

const EditUserForm = () => {
  const classes = useStyles();

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
    <Grid container direction='column'>
      <Typography variant='h5'>Edit a User</Typography>
      <form className={classes.root} onSubmit={formSubmit}>
      
        <TextField
          variant='outlined'
          label='Id'
          type='text'
          name='id'
          onChange={inputChange}
          value={formState.id}
        />
        <TextField
          variant='outlined'
          label='Name'
          type='text'
          name='name'
          onChange={inputChange}
          value={formState.name}
        />
        <TextField
          variant='outlined'
          label='Bio'
          type='text'
          name='bio'
          onChange={inputChange}
          value={formState.bio}
        />
      <Button className={classes.button} variant='outlined' color='primary' type='submit'>submit</Button>
    </form>
    </Grid>
  );
};

export default EditUserForm;