const masterService = require("../services/master.services")
const log4js = require('../logger');
const logger = log4js.getLogger("clockwiseLog");

/**
 * Class consists of variety of methods of entity Master
 */
class MasterController {

  /**
   * Method interprets http request to creates new master
   * @param {*} req 
   * @param {*} res 
   */
  async createMaster(req, res) {
    const {name, rating} = req.body;    
    const newMaster = masterService.createMaster(name, rating);
    res.json(newMaster);   
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
    const master = await masterService.updateMaster(id, name, rating);
    res.json(master);
  };

  /**
   * Method interprets http request to delete master by their id
   * @param {*} req 
   * @param {*} res 
   */
  async deleteMaster(req, res) {
    const id = req.params.id;
    const master = masterService.deleteMaster(id);
   res.json(master); 
  };
   /**
   * Method interprets http request to get masters by city name
   * @param {*} req 
   * @param {*} res 
   */
    async getMastersByCityName(req, res){
      const name = req.params.name;
      const masters = await masterService.getMastersByCityName(name);
      res.json(masters);
    }
}

module.exports = new MasterController();
