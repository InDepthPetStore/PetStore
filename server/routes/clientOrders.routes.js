const router = require('express').Router();
const { addOrder, getAllOrders, getOrderById, updateOrder, deleteOrder } = require("../controllers/clientOrders.controller");

router.post("/", addOrder);
router.get("/", getAllOrders);
router.get("/:order_id", getOrderById);
router.put("/:order_id", updateOrder);
router.delete("/:order_id", deleteOrder);

module.exports = router;
