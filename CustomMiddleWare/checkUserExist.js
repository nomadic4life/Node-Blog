const userDB = require('../data/helpers/userDb.js');

const checkUserExist = (req, res, next) => {
  const {userid} = req.body;

  userDB.get(userid)
  .then(user => {

    if(user){

      next();

    } else {

      res.status(404).json({errorMessage: 'User not found, post note created.'});
      
    }
  })
  
}

module.exports = checkUserExist;