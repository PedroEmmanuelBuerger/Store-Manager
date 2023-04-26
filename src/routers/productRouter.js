const express = require('express');

const productRouter = express.Router();

const { createProduct } = require('../middlewares');
const { productController } = require('../controllers');

productRouter.get('/', productController.getAll);

productRouter.get('/:id',
  productController.getById);

productRouter.post('/', createProduct, productController.saveNewProduct);

module.exports = productRouter;