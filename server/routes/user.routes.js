const Router = require('express');
const router = new Router();
const userController = require("../controllers/user.controller");
const authUserMiddleware = require('../middlewares/auth.user.middleware');
const authAdminMiddleware = require('../middlewares/auth.admin.middleware');


router.post("/createUser", authAdminMiddleware, userController.createUser);
router.get("/getUsers", authAdminMiddleware, userController.getUsers);
router.get("/getUserById/:id",authAdminMiddleware, userController.getUserById);
router.put("/updateUser", authUserMiddleware, userController.updateUser);
router.delete("/deleteUser/:id", authAdminMiddleware, userController.deleteUser);
router.post("/createAdmin", authAdminMiddleware, userController.createAdmin);
router.post("/registration", userController.registration);
router.post("/adminRegistration", authAdminMiddleware, userController.adminRegistration);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.get("/getUserByEmail", authAdminMiddleware, userController.getUserByEmail);

module.exports = router;
