var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var apiRouter = require('./routes/apiRoutes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === "production") {
  app.use(express.static('client/build'));
}

app.use('/api', apiRouter);

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/movieDiary', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = app;