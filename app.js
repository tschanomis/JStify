const express = require('express');
const app = express();

const db = require("./models");
db.sequelize.sync();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiRouter = require('./routes/apiRouter');

app.use('/api', apiRouter);

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

let server = app.listen(process.env.PORT || 4000, function () {
  console.log('Listening on port ' + server.address().port);
});