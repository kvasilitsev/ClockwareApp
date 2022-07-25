const masterData = require('../dal/masters.dal');
const log4js = require('../logger');
const logger = log4js.getLogger("clockwiseLog");

class MasterService {

  createMaster(name, rating){
    let isCreated = false;
    try {
      isCreated = masterData.createMaster(name, rating);
    }
    catch(error) {
      logger.error(`problem with the createMaster() for masterId ${id}`);      
    }
    finally {
      if(!isCreated) {
        const message = `Could not create master with name ${name} and rating ${rating}`;
        return message;
      } else {
        const message = `Created master with name ${name}, rating ${rating}`;
        return message;
      }
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

  updateMaster(id, name, rating){
    let isUpdated = false;
    try {
      isUpdated = masterData.updateMaster(id, name, rating);
    }
    catch(error) {
      logger.error(`problem with the updateMaster() for masterId ${id}`);      
    }
    finally {
      if(!isUpdated) {
        const message = `Could not update master with id ${id}, name ${name}, rating ${rating}`;
        return message;
      } else {
        const message = `Updated master with id ${id}, name ${name}, rating ${rating}`;
        return message;
      }
    }
    return isUpdated;
  }

  deleteMaster(id){
    let isDeleted = false;
    try {
      isDeleted = masterData.deleteMaster(id);
    }
    catch(error) {
      logger.error(`problem with the deleteMaster() for masterId ${id}`);      
    }
    finally {
      if(!isDeleted) {
        const message = `Could not delete master with id ${id}`;
        return message;
      } else {
        const message = `Deleted master with id ${id}`;
        return message;
      }
    }    
  }

  getMastersByCityName(name){
    const masters = masterData.getMastersByCityName(name);
    return masters;
  }
}

module.exports = new MasterService()
