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
    const accesToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'});
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});
		return {
			accesToken,
			refreshToken
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
};

module.exports = new TokenService();