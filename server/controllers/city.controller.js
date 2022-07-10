const db = require('../db');
const citiesData = require('../dal/city.dal');
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
    const newCity = await citiesData.createCity(name);
		res.json(newCity.rows);
  };

  /**
   * Method interprets http request to select all cities
   * @param {*} req 
   * @param {*} res 
   */
  async getCities(req, res) {
    const cities = await citiesData.getCities(); 
		res.json(cities.rows);
  };

  /**
   * Method interprets http request to get city by its id
   * @param {*} req 
   * @param {*} res 
   */
  async getCityById(req, res) {
    const id = req.params.id;
    const city = await citiesData.getCityById(id);
    res.json(city.rows);
  }; 

  /**
   * Method interprets http request to delete city by its id
   * @param {*} req 
   * @param {*} res 
   */
  async deleteCity(req, res) {
    const id = req.params.id;
    const city = await citiesData.deleteCity(id);
    res.json(city.rows);
  };

  /**
   * Method interprets http request to updet city data by its id
   * @param {*} req 
   * @param {*} res 
   */
  async updateCity(req, res) {
    const {id, name} = req.body;
    const city = await citiesData.updateCity(id, name);
    res.json(city.rows);
  }
}

module.exports = new CityController();
