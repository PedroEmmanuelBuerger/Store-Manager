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

const saveNewProduct = async (name) => {
  const newProduct = await productModel.saveNewProduct(name);
  return { type: null, message: newProduct };
};

const updateProduct = async (name, id) => {
  const product = await productModel.getById(id);
  if (!product) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }
  const result = await productModel.updateProduct(name, id);

  return { type: null, message: result };
};

const deletProduct = async (id) => {
  const product = await productModel.getById(id);
  if (!product) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }
  const result = await productModel.deletProduct(id);

  return { type: null, message: result };
};

const searchProduct = async (query) => {
  const result = await productModel.searchProduct(query);
  if (!result) {
    const allProducts = await productModel.getAll();
    return { type: null, message: allProducts };
  }
  return { type: null, message: result };
};

module.exports = {
  getAll,
getById,
saveNewProduct,
updateProduct,
  deletProduct,
searchProduct,
};