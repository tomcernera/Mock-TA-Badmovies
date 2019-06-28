var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
const movieController = require('./controllers/movieController.js')
var app = express();

// Sign up and get your moviedb API key here:
// https://www.themoviedb.org/account/signup


//Helpers
var apiHelpers = require('./helpers/apiHelpers.js');

//Middleware
app.use(bodyParser.json());

// Due to express, when you load the page, it doesn't make a get request to '/', it simply serves up the dist folder
app.use(express.static(__dirname + '/../client/dist'));


//OPTION 1: Use regular routes

app.get('/genres', function(req, res) {
  // use this endpoint. you will need your API key from signup: https://api.themoviedb.org/3/genre/movie/list
  movieController.getGenres(req, res)
});

app.get('/search', function(req, res) {
  // use this endpoint to search for movies by genres (using API key): https://api.themoviedb.org/3/discover/movie
  movieController.getSearch(req,res)
  // and sort them by votes (worst first) using the search parameters in themoviedb API
});

app.get('/save', function(req, res) {
  movieController.getFavorites(req,res)
});

app.post('/save', function(req, res) {
  movieController.saveMovie(req,res)
});

app.post('/delete', function(req, res) {
  movieController.deleteMovie(req,res)
  //remove movie from favorites
});


//OPTION 2: Use Express Router

//IF you decide to go with this option, delete OPTION 1 to continue

//Routes

const movieRoutes = require('./routes/movieRoutes.js');

//Use routes
app.use('/movies', movieRoutes);


app.listen(3000, function() {
  console.log('listening on port 3000!');
});
