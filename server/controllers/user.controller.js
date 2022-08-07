const userService = require("../services/user.services")
const log4js = require('../logger');
const logger = log4js.getLogger("clockwiseLog");

/**
 * Class consists of variety of methods of entity UserController
 */
class UserController {

  /**
   * Method interprets http request to creates new user
   * @param {*} req 
   * @param {*} res 
   */
  async createUser(req, res) {
    const {name, email, admin} = req.body;    
    try {
      await userService.createUser(name, email, admin);
    }
    catch(err) {
      res.json({
        message: err.message,
        cause: err.cause.detail
      } );      
    }
    res.send(true);
  };

  /**
   * Method interprets http request to slect all users
   * @param {*} req 
   * @param {*} res 
   */
  async getUsers(req, res) {
    const users = await userService.getUsers();
    res.json(users);
  };

  /**
   * Method interprets http request to select user by their id
   * @param {*} req 
   * @param {*} res 
   */
  async getUserById(req, res) {
    const id = req.params.id;
    const user = await userService.getUserById(id);
    res.json(user);   
  };

  /**
   * Method interprets http request to update user data by their id
   * @param {*} req 
   * @param {*} res 
   */  
  async updateUser(req, res) {
    const {id, name, email, admin} = req.body;
    try {
      await userService.updateUser(id, name, email, admin);
    }
    catch(err) {
      res.json({
        message: err.message,
        cause: err.cause.detail
      });      
    }
    res.send(true);
  };

  /**
   * Method interprets http request to delete user by their id
   * @param {*} req 
   * @param {*} res 
   */
  async deleteUser(req, res) {
    const id = req.params.id;   
    try {
      await userService.deleteUser(id);
    }
    catch(err) {
      res.json({
        message: err.message,
        cause: err.cause.detail
      });      
    }
    res.send(true);
  };  
}

module.exports = new UserController();
