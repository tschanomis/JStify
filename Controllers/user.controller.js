const passport = require('passport');
require('../Config/passport.config.js');

const User = require('../Models/index.model.js').user;

const tools = require('../Utils/tools.js');


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
          // Generate Hash
          const hash = tools.genHash(password);
          //Create user
          User.create({ email: email, password: hash })
            .then(function (newUser) {
              // Generate JWT token
              const token = tools.genToken(newUser);
              return res.status(200).json({ token });
            });
        }
      })

    //Return error
  } catch (err) {
    return res.status(500).json({ error: err.name });
  }
}

//Connect user
exports.login = (req, res, next) => {
  try {
    const { email, password } = req.body;

    //Check content
    if (!email || !password) {
      return res.status(500).json({ error: "informations is missing" });
    }

    //Authentication
    passport.authenticate('local', function (err, user, info) {
      if (err) {
        return res.status(403).json({ error: info.message });
      }
      if (!user) {
        return res.status(404).json({ error: info.message });
      }
      const token = tools.genToken(user);
      return res.status(200).json({ token });
    })(req, res, next);

    //Return error
  } catch (err) {
    return res.status(500).json({ error: err.name });
  }
}
