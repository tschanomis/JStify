const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.text());


const tools = require('../../utils/tools.js')

router.post('/', (req, res) => {
	if (req.body.length) {
		const result = tools.justify(80, req.body);
		res.status(200).json(result);
	} else {
		res.status(404).json({ message: "No text!" });
	}
});

module.exports = router;