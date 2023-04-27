const { productServices } = require('../services');

const getAll = async (_req, res) => {
  const result = await productServices.getAll();
  return res.status(200).json(result.message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await productServices.getById(id);
  if (result.type) {
    return res.status(404).json({ message: result.message });
  }
  return res.status(200).json(result.message);
};

const saveNewProduct = async (req, res) => {
  const { name } = req.body;
  const result = await productServices.saveNewProduct(name);

  return res.status(201).json(result.message);
};

const updateProduct = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  const result = await productServices.updateProduct(name, id);
  if (result.type) {
    return res.status(404).json({ message: result.message });
  }
  return res.status(200).json(result.message);
};

const deletProduct = async (req, res) => {
  const { id } = req.params;
  const result = await productServices.deletProduct(id);
  if (result.type) {
    return res.status(404).json({ message: result.message });
  }
  return res.status(204).json();
};

module.exports = {
  getAll,
  getById,
  saveNewProduct,
  updateProduct,
  deletProduct,
};