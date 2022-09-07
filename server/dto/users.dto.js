/**
 * User class with properties id, name, email, admin
 */
 class User {
    id;
    name;
    email;
    admin;
    password;
  
    /**
     * 
     * @param {integer} id
     * @param {text} name
     * @param {text} email
     * @param {boolean} admin
     * @param {text} password
     */
    constructor (id, name, email, admin, password) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.admin = admin;
      this.password = password;    
    }
  }
  
  module.exports = User;