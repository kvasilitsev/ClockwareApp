const Router = require('express');
const router = new Router();
const userController = require("../controllers/user.controller")

router.post("/createUser", userController.createUser);
router.get("/getUsers", userController.getUsers);
router.get("/getUserById/:id", userController.getUserById);
router.put("/updateUser", userController.updateUser);
router.delete("/deleteUser/:id", userController.deleteUser);

module.exports = router;
