const express = require('express');
const postDB = require('./data/helpers/postDb.js');
const userDB = require('./data/helpers/userDb.js');
const cors = require('cors');
const knex = require('knex');

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


server.listen('8000', () => console.log('server live on port 8000'));