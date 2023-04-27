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

const reqBody = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const reqBodyWithoutQuantity = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2
  }
];

const reqBodyWithoutProductId = [
  {
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const reqbodyWIth0InQuantity = [
  {
    "productId": 1,
    "quantity": 0
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

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

const resultByIdError = { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
const newProduct = { id: 4, itemsSold: newProductsEntry };
const resultService = { type: null, message: newProduct };
const resultError = { type: 'PRODUCT_NOT_FOUD', message: 'Product not found' };
const resultSalesId = { type: null, message: salesById };
const resultSales = { type: null, message: allProducts };

module.exports = {
  reqBody,
  resultService,
  resultError,
  reqBodyWithoutQuantity,
  reqBodyWithoutProductId,
  reqbodyWIth0InQuantity,
  resultSales,
  resultSalesId,
  resultByIdError
}