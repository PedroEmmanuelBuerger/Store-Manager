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

const resultService = { type: null, message: newProduct };

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

const resultError = { type: 'PRODUCT_NOT_FOUD', message: 'Product not found' };

module.exports = {
  reqBody,
  resultService,
  resultError,
  reqBodyWithoutQuantity,
  reqBodyWithoutProductId,
  reqbodyWIth0InQuantity
}