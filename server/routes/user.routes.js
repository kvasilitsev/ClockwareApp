const Router = require('express');
const router = new Router();
const userController = require("../controllers/user.controller")

router.post("/createUser", userController.createUser);
router.get("/getUsers", userController.getUsers);
router.get("/getUserById/:id", userController.getUserById);
router.put("/updateUser", userController.updateUser);
router.delete("/deleteUser/:id", userController.deleteUser);
router.post("/createAdmin", userController.createAdmin);
router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.get("/getUserByEmail", userController.getUserByEmail);

module.exports = router;
