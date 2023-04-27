const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel, productModel } = require('../../../src/models');
const { saleServices } = require('../../../src/services');

const { newProduct, newProductsEntry, productOne, productTwo } = require('./mocks/sales.services.mocks');

describe('testes unitarios da camada service em relação ao sales', function () {
  afterEach(function () {
    sinon.restore();
  });
  describe('teste da função addNewSale em caso OK', function () {
    it('teste se o retorno da models vem corretamente', async function () {

      sinon.stub(salesModel, 'addNewSale').resolves(newProduct);
      sinon.stub(productModel, 'getById')
        .onFirstCall().resolves(productOne)
        .onSecondCall().resolves(productTwo);

      const result = await saleServices.addNewSale(newProductsEntry);

      expect(result).to.be.deep.equal({ type: null, message: newProduct });
      expect(result).to.be.an('object');
    });
  });
  describe('teste da função addNewSale em caso de erro', function () {
    it('teste se o retorno da função é um erro', async function () {

      sinon.stub(salesModel, 'addNewSale').resolves(newProduct);
      sinon.stub(productModel, 'getById')
        .onFirstCall().resolves(productOne)
        .onSecondCall().resolves(undefined);

      const result = await saleServices.addNewSale(newProductsEntry);

      expect(result).to.be.deep.equal({ type: 'PRODUCT_NOT_FOUD', message: 'Product not found' });
      expect(result).to.be.an('object');
    });
  });
});