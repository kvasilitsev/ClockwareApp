const Master = require ('../dto/masters.dto.js');
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
   */  
  async createMaster(name, rating) {
    try {
      await db.query('INSERT INTO masters (name, rating) values ($1, $2) RETURNING *', [name, rating]);    
    } catch (err) {
      logger.error(`createMaster failed with reason: ${err.detail}`);
      throw err;
    }
  };

  /**
   * Method returns all masters
   * @returns an array of master objects
   */
  async getMasters() { //TODO: add try/catch 
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
  async getMasterById(id) { //TODO: add try/catch 
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
   */
  async updateMaster(id, name, rating) {   
    try {
      await db.query('UPDATE masters SET name = $1, rating =$2 WHERE id = $3 RETURNING *', [name, rating, id]);
    } catch (err) {
      logger.error(`updateMaster failed with reason: ${err.detail}`);
      throw err;
    }
  };

  /**
   * Method deletes master by their id
   * @param {integer} id
   */
  async deleteMaster(id) {
    logger.info('masters dal', id)   
    try {
      await db.query('DELETE FROM masters where id = $1', [id]); 
    } catch (err) {
      logger.error(`deleteMaster failed with reason: ${err.detail}`);
      throw err;
    }
  };	
  /**
   * Methods select masters by cities name
   * @param {text} name 
   * @returns an array af masters
   */
  async getMastersByCityId(id) { //TODO: add try/catch 
    let masterList = [];
    const mastersResultSet = await db.query('select masters.name, masters.id, masters.rating from masters, cities, masters_cities where masters_cities.master_id = masters.id AND masters_cities.city_id = cities.id and cities.id = $1', [id]);
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

  /**
   * Method adds City for Master by city id and master id
   * @param {integer} masterId 
   * @param {integer} cityId 
   */
  async addCityForMaster(masterId, cityId){
    try {
      await db.query('INSERT INTO masters_cities(master_id, city_id) VALUES ($1, $2) RETURNING *', [masterId, cityId])
    } catch (err) {
      logger.error(`addCityForMaster failed with reason: ${err.detail}`);
      throw err;
    }
  }
  /**
   * Method selects all booked masters in city at the specified time
   * @param {integer} cityId 
   * @param {timeStamp} bookingTime 
   * @param {interval} repairDuration 
   * @returns 
   */
  async bookedMastersIdInCity(cityId, bookingTime, repairDuration){ 
    let masterList = [];
    try{
      const mastersResultSet = await db.query('SELECT masters.id FROM masters, cities, masters_cities WHERE masters_cities.master_id = masters.id AND masters_cities.city_id = cities.id AND cities.id = $1 AND masters_cities.master_id IN (SELECT orders.master_id FROM orders WHERE ((orders.booking_date_time BETWEEN $2 AND ($2 + $3)) OR (orders.booking_date_time + orders.repair_duration BETWEEN $2 AND ($2 + $3))) AND (orders.booking_date_time <> ($2 +$3)) AND (orders.booking_date_time + orders.repair_duration <> $2))', [cityId, bookingTime, repairDuration]);
      if(mastersResultSet.rowCount > 0) {
        mastersResultSet.rows.forEach(element => {
          masterList.push(element.id);
      });
      }
    } catch (error) {
      logger.error(`bookedMastersIdInCity failed with reason: ${error.detail}`);
      throw err;
    }    
    return masterList;
  }

  /**
   * Method selects all booked masters in city at the specified time exluding specific order id
   * @param {integer} cityId 
   * @param {timeStamp} bookingTime 
   * @param {interval} repairDuration 
   * @returns 
   */
  async bookedMastersIdInCityExludeOrderId(cityId, bookingTime, repairDuration, id){ 
    let masterList = [];
    try{
      const mastersResultSet = await db.query('SELECT masters.id FROM masters, cities, masters_cities WHERE masters_cities.master_id = masters.id AND masters_cities.city_id = cities.id AND cities.id = $1 AND masters_cities.master_id IN (SELECT orders.master_id FROM orders WHERE ((orders.booking_date_time BETWEEN $2 AND ($2 + $3)) OR (orders.booking_date_time + orders.repair_duration BETWEEN $2 AND ($2 + $3))) AND (orders.booking_date_time <> ($2 +$3)) AND (orders.booking_date_time + orders.repair_duration <> $2) AND orders.id <> $4)', [cityId, bookingTime, repairDuration, id]);
      if(mastersResultSet.rowCount > 0) {
        mastersResultSet.rows.forEach(element => {
          masterList.push(element.id);
      });
      }
    } catch (error) {
      logger.error(`bookedMastersIdInCityExludeOrderId failed with reason: ${error.detail}`);
      throw err;
    }    
    return masterList;
  }
}
  
module.exports = new MasterData();
