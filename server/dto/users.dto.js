/**
 * User class with properties id, name, email, admin
 */
 class User {
    id;
    name;
    email;
    admin;
  
    /**
     * 
     * @param {integer} id 
     * @param {text} name 
     * @param {text} email 
     * @param {boolean} admin 
     */
    constructor (id, name, email, admin) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.admin = admin;
    }
  }
  
  module.exports = User;