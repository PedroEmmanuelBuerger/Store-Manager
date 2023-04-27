const { productModel, salesModel } = require('../models');

const addNewSale = async (sales) => {
  const verifySales = await Promise.all(
    sales.map((sale) => productModel.getById(sale.productId)),
  );
  const validate = verifySales.some((sale) => sale === undefined);
  if (validate) return { type: 'PRODUCT_NOT_FOUD', message: 'Product not found' };

  const newSale = await salesModel.addNewSale(sales);

  return { type: null, message: newSale };
};

const getAll = async () => {
  const result = await salesModel.getAll();
  return { type: null, message: result };
};

const getById = async (id) => {
  const result = await salesModel.getById(id);
  if (result.length <= 0) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  }
  return { type: null, message: result };
};

module.exports = {
  addNewSale,
  getAll,
  getById,
};