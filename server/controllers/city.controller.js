const cityService = require('../services/city.services');
const log4js = require('../logger');
const logger = log4js.getLogger("clockwiseLog");

/**
 * Class consists of variety of methods of entity CityController
 */
class CityController {

  /**
   * Method interprets http request to create new city
   * @param {*} req 
   * @param {*} res 
   */
  async createCity(req, res) {
    const {name} = req.body;
    let response = null;

    try {
      response = await cityService.createCity(name);      
    }
    catch(err) {
      res.json({
        message: err.message,
        cause: err.cause.detail
      } );      
    }
    res.send(response);
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
    const { id, name } = req.body.params;
    try {
      await cityService.updateCity(id, name);
    }
    catch(err) {
      res.json({
        message: err.message,
        cause: err.cause.detail
      } );
    }
    res.send(true);
  }

  /**
   * Method interprets http request to delete city by its id
   * @param {*} req 
   * @param {*} res 
   */
  async deleteCity(req, res) {
    const { id } = req.body.params;   
    try {
      await cityService.deleteCity(id);
    }
    catch(err) {
      res.json({
        message: err.message,
        cause: err.cause.detail
      } );
    }
    res.send(true);
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
