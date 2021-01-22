require('dotenv').config();
const express = require('express');
const app = express();

const hostname = process.env.HOST;
const port = process.env.PORT;

const db = require('./Models/index.model');
db.sequelize.sync();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiRouter = require('./Routes/index.route.js');

app.use('/api', apiRouter);

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

let server = app.listen(process.env.PORT || 4000, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});