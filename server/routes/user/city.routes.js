const Router = require('express');
const router = new Router();
const cityController = require("../../controllers/city.controller")
router.get("/getCities", cityController.getCities);

module.exports = router;
