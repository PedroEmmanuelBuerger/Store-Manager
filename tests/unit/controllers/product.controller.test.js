const { expect } = require('chai');
const sinon = require('sinon');

const { productServices } = require('../../../src/services');
const { productController } = require('../../../src/controllers');

describe('testes unitarios da camada controller em relação aos produtos', function () {
  afterEach(function () {
    sinon.restore();
  });
  describe('testes da função getAll', function () {
    it('verifica se tudo retorna corretamente', async function () {
    });
  });
  describe('teste das função getbyId', function () {
    it('verifica se tudo retorna corretamente caso tenha o id', async function () {
    });
    it('verifica se ao passar um id invalido ele retorna um erro', async function () {
    });
  });
});
