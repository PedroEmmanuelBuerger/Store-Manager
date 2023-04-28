const { saleServices } = require('../services');

const addNewSale = async (req, res) => {
  const sales = req.body;

  const result = await saleServices.addNewSale(sales);

  if (result.type) {
    return res.status(404).json({ message: result.message });
  }
  return res.status(201).json(result.message);
};

const getAll = async (_req, res) => {
  const result = await saleServices.getAll();
  return res.status(200).json(result.message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await saleServices.getById(id);
  if (result.type) {
    return res.status(404).json({ message: result.message });
  }
  return res.status(200).json(result.message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const result = await saleServices.deleteSale(id);
  if (result.type) {
    return res.status(404).json({ message: result.message });
  }
  return res.status(204).json();
};

const updateSale = async (req, res) => {
  const sales = req.body;
  const { id } = req.params;
  const result = await saleServices.updateSale(sales, id);
  if (result.type) {
    return res.status(404).json({ message: result.message });
  }
  return res.status(200).json(result.message);
};

module.exports = {
  addNewSale,
  getAll,
  getById,
  deleteSale,
  updateSale,
};