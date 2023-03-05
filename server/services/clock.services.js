const clockData = require('../dal/clocks.dal');
const orderData = require('../dal/orders.dal');
const log4js = require('../logger');
const logger = log4js.getLogger("clockwiseLog");

class ClockService {

  async createClock(size, repairDuration) { 
    
    // Convert repair duration to time interval
    repairDuration = repairDuration + ' hours';

    try {
      await clockData.createClock(size, repairDuration);
    }
    catch(err) {
      throw new Error("Could not create clock type", { cause: err });      
    }
  };
    
  getClocks() {    
    const clocks = clockData.getClocks();
    return clocks;
  };

  async updateClock(id, size, repairDuration){
    
    const validate = {
      isExistentOrders: false         
    }

    // If new repair duration > current repair duration check if orders exist with booking time > Date.now()

    const currentRepairDuration = await clockData.getRepairDurationByClockId(id);
    
    if(currentRepairDuration.hours < repairDuration){      
      const orderListByClockId = await orderData.getOrdersByClockId(id);          
      const isExistentOrders = orderListByClockId.filter(order => {        
        if(new Date(order.bookingDateTime) >= Date.now()){
          return order.id;
        } 
      })      
      if(isExistentOrders.length > 0){
        validate.isExistentOrders = true;             
        return validate;
      };
    }
    
    // Convert repair duration to time interval
    repairDuration = repairDuration + ' hours';

    try {      
      await clockData.updateClock(id, size, repairDuration);
    }
    catch(err) {
      throw new Error("Could not update clock type", { cause: err });      
    }
    return validate;     
  };

  async deleteClock(id){
    try {
      await orderData.deleteOrderByClockId(id);
      await clockData.deleteClock(id);
    }
    catch(err) {
      throw new Error("Could not delete clock type", { cause: err });      
    } 
  };

  async getRepairDurationByClockId(id){
    const repairDuration = await clockData.getRepairDurationByClockId(id);
    return repairDuration;    
  };

}

module.exports = new ClockService()
