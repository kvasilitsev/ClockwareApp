const clockData = require('../dal/clocks.dal');
const log4js = require('../logger');
const logger = log4js.getLogger("clockwiseLog");

class ClockService {

  async createClock(size, repairDuration) {    
    try {
      await clockData.createClock(size, repairDuration);
    }
    catch(err) {
      throw new Error("Could not create clock type", { cause: err });      
    }
  };
    
  getClocks() {
    logger.info('services/getClocks');
    const clocks = clockData.getClocks();
    return clocks;
  };

  async updateClock(id, size, repairDuration){    
    try {
      await clockData.updateClock(id, size, repairDuration);
    }
    catch(err) {
      throw new Error("Could not update clock type", { cause: err });      
    }      
  };

  async deleteClock(id){
    try {
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
