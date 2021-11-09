'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { default: axios } = require('axios');
const { query } = require('express');
const handleGetWeatherList = require('./weather.js');
const handleGetMovie = require('./movie.js');
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

//paths for server - 
app.get('/hello', (req, res) => res.status(200).send('Hello World'));
app.get('/weather', handleGetWeatherList); 
app.get('/movies', handleGetMovie);  

app.listen(PORT, () => console.log(`I am the server and listening on port:${PORT}`));
