const tokenService = require('../services/token.services');
const ApiError = require('../exceptions/api.errors');

module.exports = function (req, res, next){
  try {
    const authHeader = req.headers.authorization;
    if(!authHeader){
      return next(ApiError.UnauthorizedError());
    }
    const accessToken = authHeader.split(' ')[1];
    if(!accessToken){
      return next(ApiError.UnauthorizedError());
    }
    const userDataSet = tokenService.validateAccessToken(accessToken);
    if(!userDataSet){
      return next(ApiError.UnauthorizedError());
    }
    req.user = userDataSet;
    next();
  }
  catch(err){
    return next(ApiError.UnauthorizedError());
  }
}
