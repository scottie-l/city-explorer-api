'use strict';

const axios = require('axios');
const cache = {}; 

async function handleGetMovie(req, res) {
    const {city} = req.query; //query city or query?
    if (cache[query] && (Date.now() - cache[query].timestamp) < 10000) {
        console.log('cache was hit' + query);
        res.status(200).send(cache[query]);
        return; 
    }
    
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIEDB_KEY}&query=${city}&language=en-US&page=1&include_adult=false`;

    const results = await axios
        .get(url)
        .then(results => {
            const movieData = results.data.results.map(movies => new Movies(movies));
            cache[query] = movieData;
            cache[query].timestamp = Date.now();
            console.log('cache was missed' + cache[query].timestamp);
            res.status(200).send(movieData);
        })        
        .catch(error => {
            console.log('Error', error);
            res.status(500).send('Server Error 500', error);
    })
}
  
class Movies {
    constructor(obj) {
        this.title = obj.title;
        this.overview = obj.overview;
        this.image = `https://image.tmdb.org/t/p/w500${obj.poster_path}`;
    }
}

module.exports = handleGetMovie;
