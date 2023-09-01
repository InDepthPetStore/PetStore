const router = require('express').Router();
const { addCartItem, getAllCartItems, getCartItemById, updateCartItem, deleteCartItem } = require("../controllers/clientCartItems.controller");

router.post("/", addCartItem);
router.get("/", getAllCartItems);
router.get("/:cart_item_id", getCartItemById);
router.put("/:cart_item_id", updateCartItem);
router.delete("/:cart_item_id", deleteCartItem);

module.exports = router;
