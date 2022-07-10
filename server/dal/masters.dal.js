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
   * @returns new master values
   */
  
  async createMaster(name, rating) {     
    const newMaster =  await db.query('INSERT INTO masters (name, rating) values ($1, $2) RETURNING *', [name, rating]);
    return newMaster;
  };

  /**
   * Method selects all masters
   * @returns id, name, rating of all masters
   */
  async getMasters() {    
    const masters = await db.query('SELECT id, name, rating FROM masters');
    return masters;
  };

  /**
   * Method selects master by their id
   * @param {integer} id 
   * @returns name, rating of certain master
   */
  async getMasterById(id) {
    logger.trace("getMasterById()");    
    const master = await db.query('SELECT name, rating FROM masters where id = $1', [id]);
    return master;
  };

  /**
   * Method updates master by their id
   * @param {integer} id 
   * @param {text} name 
   * @param {integer} rating 
   * @returns updated master value
   */
  async updateMaster(id, name, rating) {
    logger.trace("updateMaster()");
    const master = await db.query('UPDATE masters SET name = $1, rating =$2 WHERE id = $3 RETURNING *', [name, rating, id]);
    return master;
  };

  /**
   * Method deletes master by their id
   * @param {integer} id 
   * @returns empty array of values
   */
  async deleteMaster(id) {
    logger.trace("deleteMaster()");
    const master = await db.query('DELETE FROM masters where id = $1', [id]);
    return master;    
  };	
}
  
  module.exports = new MasterData()