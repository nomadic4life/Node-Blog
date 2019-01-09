const express = require('express');
const cors = require('cors');
const knex = require('knex');

const server = express();
server.use(cors())
server.use(express.json());


server.listen('8000', () => console.log('server live on port 8000'));