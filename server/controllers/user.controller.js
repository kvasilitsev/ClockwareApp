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
    const {id, name, email} = req.body;
    try {
      await userService.updateUser(id, name, email);
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
   * Method creates administrator
   * @param {*} req 
   * @param {*} res 
   */
  async createAdmin(req, res) {
    const {name, email, password} = req.body;
    try {
      await userService.createAdmin(name, email, password);
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
   * Method perfomes user registartion
   * @param {*} req 
   * @param {*} res 
   */
  async registration(req, res, next) {
    try {
      const {name, email, password} = req.body;
      const userData = await userService.registration(name, email, password);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true} )
      return res.json(userData);
    }
    catch(err) {
      next(err);
    }    
  };

  /**
   * Method perfomes user registartion
   * @param {*} req 
   * @param {*} res 
   */
   async adminRegistration(req, res, next) {
    try {
      const {name, email, password} = req.body;
      const userData = await userService.adminRegistration(name, email, password);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true} )
      return res.json(userData);
    }
    catch(err) {
      next(err);
    }    
  };

  /**
   * Method performs user login
   * @param {*} req 
   * @param {*} res 
   */
  async login(req, res, next) {
    try {
      const {email, password} = req.body;
      const userData = await userService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true} )
      return res.json(userData);
    }
    catch(err) {
      next(err);
    }    
  };

  /**
   * Method performs user logout
   * @param {*} req 
   * @param {*} res 
   */
  async logout(req, res, next) {
    try {
      const {refreshToken} = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.send('you are logged out');
    }
    catch(err) {
      next(err);
    }    
  };

  /**
   * Method performes refrsh users tokens
   * @param {*} req 
   * @param {*} res 
   */
  async refresh(req, res, next) {
    try {
      const {refreshToken} = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true} )
      return res.json(userData);
    }
    catch(err) {
      next(err);
    }    
  };
}

module.exports = new UserController();
