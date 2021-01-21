const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//text justify
exports.justify = (maxLineLength, text) => {
  const textArray = text.split(' ');
  const resultArray = [];
  let textLine = "";
  textArray.map(word => {
    if (textLine.length + word.length <= maxLineLength) {
      textLine += word;
      if (textLine.length < 80) {
        textLine += " ";
      }
    } else {
      textLine += "\n";
      resultArray.push(textLine);
      textLine = word + " ";
    }
  })
  resultArray.push(textLine);
  return ("".concat(...resultArray));
};

//Generate hash
exports.genHash = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

//Compare password and hash
exports.comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash)
}

//Generate token
exports.genToken = user => {
  return jwt.sign({
    iss: 'tictactrip',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  }, 'tictactrip');
}
