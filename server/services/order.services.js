const orderData = require('../dal/orders.dal');
const clockData = require('../dal/clocks.dal');
const userData = require('../dal/users.dal');
const masterData = require('../dal/masters.dal');
const sendEmail = require('./email.services');
const log4js = require('../logger');
const logger = log4js.getLogger("clockwiseLog");

class OrderService {

  async createOrder(masterId, cityId, clockId, bookingTime, email, name) {    
    
    try {
      let userId = null;

      const checkUser = await userData.getUserByEmail(email); //check if user exist
      
      if (!checkUser) { //create new user if no email in data base
        const password = null;
        await userData.createUser(name, email, password);         
      }
      
      if(checkUser){
        userId = checkUser.id;
      } else {
        const getNewUser = await userData.getUserByEmail(email);
        userId = getNewUser.id; 
      }      

      const repairDuration = await clockData.getRepairDurationByClockId(clockId);    
      const mastersInCity = await masterData.getMastersByCityId(cityId);
      const bookedMastersinCity = await masterData.bookedMastersIdInCity(cityId, bookingTime, repairDuration);          
      const isMasterInCity = mastersInCity.filter(master => master.id == masterId).length === 1;  //check if master works in the city         
      const isMasterBooked = bookedMastersinCity.filter(master => master == masterId).length > 0; //check if master is booked
      
      if(!isMasterInCity && isMasterBooked){
        throw new Error("Could not create order, master does not exist in the city or booked", { cause: 'undefiend'})
      }         
      await orderData.createOrder(masterId, cityId, clockId, bookingTime, email, name, repairDuration, userId);
      await sendEmail(email);      
    }
    catch(error) {
      logger.info(error)
      throw new Error("Could not create order", { cause: error });      
    }    
  }
    
  async getOrders() {
    try{
      const orders = await orderData.getOrders();      
      return orders;
    } catch(error){
      logger.info(error);
      throw new Error("Could not get order", { cause: error });
    }    
  }

  getOrderById(id){
    const order = orderData.getOrderById(id);
    return order;
  }
  
  getOrdersByMasterId(id){
    const orders = orderData.getOrdersByMasterId(id);    
    return orders;
  }

  getOrdersByUser(email){
    const orders = orderData.getOrdersByUser(email);    
    return orders;
  }  

  async updateOrder(id, email, masterId, cityId, clockId, bookingTime){
    
    const validate = {
      isUser: true,
      isMaster: true,
      isTime: true,
      isExpired: false
    }  
    
    try {
      email = email.toLowerCase();
      const checkUser = await userData.getUserByEmail(email);      
      if(!checkUser){     //Check if user exist  
        validate.isUser = false;
        return validate;
      }

      const mastersInCity = await masterData.getMastersByCityId(cityId);
      const isMasterInCity = mastersInCity.filter(master => master.id == masterId).length === 1;    
      if (!isMasterInCity){ //Check if master works in the city
        validate.isMaster = false;      
        return validate;
      }      
      const repairDuration = await clockData.getRepairDurationByClockId(clockId);
      const bookedMastersIdInCity = await masterData.bookedMastersIdInCityExludeOrderId(cityId, bookingTime, repairDuration, id);
      const isMasterBooked = bookedMastersIdInCity.find(master => master === masterId);      
      if(isMasterBooked){ //Check if master is booked
        validate.isTime = false;
        return validate;    
      } 
      
      const currentOrderData = await orderData.getOrderById(id);      
      const currentOrderDate = new Date(currentOrderData.bookingDateTime);    
      if(Date.now() > currentOrderDate){ //Check if order expired/complited
        validate.isExpired = true;
        return validate;
      }

      let userId = currentOrderData.userId;

      if(email !== currentOrderData.email){ //if change user - change userId
        const updatedUserData = await userData.getUserByEmail(email);
        userId = updatedUserData.id;        
      }
      
      await orderData.updateOrder(id, email, masterId, cityId, clockId, bookingTime, repairDuration, userId);
    }
    catch(err) {
      throw new Error("Could not update order", { cause: err });      
    }    
    return validate;    
  }

  async deleteOrder(id){

    const validate = {      
      isExpired: false
    }    

    try {
      const currentOrderData = await orderData.getOrderById(id);      
      const currentOrderDate = new Date(currentOrderData.bookingDateTime);    
      if(Date.now() > currentOrderDate){ //Check if order expired/complited
        validate.isExpired = true;        
        return validate;
      }

      await orderData.deleteOrder(id);
    }
    catch(err) {
      throw new Error("Could not delete order", { cause: err });      
    }
    return validate;
  } 
}

module.exports = new OrderService();

