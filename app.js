const express = require('express');
const app = express();
const cors = require('cors');
const {
  handle500Errors,
  handleBadUrls,
  handleCustomErrors,
  handlePSQLErrors,
} = require('./source/errors/errors');
const apiRouter = require('./routes/api.router');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send({ msg: 'House of games API' });
});

app.use('/api', apiRouter);

app.all('*', handleBadUrls);

app.use(handleCustomErrors);
app.use(handlePSQLErrors);
app.use(handle500Errors);

module.exports = app;
