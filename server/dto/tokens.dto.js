/**
 * Token class with properties id, userId, refreshToken
 */
 class Token {
    id;
    userId;
    refreshToken;    
  
    /**
     * 
     * @param {integer} id 
     * @param {integer} userId 
     * @param {text} refreshToken 
     */
    constructor (id, userId, refreshToken) {
      this.id = id;
      this.userId = userId;
      this.refreshToken = refreshToken;          
    }
  }
  
  module.exports = Token;