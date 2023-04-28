const express = require('express');

const productRouter = express.Router();

const { createProduct } = require('../middlewares');
const { productController } = require('../controllers');

productRouter.put('/:id', createProduct, productController.updateProduct);

productRouter.get('/search', productController.searchProduct);

productRouter.get('/', productController.getAll);

productRouter.get('/:id', productController.getById);

productRouter.post('/', createProduct, productController.saveNewProduct);

productRouter.delete('/:id', productController.deletProduct);

module.exports = productRouter;