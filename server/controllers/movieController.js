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
   movieModel.save(req.body) 
   movieModel.retrieve((err,data) =>{
    if (err) res.sendStatus(500)
    else res.status(200).send(data)
   })
  },
  deleteMovie: (req, res) => {
    movieModel.dropMovie(req.body)
    movieModel.retrieve((err,data) =>{
      if (err) res.sendStatus(500)
      else res.status(200).send(data)
     })
  },
  getFavorites: (req, res) => {
    movieModel.retrieve((err,data) =>{
     if (err) res.sendStatus(500)
     else res.status(200).send(data)
    })
  }
}

