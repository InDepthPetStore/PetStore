const router = require('express').Router();
const { addUser, getAllUsers, getUserById, updateUser, deleteUser } = require("../controllers/clientUsers.controller");

router.post("/", addUser);
router.get("/", getAllUsers);
router.get("/:client_id", getUserById);
router.put("/:client_id", updateUser);
router.delete("/:client_id", deleteUser);

module.exports = router;
