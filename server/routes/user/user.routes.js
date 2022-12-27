const Router = require('express');
const router = new Router();
const userController = require("../../controllers/user.controller");

//router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/getUserByEmail", userController.getUserByEmail);

module.exports = router;
