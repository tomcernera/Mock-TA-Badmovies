//SELECT one db to work with
//For SQL
const sqlDb = require('../../db/sql');
//For Mongo
const mongoDb = require('../../db/mongodb')

// module.exports = {
//   save : ({movie}) => {
//     return mongoDb.Movie.findOneAndUpdate(
//       {id : movie.id},
//       {
//         id: movie.id,
//         title: movie.title,
//         poster_path : movie.poster_path,
//         release_date : movie.release_date
//       },
//       {upsert : true}
//     )
//   },
//   retrieve : ()=> {
//     return mongoDb.Movie.find().exec()
//   },
//   dropMovie : ({movie}) => {
//     return mongoDb.Movie.remove({id : movie.id})
//   } 
// }

//refactor to use mySQL

module.exports = {
  save : ({movie}) => {
    sqlDb.connection.query(`INSERT INTO favoriteMovies
    (id, title, poster_path, release_date)
    values (?,?,?,?)`,[movie.id, movie.title, movie.poster_path, movie.release_date])
  },
  retrieve : (callback)=> {
    sqlDb.connection.query('SELECT * from favoriteMovies', (err,data) => {
      if (err) callback(err)
      else callback(null, data)
    })
  },
  dropMovie : ({movie}) => {
    sqlDb.connection.query(`DELETE FROM favoriteMovies WHERE id= (?)`,[movie.id])
  }
}