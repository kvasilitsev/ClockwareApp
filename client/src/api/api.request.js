import axios from './axios';
import { REGISTER_URL } from '../models/route';


class Request {

  constructor(user, email, pwd){
    this.name = user;
    this.email = email;
    this.password = pwd;
  }

  async register() {
    await axios.post(REGISTER_URL, { name: this.name, email: this.email, password: this.password },
      {
        headers: { 'Content-Type': 'application/json' },  
        withCredentials: true
      }
    );
  }
}

export { Request };
