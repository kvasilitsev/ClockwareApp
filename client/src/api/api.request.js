import axios from './axios';
import { REGISTER_URL, GET_FREE_MASTERS_URL, CREATE_ORDER_URL, SEND_EMAIL_URL, GET_CITIES_URL, GET_CLOCKS_URL } from '../routes';


class Request {

  constructor({name, email, password, cityId, bookingTime, clockId, masterId}={}){
    this.name = name;
    this.email = email;
    this.password = password;
    this.cityId = cityId;
    this.bookingTime = bookingTime;
    this.clockId = clockId;
    this.masterId = masterId;
  }

  async register() {
    await axios.post(REGISTER_URL, { name: this.name, email: this.email, password: this.password },
      {
        headers: { 'Content-Type': 'application/json' },  
        withCredentials: true
      }      
    )  
  }

  async getFreeMasters() {    
    const res = await axios.get(GET_FREE_MASTERS_URL, {params: {clockId: this.clockId, cityId: this.cityId, bookingTime: this.bookingTime }},
      {
        headers: { 'Content-Type': 'application/json' },  
        withCredentials: true
      }
    )
    return res;
  }

  async createOrder() {    
    const res = await axios.post(CREATE_ORDER_URL, { name: this.name, email: this.email, bookingTime: this.bookingTime, clockId: this.clockId, cityId: this.cityId, masterId: this.masterId },
      {
        headers: { 'Content-Type': 'application/json' },  
        withCredentials: true
      }      
    )
    return res; 
  }

  async sendEmail() {   
    const res = axios.post(SEND_EMAIL_URL, {email: this.email})
    console.log(res);
  }

  async getCities() {    
    const res = await axios.get(GET_CITIES_URL,
      {
        headers: { 'Content-Type': 'application/json' },  
        withCredentials: true
      }
    )
    return res.data;
  }

  async getClocks() {    
    const res = await axios.get(GET_CLOCKS_URL,
      {
        headers: { 'Content-Type': 'application/json' },  
        withCredentials: true
      }
    )
    return res.data;
  }
  
}

export { Request };
