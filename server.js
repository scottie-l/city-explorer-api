'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const axios = require('axios');
const app = express();
const weather = require('./data/weather.json');
// const { res } = require('express'); // line 19

app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/hello', (req, res) => {res.send('Hello World!');});
app.get('/weather', handleGetWeather);
app.get('/*', (req, res) => res.status(403).send('not found'));

// const shoppingList = require('./myShoppingList.json');
// app.get('/shoppingList', handleGetShoppingList);
// function handleGetShoppingList(req,res) {
//   console.log(req.query.name);
//   console.log('The shopping list route was it');
//   res.status(200).send(shoppingList);
// }
//

function handleGetWeather(req, res) {
  const cityName = req.query.city;
  const lat = req.query.lat;
  const lon = req.query.lon;

  console.log(cityName);
  console.log('here!');

  try {
    const cityToSend = weather.find(city => {
      if((city.lat === lat && city.lon === lon) || city.city_name === cityName) {
        return true;
      }
      return false;
    });
    if (cityToSend) {
      const forecastData = cityToSend.data.map(city => {
        console.log(city);
        return new WeatherForecast(city);
      });
      res.status(200).send(forecastData);
    } else {
      res.status(404).send('City not found');
    }
  } catch(event) {
    res.status(500).send('Server not found');
  }
}


class WeatherForecast {
  constructor(obj) {
    this.min_temp = obj.min_temp;
    this.max_temp = obj.max_temp;
    this.description = obj.weather.description;
  }
}

app.listen(PORT, () => console.log(`I am the server listening on port:${PORT}`));
