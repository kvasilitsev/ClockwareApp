const masterData = require('../dal/masters.dal');
const orderData = require('../dal/orders.dal');
const clockData = require('../dal/clocks.dal');
const log4js = require('../logger');
const logger = log4js.getLogger("clockwiseLog");

class MasterService {

  async createMaster(name, rating) { 
    
    const validate = {
      isMaster: false      
    }

    try {
      const isMasterExist = await masterData.getMasterByName(name);      
      if(isMasterExist && !isMasterExist.isDeleted){
        validate.isMaster = true;
        return validate;
      } else if(isMasterExist && isMasterExist.isDeleted){
        let id = isMasterExist.id;
        await masterData.updateMaster(id, name, rating);       
        await masterData.unDeleteMaster(id);
        return validate;
      } else {
        await masterData.createMaster(name, rating);
      }
      return validate;
      
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

  /**
   * Function which first soft-deletes orders which are under this master, then performs soft-delete the master.
   * 
   * @param {integer} id master id primary key in the database
   */
  async deleteMaster(id){    
    try {      
      await orderData.deleteOrderByMasterId(id);
      await masterData.deleteMaster(id);
    }
    catch(err) {
      throw new Error("Could not delete master", { cause: err });      
    } 
  }

  /**
   * Function performs unDelete master (set is_deleted = false)
   * 
   * @param {integer} id master id primary key in the database
   */
  async unDeleteMaster(id){  

    try {      
      await masterData.unDeleteMaster(id);
    }
    catch(err) {
      throw new Error("Could not undelete master", { cause: err });      
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
    if(bookingHours < 8){ //todo: should be in the params file
      throw new Error(`Sorry, we are open from 8:00`); //todo: should be in the params file
    };
    if((bookingHours + repairDuration.hours) > 17){ //todo: should be in the params file
      throw new Error(`Sorry, we are close at 17:00. Please book your appointment earlier`); //todo: should be in the params file
    };
    const freeMasters = allMastersInCity.filter(master => !bookedMastersIdInCity.includes(master.id))    
    return freeMasters;
  }  
}

module.exports = new MasterService()
