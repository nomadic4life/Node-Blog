const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const postsRoutes = require('./postsRoutes');
const userRoutes = require('./userRoutes');
const tagRoutes = require('./tagRoutes');

const server = express();

// middileware
server.use(morgan('tiny'));
server.use(cors())
server.use(express.json());

server.use('/users', userRoutes);
server.use('/posts', postsRoutes);
server.use('/tag', tagRoutes)

// err handler
server.use((err, req, res) => {
  res.status(500).json({Message: "failed request", err})
})

server.listen('8000', () => console.log('server live on port 8000'));