const express = require('express');
const bodyParser = require('body-parser');
const productsRouter = require('./routes/products');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/v1/product', productsRouter);
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});