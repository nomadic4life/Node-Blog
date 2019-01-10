const express = require('express');
const postDB = require('./data/helpers/postDb.js');
const checkUserExist = require('./CustomMiddleWare/checkUserExist.js');

const router = express.Router();

router.get('/', (req, res, next) => {

  postDB.get()
  .then(info => {

    res.status(200).json(info);
    
  })
  .catch(err => next(err));

});

router.get('/:id', (req, res, next) => {

  const {id} = req.params;

  postDB.get(id)
  .then(info => {

    if(info) res.status(200).json(info);

    else res.status(404).json({message: "post not found with specified ID"})

  })
  .catch(err => next(err));
  
});

router.post('/', checkUserExist, (req, res, next) => {

  const {userid, text, tag} = req.body;

  postDB.insert({userid, text})
  .then(id => {

    res.status(201).json(id);

  })
  .catch(err => next(err));

});

router.put('/:id', checkUserExist, (req, res, next) => {

  const postid = req.params.id;

  const {userid, text} = req.body;

  postDB.get(postid)
  .then(info => {
    
    if(info) {

      postDB.update(postid, {userid, text})
      .then(id => {

        res.status(201).json(id);

      })
    } else res.status(404).json({message: "post not found with specified ID"});

  })
  .catch(err => next(err))

});

router.delete('/:id', (req, res, next) => {
  
  const {id} = req.params;

  postDB.remove(id)
  .then(count => {

    if(count) {

      res.status(204).end()

    } else {

      res.status(404).json({errorMessage: "failed to make delete request on specified ID"})

    }

  })
  .catch(err => next(err))
});

module.exports = router;