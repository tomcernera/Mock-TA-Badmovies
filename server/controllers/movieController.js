const movieModel = require('../models/movieModel.js');
const apiHelpers = require('../helpers/apiHelpers.js');

//Return requests to the client
module.exports = {
  getSearch: (req, res) => {
    let genre = req.query.id;
    apiHelpers.getMovieList(genre,(err, movies) => {
      if (err) res.sendStatu(500)
      else res.status(200).send(movies)
    })
  },
  getGenres: (req,res) => {
    apiHelpers.getGenreList((err,genres) => {
      if (err){
        res.sendStatus(500)
      } 
      else {
        res.status(200).send(genres)
      }
    })
  },
  saveMovie: (req, res) => {
   movieModel.save(req.body) //saving to DB with no issues
    .then(()=> movieModel.retrieve())
    .then(movies => res.send(movies))
    .catch(()=>res.sendStatus(500))
  },
  deleteMovie: (req, res) => {
    movieModel.dropMovie(req.body)
      .then(()=> movieModel.retrieve())
      .then(movies => res.send(movies))
      .catch(() => res.sendStatus(500))
  },
  getFavorites: (req, res) => {
    movieModel.retrieve(req.body)
      .then(movies => res.send(movies))
      .catch(()=> res.sendStatus(500))
  }
}

