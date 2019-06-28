//SELECT one db to work with
//For SQL
const sqlDb = require('../../db/sql');
//For Mongo
const mongoDb = require('../../db/mongodb')

module.exports = {
  save : ({movie}) => {
    return mongoDb.Movie.findOneAndUpdate(
      {id : movie.id},
      {
        id: movie.id,
        title: movie.title,
        poster_path : movie.poster_path,
        release_date : movie.release_date
      },
      {upsert : true}
    )
  },
  retrieve : ()=> {
    return mongoDb.Movie.find().exec()
  },
  dropMovie : ({movie}) => {
    return mongoDb.Movie.remove({id : movie.id})
  } 
}