require('dotenv').config();
module.exports = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
  port: process.env.DB_PORT,
};