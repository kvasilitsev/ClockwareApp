const Router = require('express');
const router = new Router();
const masterController = require("../../controllers/master.controller")

router.post("/createMaster", masterController.createMaster);
router.get("/getMasters", masterController.getMasters);
router.get("/getMasterById/:id", masterController.getMasterById);
router.put("/updateMaster", masterController.updateMaster);
router.delete("/deleteMaster", masterController.deleteMaster);
router.get("/getMastersByCityId/:id", masterController.getMastersByCityId);
router.post("/addCityForMaster", masterController.addCityForMaster);
router.get("/getFreeMastersInCity", masterController.getFreeMastersInCity);

module.exports = router;
