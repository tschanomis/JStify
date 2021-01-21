const express = require('express');
const router = express.Router();
const passport = require('passport');
const bodyParser = require('body-parser');
router.use(bodyParser.text());

const justify = require('../controllers/justify');

router.post('/', passport.authenticate('jwt', { session: false }), justify.justifyText)

module.exports = router;