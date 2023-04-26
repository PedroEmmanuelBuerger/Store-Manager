const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');

const { products, productSolo } = require('./mocks/product.model.mocks');

const { productModel } = require('../../../src/models');

describe('testes unitarios da camada model em relação aos produtos', function () {
  afterEach(function () {
    sinon.restore();
  });
  describe('testes da função getAll', function () {
    it('verifica se retorna tudo corretamente', async function () {
      sinon.stub(connection, 'execute').resolves([products]);

      const result = await productModel.getAll();

      expect(result).to.be.equal(products);
      expect(result).to.be.an('array');
      expect(result).to.have.length(3);
    });
  });
  describe('testes da função findbyId', function () {
    it('verifica se o id exsitir ele retorna corretamente', async function () {
      sinon.stub(connection, 'execute').resolves([[productSolo]]);

      const result = await productModel.getById(1);

      expect(result).to.be.equal(productSolo);
      expect(result).to.be.an('object');
    });
  });
});
