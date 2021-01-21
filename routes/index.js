const express = require('express');
const router = express.Router();

const justifyRoute = require('./justify.js');
const authRoute = require('./auth.js');


router.use('/auth', authRoute);
router.use('/justify', justifyRoute)

module.exports = router;