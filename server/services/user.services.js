const userData = require('../dal/users.dal');
const log4js = require('../logger');
const logger = log4js.getLogger("clockwiseLog");

class UserService {

  async createUser(name, email, admin) {    
    try {
      await userData.createUser(name, email, admin);
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
}

module.exports = new UserService()
