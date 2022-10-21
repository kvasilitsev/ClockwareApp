const masterData = require('../dal/masters.dal');
const clockData = require('../dal/clocks.dal');
const log4js = require('../logger');
const logger = log4js.getLogger("clockwiseLog");

class MasterService {

  async createMaster(name, rating) {    
    try {
      await masterData.createMaster(name, rating);
    }
    catch(err) {
      throw new Error("Could not create master", { cause: err });      
    }
  }
    
  getMasters() {
    const masters = masterData.getMasters();
    return masters;
  }

  getMasterById(id){
    const master = masterData.getMasterById(id);
    return master;
  }

  async updateMaster(id, name, rating){    
    try {
      await masterData.updateMaster(id, name, rating);
    }
    catch(err) {
      throw new Error("Could not update master", { cause: err });      
    }      
  }

  async deleteMaster(id){
    try {
      await masterData.deleteMaster(id);
    }
    catch(err) {
      throw new Error("Could not delete master", { cause: err });      
    } 
  }

  getMastersByCityId(id){
    const masters = masterData.getMastersByCityId(id);
    return masters;
  }

  async addCityForMaster(masterId, cityId){
    try {
      await masterData.addCityForMaster(masterId, cityId);
    }
    catch (err){
      throw new Error("Could not add new city", { cause: err });
    }
  }

  async getFreeMastersInCity(cityId, bookingTime, clockId){
    const allMastersInCity = await masterData.getMastersByCityId(cityId);
    const repairDuration = await clockData.getRepairDurationByClockId(clockId);
    const bookedMastersIdInCity =  await masterData.bookedMastersIdInCity(cityId, bookingTime, repairDuration);
    const bookingHours = new Date(bookingTime).getHours();   
    if(bookingHours < 8){
      throw new Error(`Sorry, we are open from 8:00`);
    };
    if((bookingHours + repairDuration.hours) > 17){
      throw new Error(`Sorry, we are close at 17:00. Please book your appointment earlier`);
    };
    const freeMasters = allMastersInCity.filter(master => !bookedMastersIdInCity.includes(master.id))    
    return freeMasters;
  }  
}

module.exports = new MasterService()
