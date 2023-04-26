const express = require('express');

const productRouter = express.Router();

const { productController } = require('../controllers');

productRouter.get('/', productController.getAll);

productRouter.get('/:id',
  productController.getById);

productRouter.post('/', productController.saveNewProduct);

module.exports = productRouter;