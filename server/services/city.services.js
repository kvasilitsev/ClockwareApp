const cityData = require('../dal/cities.dal');
const log4js = require('../logger');
const logger = log4js.getLogger("clockwiseLog");

class CityService {
    async createCity(name){
      try {
        await cityData.createCity(name);
      }
      catch(err) {
        throw new Error("Could not create city", { cause: err });
      }
    }
    getCities(){
      const cities = cityData.getCities();
      if(cities.length < 1) {
        logger.error("we have a db problem, not sure what");
        throw new Error("no cities returned from database");
      }
      return cities; 
    }
    getCityById(id){
      const city = cityData.getCityById(id);
      return city;
    }
    async updateCity(id, name){
      try {
        await cityData.updateCity(id, name);
      }
      catch(err) {
        throw new Error("Could not update city", { cause: err });
      }
    }    
    async deleteCity(id){
      try {
        await cityData.deleteCity(id);
      }
      catch(err) {
        throw new Error("Could not delete city", { cause: err });
      }      
    }
    getCitiesByMasterId(id){
      const cities = cityData.getCitiesByMasterId(id);  
      return cities;
    };
}
module.exports = new CityService()
