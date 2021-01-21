const router = require('express').Router();
const bodyParser = require('body-parser');
router.use(bodyParser.text());

const justify = require('../Controllers/justify.controller');


router.post('/', justify.justifyText);

module.exports = router;