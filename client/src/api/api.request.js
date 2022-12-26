import axios from './axios';
import { REGISTER_URL, ADMIN_REGISTER_URL, GET_FREE_MASTERS_URL, CREATE_ORDER_URL,
       SEND_EMAIL_URL, GET_CITIES_URL, GET_CLOCKS_URL, LOGIN_URL, LOGOUT_URL, 
       GET_USERBY_EMAIL_URL } from '../models/routes';


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
    try {
      await axios.post(REGISTER_URL, { name: this.name, email: this.email, password: this.password },
        {          
          withCredentials: true
        }      
      ) 
    }
    catch (error) {
      console.log('error: ', error); 
    }     
  }

  async registerAdmin() {    
    try {
      await axios.post(ADMIN_REGISTER_URL, { name: this.name, email: this.email, password: this.password },
        {          
          withCredentials: true
        }      
      ) 
    }
    catch (error) {
      console.log('error: ', error); 
    }     
  }

  async getFreeMasters() { 
    try {      
      const res = await axios.get(GET_FREE_MASTERS_URL, {params: {clockId: this.clockId, cityId: this.cityId, bookingTime: this.bookingTime }},
        {      
          withCredentials: true
        }
      )
      return res;
    }
    catch (error) {
      console.log('error: ', error); 
    }    
    
  }

  async createOrder() {
    try {
      const res = await axios.post(CREATE_ORDER_URL, { name: this.name, email: this.email, bookingTime: this.bookingTime, clockId: this.clockId, cityId: this.cityId, masterId: this.masterId },
        {          
          withCredentials: true
        }      
      )
      return res;
    }
    catch (error) {
      console.log('error: ', error); 
    }    
  }

  async sendEmail() {
    try {
      await axios.post(SEND_EMAIL_URL, {email: this.email});       
    }
    catch (error) {
      console.log('error: ', error); 
    }       
  }

  async getCities() {
    try {
      const res = await axios.get(GET_CITIES_URL,
        {
          withCredentials: true
        }
      )
      return res.data;      
    }
    catch (error) {
      console.log('error: ', error); 
    }    
  }

  async getClocks() {
    try {
      const res = await axios.get(GET_CLOCKS_URL,
        {
          withCredentials: true
        }
      )
      return res.data;      
    }
    catch (error) {
      console.log('error: ', error); 
    }   
  }

  async login() {    
    try {
      const res = await axios.post(LOGIN_URL, { email: this.email, password: this.password },
        {          
          withCredentials: true
        }          
      )      
      return res.data.accessToken;
    }
    catch (error) {
      console.log('error: ', error); 
    }     
  }

  async logout() {
    console.log(localStorage.userId) 
    try {
      const res = await axios.post(LOGOUT_URL, { id: localStorage.userId },
        {          
          withCredentials: true
        }              
      )      
      console.log('api response', res);   
      return res;
    }
    catch (error) {
      console.log('error: ', error); 
    }     
  }

  async getUserByEmail() {
    try {
      const res = await axios.get(GET_USERBY_EMAIL_URL, {params: {email: this.email }},
        {
          withCredentials: true
        }
      )
      return res.data;      
    }
    catch (error) {
      console.log('error: ', error); 
    }   
  }
}

export { Request };
