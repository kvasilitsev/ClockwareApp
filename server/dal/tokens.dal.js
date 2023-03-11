const db = require('../db');
const log4js = require('../logger');
const logger = log4js.getLogger("clockwiseLog");
const Token = require ('../dto/tokens.dto.js');

class TokenData {

	/**
	 * Method creates new token
	 * @param {integer} userId data base attribute for tokens table
	 * @param {text} refreshToken data base attribute for tokens table
	 */
	async createToken(userId, refreshToken){
		try {
			await db.query('INSERT INTO tokens (user_id, refresh_token) VALUES ($1, $2) RETURNING *', [userId, refreshToken]);
		  } catch (err) {
			logger.error(`createToken failed with reason: ${err.detail}`);
			throw err;
		  }
	}

	/**
	 * Method updates token
	 * @param {integer} userId data base attribute for tokens table
	 * @param {text} refreshToken data base attribute for tokens table
	 */
	async updateToken(userId, refreshToken){
		try {
			await db.query('UPDATE tokens SET refresh_token =$2 WHERE user_id = $1 RETURNING *', [userId, refreshToken]);
		  } catch (err) {
			logger.error(`updateToken failed with reason: ${err.detail}`);
			throw err;
		  }
	}

	/**
	 * Method selects token by user id
	 * @param {integer} userId data base attribute for tokens table
	 */
	async getTokenByUserId(userId){
	  let token = null;
    const tokenResultSet = await db.query('SELECT user_id, refresh_token FROM tokens where user_id = $1', [userId]);
    if(tokenResultSet.rowCount === 1){
      token = new Token();
      token.id = tokenResultSet.rows[0].id;
      token.userId = tokenResultSet.rows[0].user_id;
      token.id = tokenResultSet.rows[0].refresh_token;
    };
    return token;
	}

  async deleteToken(refreshToken){
    try {
      await db.query('DELETE FROM tokens WHERE refresh_token = $1', [refreshToken]);
    }
    catch(err) {
      throw new Error("Could not delete token", { cause: err });      
    }
  }

  async findToken(refreshToken){
	  let existToken = false;
    const tokenResultSet = await db.query('SELECT refresh_token FROM tokens where refresh_token = $1', [refreshToken]);
    if(tokenResultSet.rowCount === 1){
      existToken = true;
    };
    return existToken;
	}

  async findTokenByUserId(id){
	  try {
      const refreshToken = await db.query('SELECT refresh_token FROM tokens where id = $1', [id]);
      return refreshToken;
    } catch(err) {
        throw new Error("Could not find token", { cause: err });      
      }
  }	
}

module.exports = new TokenData();
