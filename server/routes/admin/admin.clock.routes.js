const Router = require('express');
const log4js = require('../../logger');
const logger = log4js.getLogger("clockwiseLog");
const router = new Router();
const clockController = require("../../controllers/clock.controller")

router.post("/createClock", clockController.createClock);
router.get("/getClocks", clockController.getClocks);
router.put("/updateClock", clockController.updateClock);
router.delete("/deleteClock", clockController.deleteClock);
router.get("/getRepairDurationByClockId/:id", clockController.getRepairDurationByClockId);

module.exports = router;
