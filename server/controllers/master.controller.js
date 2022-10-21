const masterService = require("../services/master.services")
const log4js = require('../logger');
const logger = log4js.getLogger("clockwiseLog");

/**
 * Class consists of variety of methods of entity MasterController
 */
class MasterController {

  /**
   * Method interprets http request to creates new master
   * @param {*} req 
   * @param {*} res 
   */
  async createMaster(req, res) {
    const {name, rating} = req.body; 
    try {
      await masterService.createMaster(name, rating);
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
   * Method interprets http request to slect all masters 
   * @param {*} req 
   * @param {*} res 
   */
  async getMasters(req, res) {
    const masters = await masterService.getMasters();
    res.json(masters);
  };

  /**
   * Method interprets http request to select master by their id
   * @param {*} req 
   * @param {*} res 
   */
  async getMasterById(req, res) {
    const id = req.params.id;
    const master = await masterService.getMasterById(id);
    res.json(master);   
  };

  /**
   * Method interprets http request to update master data by their id
   * @param {*} req 
   * @param {*} res 
   */  
  async updateMaster(req, res) {
    const {id, name, rating} = req.body;
    try {
      await masterService.updateMaster(id, name, rating);
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
   * Method interprets http request to delete master by their id
   * @param {*} req 
   * @param {*} res 
   */
  async deleteMaster(req, res) {
    const id = req.params.id;   
    try {
      await masterService.deleteMaster(id);
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
  * Method interprets http request to get masters by city name
  * @param {*} req 
  * @param {*} res 
  */
  async getMastersByCityId(req, res){
    const id = req.params.id;
    const masters = await masterService.getMastersByCityId(id);
    res.json(masters);
  }

   /**
    * Method add City for Master by Master id and City Id
    * @param {*} req 
    * @param {*} res 
    */ 
  async addCityForMaster(req, res){
    const {masterId, cityId} = req.body;
    try {
      await masterService.addCityForMaster(masterId, cityId);
    }
    catch(err) {
      res.json({
        message: err.message,
        cause: err.cause.detail
      });      
    }
    res.send(true);
  }

  /**
   * Method get free masters in the city for the specified time range
   * @param {*} req 
   * @param {*} res 
   */
  async getFreeMastersInCity(req, res){
    const {cityId, bookingTime, clockId} = req.query;    
    let masters;
    try {
      masters = await masterService.getFreeMastersInCity(cityId, bookingTime, clockId);
    }
    catch(err) {
      res.json(err.message);
    }
    logger.info(masters)    
    res.send(masters);
  }  
}

module.exports = new MasterController();
