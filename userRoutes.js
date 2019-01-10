const express = require('express');
const userDB = require('./data/helpers/userDb.js');
const checkUpper = require('./CustomMiddleWare/checkUpper.js');

const router = express.Router();

router.get('/', (req, res, next) => {

  userDB.get()
  .then(info => {

    res.status(200).json(info);

  })
  .catch(err => next(err));

});

router.get('/:id/posts', (req, res, next) => {

  const {id} = req.params;

  userDB.getUserPosts(id)
  .then(post => {

    res.status(200).json(post);

  })
  .catch(err => next(err));

});

router.get('/:id', (req, res, next) => {

  const {id} = req.params;

  userDB.get(id)
  .then(info => {

    if(info) res.status(200).json(info);

    else res.status(404).json({message: "post not found with specified ID"});

  })
  .catch(err => next(err));

});

router.post('/', checkUpper, (req, res, next) => {

  const {userName : name} = req;

  userDB.insert({name})
  .then(userid => {

    res.status(201).json({name: name, id: userid.id});

  })
  .catch(err => next(err));

});


// put request works but I get some weird error in the console when name execedes 128 characters but I have a condition for that.
router.put('/:id', checkUpper, (req, res, next) => {

  const {id} = req.params;

  const {userName : name} = req;

  userDB.update(id, {name})
  .then(count => {

    if(count) {

      res.status(200).json({id,name});

    } else {

      res.status(404).json({errorMessage: "failed to make update on specified ID"});

    }
  })
  .catch(err => next(err))
});

router.delete('/:id', (req, res, next) => {
  
  const {id} = req.params;

  userDB.remove(id)
  .then(count => {

    if(count) {

      res.status(204).end();

    } else {

      res.status(404).json({errorMessage: "failed to make delete request on specified ID"});

    }
  })
  .catch(err => next(err));

});

module.exports = router;