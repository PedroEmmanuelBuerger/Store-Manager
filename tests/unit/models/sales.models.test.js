const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');

const { salesModel } = require('../../../src/models');
const { newProducts } = require('./mocks/sales.model.mocks');

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
});