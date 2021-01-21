const passport = require('passport');
const passportLocal = require('passport-local');
const LocalStrategy = passportLocal.Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const db = require('../models');
const User = db.user;


passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'tictactrip'
},
  function (jwtPayload, done) {
    return User.findByPk(jwtPayload.sub)
      .then(user => {
        return done(null, user);
      })
      .catch(err => {
        return done(err);
      });
  }
))

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false
},
  function (username, password, done) {
    User.findOne({ where: { email: username } })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (user.password != password) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
      .catch(err => {
        return done(err);
      });
  })
);