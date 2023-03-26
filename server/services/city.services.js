const cityData = require('../dal/cities.dal');
const orderData = require('../dal/orders.dal');
const log4js = require('../logger');
const logger = log4js.getLogger("clockwiseLog");

class CityService {
    async createCity(name){
      
      const validate = {
        isCity: false      
      }

      try {
        const isCityExist = await cityData.getCityByName(name);
               
        if(isCityExist && !isCityExist.isDeleted){          
          validate.isCity = true;
          return validate;
        }
        if(isCityExist && isCityExist.isDeleted){          
          let id = isCityExist.id; 
          await cityData.unDeleteCity(id);
          return validate;
        } else {
          await cityData.createCity(name);
          return validate;
        }        
      }
      catch(err) {
        throw new Error("Could not create city", { cause: err });
      }
    }
    getCities(){
      const cities = cityData.getCities();
      if(cities.length < 1) {        
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
        await orderData.deleteOrderByCityId(id);
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
