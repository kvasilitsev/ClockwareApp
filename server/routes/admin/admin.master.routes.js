const Router = require('express');
const router = new Router();
const masterController = require("../../controllers/master.controller")
const authAdmin = require('../../middlewares/auth.admin.middleware');

router.post("/createMaster", authAdmin, masterController.createMaster);
router.get("/getMasters", authAdmin, masterController.getMasters);
router.get("/getMasterById/:id", authAdmin, masterController.getMasterById);
router.put("/updateMaster", authAdmin, masterController.updateMaster);
router.delete("/deleteMaster", authAdmin, masterController.deleteMaster);
router.get("/getMastersByCityId/:id", authAdmin, masterController.getMastersByCityId);
router.post("/addCityForMaster", authAdmin, masterController.addCityForMaster);
router.get("/getFreeMastersInCity", masterController.getFreeMastersInCity);

module.exports = router;
