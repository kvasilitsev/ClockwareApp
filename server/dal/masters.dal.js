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
   * @param {text} name data base attribute for master table
   * @param {integer} rating data base attribute for master table
   */  
  async createMaster(name, rating) {
    try {
      await db.query('INSERT INTO masters (name, rating) values ($1, $2) RETURNING *', [name, rating]);    
    } catch (error) {
      logger.error(`createMaster failed with reason: ${error.detail}`);
      throw error;
    }
  };

  /**
   * Method returns all masters
   * @returns an array of master objects
   */
  async getMasters() {

    let masterList = [];

    try {
      const mastersResultSet = await db.query('SELECT id, name, rating FROM masters where is_deleted = false');    
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
    } catch(error) {
      logger.error(`getMasters failed with reason: ${error.detail}`);
      throw error;
    }    
    
  };

  /**
   * Method selects master by their id
   * @param {integer} id data base primary key for master table
   * @returns name, rating of certain master
   */
  async getMasterById(id) {

    try{
      let master = new Master();
      const masterResultSet = await db.query('SELECT id, name, rating FROM masters where id = $1 AND is_deleted = false', [id]);
      if(masterResultSet.rowCount === 1){      
        master.name = masterResultSet.rows[0].name;
        master.rating = masterResultSet.rows[0].rating;
        master.id = masterResultSet.rows[0].id;
    };    
    return master;
    } catch(error) {
      logger.error(`getMasterById failed with reason: ${error.detail}`);
      throw error;
    }    
  };

  /**
   * Method updates master by their id
   * @param {integer} id data base primary key for master table
   * @param {text} name data base attribute for master table
   * @param {integer} rating data base attribute for master table
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
   * Method performs soft-delete master by their id
   * @param {integer} id data base primary key for master table
   */
  async deleteMaster(id) {
    logger.info('masters dal', id)
    try {
      await db.query('UPDATE masters SET is_deleted = true where id = $1', [id]); 
    } catch (err) {
      logger.error(`deleteMaster failed with reason: ${err}`);
      throw err;
    }
  };

  /**
   * Method performs unDelete master by their id (set is_delete = false)
   * @param {integer} id data base primary key for master table
   */
  async unDeleteMaster(id) {

    try {
      await db.query('UPDATE masters SET is_delete = false where id = $1', [id]); 
    } catch (err) {
      logger.error(`unDeleteMaster failed with reason: ${err.detail}`);
      throw err;
    }
  };

  /**
   * Methods select masters by cities name
   * @param {text} name data base attribute for master table
   * @returns an array af masters
   */
  async getMastersByCityId(id) {

    let masterList = [];

    try{
      const mastersResultSet = await db.query('select masters.name, masters.id, masters.rating from masters, cities, masters_cities where masters_cities.master_id = masters.id AND masters_cities.city_id = cities.id AND masters.is_deleted = false AND cities.id = $1', [id]);
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
    } catch(error){
      logger.error(`getMastersByCityId failed with reason: ${error.detail}`);
      throw error;
    }
    
  }

  /**
   * Method adds City for Master by city id and master id
   * @param {integer} masterId data base attribute for master table
   * @param {integer} cityId data base attribute for master table
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
   * @param {integer} cityId data base attribute for master table
   * @param {timeStamp} bookingTime data base attribute for master table
   * @param {interval} repairDuration data base attribute for master table
   * @returns list of master id which are booked in selected city and time
   */
  async bookedMastersIdInCity(cityId, bookingTime, repairDuration){ 

    let masterList = [];

    try{
      const mastersResultSet = await db.query('SELECT masters.id FROM masters, cities, masters_cities WHERE masters_cities.master_id = masters.id AND masters_cities.city_id = cities.id AND cities.id = $1 AND masters_cities.master_id IN (SELECT orders.master_id FROM orders WHERE ((orders.booking_date_time BETWEEN $2 AND ($2 + $3)) OR (orders.booking_date_time + orders.repair_duration BETWEEN $2 AND ($2 + $3))) AND (orders.booking_date_time <> ($2 +$3)) AND (orders.booking_date_time + orders.repair_duration <> $2)) AND masters.is_deleted = false', [cityId, bookingTime, repairDuration]);
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
   * @param {integer} cityId data base attribute for master table
   * @param {timeStamp} bookingTime data base attribute for master table
   * @param {interval} repairDuration data base attribute for master table
   * @returns list of master id which are booked in selected city and time exluding master for selected order
   */
  async bookedMastersIdInCityExludeOrderId(cityId, bookingTime, repairDuration, id){ 
    let masterList = [];
    try{
      const mastersResultSet = await db.query('SELECT masters.id FROM masters, cities, masters_cities WHERE masters_cities.master_id = masters.id AND masters_cities.city_id = cities.id AND cities.id = $1 AND masters_cities.master_id IN (SELECT orders.master_id FROM orders WHERE ((orders.booking_date_time BETWEEN $2 AND ($2 + $3)) OR (orders.booking_date_time + orders.repair_duration BETWEEN $2 AND ($2 + $3))) AND (orders.booking_date_time <> ($2 +$3)) AND (orders.booking_date_time + orders.repair_duration <> $2) AND orders.id <> $4) AND masters.is_deleted = false', [cityId, bookingTime, repairDuration, id]);
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

