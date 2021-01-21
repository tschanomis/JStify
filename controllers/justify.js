const tools = require('../utils/tools')


exports.justifyText = (req, res) => {
  if (req.body.length && typeof req.body === "string") {
    const result = tools.justify(80, req.body);
    res.status(200).send(result);
  } else {
    res.status(404).json({ message: "No text!" });
  }
}