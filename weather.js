'use strict';

const axios = require('axios');
const cache = {}; 

async function handleGetWeatherList(req, res) {  
  try { 
    const {lat, lon} = req.query;
    if (cache[lat, lon] && (Date.now() - cache[lat, lon].timestamp) <10000) {
      console.log('cache was hit' + lat, lon);
      res.status(200).send(cache[lat, lon]);
      return;
    }

    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.REACT_APP_WEATHER_KEY}&include=minutely`;
    const results = await axios
    .get(url)
    .then(results => {
      const forecastData = results.data.data.map(forecast => new Forecast(forecast));
      cache[lat, lon] = forecastData;
      cache[lat, lon].timestamp = Date.now();
      console.log('cache was missed' + cache[lat, lon].timestamp);
      res.status(200).send(forecastData);
    })
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
