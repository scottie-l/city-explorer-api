'use strict';

const axios = require('axios'); 

async function handleGetWeatherList(req, res) {
  try {
    const {lat, lon} = req.query;
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.REACT_APP_WEATHER_KEY}&include=minutely`;
    const results = await axios.get(url);
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

module.exports = handleGetWeatherList
