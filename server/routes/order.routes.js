const Router = require('express');
const router = new Router();
const orderController = require("../controllers/order.controller")

router.post("/createOrder", orderController.createOrder);
router.get("/getOrders", orderController.getOrders);
router.get("/getOrderById/:id", orderController.getOrderById);
router.get("/getOrdersByMasterId/:id", orderController.getOrdersByMasterId);
router.put("/updateOrder", orderController.updateOrder);
router.delete("/deleteOrder/:id", orderController.deleteOrder);

module.exports = router;