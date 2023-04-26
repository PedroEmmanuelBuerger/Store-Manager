const createProduct = (req, _res, next) => {
  const { name } = req.body;
  if (!name) {
    return next({ status: 400, message: '"name" is required' });
  }
  if (name.length < 5) {
    return next({ status: 422, message: '"name" length must be at least 5 characters long' });
  }
  next();
};

module.exports = createProduct;