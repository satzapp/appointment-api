const mongoose   = require('mongoose');
const config = require("./config");

/**
* Connect to mongo db
*
* @returns {object} Mongoose connection
* @public
*/
exports.connect = () => {
    mongoose.connect( `mongodb+srv://${config.DB_USER}:${config.DB_PASS}@${config.DB_URI}/${config.DB_NAME}`, {
      keepAlive: 1,
      useNewUrlParser: true,
      autoIndex: false
    });
    return mongoose.connection;
  };