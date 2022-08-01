const User = require ('../dto/users.dto.js');
const db = require('../db');
const log4js = require('../logger');
const logger = log4js.getLogger("clockwiseLog");


/**
 * Class consists of variety of data base queries to the table users
 */

class UserData {

  /**
   * Method creates new user
   * @param {text} name 
   * @param {integer} email
   * @param {boolean} admin  
   */  
  async createUser(name, email, admin) {
    try {
      await db.query('INSERT INTO users (name, email, admin) values ($1, $2, $3) RETURNING *', [name, email, admin]);    
    } catch (err) {
      logger.error(`createUser failed with reason: ${err.detail}`);
      throw err;
    }
  };

  /**
   * Method returns all users
   * @returns an array of users objects
   */
  async getUsers() {
    let userList = [];    
    const usersResultSet = await db.query('SELECT id, name, email, admin FROM users');    
    if(usersResultSet.rowCount > 0) { 
      usersResultSet.rows.forEach(element => {                 
        let user = new User();
        user.name = element.name;
        user.id = element.id;
        user.email = element.email;
        user.admin = element.admin;       
        userList.push(user);       
      });   
    }
    return userList;
  };

  /**
   * Method selects user by their id
   * @param {integer} id 
   * @returns name, email, admin status of certain user
   */
  async getUserById(id) {
    let user = new User();
    const userResultSet = await db.query('SELECT id, name, email, admin FROM users where id = $1', [id]);
    if(userResultSet.rowCount === 1){      
      user.name = userResultSet.rows[0].name;
      user.rating = userResultSet.rows[0].email;
      user.admin = userResultSet.rows[0].admin;
      user.id = userResultSet.rows[0].id;
    };    
    return user;
  };

  /**
   * Method updates user by their id
   * @param {integer} id 
   * @param {text} name 
   * @param {text} email
   * @param {boolean} admin
   */
  async updateUser(id, name, email, admin) {   
    try {
      await db.query('UPDATE users SET name = $1, email = $2, admin = $3 WHERE id = $4 RETURNING *', [name, email, admin, id]);
    } catch (err) {
      logger.error(`updateUser failed with reason: ${err.detail}`);
      throw err;
    }
  };

  /**
   * Method deletes user by their id
   * @param {integer} id
   */
  async deleteUser(id) {
    try {
      await db.query('DELETE FROM users where id = $1', [id]); 
    } catch (err) {
      logger.error(`deleteUser failed with reason: ${err.detail}`);
      throw err;
    }
  };
}
  
module.exports = new UserData();
