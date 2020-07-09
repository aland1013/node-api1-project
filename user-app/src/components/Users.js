import React from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    margin: 30,
    paddingBottom: 10
  },
  button: {
    margin: "auto"
  }
});

const Users = ({ users, setUsers }) => {
  const classes = useStyles();

  const deleteUser = (id) => {
    axios.delete(`http://localhost:5000/api/users/${id}`);
    axios.get('http://localhost:5000/api/users')
      .then(res => setUsers(res.data));
  }

  return (
    <>
      <Typography variant='h4' align='center' style={{ marginTop: 20 }}>Users: </Typography>
      <Grid container>
        {users.map(user => (
          <Grid item key={user.id}>
            <Card className={classes.root}>
              <CardContent align='center' >
                <Typography variant='h4'>{user.name}</Typography>
                <Typography variant='subtitle1'>Bio: {user.bio}</Typography>
                <Typography variant='subtitle1'>Id: {user.id}</Typography>
              </CardContent>
              <CardActions>
                <Button size='small' variant='outlined' color='secondary' className={classes.button} onClick={() => deleteUser(user.id)}>delete</Button>
              </CardActions>
            </Card>
          </Grid>
      ))}
      </Grid>
    </>
  );
}

export default Users;