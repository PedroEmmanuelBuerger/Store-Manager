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

const saveNewProduct = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
  );
  return { id: insertId, name };
};

const updateProduct = async (name, id) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [name, id],
  );
  const actualProduct = await getById(id);
  return actualProduct;
};

module.exports = { getAll, getById, saveNewProduct, updateProduct };