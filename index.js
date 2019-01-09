const express = require('express');
const postDB = require('./data/helpers/postDb.js');
const userDB = require('./data/helpers/userDb.js');
const cors = require('cors');
const knex = require('knex');

const userNamesCapitalize = (req, res, next) => {
  const {id} = req.params;
  userDB.get(id)
  .then(info => {
    if(info) {
      console.log(id, info.name)

        req.info = {...info, name: info.name.toUpperCase()};
        next();
      }
      else res.status(404).json({message: "post not found with specified ID"})

    })
    .catch(err => res.status(500).json({errorMessage: "could get make get request to db"}))
}

const server = express();
server.use(cors())
server.use(express.json());

server.get('/posts', (req, res) => {
  postDB.get()
    .then(info => {
      res.status(200).json(info);

    })
    .catch(err => res.status(500).json({errorMessage: "could get make get request to db"}))
})

server.get('/users', (req, res) => {
  userDB.get()
    .then(info => {
      res.status(200).json(info);

    })
    .catch(err => res.status(500).json({errorMessage: "could get make get request to db"}))
})

server.get('/posts/:id', (req, res) => {
  const {id} = req.params;
  postDB.get(id)
    .then(info => {
      if(info) res.status(200).json(info);
      else res.status(404).json({message: "user not found with specified ID"})

    })
    .catch(err => res.status(500).json({errorMessage: "could get make get request to db"}))
  
})

server.get('/users/:id', userNamesCapitalize, (req, res) => {
  const {id} = req.params;
  if(req.info) res.status(200).json(req.info);
})


server.post('/posts', (req, res) => {
  postDB.insert(req.post)
    .then(id => {
      res.status(201).json(id);

    })
    .catch(err => res.status(500).json({errorMessage: "could get make get request to db"}))
})

server.post('/users', (req, res) => {
  userDB.insert(req.user)
    .then(id => {
      res.status(201).json(id);

    })
    .catch(err => res.status(500).json({errorMessage: "could get make get request to db"}))
})


server.put('/posts/:id', (req, res) => {
  postDB.update(id, req.post)
    .then(id => {
      res.status(201).json(id);

    })
    .catch(err => res.status(500).json({errorMessage: "could get make get request to db"}))
})

server.put('/users/:id', (req, res) => {
  userDB.update(id, req.user)
    .then(id => {
      res.status(201).json(id);

    })
    .catch(err => res.status(500).json({errorMessage: "could get make get request to db"}))
})


server.listen('8000', () => console.log('server live on port 8000'));