const db = require('../db');
const log4js = require('../logger');
const logger = log4js.getLogger("clockwiseLog");

/**
 * Class consists of variety of data base queries to table cities
 */
class CityData {
  
   /**
  * Method creates new city
  * @param {text} name 
  * @returns message
  */
  async createCity(name) {
    try {
      const newCity =  await db.query(`INSERT INTO cities (name) values ($1) RETURNING *`, [name]);  
      return `City ${name} has been added`;
    } catch (err) {
      logger.info(`Error ${err}`)
      return err.detail;
    }
  };
    
  /**
   * Method selects all cities
   * @returns id, name of all cities
   */
  async getCities() {
    const cities = await db.query('SELECT id, name FROM cities');
    return cities.rows;
  }

  /**
   * Method selects city by its id
   * @param {integer} id 
   * @returns id, name of certain city
   */
  async getCityById(id) {
    const city = await db.query('SELECT id, name FROM cities where id = $1', [id]);
    return city.rows;
  };

  /**
  * Method update city by its id
  * @param {integer} id 
  * @param {text} name 
  * @returns message
  */
  async updateCity(id, name) {    
    try {
      const city = await db.query('UPDATE cities SET name = $1 WHERE id = $2 RETURNING *', [name, id]);
      return `City ${name} has been updated`;
    } catch (err) {
      logger.info(`Error ${err}`)
      return err.detail;
    }
  }

  /**
   * Method deletes city by its name
   * @param {integer} id 
   * @returns message
   */
  async deleteCity(name) {     
    try {
      const city = await db.query('DELETE FROM cities where name = $1', [name]);
      return `City ${name} has been deleted`;
    } catch (err) {
      logger.info(`Error ${err}`)
      return err.detail;
    }
  };
  /**
   * Method select cities by master id
   * @param {integer} id 
   * @returns 
   */
  async getCitiesByMasterId(id) {
    logger.info(id)
    const cities = await db.query('select cities.name from cities, masters_cities  where masters_cities.master_id = $1 and masters_cities.city_id = cities.id', [id])
    
    return cities.rows;
  }

 
}
  
  module.exports = new CityData();
