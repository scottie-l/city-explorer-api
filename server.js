'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { default: axios } = require('axios');
const { query } = require('express');
const app = express();

app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/hello', (req, res) => res.status(200).send('Hello World'));
app.get('/weather', handleGetWeatherList); 
app.get('/movies', handleGetMovie)

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

async function handleGetMovie(req, res) {
  try {
    const {city} = req.query;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIEDB_KEY}&query=${city}&language=en-US&page=1&include_adult=true`;
    console.log(url);
    const results = await axios.get(url);
    console.log(results.data.results);
    const movieData = results.data.results.map(movies => new Movies(movies));
    console.log(movieData);
    res.status(200).send(movieData);
  } catch (event) {
    res.status(500).send('Server Error 500')
  }
}

class Movies {
  constructor(obj) {
    this.title = obj.title;
    this.overview = obj.overview;
    this.image = `https://image.tmdb.org/t/p/w500${obj.poster_path}`;
  }
}

app.listen(PORT, () => console.log(`I am the server and listening on port:${PORT}`));
