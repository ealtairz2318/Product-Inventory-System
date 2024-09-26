const Product = require('../models/product');

const productsController = {
  getAllProducts: (req, res) => {
    Product.getAll((err, rows) => {
      if (err) {
        console.error('Error fetching products:', err.message);
        return res.status(500).json({ error: 'Failed to fetch products' });
      }
      res.json(rows);
    });
  },
  getProductByCode: (req, res) => {
    const productCode = req.params.product_code; // Get product code from request parameter

    Product.getByCode(productCode, (err, product) => {
      if (err) {
        console.error('Error fetching product:', err.message);
        return res.status(500).json({ error: 'Failed to fetch product' });
      }

      if (!product) {
        return res.status(404).json({ error: 'Product not found' }); // Handle not found case
      }

      res.json(product);
    });
  },
  createProduct: (req, res) => {
    const newProduct = req.body; // Get product data from request body

    Product.create(newProduct, (err) => {
      if (err) {
        console.error('Error creating product:', err.message);
        return res.status(500).json({ error: 'Failed to create product' });
      }

      res.status(201).json({   
 message: 'Product created successfully' });
    });
  },
  updateProduct: (req, res) => {
    const productCode = req.params.product_code;
    const updatedProduct = req.body;

    Product.update(productCode, updatedProduct, (err) => {
      if (err) {
        console.error('Error updating product:', err.message);
        return res.status(500).json({ error: 'Failed to update product' });
      }

      res.status(200).json({   
 message: 'Product updated successfully' });
    });
  },
};

module.exports = productsController;