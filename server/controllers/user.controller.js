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
    const {name, email, password} = req.body;
    try {
      await userService.createUser(name, email, password);
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

  /**
   * Maethod select user by their email
   * @param {*} req 
   * @param {*} res 
   */
  async getUserByEmail(req, res) {
    const { email } = req.body;
    const user = await userService.getUserByEmail(email);
    res.json(user);   
  };


  /**
   * Method perfomes user registartion
   * @param {*} req 
   * @param {*} res 
   */
  // async registration(req, res) {
  //   try {
      
  //   }
  //   catch(err) {
           
  //   }    
  // };

  /**
   * Method performs user login
   * @param {*} req 
   * @param {*} res 
   */
  // async login(req, res) {
  //   try {
      
  //   }
  //   catch(err) {
           
  //   }    
  // };

  /**
   * Method performs user logout
   * @param {*} req 
   * @param {*} res 
   */
  // async logout(req, res) {
  //   try {
      
  //   }
  //   catch(err) {
           
  //   }    
  // };

  /**
   * Method performes refrsh users token
   * @param {*} req 
   * @param {*} res 
   */
  // async refresh(req, res) {
  //   try {
      
  //   }
  //   catch(err) {
           
  //   }    
  // };
}

module.exports = new UserController();
