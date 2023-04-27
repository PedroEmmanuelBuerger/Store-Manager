const { productModel } = require('../models');
const { salesModel } = require('../models');

const addNewSale = async (sales) => {
  const verifySales = await Promise.all(
    sales.map((sale) => productModel.getById(sale.productId)),
  );
  const validate = verifySales.some((sale) => sale === undefined);
  if (validate) return { type: 'PRODUCT_NOT_FOUD', message: 'Product not found' };

  const newSale = await salesModel.addNewSale(sales);

  return { type: null, message: newSale };
};

module.exports = {
  addNewSale,
};