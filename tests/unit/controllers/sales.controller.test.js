const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesController } = require('../../../src/controllers');
const { saleServices } = require('../../../src/services');
const { saleMiddleware, quantitySaleMiddleware } = require('../../../src/middlewares');

const { reqBody, resultService,
  resultError, reqBodyWithoutQuantity,
  reqBodyWithoutProductId, reqbodyWIth0InQuantity,
  resultSales, resultSalesId, resultByIdError } = require('./mocks/sales.controller.mocks');

describe('testes unitarios da camada controller em relação ao sales', function () {
  afterEach(function () {
    sinon.restore();
  });
  describe('teste da função addNewSale em caso OK', function () {
    it('teste se o retorno da service vem corretamente', async function () {

      sinon.stub(saleServices, 'addNewSale').resolves(resultService);

      const req = { body: reqBody };

      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.addNewSale(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(resultService.message);
    });
  });
  describe('teste da função addNewSale em caso de erro', function () {
    it('teste se o retorno da função da um erro caso exista type', async function () {

      sinon.stub(saleServices, 'addNewSale').resolves(resultError);

      const req = { body: reqBody };

      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.addNewSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: resultError.message });
    });
  });
  describe('teste as funcionalidades dos middleware', function () {
    it('verifica se ao mandar uma requesição sem quantity retorna um erro', async function () {

      const req = { body: reqBodyWithoutQuantity  };
      const res = {};
      next = sinon.stub();

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await saleMiddleware(req, res, next);

      expect(next).to.have.been.calledWith({
        status: 400,
        message: '"quantity" is required'
      });
      sinon.assert.calledTwice(next);
    });
    it('verifica se ao mandar uma requesição sem o productId retorna um erro', async function () {
      const req = { body: reqBodyWithoutProductId };
      const res = {};
      next = sinon.stub();

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await saleMiddleware(req, res, next);

      expect(next).to.have.been.calledWith({
        status: 400,
        message: '"productId" is required'
      });
      sinon.assert.calledTwice(next);
    });
    it('verifica se ao mandar com um quantity que possui um valor igual ou menor que 0', async function () {
      const req = { body: reqbodyWIth0InQuantity };
      const res = {};
      next = sinon.stub();

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await quantitySaleMiddleware(req, res, next);

      expect(next).to.have.been.calledWith({
        status: 422,
        message: '"quantity" must be greater than or equal to 1'
      });
      sinon.assert.calledTwice(next);
    });
  });
  describe('teste da função getAll', function () {
    it('verifica se ele retorna tudo ok', async function () {

      sinon.stub(saleServices, 'getAll').resolves(resultSales);

      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.getAll(req, res);


      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(resultSales.message);
    });
  });
  describe('teste da função getbyId', function () {
    it('verifica se ao ir todos valores corretos retorna ok', async function () {

      sinon.stub(saleServices, 'getById').resolves(resultSalesId);

      const req = {params: {id: 1}};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.getById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(resultSalesId.message);
    });
    it('verifica se ao retornar um erro da service o controller retorna um erro tambem', async function () {

      sinon.stub(saleServices, 'getById').resolves(resultByIdError);

      const req = { params: { id: 15 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.getById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: resultByIdError.message });
    });
  });
  describe('testa da função deleteProduct', function () {
    it('verifica se ele retorna true', async function () {

      sinon.stub(saleServices, 'deleteSale').resolves({ type: null, message: true });

      const req = { params: { id: 1 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.deleteSale(req, res);

      expect(res.status).to.have.been.calledWith(204);
      expect(res.json).to.have.been.calledWith();
    });
    it('verifica se caso não exista o id retorna um erro', async function () {

      sinon.stub(saleServices, 'deleteSale').resolves(resultByIdError);

      const req = { params: { id: 15 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.deleteSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: resultByIdError.message });
    });
  });
});