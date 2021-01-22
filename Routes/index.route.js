const router = require('express').Router();

const justifyRoute = require('./justify.route.js');
const authRoute = require('./auth.route.js');

router.get('/', function (req, res) {
  res.status(200).json({ message: "hello" })
})
router.use('/auth', authRoute);
router.use('/justify', justifyRoute);

module.exports = router;