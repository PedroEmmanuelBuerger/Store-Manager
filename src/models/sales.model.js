const connection = require('./connection');
const formatDate = require('./utils/actualDate');

const addNewSale = async (sales) => {
  const date = formatDate();
  const [{ insertId }] = await connection.execute('INSERT INTO sales (date) VALUES (?)',
    [date]);
  
    await Promise.all(
      sales.map(async (sale) => {
      await connection
        .execute('INSERT INTO sales_products (sale_id, product_id, quantity)VALUES (?, ?, ?)',
        [insertId, sale.productId, sale.quantity]);
    }),
  );
  const newObj = { id: insertId, itemsSold: sales };
  return newObj;
};

const getAll = async () => {
  const [sales] = await
    connection.execute(`
    SELECT S.sale_id AS saleId, SP.date, S.product_id AS productId, S.quantity
FROM sales as SP
INNER JOIN sales_products as S
  ON SP.id = S.sale_id
  ORDER BY S.sale_id, S.product_id`);
  return sales;
};

const getById = async (id) => {
  const [sales] = await
    connection.execute(`
    SELECT SP.date, S.product_id AS productId, S.quantity
FROM sales as SP
INNER JOIN sales_products as S
  ON SP.id = S.sale_id
WHERE S.sale_id = ?
ORDER BY S.sale_id, S.product_id`,
      [id]);
  return sales;
};

module.exports = {
  addNewSale,
  getAll,
  getById,
};