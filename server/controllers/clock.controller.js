const clockService = require("../services/clock.services")
const log4js = require('../logger');
const logger = log4js.getLogger("clockwiseLog");

/**
 * Class consists of variety of methods of entity ClockController
 */
class ClockController {

  /**
   * Method interprets http request to creates new clock size with repair duration
   * @param {*} req 
   * @param {*} res 
   */
  async createClock(req, res) {
    const {size, repairDuration} = req.body;    
    try {
      await clockService.createClock(size, repairDuration);
    }
    catch(err) {
      res.json({
        message: err.message,
        cause: err.cause.detail
      } );      
    }
    res.send(true);
  };

  /**
   * Method interprets http request to slect all clocks
   * @param {*} req 
   * @param {*} res 
   */
  async getClocks(req, res) {
    const clocks = await clockService.getClocks();
    res.json(clocks);
  };

  /**
   * Method interprets http request to update clocks data by their id
   * @param {*} req 
   * @param {*} res 
   */  
  async updateClock(req, res) {
    const {id, size, repairDuration} = req.body;
    try {
      await clockService.updateClock(id, size, repairDuration);
    }
    catch(err) {
      res.json({
        message: err.message,
        cause: err.cause.detail
      });      
    }
    res.send(true);
  };

  /**
   * Method interprets http request to delete clock by their id
   * @param {*} req 
   * @param {*} res 
   */
  async deleteClock(req, res) {
    const id = req.params.id;   
    try {
      await clockService.deleteClock(id);
    }
    catch(err) {
      res.json({
        message: err.message,
        cause: err.cause.detail
      });      
    }
    res.send(true);
  }; 
}

module.exports = new ClockController();