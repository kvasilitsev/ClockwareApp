const Router = require('express');
const router = new Router();
const cityController = require("../controllers/city.controller")

router.post("/city", cityController.createCity);
router.get("/city", cityController.getCity);
router.get("/city/:id", cityController.getOneCity);
router.delete("/city/:id", cityController.deleteCity);

module.exports = router;