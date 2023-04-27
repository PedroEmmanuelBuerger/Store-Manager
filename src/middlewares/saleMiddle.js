const saleMiddleware = (req, _res, next) => {
  const sales = req.body;
  sales.forEach((sale) => {
    if (!sale.productId) {
      return next({ status: 400, message: '"productId" is required' });
    }
  });
  sales.forEach((sale) => {
    if (sale.quantity === undefined) {
      return next({ status: 400, message: '"quantity" is required' });
    }
  });
  return next();
};

module.exports = saleMiddleware;