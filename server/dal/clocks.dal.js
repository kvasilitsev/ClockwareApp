const Clock = require ('../dto/clocks.dto.js');
const db = require('../db');
const log4js = require('../logger');
const logger = log4js.getLogger("clockwiseLog");


/**
 * Class consists of variety of data base queries to the table clocks
 */

class ClockData {

  /**
   * Method creates new clock type
   * @param {text} size data base attribute for clock table;
   * @param {text} repairDuration  data base attribute for clock table;
   */  
  async createClock(size, repairDuration) {    
    try {
      await db.query('INSERT INTO clocks (size, repair_duration) values ($1, $2) RETURNING *', [size, repairDuration]);    
    } catch (err) {
      logger.error(`createClock failed with reason: ${err.detail}`);
      throw err;
    }
  };

  /**
   * Method returns all masters
   * @returns an array of clocks objects
   */
  async getClocks() {    
    let clockList = [];    
    let clocksResultSet;
    try {
      clocksResultSet = await db.query('SELECT id, size, repair_duration FROM clocks WHERE is_deleted = false');
    } catch (err) {
      logger.error(err);      
      throw err;
    }
    if(clocksResultSet.rowCount > 0) { 
        clocksResultSet.rows.forEach(element => {                 
        let clock = new Clock();
        clock.size = element.size;
        clock.id = element.id;
        clock.repairDuration = element.repair_duration;        
        clockList.push(clock);       
      });   
    }
    return clockList;
  };

  /**
   * Method selects clock by its size
   * @param {text} size data base attribute for clock table
   * @returns id, size, repair_duration of selected clock
   */
  async getClockBySize(size) {
    let clock = new Clock();
    const clockResultSet = await db.query('SELECT id, size, repair_duration FROM clocks where size = $1', [size]);
    if(clockResultSet.rowCount === 1){      
      clock.id = clockResultSet.rows[0].id;
      clock.size = clockResultSet.rows[0].size; 
      clock.repairDuration = clockResultSet.rows[0].repairDuration;     
    } else return false; 
    
    return clock;    
  };

   /**
   * Method updates clock by their id
   * @param {integer} id data base primary key for clock table
   * @param {text} size data base attribute for clock table;
   * @param {integer} repairDuration data base attribute for clock table;
   */
  async updateClock(id, size, repairDuration) {     
    try {
      await db.query('UPDATE clocks SET size = $1, repair_duration =$2 WHERE id = $3 RETURNING *', [size, repairDuration, id]);
    } catch (err) {
      logger.error(`updateClock failed with reason: ${err.detail}`);
      throw err;
    }
  };

  /**
   * Method performs soft-delte clock by their id
   * @param {integer} id data base primary key for clock table
   */
  async deleteClock(id) {    
    try {
      await db.query('UPDATE clocks SET is_deleted = true where id = $1', [id]); 
    } catch (err) {
      logger.error(`deleteClock failed with reason: ${err.detail}`);
      throw err;
    }
  };

  /**
   * Method performs undelete clock (det is_deleted = false) by their id
   * @param {integer} id data base primary key for clock table
   */
  async unDeleteClock(id) {    
    try {
      logger.info('clock dal', id)
      await db.query('UPDATE clocks SET is_deleted = false where id = $1', [id]); 
    } catch (err) {
      logger.error(`deleteClock failed with reason: ${err.detail}`);
      throw err;
    }
  };
  
  /**
   * Method get repair duration time by clock id
   * @param {integer} id data base primary key for clock table
   * @returns repairDuration time interval
   */
  async getRepairDurationByClockId(id) {
    let clock = new Clock();
    const repairDurationResultSet = await db.query('SELECT repair_duration FROM clocks where id = $1', [id]);
    if(repairDurationResultSet.rowCount === 1){
      clock.repairDuration = repairDurationResultSet.rows[0].repair_duration; //TODO refactor
    }
    return clock.repairDuration;
  };  
}
  
module.exports = new ClockData();
