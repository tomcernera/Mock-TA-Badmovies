const mysql = require('mysql');
const mysqlConfig = require('../../config.js');

const connection = mysql.createConnection({
  user: 'root',
  database:'favoriteMovies'
});




connection.connect(err => {
  if(err) console.log(err)
  else console.log('connected to mysql !')

  connection.query(
    `CREATE TABLE IF NOT EXISTS favoriteMovies(
      id INT(11),
      title VARCHAR(255),
      poster_path VARCHAR(255),
      release_date VARCHAR(255),
      PRIMARY KEY (id)
    )`
  )
})


module.exports.connection = connection;