const mastersService = require('../services/masters.service');

class MasterController {
  createMaster(req, res) {
    mastersService.createMaster(req, res);
  };
  getMasters(req, res) {
    mastersService.getMasters(req, res);
  };
  getMasterById(req, res) {
    mastersService.getMasterById(req, res);
  };
  updateMaster(req, res) {
    mastersService.updateMaster(req, res);
  };
  deleteMaster(req, res) {
    mastersService.deleteMaster(req, res);
  };
  getMasterByCity(req, res) {
    mastersService.getMasterByCity(req, res);
  };
}

module.exports = new MasterController();
