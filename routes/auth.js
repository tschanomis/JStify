const express = require('express');
const router = express.Router();
const passport = require('passport');

const user = require('../controllers/user');


router.post('/signup', user.create);

router.post('/login', function (req, res, next) { passport.authenticate('local', { session: false }), user.login });

module.exports = router;