import axios from './axios';
import { REGISTER_URL, ORDER_URL } from '../routes';


class Request {

  constructor({name, email, password, cityId, bookingTime, clockId}={}){
    this.name = name;
    this.email = email;
    this.password = password;
    this.cityId = cityId;
    this.bookingTime = bookingTime;
    this.clockId = clockId;
  }

  async register() {
    await axios.post(REGISTER_URL, { name: this.name, email: this.email, password: this.password },
      {
        headers: { 'Content-Type': 'application/json' },  
        withCredentials: true
      }      
    )  
  }

  async order() {    
    const res = await axios.get(ORDER_URL, {params: {clockId: this.clockId, cityId: this.cityId, bookingTime: this.bookingTime }},
      {
        headers: { 'Content-Type': 'application/json' },  
        withCredentials: true
      }
    )
    return res;
  }
  
}

export { Request };
