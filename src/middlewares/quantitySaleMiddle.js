const quantitySaleMiddleware = (req, _res, next) => {
  const sales = req.body;

  sales.forEach((sale) => {
    if (sale.quantity <= 0) {
      return next({ status: 422, message: '"quantity" must be greater than or equal to 1' });
    }
  });
  return next();
};

module.exports = quantitySaleMiddleware;