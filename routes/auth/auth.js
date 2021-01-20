const express = require('express');
const router = express.Router();
const passport = require('passport');

const user = require('../../controllers/user');


router.post('/signup', user.create);

router.get('/signin', passport.authenticate('jwt', { session: false }), (req, res) => {
  user.login(req, res);
});

module.exports = router;