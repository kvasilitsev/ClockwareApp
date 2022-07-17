const Router = require('express');
const router = new Router();
const cityController = require("../controllers/city.controller")

router.post("/createCity", cityController.createCity);
router.get("/getCities", cityController.getCities);
router.get("/getCityById/:id", cityController.getCityById);
router.delete("/deleteCity/:name", cityController.deleteCity);
router.put("/updateCity", cityController.updateCity);
router.get("/getCitiesByMasterId/:id", cityController.getCitiesByMasterId);

module.exports = router;