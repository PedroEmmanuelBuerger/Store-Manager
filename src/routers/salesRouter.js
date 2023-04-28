const express = require('express');

const salesRouter = express.Router();

const { salesController } = require('../controllers');
const { saleMiddleware, quantitySaleMiddleware } = require('../middlewares');

salesRouter.post('/', saleMiddleware,
  quantitySaleMiddleware, salesController.addNewSale);

salesRouter.get('/', salesController.getAll);

salesRouter.get('/:id', salesController.getById);

salesRouter.delete('/:id', salesController.deleteSale);

salesRouter.put('/:id', saleMiddleware,
  quantitySaleMiddleware, salesController.updateSale);

module.exports = salesRouter;