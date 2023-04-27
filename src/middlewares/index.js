const createProduct = require('./ProductMiddle');
const saleMiddleware = require('./saleMiddle');
const quantitySaleMiddleware = require('./quantitySaleMiddle');

module.exports = {
  createProduct,
  saleMiddleware,
  quantitySaleMiddleware,
};