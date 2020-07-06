// MYSQL Config
const mysql = require('mysql');
require('dotenv').config();


var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: "",
  database: process.env.DB
});

module.exports = con;