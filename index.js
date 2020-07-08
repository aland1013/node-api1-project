const express = require('express');
const shortid = require('shortid');
const cors = require('cors');

const server = express();

server.use(express.json());
server.use(cors());

let users = [];

server.post('/api/users', (req, res) => {
  const newUser = req.body;

  if (!newUser.name || !newUser.bio) {
    res.status(400).json({ errorMessage: "Please provide name and bio for the user" })
  } else {
    try {
      newUser.id = shortid.generate();

      users.push(newUser);
  
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json({ errorMessage: "There was an error while saving the user to the database" });
    }
    
  }
});

server.get('/api/users', (req, res) => {
  try {
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ errorMessage: "The users information could not be retrieved" });
  }
});

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;

  const match = users.find(user => user.id === id);

  if (match) {
    res.status(200).json(match);
  } else {
    res.status(404).json({ message: "The user with the specified ID does not exist" });
  }
});

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  
  const match = users.find(user => user.id === id);

  if (match) {
    try {
      users = users.filter(user => user.id !== id);
      res.status(200).json(match);
    } catch (err) {
      res.status(500).json({ errorMessage: "The user could not be removed" });
    }
  } else {
    res.status(404).json({ message: "The user with the specified ID does not exist" });
  }
});

server.put('/api/users/:id', (req, res ) => {
  const { id } = req.params;
  
  const changes = req.body;

  let index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    changes.id = id;
    if (!changes.name || !changes.bio) {
      res.status(400).json({ errorMessage: "Please provide name and bio for the user" });
    } else {
      try {
        users[index] = changes;
        
        res.status(200).json(users[index]);
      } catch (err) {
        res.status(500).json({ errorMessage: "The user information could not be modified" });
      }  
    }
  } else {
    res.status(404).json({ message: "The user with the specified ID does not exist" })
  }
});

server.listen(5000, () => console.log('server listening on localhost:', 5000));