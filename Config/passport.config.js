const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../Models/index.model.js').user;

const tools = require('../Utils/tools.js');


passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'tictactrip',
  session: false
},
  function (jwtPayload, done) {
    return User.findByPk(jwtPayload.sub)
      .then(user => {
        return done(null, user);
      })
      .catch(err => {
        return done(null, err);
      });
  }
))

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false
},
  function (username, password, done) {
    return User.findOne({ where: { email: username } })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }
        const validPassword = tools.comparePassword(password, user.password);
        if (!validPassword) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
      .catch(err => {
        return done(null, err);
      });
  })
);