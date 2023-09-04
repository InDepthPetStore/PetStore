const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");
const adminController = require("../controllers/adminController");

// const verifyJWT = require("../middleware/verifyJWT");

// router.use(verifyJWT);
router.route("/products").get(adminController.getAllProducts);
router.route("/products/:category").get(adminController.getCategory);
// router.route("/product/:idproduct").put(clientController.updateProduct);




module.exports = router;