const Router = require('express');
const router = new Router();
const orderController = require("../../controllers/order.controller")
const authAdmin = require('../../middlewares/auth.admin.middleware');

router.post("/createOrder", orderController.createOrder);
router.get("/getOrders", authAdmin, orderController.getOrders);
router.get("/getOrderById/:id", authAdmin, orderController.getOrderById);
router.get("/getOrdersByMasterId", authAdmin, orderController.getOrdersByMasterId);
router.put("/updateOrder", authAdmin, orderController.updateOrder);
router.put("/deleteOrder/:id", authAdmin, orderController.deleteOrder);

module.exports = router;