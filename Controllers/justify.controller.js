const passport = require('passport');

const User = require('../Models/index.model').user;

const tools = require('../Utils/tools');


exports.justifyText = (req, res, next) => {
  try {
    const text = req.body;

    //Check content
    if (!text.length || typeof req.body !== "string") {
      return res.status(404).json({ message: "No text!" });
    }

    //Authorization
    passport.authenticate('jwt', { session: false }, function (err, user, info) {
      if (err) {
        return res.status(500).json({ error: info.message });
      }
      if (!user) {
        return res.status(403).json({ error: info.message });
      }

      //User profile
      const userInfo = user.dataValues;
      //Words number new text
      const wordsCount = text.split(' ').length;
      //Words number new text and database
      const totalLength = userInfo.wordsTotal + wordsCount;
      //Timestamp last update
      const lastUpdate = new Date(userInfo.updatedAt);
      //Timestamp now
      const dateNow = Date.now();
      //Time from last update
      const deltaTime = dateNow - lastUpdate;
      //Jusitfied text
      const result = tools.justify(80, req.body);
      //Refresh if last request more than a day
      if ((deltaTime >= 86400000)) {
        User.update({ wordsTotal: wordsCount }, { where: { id: userInfo.id } });
        return res.status(200).send(result);
      }

      //If not enough space
      if (!(totalLength <= 80000)) {
        return res.status(402).json({ message: "Not enough space" });
      }

      //Standard update
      User.update({ wordsTotal: userInfo.wordsTotal + wordsCount }, { where: { id: userInfo.id } });
      return res.status(200).send(result);
    })(req, res, next);

    //Return error
  } catch (err) {
    return res.status(500).json({ error: err.name });
  }
}