const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productServices } = require('../../../src/services');
const { productController } = require('../../../src/controllers');

const { products } = require('./mocks/product.controller.mocks');
describe('testes unitarios da camada controller em relação aos produtos', function () {
  afterEach(function () {
    sinon.restore();
  });
  describe('testes da função getAll', function () {
    it('verifica se tudo retorna corretamente', async function () {
      sinon.stub(productServices, 'getAll').resolves({ type: null, message: products });

      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productController.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products);
    });
  });
  describe('teste das função getbyId', function () {
    it('verifica se tudo retorna corretamente caso tenha o id', async function () {

      sinon.stub(productServices, 'getById').resolves({ type: null, message: products[0] });

      const req = {
        params: { id: 1 },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productController.getById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products[0]);
    });
    it('verifica se ao passar um id invalido ele retorna um erro', async function () {

      sinon.stub(productServices, 'getById').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

      const req = {
        params: { id: 15 },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productController.getById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found'});
    });
  });
});
