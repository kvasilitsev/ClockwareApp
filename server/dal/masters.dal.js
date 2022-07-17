const db = require('../db');
const log4js = require('../logger');
const logger = log4js.getLogger("clockwiseLog");

/**
 * Class consists of variety of data base queries to the table masters
 */

class MasterData {

  /**
   * Method creates new master
   * @param {text} name 
   * @param {integer} rating 
   * @returns message
   */
  
  async createMaster(name, rating) {  
    try {
      const newMaster =  await db.query('INSERT INTO masters (name, rating) values ($1, $2) RETURNING *', [name, rating]);
      return `Master ${name} with rating ${rating} has been added in the list`;
    } catch (err) {
      logger.info(`Error ${err}`)
      return err.detail;
    }
  };

  /**
   * Method selects all masters
   * @returns id, name, rating of all masters
   */
  async getMasters() {    
    const masters = await db.query('SELECT id, name, rating FROM masters');
    return masters.rows;
  };

  /**
   * Method selects master by their id
   * @param {integer} id 
   * @returns name, rating of certain master
   */
  async getMasterById(id) {
    logger.trace("getMasterById()");    
    const master = await db.query('SELECT name, rating FROM masters where id = $1', [id]);
    return master.rows;
  };

  /**
   * Method updates master by their id
   * @param {integer} id 
   * @param {text} name 
   * @param {integer} rating 
   * @returns message
   */
  async updateMaster(id, name, rating) {    
    try {
      const master = await db.query('UPDATE masters SET name = $1, rating =$2 WHERE id = $3 RETURNING *', [name, rating, id]);
      return `Master ${name} with id ${id} and rating ${rating} has been updated`;
    } catch (err) {
      logger.info(`Error ${err}`)
      return err.detail;
    }
  };

  /**
   * Method deletes master by their id
   * @param {integer} id 
   * @returns message
   */
  async deleteMaster(id) {   
    try {
      const master = await db.query('DELETE FROM masters where id = $1', [id]);
      return `Master ${id} has been deleted`;
    } catch (err) {
      logger.info(`Error ${err}`)
      return err.detail;
    }
  };	
  /**
   * Methods select masters by cities name
   * @param {text} name 
   * @returns 
   */
  async getMastersByCityName(name) {
    const masters = await db.query('select masters.name from masters, cities, masters_cities where masters_cities.master_id = masters.id and masters_cities.city_id = cities.id and cities.name = $1', [name]);
    return masters.rows;
  }
}
  
  module.exports = new MasterData()