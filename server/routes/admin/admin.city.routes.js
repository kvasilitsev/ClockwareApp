const Router = require('express');
const router = new Router();
const cityController = require("../../controllers/city.controller");
const authAdmin = require('../../middlewares/auth.admin.middleware');

router.post("/createCity", authAdmin, cityController.createCity);
router.get("/getCities", cityController.getCities);
router.get("/getCityById/:id", cityController.getCityById);
router.put("/deleteCity", authAdmin, cityController.deleteCity);
router.put("/updateCity", authAdmin, cityController.updateCity);
router.get("/getCitiesByMasterId/:id", cityController.getCitiesByMasterId);

module.exports = router;
