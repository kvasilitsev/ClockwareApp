const cityData = require('../dal/city.dal');
const log4js = require('../logger');
const logger = log4js.getLogger("clockwiseLog");

class CityService {
    createCity(name){
        return cityData.createCity(name);
    }
    getCities(){
        return cityData.getCities();
    }
    getCityById(id){
        return cityData.getCityById(id);
    }
    updateCity(id, name){
        return cityData.updateCity(id, name);
    }
    deleteCity(name){
        return cityData.deleteCity(name);
    }
    getCitiesByMasterId(id){
        return cityData.getCitiesByMasterId(id)
    }
}

module.exports = new CityService()