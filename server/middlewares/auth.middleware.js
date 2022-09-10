const tokenService = require('../services/token.services');

module.exports = function (req, res, next){
  try {
    const authHeader = req.headers.authorization;
    if(!authHeader){
      throw new Error ('unauthorized error');
    }
    const accessToken = authHeader.split(' ')[1];
    if(!accessToken){
      throw new Error ('unauthorized error');
    }
    const userDataSet = tokenService.validateAccessToken(accessToken);
    if(!userDataSet){
      throw new Error ('unauthorized error');
    }
    req.user = userDataSet;
    next();
  }
  catch(err){
    throw new Error ('unauthorized error');
  }
}
