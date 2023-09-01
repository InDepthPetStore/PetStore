const mysql = require('mysql2');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'qsc123890',
  database : 'petstore'
});

module.exports = connection;