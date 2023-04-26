const connection = require('./connection');

const getAll = async () => {
  const [products] = await
    connection.execute('SELECT * FROM StoreManager.products ORDER BY id ASC');
  return products;
};

const getById = async (productId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  return result;
};

module.exports = { getAll, getById };