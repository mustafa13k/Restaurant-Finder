var config = {};

config.mongoUri = "mongodb://localhost:27017/rtr";
config.cookieMaxAge = 60 * 60 * 24 * 30; // days expiration

config.apiKey = "__YOUR API KEY OF ZOMATO HERE__";
config.apiUrl = "https://developers.zomato.com/api/v2.1/collections";


module.exports = config;

