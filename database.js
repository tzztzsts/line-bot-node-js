//データベースに接続したい
const pg = require('pg');
require('dotenv').config();

exports.pool = new pg.Pool ({
  host: process.env.DB_HOST,
  databese: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  port: 5432,
  password: process.env.DB_PASSWORD,
});
