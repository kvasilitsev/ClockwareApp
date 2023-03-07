const Router = require('express');
const router = new Router();
const userController = require("../../controllers/user.controller");
const authAdminMiddleware = require('../../middlewares/auth.admin.middleware');



router.post("/createUser", authAdminMiddleware, userController.createUser);
router.get("/getUsers", authAdminMiddleware, userController.getUsers);
router.get("/getUserById/:id",authAdminMiddleware, userController.getUserById);
router.put("/updateUser", authAdminMiddleware, userController.updateUser);
router.delete("/deleteUser", authAdminMiddleware, userController.deleteUser);
router.post("/createAdmin", authAdminMiddleware, userController.createAdmin);
router.post("/adminRegistration", authAdminMiddleware, userController.adminRegistration);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.get("/getUserByEmail", userController.getUserByEmail);

module.exports = router;
