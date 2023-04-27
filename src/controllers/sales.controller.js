const { saleServices } = require('../services');

const addNewSale = async (req, res) => {
  const sales = req.body;

  const result = await saleServices.addNewSale(sales);

  if (result.type) {
    return res.status(404).json({ message: result.message });
  }
  return res.status(201).json(result.message);
};

module.exports = {
  addNewSale,
};