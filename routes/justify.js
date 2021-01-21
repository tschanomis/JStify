const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.text());

const justify = require('../controllers/justify');

router.post('/', justify.justifyText)

module.exports = router;