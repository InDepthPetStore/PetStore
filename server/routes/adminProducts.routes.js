const express = require('express');
const router = express.Router();
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/adminProducts.controller');

router.post('/', createProduct);
router.get('/', getAllProducts);
router.get('/:product_id', getProductById);
router.put('/:product_id', updateProduct);
router.delete('/:product_id', deleteProduct);

module.exports = router;
