'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const { default: axios } = require('axios');

app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/hello', (req, res) => res.status(200).send('Hello World'));
app.get('/weather', handleGetWeatherList); 

async function handleGetWeatherList(req, res) {
  try {
    const {lat, lon} = req.query;
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.REACT_APP_WEATHER_KEY}&include=minutely`;
    // console.log(url);
    const results = await axios.get(url);
    // console.log(results.data.data);
    const forecastData = results.data.data.map(forecast => new Forecast(forecast));
    res.status(200).send(forecastData);
  } catch (event) {
    res.status(500).send('Server Error 500')
  }
}

class Forecast {
  constructor(obj) {
    this.description = obj.weather.description;
    this.data = obj.datetime;
  }
}

app.listen(PORT, () => console.log(`I am the server and listening on port:${PORT}`));
