const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.route("/register_client").post(authController.register);
router.route("/register_admin").post(authController.registerAdmin);
router.route("/login_admin").post(authController.loginAdmin);
router.route("/login_client").post(authController.loginClient);
router.route("/refresh_admin").get(authController.refreshAdmin);
router.route("/refresh_client").get(authController.refreshClient);
router.route("/logout").post(authController.logout);
module.exports = router;
