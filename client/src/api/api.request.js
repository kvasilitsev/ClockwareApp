import axios from './axios';
import { REGISTER_URL } from '../routes';


class Request {

  constructor(user, email, password){
    this.name = user;
    this.email = email;
    this.password = password;
  }

  async register() {
    await axios.post(REGISTER_URL, { name: this.name, email: this.email, password: this.password },
      {
        headers: { 'Content-Type': 'application/json' },  
        withCredentials: true
      }      
    )  
  }
  
}

export { Request };
