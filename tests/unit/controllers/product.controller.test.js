const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productServices } = require('../../../src/services');
const { productController } = require('../../../src/controllers');
const { createProduct } = require('../../../src/middlewares');

const { products, updatedSale, resultErrorupdate } = require('./mocks/product.controller.mocks');

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
  describe('testes de sucesso para a função create', function () {
    it('verifica se retorna tudo corretamente', async function () {
      sinon.stub(productServices, 'saveNewProduct').resolves({ type: null, message: { id: 4, name: 'pedro' } });

      const req = {
        body: { name: 'pedro' },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productController.saveNewProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({ id: 4, name: 'pedro' });
    });
  });
  describe('testes de erro para a função create', function () {
    it('verifica se ao passar um nome com menos de 5 letras retorna um erro', async function () {
      const req = {
        body: { name: 'p' },
      }
      const res = {};
      next = sinon.stub();

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await createProduct(req, res, next);

      expect(next).to.have.been.calledWith({
        status: 422,
        message: '"name" length must be at least 5 characters long'
      });
      sinon.assert.calledOnce(next);
    }); 
    it('verifica se ao passar uma chave sem nome retorna um erro', async function () {
      const req = {
        body: {},
      }
      const res = {};
      next = sinon.stub();

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await createProduct(req, res, next);

      expect(next).to.have.been.calledWith(
      { status: 400, message: '"name" is required' }
      );
      sinon.assert.calledOnce(next);
    });
  });
  describe('teste da função updateProduct', function () {
    it('verifica se retorna corretamente', async function () {
      sinon.stub(productServices, 'updateProduct').resolves(updatedSale);

      const req = {
        body: {name: 'julio'},
        params: {id: 8},
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ id: 8, name: 'julio' });
    });
    it('verifica se retorna um erro caso o service retorne um erro', async function () {
      sinon.stub(productServices, 'updateProduct').resolves(resultErrorupdate);

      const req = {
        body: { name: 'joana' },
        params: { id: 999 },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: resultErrorupdate.message });
    });
  });
  describe('testa a função deleteProduct ', function () {
    it('testa se retorna true ao excluir um item', async function () {
      sinon.stub(productServices, 'deletProduct').resolves({ type: null, message: true });

      const req = {
        params: { id: 1 },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      await productController.deletProduct(req, res);

      expect(res.status).to.have.been.calledWith(204);
      expect(res.json).to.have.been.deep.calledWith();
    })
    it('verifica se ao receber um erro de services retorna um erro', async function () {
      sinon.stub(productServices, 'deletProduct').resolves(resultErrorupdate);

      const req = {
        params: { id: 999 },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productController.deletProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: resultErrorupdate.message });
    });
  });
});
