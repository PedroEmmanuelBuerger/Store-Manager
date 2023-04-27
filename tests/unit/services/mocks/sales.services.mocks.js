const newProductsEntry = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const newProduct = { id: 4, itemsSold: newProductsEntry };

const productOne = {
  "id": 1,
  "name": "Martelo de Thor"
};

const productTwo = {
  "id": 2,
  "name": "Traje de encolhimento"
};

const allProducts = [
  {
    "saleId": 1,
    "date": "2023-04-27T19:46:59.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2023-04-27T19:46:59.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2023-04-27T19:46:59.000Z",
    "productId": 3,
    "quantity": 15
  }
];

const salesById = [
  {
    "saleId": 1,
    "date": "2023-04-27T19:46:59.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2023-04-27T19:46:59.000Z",
    "productId": 2,
    "quantity": 10
  }
];

module.exports = {
  newProduct,
  newProductsEntry,
  productOne,
  productTwo,
  allProducts,
  salesById
}