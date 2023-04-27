const products = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' }
];

const updatedSale = { type: null, message: { id: 8, name: 'julio' } };

const resultErrorupdate = { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

module.exports = {
  products,
  updatedSale,
  resultErrorupdate
}