const City = require ('../dto/cities.dto.js');
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
      await db.query(`INSERT INTO cities (name) values ($1) RETURNING *`, [name]);  
    }
    catch (err) {
      throw err;
    }
    return true;
  };
    
  /**
   * Method selects all cities
   * @returns id, name of all cities
   */
  async getCities() {
    let cityList = [];    
    const citiesResultSet = await db.query('SELECT id, name FROM cities');   
    if(citiesResultSet.rowCount > 0){ 
      citiesResultSet.rows.forEach(element => {
        let city = new City();
        city.id = element.id;
        city.name = element.name;
        cityList.push(city);       
      });   
    }
    return cityList;    
  }

  /**
   * Method selects city by its id
   * @param {integer} id 
   * @returns id, name of certain city
   */
  async getCityById(id) {
    let city = new City();
    const cityResultSet = await db.query('SELECT id, name FROM cities where id = $1', [id]);
    if(cityResultSet.rowCount === 1){      
      city.id = cityResultSet.rows[0].id;
      city.name = cityResultSet.rows[0].name;      
    } else return false;
    return city;
    
  };

  /**
  * Method update city by its id
  * @param {integer} id 
  * @param {text} name 
  * @returns message
  */
  async updateCity(id, name) {    
    try {
      await db.query('UPDATE cities SET name = $1 WHERE id = $2 RETURNING *', [name, id]);      
    } catch (err) {
      throw err;
    }
    return true;
  }

  /**
   * Method deletes city by its name
   * @param {integer} id 
   * @returns message
   */
  async deleteCity(name) {     
    try {
      await db.query('DELETE FROM cities where name = $1', [name]);      
    } catch (err) {
      throw err;
    }
    return true;
  };
  /**
   * Method select cities by master id
   * @param {integer} id 
   * @returns 
   */
  async getCitiesByMasterId(id) {
    const cities = await db.query('select cities.name from cities, masters_cities  where masters_cities.master_id = $1 and masters_cities.city_id = cities.id', [id]);    
    return cities.rows;
  }

 
}
  
  module.exports = new CityData();
