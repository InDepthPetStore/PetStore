const router = require('express').Router();
const { addCart, getAllCarts, getCartById, updateCart, deleteCart } = require("../controllers/clientCart.controller");

router.post("/", addCart);
router.get("/", getAllCarts);
router.get("/:cart_id", getCartById);
router.put("/:cart_id", updateCart);
router.delete("/:cart_id", deleteCart);

module.exports = router;
