const { productServices } = require('../services');

const getAll = async (_req, res) => {
  const result = await productServices.getAll();
  return res.status(200).json(result.message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await productServices.getById(id);
  if (result.type) {
    return res.status(404).json({ "message": "Product not found" });
  }
  return res.status(200).json(result.message);
};


module.exports = {
  getAll,
  getById
}