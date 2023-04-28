const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel, productModel } = require('../../../src/models');
const { saleServices } = require('../../../src/services');

const { newProduct,
  newProductsEntry,
  productOne,
  productTwo,
  allProducts,
  salesById } = require('./mocks/sales.services.mocks');

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
  describe('teste da função get all', function () {
    it('verifica se retorna o resultado esperado', async function () {

      sinon.stub(salesModel, 'getAll').resolves(allProducts);

      const result = await saleServices.getAll();

      expect(result).to.be.deep.equal({ type: null, message: allProducts });
      expect(result).to.be.an('object');
    });
  });
  describe('teste da funçao getbyid', function () {
    it('verifica o caso de teste possitivo com tudo ok', async function () {

      sinon.stub(salesModel, 'getById').resolves(salesById);

      const result = await saleServices.getById(1);

      expect(result).to.be.deep.equal({ type: null, message: salesById });
      expect(result).to.be.an('object');
    });
    it('teste caso de erro na requesição', async function () {

      sinon.stub(salesModel, 'getById').resolves([]);

      const result = await saleServices.getById(15);

      expect(result).to.be.deep.equal({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });
      expect(result).to.be.an('object');

    });
  });
  describe('testa da função deleteProduct', function () {
    it('verifica se ele retorna true', async function () {
      sinon.stub(salesModel, 'getById').resolves(salesById);
      sinon.stub(salesModel, 'deleteSale').resolves(true);

      const result = await saleServices.deleteSale(1);

      expect(result).to.be.deep.equal({ type: null, message: true });
    });
    it('verifica se caso não exista o id retorna um erro', async function () {
      sinon.stub(salesModel, 'getById').resolves([]);

      const result = await saleServices.deleteSale(999);

      expect(result).to.be.deep.equal({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });
    });
  });
});