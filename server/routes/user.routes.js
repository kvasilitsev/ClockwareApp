const Router = require('express');
const router = new Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require('../middlewares/auth.middleware');


router.post("/createUser", authMiddleware, userController.createUser);
router.get("/getUsers", authMiddleware, userController.getUsers);
router.get("/getUserById/:id",authMiddleware, userController.getUserById);
router.put("/updateUser", authMiddleware, userController.updateUser);
router.delete("/deleteUser/:id", authMiddleware, userController.deleteUser);
router.post("/createAdmin", authMiddleware, userController.createAdmin);
router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.get("/getUserByEmail", authMiddleware, userController.getUserByEmail);

module.exports = router;
