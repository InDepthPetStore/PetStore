const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
// const verifyJWT = require("../middleware/verifyJWT");

// router.use(verifyJWT);
router.route("/add_product").post(adminController.createProduct);
router.route("/products").get(adminController.getAllProducts);
router.route("/products/:category").get(adminController.getCategory);
router.route("/products/:idproduct").delete(adminController.deleteProduct);
router.route("/product/:idproduct").put(adminController.updateProduct);
router.route("/orders").get(adminController.getAllOrders);
router.route("/orders/:state").get(adminController.getState);
router.route("/orders/:state/:idorder").put(adminController.updateS);




module.exports = router;
