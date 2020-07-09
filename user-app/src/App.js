import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import Users from './components/Users';
import AddUserForm from './components/AddUserForm';
import EditUserForm from './components/EditUserForm';

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/users')
      .then((res) => setUsers(res.data))
      .catch((err) => console.log('err', err));
  }, [users]);

  return (
    <Container>
      <AppBar position='static'>
        <Typography variant='h2' style={{ paddingLeft: 25 }}>
          Node API 1 Project
        </Typography>
      </AppBar>
      <Users users={users} setUsers={setUsers} />
      <Divider style={{ marginBottom: 30 }} />
      <Grid container justify='space-evenly'>
        <Grid item>
          <AddUserForm />
        </Grid>
        <Grid item>
          <EditUserForm />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
