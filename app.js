require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const searchRouter = require('./routes/searchRoutes');
const apiRouter = require('./routes/apiRoutes');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === "production") {
  app.use(express.static('client/build'));
}

app.use('/search', searchRouter);
app.use('/api', apiRouter);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/movieDiary', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = app;