'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weatherListing = require('./data/weather.json');
const app = express();

app.use(cors());

const PORT = process.env.PORT || 3001

app.get('/hello', (req, res) => {res.send('Hello World!');} );
app.get('./data/weather', handleGetWeatherList);

function handleGetWeatherList(req, res) {
  req.query;
  console.log("The weather is on!");
  res.status(200).send(weatherListing);
}

app.listen(PORT, () => console.log(`I am the server and listening on port:${PORT}`));
