const userData = require('../dal/users.dal');
const log4js = require('../logger');
const logger = log4js.getLogger("clockwiseLog");
const bcrypt = require('bcrypt');
const tokenService = require('./token.services');
const User = require ('../dto/users.dto.js');


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
    const ifUserExist = await userData.getUserByEmail(email);
    if(ifUserExist){
      throw new Error(`User with ${email} already exist`, { cause: err })
    }
    const hashPassword = await bcrypt.hash(password, 3);
    await userData.createUser(name, email, hashPassword);
    const user = await userData.getUserByEmail(email);
    //const userDto = new User({...user});    
    const tokens = tokenService.generateTokens({...user});
    await tokenService.saveToken(user.id, tokens.refreshToken);
    return {...tokens, user: user}; //temp
  }

  // async login(email, password){
  //   const ifUserExist = await userData.getUserByEmail(email);
  //   if(!ifUserExist){
  //     throw new Error(`User with ${email} does not exist`, { cause: err });
  //   }
  //   const isPasswordCorrect = await bcrypt.compare(password, user.password);
  //   if(!isPasswordCorrect){
  //     throw new Error(`Password is not correct`, { cause: err });
  //   }
  // }
}

module.exports = new UserService()
