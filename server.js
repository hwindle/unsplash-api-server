'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
// import my library functions
const { photoHandler, randomPicHandler } = require('./libraries/photos');

// start new express server
const app = express();
// use cors
app.use(cors());

const PORT = process.env.PORT || 3058;
app.listen(PORT, () => {
  console.log('I am listening... :-)');
});

// routes
app.get('/searchImage', photoHandler);
app.get('/randomImage', randomPicHandler);
app.get('*', (req, res) => res.status(404).send('URL not found'));