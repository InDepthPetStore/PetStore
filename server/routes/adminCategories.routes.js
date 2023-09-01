const router = require('express').Router();
const adminCategoriesController = require("../controllers/adminCategories.controller");


router.post('/', adminCategoriesController.createCategory);
router.get('/', adminCategoriesController.getAllCategories);
router.get('/:id', adminCategoriesController.getCategoryById);
router.put('/:id', adminCategoriesController.updateCategory);
router.delete('/:id', adminCategoriesController.deleteCategory);

module.exports = router;
