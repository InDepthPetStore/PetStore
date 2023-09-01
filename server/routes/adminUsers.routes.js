const router = require('express').Router();
const { createAdminUser, getAllAdminUsers, getAdminUserById, updateAdminUser,deleteAdminUser } = require("../controllers/adminUsers.controller");

router.post("/", createAdminUser);
router.get("/", getAllAdminUsers);
router.get("/:admin_id", getAdminUserById);
router.put("/:admin_id", updateAdminUser);
router.delete("/:admin_id", deleteAdminUser);

module.exports = router;
