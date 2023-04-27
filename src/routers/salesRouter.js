const express = require('express');

const salesRouter = express.Router();

const { salesController } = require('../controllers');
const { saleMiddleware, quantitySaleMiddleware } = require('../middlewares');

salesRouter.post('/', saleMiddleware,
  quantitySaleMiddleware, salesController.addNewSale);

module.exports = salesRouter;