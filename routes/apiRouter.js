const express = require('express');
const router = express.Router();

const justifyRoute = require('./justify/justify.js');
const authRoute = require('./auth/auth.js');


router.use('/auth', authRoute);
router.use('/justify', justifyRoute)

module.exports = router;