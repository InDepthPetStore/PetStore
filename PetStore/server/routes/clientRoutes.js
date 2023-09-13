const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");
const adminController = require("../controllers/adminController");
// const verifyJWT = require("../middleware/verifyJWT");

// router.use(verifyJWT);
router.route("/ids/:idclient").get(clientController.rememberId);
router.route("/products").get(adminController.getAllProducts);
router.route("/products/:category").get(adminController.getCategory);
router.route("/products/add_to_cart").post(clientController.addcartproduct);
router.route("/cart/:cart_idcart").get(clientController.cart);

// router.route("/product/:idproduct").put(clientController.updateProduct);




module.exports = router;