const router = require('express').Router();

const user = require('../controllers/user');


router.post('/signup', user.create);

router.post('/signin', user.login);

module.exports = router;