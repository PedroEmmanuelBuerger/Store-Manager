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

module.exports = {
  addNewSale,
};