const Router = require('express');
const router = new Router();
const clockController = require("../controllers/clock.controller")

router.post("/createClock", clockController.createClock);
router.get("/getClocks", clockController.getClocks);
router.put("/updateClock", clockController.updateClock);
router.delete("/deleteClock/:id", clockController.deleteClock);
router.get("/getRepairDurationByClockId/:id", clockController.getRepairDurationByClockId);

module.exports = router;
