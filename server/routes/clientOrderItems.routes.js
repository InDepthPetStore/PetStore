const router = require('express').Router();
const { addOrderItem, getAllOrderItems, getOrderItemById, updateOrderItem, deleteOrderItem } = require("../controllers/clientOrderItems.controller");

router.post("/", addOrderItem);
router.get("/", getAllOrderItems);
router.get("/:order_item_id", getOrderItemById);
router.put("/:order_item_id", updateOrderItem);
router.delete("/:order_item_id", deleteOrderItem);

module.exports = router;
