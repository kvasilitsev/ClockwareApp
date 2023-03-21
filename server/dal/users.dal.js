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
   * @param {text} name data base attribute for users table
   * @param {text} email data base attribute for users table 
   */  
  async createUser(name, email) {    
    try {
      await db.query('INSERT INTO users (name, email, password, admin) values ($1, $2, null, false) RETURNING *', [name, email]);    
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
    const usersResultSet = await db.query('SELECT id, name, email, admin FROM users WHERE is_deleted = false');    
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
   * @param {integer} id data base primary key for users table
   * @returns name, email, admin status of certain user
   */
  async getUserById(id) {
    let user = new User();
    const userResultSet = await db.query('SELECT id, name, email, admin FROM users WHERE is_deleted = false AND id = $1', [id]);
    if(userResultSet.rowCount === 1){      
      user.name = userResultSet.rows[0].name;
      user.email = userResultSet.rows[0].email;
      user.admin = userResultSet.rows[0].admin;
      user.id = userResultSet.rows[0].id;
    }
    return user;
  };

  /**
   * Method updates user by their id
   * @param {integer} id data base primary key for users table
   * @param {text} name data base attribute for users table
   * @param {text} email data base attribute for users table
   * @param {boolean} admin data base attribute for users table
   */
  async updateUser(id, name, email) {   
    try {      
      await db.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [name, email, id]);
    } catch (err) {
      logger.error(`updateUser failed with reason: ${err.detail}`);
      throw err;
    }
  };

  /**
   * Method performs soft delete user by their email (set is_deleted = true)
   * @param {text} email data base attribute for users table
   */
  async deleteUser(email) {
    try {
      await db.query('UPDATE users SET is_deleted = true WHERE email = $1', [email]); 
    } catch (err) {
      logger.error(`deleteUser failed with reason: ${err.detail}`);
      throw err;
    }
  };

  /**
   * Method perfoms user undelete function (set is_deletes = false) by their id
   * @param {integer} id data base primary key for users table
   */
  async unDeleteUser(id) {
    try {
      await db.query('UPDATE users SET is_deleted = false WHERE id = $1', [id]); 
    } catch (err) {
      logger.error(`unDeleteUser failed with reason: ${err.detail}`);
      throw err;
    }
  };

  /**
   * Method select user by their email
   * @param {text} email data base attribute for users table
   * @returns 
   */
  async getUserByEmail(email) {      
    let user = null;
    try{
      const userResultSet = await db.query('SELECT id, name, email, admin, password, is_deleted FROM users where email = $1', [email]);
      if(userResultSet.rowCount === 1){  
        user = new User();
        user.name = userResultSet.rows[0].name;
        user.email = userResultSet.rows[0].email;
        user.admin = userResultSet.rows[0].admin;
        user.id = userResultSet.rows[0].id;
        user.password = userResultSet.rows[0].password;
        user.isDeleted = userResultSet.rows[0].is_deleted;
      };
    } catch (error) {
      logger.error(`getUserByEmail failed with reason: ${error.detail}`);
      throw error;
    }                                           
    return user;
  };

  /**
   * Method create administartor
   * @param {text} name  data base attribute for users table
   * @param {text} email data base attribute for users table
   * @param {varchar} password data base attribute for users table
   */
  async createAdmin(name, email, password) {
    try {
      await db.query('INSERT INTO users (name, email, password, admin) values ($1, $2, $3, true) RETURNING *', [name, email, password]);    
    } catch (error) {
      logger.error(`createAdmin failed with reason: ${error.detail}`);
      throw error;
    }
  };
}
  
module.exports = new UserData();
