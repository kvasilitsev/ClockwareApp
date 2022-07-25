const Master = require ('../dto/masters.dto.js');
const db = require('../db');
const cities = require('../dal/cities.dal')
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
    } catch (err) {
      throw err;
    }
    return true;
  };

  /**
   * Method returns all masters
   * @returns an array of master objects
   */
  async getMasters() {
    let masterList = [];    
    const mastersResultSet = await db.query('SELECT id, name, rating FROM masters');    
    if(mastersResultSet.rowCount > 0) { 
      mastersResultSet.rows.forEach(element => {                 
        let master = new Master();
        master.name = element.name;
        master.id = element.id;
        master.rating = element.rating;        
        masterList.push(master);       
      });   
    }
    return masterList;
  };

  /**
   * Method selects master by their id
   * @param {integer} id 
   * @returns name, rating of certain master
   */
  async getMasterById(id) {
    let master = new Master();
    const masterResultSet = await db.query('SELECT id, name, rating FROM masters where id = $1', [id]);
    if(masterResultSet.rowCount === 1){      
      master.name = masterResultSet.rows[0].name;
      master.rating = masterResultSet.rows[0].rating;
      master.id = masterResultSet.rows[0].id;
    };    
    return master;
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
      await db.query('UPDATE masters SET name = $1, rating =$2 WHERE id = $3 RETURNING *', [name, rating, id]);      
    } catch (err) {
      throw err;
    }
    return true;
  };

  /**
   * Method deletes master by their id
   * @param {integer} id 
   * @returns message
   */
  async deleteMaster(id) {   
    try {
      await db.query('DELETE FROM masters where id = $1', [id]);      
    } catch (err) {
      throw err;
    }
    return true;
  };	
  /**
   * Methods select masters by cities name
   * @param {text} name 
   * @returns 
   */
  async getMastersByCityName(name) {
    let masterList = [];
    const mastersResultSet = await db.query('select masters.name, masters.id, masters.rating from masters, cities, masters_cities where masters_cities.master_id = masters.id and masters_cities.city_id = cities.id and cities.name = $1', [name]);
    if (mastersResultSet.rowCount > 0) {
      mastersResultSet.rows.forEach(element => {
        let master = new Master();
        master.name = element.name;
        master.id = element.id;
        master.rating = element.rating;
        masterList.push(master);             
      });   
    }
    return masterList;
  }
}
  
  module.exports = new MasterData()