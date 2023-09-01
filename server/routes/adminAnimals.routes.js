const router = require('express').Router();

const {adminAnimals, getAdminAnimals, updateAdminAnimal, deleteAdminAnimal} = require("../controllers/adminAnimals.controller");

router.post("/", adminAnimals);         
router.get("/", getAdminAnimals);            
router.put("/:animal_id", updateAdminAnimal);        
router.delete("/:animal_id", deleteAdminAnimal);  

module.exports = router;
