const jwt = require('jsonwebtoken');
require('dotenv').config({path: '../.env'});
const tokenData = require('../dal/tokens.dal');

class TokenService {

   /**
	 * Method generate access and refresh tokens
	 * @param {*} payload 
	 * @returns 
	 */
  generateTokens(payload){
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'});
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});
		return {
			accessToken,
			refreshToken
		}
 	}

  validateAccessToken(token){
    try{
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    }
    catch(err){
      return null;
    }
  }

  validateRefreshToken(token){
    try{
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    }
    catch(err){

    }
  }

	/**
	 * Method save refresh token in token table
	 * @param {integer} userId 
	 * @param {text} refreshToken 
	 * @returns 
	 */
	async saveToken(userId, refreshToken){
		const isTokenExist = await tokenData.getTokenByUserId(userId);
		if(isTokenExist){
			const update = await tokenData.updateToken(userId, refreshToken);
			return update;
		}
		const newToken = await tokenData.createToken(userId, refreshToken);
		return newToken;
	}

  async removeToken(refreshToken){
    const token = await tokenData.deleteToken(refreshToken);
    return token;
  }

  async findToken(refreshToken){
    const token = await tokenData.findToken(refreshToken);
    return token;
  }

  async findTokenByUserId(id){
    const refreshToken = await tokenData.findTokenByUserId(id);
    return refreshToken
  }
};

module.exports = new TokenService();