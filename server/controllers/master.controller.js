const mastersData = require('../dal/masters.dal');
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
    const {name, rating, city_id} = req.body;    
    const newMaster = await mastersData.createMaster(name, rating, city_id);
    res.json(newMaster.rows);
  };

  /**
   * Method interprets http request to slect all masters 
   * @param {*} req 
   * @param {*} res 
   */
  async getMasters(req, res) {
    const masters = await mastersData.getMasters();
    res.json(masters.rows);json
  };

  /**
   * Method interprets http request to select master by their id
   * @param {*} req 
   * @param {*} res 
   */
  async getMasterById(req, res) {
    const id = req.params.id;
    const master = await mastersData.getMasterById(id);
    res.json(master.rows);   
  };

  /**
   * Method interprets http request to update master data by their id
   * @param {*} req 
   * @param {*} res 
   */
  async updateMaster(req, res) {
    const {id, name, rating} = req.body;
    const master = mastersData.updateMaster(id, name, rating);
    res.json(master.rows);
  };

  /**
   * Method interprets http request to delete master by their id
   * @param {*} req 
   * @param {*} res 
   */
  async deleteMaster(req, res) {
    const id = req.params.id;
    const master = await mastersData.deleteMaster(id);
    res.json(master.rows);  
  };
}

module.exports = new MasterController();
