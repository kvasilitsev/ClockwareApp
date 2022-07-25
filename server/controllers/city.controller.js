const cityService = require('../services/city.services');
const log4js = require('../logger');
const logger = log4js.getLogger("clockwiseLog");

/**
 * Class consists of variety of methods of entity City
 */
class CityController {

  /**
   * Method interprets http request to create new city
   * @param {*} req 
   * @param {*} res 
   */
  async createCity(req, res) {
    const {name} = req.body;
    const newCity = await cityService.createCity(name);
    res.json(newCity);
  };

  /**
   * Method interprets http request to select all cities
   * @param {*} req 
   * @param {*} res 
   */
  async getCities(req, res) {
    const cities = await cityService.getCities();
    res.json(cities)
  };

  /**
   * Method interprets http request to get city by its id
   * @param {*} req 
   * @param {*} res 
   */
  async getCityById(req, res) {
    const id = req.params.id;
    const city = await cityService.getCityById(id);    
    res.json(city);
  }; 
  /**
  * Method interprets http request to updet city data by its id
  * @param {*} req 
  * @param {*} res 
  */
  async updateCity(req, res) {
    const {id, name} = req.body;
    const city = await cityService.updateCity(id, name);
    res.json(city);
  }

  /**
   * Method interprets http request to delete city by its id
   * @param {*} req 
   * @param {*} res 
   */
  async deleteCity(req, res) {
    const name = req.params.name;
    const city = await cityService.deleteCity(name);
    res.json(city);
  }; 

  /**
   * Method interprets http request to get cities name and id by master id
   * @param {*} req 
   * @param {*} res 
   */
  async getCitiesByMasterId(req, res){
    const id = req.params.id;
    const cities = await cityService.getCitiesByMasterId(id);
    res.json(cities);
  } 
}

module.exports = new CityController();
