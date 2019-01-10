const checkUpper = (req, res, next) => {

  const {name} = req.body;

  if(!name && typeof name !== 'string') {

    res.status(400).json({errorMessage: "invalid name, name needs to be a string"});

  }

  if(name.length > 128) {

    res.status(400).json({errorMessage: "name should be 128 characters or less"});

  }

  req.userName = name.split(' ')
    .map(word => [...word.split('')[0].toUpperCase(), ...word.split('').slice(1)].join('')  ).join(' ');  
  
  next();
}

module.exports = checkUpper;