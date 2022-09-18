const ApiError = require('../exceptions/api.errors');
const log4js = require('../logger');
const logger = log4js.getLogger("clockwiseLog");

module.exports = function (err, req, res, next){
  logger.warn(err);
  if(err instanceof ApiError){
    return res.status(err.status).json({message: err.message, errors: err.errors})
  }
  return res.status(500).json({message: 'Unknown error'})
}