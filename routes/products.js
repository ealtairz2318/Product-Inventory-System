const express = require('express');
const productsController = require('../controllers/productsController');
const router = express.Router();

router.get('/', productsController.getAllProducts);
router.get('/:product_code', productsController.getProductByCode);
router.post('/', productsController.createProduct);
router.put('/:product_code', productsController.updateProduct);

module.exports = router;