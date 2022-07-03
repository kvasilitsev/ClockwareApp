const Router = require('express');
const router = new Router();
const masterController = require("../controllers/master.controller")

router.post("/createMaster", masterController.createMaster);
router.get("/getMasters", masterController.getMasters);
router.get("/getMasterById/:id", masterController.getMasterById);
router.put("/updateMaster", masterController.updateMaster);
router.delete("/deleteMaster/:id", masterController.deleteMaster);
router.get("/getMasterByCity", masterController.getMasterByCity);

module.exports = router;