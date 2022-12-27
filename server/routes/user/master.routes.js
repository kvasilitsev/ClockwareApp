const Router = require('express');
const router = new Router();
const masterController = require("../../controllers/master.controller");

router.get("/getFreeMastersInCity", masterController.getFreeMastersInCity);

module.exports = router;
