const userData = require('../dal/users.dal');
const log4js = require('../logger');
const logger = log4js.getLogger("clockwiseLog");
const bcrypt = require('bcrypt');
const tokenService = require('./token.services');
const ApiError = require('../exceptions/api.errors');
const {isStringNullOrEmpty, isEmailValid, isPasswordValid, isNameValid} = require('../utils');


class UserService {

  async createUser(name, email, password) {    
    try {
      await userData.createUser(name, email, password);
    }
    catch(err) {
      throw new Error("Could not create user", { cause: err });      
    }
  }
    
  getUsers() {
    const users = userData.getUsers();
    return users;
  }

  getUserById(id){
    const user = userData.getUserById(id);
    return user;
  }

  async updateUser(id, name, email){    
    try {
      await userData.updateUser(id, name, email);
    }
    catch(err) {
      throw new Error("Could not update user", { cause: err });      
    }      
  }

  async deleteUser(id){
    try {
      await userData.deleteUser(id);
    }
    catch(err) {
      throw new Error("Could not delete user", { cause: err });      
    } 
  }

  getUserByEmail(email){
    const user = userData.getUserByEmail(email);
    return user;
  }

  async createAdmin(name, email, password) {    
    try {
      await userData.createAdmin(name, email, password);
    }
    catch(err) {
      throw new Error("Could not create admin", { cause: err });      
    }
  }  
  
  async registration(name, email, password){
    if(isStringNullOrEmpty(name) || isStringNullOrEmpty(email) || isStringNullOrEmpty(password)){
      throw ApiError.BadRequest(`Name, email or password can not be an empty string`);
    }
    if(!isEmailValid(email)){
      throw ApiError.BadRequest(`invalid email`);
    }
    if(!isPasswordValid(password)){
      throw ApiError.BadRequest(`invalid password`);
    }
    if(!isNameValid(name)){
      throw ApiError.BadRequest(`invalid name`);
    }
    const ifUserExist = await userData.getUserByEmail(email);
    if(ifUserExist){
      throw ApiError.BadRequest(`User with ${email} already exist`)
    }
    const hashPassword = await bcrypt.hash(password, 3);
    await userData.createUser(name, email, hashPassword);
    const user = await userData.getUserByEmail(email);
    const tokens = tokenService.generateTokens({...user});
    await tokenService.saveToken(user.id, tokens.refreshToken);
    return {...tokens, user: user}; //temp
  }

  async adminRegistration(name, email, password){
    if(isStringNullOrEmpty(name) || isStringNullOrEmpty(email) || isStringNullOrEmpty(password)){
      throw ApiError.BadRequest(`Name, email or password can not be an empty string`);
    }
    if(!isEmailValid(email)){
      throw ApiError.BadRequest(`invalid email`);
    }
    if(!isPasswordValid(password)){
      throw ApiError.BadRequest(`invalid password`);
    }
    if(!isNameValid(name)){
      throw ApiError.BadRequest(`invalid name`);
    }
    const ifUserExist = await userData.getUserByEmail(email);
    if(ifUserExist){
      throw ApiError.BadRequest(`User with ${email} already exist`)
    }
    const hashPassword = await bcrypt.hash(password, 3);
    await userData.createAdmin(name, email, hashPassword);
    const user = await userData.getUserByEmail(email);
    const tokens = tokenService.generateTokens({...user});
    await tokenService.saveToken(user.id, tokens.refreshToken);
    return {...tokens, user: user}; //temp
  }

  async login(email, password){
    const user = await userData.getUserByEmail(email);
    if(!user){
      throw ApiError.BadRequest(`login/password is not correct`);
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect){
      throw ApiError.BadRequest(`login/password is not correct`);
    }
    const tokens = tokenService.generateTokens({...user});
    await tokenService.saveToken(user.id, tokens.refreshToken);
    return {...tokens, user: user}; //temp
  }

  async logout(refreshToken){
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken){
    if(!refreshToken){
      throw ApiError.UnauthorizedError();
    }
    const userDataSet = tokenService.validateRefreshToken(refreshToken);
    const isTokenInDB = await tokenService.findToken(refreshToken);
    if(!userData || !isTokenInDB){
      throw ApiError.UnauthorizedError();
    }    
    const user = await userData.getUserById(userDataSet.id);
    const tokens = tokenService.generateTokens({...user});
    await tokenService.saveToken(user.id, tokens.refreshToken);
    return {...tokens, user: user}; //temp
  }
}

module.exports = new UserService()
