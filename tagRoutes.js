const express = require('express');
const tagDB = require('./data/helpers/userDb.js');

const router = express.Router();

router.get('/:id', (req, res, next) => {

  const id = req.params.id;

  console.log('here', id);

  tagDB.get(id)
  .then(tags => {
    res.status(200).json(tags);
  })
  .catch(err => next(err))
})

router.post('/:id', (req, res, next) => {

  const id = req.params.id;
  const {tag} = req.body;

  console.log('here', id, tag);

  tagDB.insert(tag)
  .then(tags => {
    res.status(201).json(tags);
  })
  .catch(err => next(err))
})

module.exports = router;