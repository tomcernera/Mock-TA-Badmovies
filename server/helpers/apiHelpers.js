const request = require('request');
const axios = require('axios');
const { API_KEY } = require('../../config.js');

// write out logic/functions required to query TheMovieDB.org

// FOR REFERENCE:
// https://www.themoviedb.org/account/signup
// https://developers.themoviedb.org/3/discover/movie-discover
// Get your API Key and save it in your config file

// Don't forget to export your functions and require them within your server file
getGenreList = (callback) => {
  axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
  .then(results => callback(null,results.data.genres))
  .catch(err => callback(err))
}

getMovieList = (genre,callback) => {
  axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genre}&popularity.desc`)
  .then(movies => callback(null,movies.data.results))
  .catch(err => callback(err))
}


module.exports.getGenreList = getGenreList;
module.exports.getMovieList = getMovieList;


// https://api.themoviedb.org/3/discover/movie?api_key=9b1bc5e077bacda27dc0062b4fa2234e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1