const dotenv = require('dotenv'); 
dotenv.config() 
module.exports = {
    APP_MODE: process.env.APP_MODE, 
    DB_URL : process.env.APP_MODE == 'production' ? process.env.DB_URL_PRODUCTION : process.env.DB_URL_DEVELOPMENT
}