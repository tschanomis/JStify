const passport = require('passport')
const passportJWT = require("passport-jwt");
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
      }
      ).catch(err => {
        return done(err);
      });
  }
))