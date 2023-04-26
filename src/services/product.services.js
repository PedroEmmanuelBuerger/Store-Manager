const { productModel } = require('../models');

const getAll = async () => {
  const result = await productModel.getAll();
  return { type: null, message: result };
};

const getById = async (productId) => {
  const product = await productModel.getById(productId);
  if (!product) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }
  return { type: null, message: product }; 
};

module.exports = { getAll, getById };