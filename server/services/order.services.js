const orderData = require('../dal/orders.dal');
const clockData = require('../dal/clocks.dal');
const userData = require('../dal/users.dal')
const masterData = require('../dal/masters.dal')
const log4js = require('../logger');
const logger = log4js.getLogger("clockwiseLog");

class OrderService {

  async createOrder(masterId, cityId, clockId, bookingTime, email, name) {    
    const getUser = await userData.getUserByEmail(email);    
    if (!getUser) {
      const password = null;
      await userData.createUser(name, email, password);
    }
    const repairDuration = await clockData.getRepairDurationByClockId(clockId);
    const mastersInCity = await masterData.getMastersByCityId(cityId);
    const isMasterInCity = mastersInCity.filter(master => master.id == masterId).length === 1;    
    if(!isMasterInCity){
      throw new Error("Could not create order, master does not exist in the city", { cause: 'undefiend'})
    }
    try {      
      await orderData.createOrder(masterId, cityId, clockId, bookingTime, email, name, repairDuration);
    }
    catch(err) {
      logger.info('error')
      throw new Error("Could not create order", { cause: err });      
    }    
  }
    
  getOrders() {
    const orders = orderData.getOrders();
    return orders;
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
      isTime: true
    }

    const checkUser = await userData.getUserByEmail(email);
    const mastersInCity = await masterData.getMastersByCityId(cityId);
    const isMasterInCity = mastersInCity.filter(master => master.id == masterId).length === 1;
    const repairDuration = await clockData.getRepairDurationByClockId(clockId);
    const bookedMastersIdInCity = await masterData.bookedMastersIdInCityExludeOrderId(cityId, bookingTime, repairDuration, id);
    const isMasterBusy = bookedMastersIdInCity.find(master => master === masterId);  

    if(!checkUser){
      validate.isUser = false;
      return validate;
    } else if (!isMasterInCity){
      validate.isMaster = false;      
      return validate;
    } else if(isMasterBusy){
      validate.isTime = false;
      return validate;
    }    
    
    try {
      await orderData.updateOrder(id, email, masterId, cityId, clockId, bookingTime, repairDuration);
    }
    catch(err) {
      throw new Error("Could not update order", { cause: err });      
    }    
    return validate; 
  }

  async deleteOrder(id){
    try {
      await orderData.deleteOrder(id);
    }
    catch(err) {
      throw new Error("Could not delete order", { cause: err });      
    } 
  } 
}

module.exports = new OrderService();
