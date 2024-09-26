const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('db/product.db', (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to the products database.');
    }
});

const Product = {
    getAll: (callback) => {
        db.all('SELECT * FROM products', callback);
    },
    create: (product, callback) => {
        db.run(
            'INSERT INTO products (product_name, product_description, product_type, product_quantity, unit_price) VALUES (?, ?, ?, ?, ?)',
            [product.product_name, product.product_description, product.product_type, product.quantity, product.unit_price],
            callback
        );
    },
    getByCode: (productCode, callback) => {
        db.get('SELECT * FROM products WHERE product_code = ?', productCode, callback);
    },
    update: (productCode, updatedProduct, callback) => {
    let updateQuery = 'UPDATE products SET ';
    let updateValues = [];
    let whereClause = ' WHERE product_code = ?';

    for (const key in updatedProduct) {
      updateQuery += `${key} = ?, `;
      updateValues.push(updatedProduct[key]);
    }

    updateQuery = updateQuery.slice(0, -2) + whereClause;

    db.run(updateQuery, [...updateValues, productCode], callback);
  },
};

module.exports = Product;