const db = require('../models');
const User = db.user;
const jwt = require('jsonwebtoken');

require('../helpers/passport');


genToken = user => {
  return jwt.sign({
    iss: 'tictactrip',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  }, 'tictactrip');
}

//Create user
exports.create = (req, res) => {
  try {

    const { email, password } = req.body;
    //Check content
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ message: "Content can not be empty!" });
    }

    //Check if user exists
    User.findAll({ where: { email: req.body.email } })
      .then(data => {
        if (data.length > 0) {
          return res.status(403).json({ error: 'Email is already in use' });
        } else {
          User.create({ email: email, password: password }).then(function (newUser) {
            // Generate JWT token
            const token = genToken(newUser);
            res.status(200).json({ token });
          });
        }
      })
    //Return error
  } catch (err) {
    res.status(500).send.json({ error: err.name });
  }
}

exports.login = (req, res) => {
  if (req.user) {
    const token = genToken(req.user);
    res.status(200).json({ token });
  }
}
