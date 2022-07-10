const db = require('../db');
const log4js = require('../logger');
const logger = log4js.getLogger("clockwiseLog");

/**
 * Class consists of variety of data base queries to table cities
 */
class CityData {
  
  /**
   * Method selects all cities
   * @returns id, name of all cities
   */
  async getCities() {
    const cities = await db.query('SELECT id, name FROM cities');    
    return cities;
  }
  
 /**
  * Method creates new city
  * @param {text} name 
  * @returns new city values
  */
  async createCity(name) {
    const newCity =  await db.query('INSERT INTO cities (name) values ($1) RETURNING *', [name]);
    return newCity;
  };

  /**
   * Method selects city by its id
   * @param {integer} id 
   * @returns id, name of certain city
   */
  async getCityById(id) {
    const city = await db.query('SELECT id, name FROM cities where id = $1', [id]);
    return city;
  };

  /**
   * Method deletes city by its id
   * @param {integer} id 
   * @returns empty array of values
   */
  async deleteCity(id) {
    const city = await db.query('DELETE FROM cities where id = $1', [id]);
    return city;    
  };

  /**
   * Method update city by its id
   * @param {integer} id 
   * @param {text} name 
   * @returns updated city values
   */
  async updateCity(id, name) {
    const city = await db.query('UPDATE cities SET name = $1 WHERE id = $2 RETURNING *', [name, id]);
    return city;
  }
}
  
  module.exports = new CityData();
