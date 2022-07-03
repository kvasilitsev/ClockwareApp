const db = require('../db');
const cityService = require('../services/city.service');

class CityController {
    createCity(req, res) {
      cityService.createCity(req,res);
    };
    getCities(req, res) {
        cityService.getCities(req, res);
    };
    getCityById(req, res) {
        cityService.getCityById(req, res);
    }; 
    deleteCity(req, res) {
        cityService.deleteCity(req, res);
    };
}

module.exports = new CityController();
