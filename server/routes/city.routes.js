const Router = require('express');
const router = new Router();
const cityController = require("../controllers/city.controller")

router.post("/createCity", cityController.createCity);
router.get("/getCities", cityController.getCities);
router.get("/getCityById/:id", cityController.getCityById);
router.delete("/deleteCity/:id", cityController.deleteCity);
router.put("/updateCity", cityController.updateCity);

module.exports = router;