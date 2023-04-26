const express = require('express');
const productRouter = express.Router();

const { productController } = require('../controllers');

productRouter.get('/', productController.getAll);

productRouter.get('/:id',
  productController.getById);

module.exports = productRouter;