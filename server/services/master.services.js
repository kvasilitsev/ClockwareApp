const masterData = require('../dal/masters.dal');
const log4js = require('../logger');
const logger = log4js.getLogger("clockwiseLog");

class MasterService {   
  createMaster(name, rating, city_id){
    return masterData.createMaster(name, rating, city_id);
  }  
  getMasters() {
    return masterData.getMasters();
  }
  getMasterById(id){
    return masterData.getMasterById(id);
  }
  updateMaster(id, name, rating){
    return masterData.updateMaster(id, name, rating);
  }
  deleteMaster(id){
    return masterData.deleteMaster(id);
  }
  getMastersByCityName(name){
    return masterData.getMastersByCityName(name);
  }
}

module.exports = new MasterService()
