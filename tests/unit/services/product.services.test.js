const { expect } = require('chai');
const sinon = require('sinon');

const { productModel } = require('../../../src/models');
const { productServices } = require('../../../src/services');

const { products, productSolo } = require('./mocks/product.services.mocks');

describe('testes unitarios da camada service em relação aos produtos', function () {
  afterEach(function () {
    sinon.restore();
  });
  describe('testes da função getAll', function () {
    it('verifica se tudo retorna corretamente', async function () {
      sinon.stub(productModel, 'getAll').resolves(products);

      const result = await productServices.getAll();

      expect(result).to.be.deep.equal({ type: null, message: products });
      expect(result.message).to.have.length(3);
      expect(result.message).to.be.an('array');
    });
  });
  describe('teste das função getbyId', function () {
    it('verifica se tudo retorna corretamente caso tenha o id', async function () {
      sinon.stub(productModel, 'getById').resolves(products[0]);

      const result = await productServices.getById(1);

      expect(result).to.be.deep.equal({ type: null, message: products[0] });
      expect(result.message).to.be.an('object');
    });
    it('verifica se ao passar um id invalido ele retorna um erro', async function () {
      sinon.stub(productModel, 'getById').resolves(undefined);

      const result = await productServices.getById(15);

      expect(result).to.be.deep.equal({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
      expect(result).to.be.an('object');
    });
  });
  describe('teste da função de create', function () {
    it('verifica se o retorno da corretamente', async function () {
      sinon.stub(productModel, 'saveNewProduct').resolves({ id: 4, name: 'pedro' });

      const result = await productServices.saveNewProduct('pedro');

      expect(result).to.be.deep.equal({ type: null, message: { id: 4, name: 'pedro' } });
      expect(result).to.be.an('object');
    });
  });
  describe('teste da função updateProduct', function () {
    it('verifica se retorna corretamente', async function () {
      sinon.stub(productModel, 'getById').resolves(productSolo);
      sinon.stub(productModel, 'updateProduct').resolves(productSolo);

      const result = await productServices.updateProduct('marcos', 2);

      expect(result).to.be.deep.equal({ type: null, message: productSolo });
      expect(result).to.be.an('object');
    });
    it('verifica se retorna um erro ao não encontrar o id que esta buscando', async function () {
      sinon.stub(productModel, 'getById').resolves(undefined);

      const result = await productServices.updateProduct('marcos', 2);

      expect(result).to.be.deep.equal({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
      expect(result).to.be.an('object');
    });
  });
  describe('testa a função deleteProduct ', function () {
    it('testa se retorna true ao excluir um item', async function () {
      sinon.stub(productModel, 'getById').resolves(productSolo);
      sinon.stub(productModel, 'deletProduct').resolves(true);

      const result = await productServices.deletProduct(2);

      expect(result).to.be.deep.equal({ type: null, message: true });
    });
    it('verifica se ao passar um item invalido ele retorna um erro', async function () {
      sinon.stub(productModel, 'getById').resolves(undefined);

      const result = await productServices.deletProduct(999);

      expect(result).to.be.deep.equal({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
    });
  });
});