const request = require('supertest');
const app = require('../app');
const productsController = require('../controllers/productsController'); 

jest.mock('../models/product');

// Mock the Product model's methods
Products.getAll.mockImplementation((callback) => {
  callback(null, [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
  ]);
});

Products.getByCode.mockImplementation((productCode, callback) => {
  if (productCode === '123') {
    callback(null, { id: 1, name: 'Product 1', price: 10 });
  } else {
    callback(null, null);
  }
});

// Product.create.mockImplementation((newProduct, callback) => {
//   callback(null, { id: 3, ...newProduct });
// });

// Product.update.mockImplementation((productCode, updatedProduct, callback) => {
//   if (productCode === '123') {
//     callback(null, { id: 1, ...updatedProduct });
//   } else {
//     callback(null, null);
//   }
// });

describe('Products Controller', () => {
  describe('getAllProducts', () => {
    it('should return a list of products', async () => {
      const response = await request(app).get('/products');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        { id: 1, name: 'Product 1', price: 10 },
        { id: 2, name: 'Product 2', price: 20 },
      ]);
    });
  });

  describe('getProductByCode', () => {
    it('should return a specific product', async () => {
      const productCode = '123';
      const response = await request(app).get(`/products/${productCode}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ id: 1, name: 'Product 1', price: 10 });
    });

    it('should return a 404 error if product not found', async () => {
      const productCode = 'invalidCode';
      const response = await request(app).get(`/products/${productCode}`);
      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Product not found');
    });
  });

//   describe('createProduct', () => {
//     it('should create a new product', async () => {
//       const newProductData = { name: 'New Product', price: 30 };
//       const response = await request(app)
//         .post('/products')
//         .send(newProductData);
//       expect(response.status).toBe(201);
//       expect(response.body.message).toBe('Product created successfully');
//     });
//   });

//   describe('updateProduct', () => {
//     it('should update an existing product', async () => {
//       const productCode = '123';
//       const updatedProductData = { name: 'Updated Product', price: 40 };
//       const response = await request(app)
//         .put(`/products/${productCode}`)
//         .send(updatedProductData);
//       expect(response.status).toBe(200);
//       expect(response.body.message).toBe('Product updated successfully');
//     });

//     it('should return a 404 error if product not found', async () => {
//       const productCode = 'invalidCode';
//       const updatedProductData = { name: 'Updated Product', price: 40 };
//       const response = await request(app)
//         .put(`/products/${productCode}`)
//         .send(updatedProductData);
//       expect(response.status).toBe(404);
//       expect(response.body.error).toBe('Product not found');
//     });
//   });
});