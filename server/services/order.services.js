const orderData = require('../dal/orders.dal');
const clockData = require('../dal/clocks.dal');
const log4js = require('../logger');
const logger = log4js.getLogger("clockwiseLog");

class OrderService {

  async createOrder(userId, masterId, cityId, clockId, bookingDateTime) {
    const repairDuration =  await clockData.getRepairDurationByClockId(clockId);
    try {
      await orderData.createOrder(userId, masterId, cityId, clockId, bookingDateTime, repairDuration);
    }
    catch(err) {
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

  async updateOrder(id, userId, masterId, cityId, clockId, bookingDateTime){
    const repairDuration =  await clockData.getRepairDurationByClockId(clockId);   
    try {
      await orderData.updateOrder(id, userId, masterId, cityId, clockId, bookingDateTime, repairDuration);
    }
    catch(err) {
      throw new Error("Could not update order", { cause: err });      
    }      
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
