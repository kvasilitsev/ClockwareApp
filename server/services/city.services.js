const cityData = require('../dal/cities.dal');
const log4js = require('../logger');
const logger = log4js.getLogger("clockwiseLog");

class CityService {
    createCity(name){
      let isCreated = false;
      try {
        isCreated = cityData.createCity(name);
      }
      catch(error) {
        logger.error(`problem with the createCity() for city name ${name}`);      
      }
      finally {
        if(!isCreated){
          const message = `Could not create City ${name}`;
          return message;
        } else {
          const message = `created city ${name}`;
          return message;
        }
      }        
    }
    getCities(){
      const cities = cityData.getCities();
      return cities; 
    }
    getCityById(id){
      const city = cityData.getCityById(id);
      return city;
    }
    updateCity(id, name){
      let isUpdated = false;
      try {
        isUpdated = cityData.updateCity(id, name);
      }
      catch(error) {
        logger.error(`problem with the updateCity() for city id ${id}`);      
      }
      finally {
        if (!isUpdated) {
          const message = `Could not update city ${name} with id ${id}`;
          return message;
        } else {
          const message = `Udated city ${name} with id ${id}`;
          return message;
        }
      }
    }
    deleteCity(name){
      let isDeleted = false;
      try {
        isDeleted = cityData.deleteCity(name);
      }
      catch(error) {
        logger.error(`problem with the updateCity() for city name ${name}`);      
      }
      finally {
        if(!isDeleted){
          const message = `Could not delete city ${name} with id ${id}`;
          return message;
        } else {
          const message = `Deleted city ${name}`;
          return message;
        }
      }         
    }
    getCitiesByMasterId(id){
      const cities = cityData.getCitiesByMasterId(id);  
      return cities;
    }
}
module.exports = new CityService()
