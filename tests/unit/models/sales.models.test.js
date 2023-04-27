const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');

const { salesModel } = require('../../../src/models');
const { newProducts, allProducts, salesById } = require('./mocks/sales.model.mocks');

describe('testes unitarios da camada model em relação ao sales', function () {
  afterEach(function () {
    sinon.restore();
  });
  describe('teste da função addNewSale', function () {
    it('teste se o retorno do banco vem corretamente', async function () {
      
      sinon.stub(connection, 'execute')
        .onFirstCall().resolves([{ insertId: 4 }])
        .onSecondCall().resolves()
        .onThirdCall().resolves();

      const result = await salesModel.addNewSale(newProducts);

      expect(result).to.be.deep.equal({ id: 4, itemsSold: newProducts });
      expect(result).to.be.an('object');
    });
  });
  describe('teste da função getAll', function () {
    it('verifica se ele retorna todos os sales', async function () {

      sinon.stub(connection, 'execute').resolves([allProducts]);

      const result = await salesModel.getAll();

      expect(result).to.be.deep.equal(allProducts);
      expect(result).to.be.an('array');
    });
  });
  describe('testa da função getbyid', function () {
    it('verifica se ele retorna os sales esperados', async function () {

      sinon.stub(connection, 'execute').resolves([salesById]);

      const result = await salesModel.getById(1);

      expect(result).to.be.deep.equal(salesById);
      expect(result).to.be.an('array');

    });
  });
});