const userData = require('../dal/users.dal');
const log4js = require('../logger');
const logger = log4js.getLogger("clockwiseLog");
const bcrypt = require('bcrypt');

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

  async updateUser(id, name, email, admin){    
    try {
      await userData.updateUser(id, name, email, admin);
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
  
  // async registration(name, email, password){
  //   const ifUserExist = await userData.getUserByEmail(email);
  //   if(ifUserExist){
  //     throw new Error(`User with ${email} already exist`)
  //   }
  //   const hashPassword = await bcrypt.hash(password, 3);
  //   const user = await userData.createUser(name, email, hashPassword)
  // }
}

module.exports = new UserService()