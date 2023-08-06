const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  endpoint: process.env.DB_URL,
  port: 4000
};