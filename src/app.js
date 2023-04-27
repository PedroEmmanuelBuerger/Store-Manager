const express = require('express');

const app = express();

const { productRouter, salesRouter } = require('./routers');
// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.use('/products', productRouter);
app.use('/sales', salesRouter);

app.use((error, _req, res, _next) => res.status(error.status).json({ message: error.message }));
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;