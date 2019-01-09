const express = require('express');
const postDB = require('./data/helpers/postDb.js');
const userDB = require('./data/helpers/userDb.js');
const cors = require('cors');
const morgan = require('morgan');
const knex = require('knex');

const userNamesCapitalize = (req, res, next) => {
  const {id} = req.params;
  userDB.get(id)
  .then(info => {
    if(info) {
        req.info = {...info, name: info.name.toUpperCase()};
        next();
      }
      else res.status(404).json({message: "post not found with specified ID"})

    })
    .catch(err => res.status(500).json({errorMessage: "request failed"}))
}

const server = express();
server.get(morgan('tiny'));
server.use(cors())
server.use(express.json());


server.get('/users', (req, res) => {

  userDB.get()
  .then(info => {
    res.status(200).json(info);
  })
  .catch(err => res.status(500).json({errorMessage: "request failed"}))
})

server.get('/posts', (req, res) => {
  
  postDB.get()
    .then(info => {
      res.status(200).json(info);
    })
    .catch(err => res.status(500).json({errorMessage: "request failed"}))
})

server.get('/users/:id/posts', userNamesCapitalize, (req, res) => {
  const {id} = req.params;
  userDB.getUserPosts(id)
  .then(post => {
    console.log(id, post)
    res.status(200).json(post)
  })
  .catch(err => res.status(500).json({errorMessage: "failed to retrive post for user"}))
})

server.get('/users/:id', userNamesCapitalize, (req, res) => {
  if(req.info) res.status(200).json(req.info);
})

server.get('/posts/:id', (req, res) => {
  const {id} = req.params;
  postDB.get(id)
    .then(info => {
      if(info) res.status(200).json(info);
      else res.status(404).json({message: "post not found with specified ID"})

    })
    .catch(err => res.status(500).json({errorMessage: "request failed"}))
  
})


server.post('/users', (req, res) => {

  const {name} = req.body
  if(!name && typeof name !== 'string') {
    res.status(400).json({errorMessage: "invalid name, name needs to be a string"})
  }

  if(name.length > 128) {
    res.status(406).json({errorMessage: "name more than 128 characters"})
  }

  userDB.insert({name})
  .then(id => {
    res.status(201).json({name: name,id: id.id});
  })
  .catch(err => res.status(500).json({errorMessage: "failed to create post"}))
})

server.post('/posts', (req, res) => {
  postDB.insert(req.post)
    .then(id => {
      res.status(201).json(id);

    })
    .catch(err => res.status(500).json({errorMessage: "could get make get request to db"}))
})


server.put('/users/:id', (req, res) => {
  
  const {id} = req.params;
  const {name} = req.body;
  
  if(!name && typeof name !== 'string') {
    res.status(400).json({errorMessage: "invalid name, name needs to be a string"})
  }

  if(name.length > 128) {
    res.status(406).json({errorMessage: "name more than 128 characters"})
  }

  
  userDB.update(id, {name})
  .then(count => {
    if(count) {
      res.status(200).json({id,name});
    } else {
      res.status(404).json({errorMessage: "failed to make update on specified ID"})
    }
  })
  .catch(err => res.status(500).json({errorMessage: "failed request"}))
})

server.put('/posts/:id', (req, res) => {
  postDB.update(id, req.post)
    .then(id => {
      res.status(201).json(id);

    })
    .catch(err => res.status(500).json({errorMessage: "could get make get request to db"}))
})


server.delete('/users/:id', (req, res) => {
  
  const {id} = req.params;

  userDB.remove(id)
  .then(count => {
    if(count) {
      res.status(204).end()
    } else {
      res.status(404).json({errorMessage: "failed to make delete request on specified ID"})
    }
  })
  .catch(err => res.status(500).json({errorMessage: "failed request"}))
})

server.delete('/posts/:id', (req, res) => {
  
  const {id} = req.params;

  postDB.remove(id)
  .then(count => {
    if(count) {
      res.status(204).end()
    } else {
      res.status(404).json({errorMessage: "failed to make delete request on specified ID"})
    }
  })
  .catch(err => res.status(500).json({errorMessage: "failed request"}))
})

server.listen('8000', () => console.log('server live on port 8000'));