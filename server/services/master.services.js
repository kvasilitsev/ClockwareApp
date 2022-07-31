const masterData = require('../dal/masters.dal');
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
}

module.exports = new MasterService()
