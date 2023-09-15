const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");
const adminController = require("../controllers/adminController");
// const verifyJWT = require("../middleware/verifyJWT");

// router.use(verifyJWT);
router.route("/ids/:idclient").get(clientController.rememberId);
router.route("/store").get(adminController.getAllProducts);
router.route("/store/:category").get(adminController.getCategory);
router.route("/store").post(clientController.addcartproduct);
router.route("/cart/:cart_idcart").get(clientController.cart);
router.route("/cart/:products_idproduct/:cart_clients_idclient").delete(clientController.deleteP)
// router.route("/product/:idproduct").put(clientController.updateProduct);




module.exports = router;